import PhysicsEngine from "./engine/engine";
import Config from "./config";
import V2 from "./engine/util/vector";
import noise from "./noise";
import Particle from "./Particle";

export default class FlowField {
    public gridScale: number = 6;
    public rows: number = Math.floor(Config.GAME_WIDTH / this.gridScale);
    public cols: number = Math.floor(Config.GAME_HEIGHT / this.gridScale);
    public flowField: Array<V2>;

    private engineInstance: PhysicsEngine;
    private particles: Array<Particle> = [];
    private zOffset: number = 0;
    private increment: number = 0.07;

    constructor(engineInstance: PhysicsEngine) {
        this.engineInstance = engineInstance;

        this.flowField = new Array(this.rows * this.cols);
        for (let i = 0; i < this.flowField.length; i++) {
            this.flowField[i] = new V2(0, 0);
        }

        this.particles = [];
        for (let i = 0; i < Config.PARTICLE_COUNT; i++) {
            this.particles[i] = new Particle(
                new V2(Math.random() * Config.GAME_WIDTH, Math.random() * Config.GAME_HEIGHT),
                new V2(1, 1),
            );

            this.engineInstance.addObject(this.particles[i]);
        }
    }

    public update(dt: number) {
        let yOffset = 0;

        for (let y = 0; y < this.rows; y++) {
            let xOffset = 0;

            for (let x = 0; x < this.cols; x++) {
                let index = x + y * this.cols;
                let angle = noise(xOffset, yOffset, this.zOffset) * (Math.PI * 2) * 4;
                let v = new V2(Math.cos(angle), Math.sin(angle));
                v.normalize();
                this.flowField[index] = v;
                xOffset += this.increment;
            }

            yOffset += this.increment;
            this.zOffset += 0.00001;
        }

        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].follow(this);
            this.particles[i].update(dt);
        }
    }

    public draw(ctx: CanvasRenderingContext2D) {
        // draw all the vectors in the flow field
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                let index = x + y * this.cols;
                let v = this.flowField[index];
                ctx.beginPath();
                ctx.moveTo(x * this.gridScale + this.gridScale, y * this.gridScale + this.gridScale);
                ctx.lineTo((x + v.x) * this.gridScale + this.gridScale, (y + v.y) * this.gridScale + this.gridScale);
                ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
                ctx.stroke();
            }
        }
    }
}