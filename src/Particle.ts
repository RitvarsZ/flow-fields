import Config from "./config";
import Object from "./engine/object";
import V2 from "./engine/util/vector";
import FlowField from "./FlowField";

export default class Particle extends Object {
    public prevPosition: V2;
    public maxSpeed: number = Config.PARTICLE_MAX_SPEED
    public color: {r: number, g: number, b: number} = {r: 175, g: 0, b: 0};

    constructor(position: V2, size: V2) {
        super(position, size);

        this.updatePrev();
    }

    public follow(flowField: FlowField): void {
        let x = Math.floor(this.position.x / flowField.gridScale);
        let y = Math.floor(this.position.y / flowField.gridScale);
        let index = x + y * (flowField.cols - 1);

        // sometimes the particle will be outside the flow field.
        // For example if if the particles x and y are both MAX width and height.
        // in that case, dont update.
        if (flowField.flowField[index] == undefined) {
            console.log(this.position, index, flowField)
            return;
        }

        let force = flowField.flowField[index];
        this.applyForce(force);
    }

    // if a particle hits the edge of the screen, warp it to the opposite side.
    public checkEdges(): void {
        if (this.position.x > Config.GAME_WIDTH) {
            this.position.x = 0;
            this.updatePrev();
        } else if (this.position.x < 0) {
            this.position.x = Config.GAME_WIDTH;
            this.updatePrev();
        }

        if (this.position.y > Config.GAME_HEIGHT) {
            this.position.y = 0;
            this.updatePrev();
        } else if (this.position.y < 0) {
            this.position.y = Config.GAME_HEIGHT;
            this.updatePrev();
        }
    }

    public updatePrev(): void {
        this.prevPosition = new V2(this.position.x, this.position.y);
    }

    public update(dt: number): void {
        this.velocity = this.velocity.add(this.acceleration);

        // Limit velocity.
        if (this.velocity.length() > this.maxSpeed) {
            this.velocity = this.velocity.normalize().scale(this.maxSpeed);
        }

        this.position = this.position.add(this.velocity);
        this.acceleration = new V2(0);

        this.checkEdges();
    }
    
    // Draw a line from previous position to current position.
    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.strokeStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.01)`;
        this.color.g += 0.01;
        this.color.b += 0.05;
        this.color.g = this.color.g % 40;
        this.color.b = this.color.b % 120;
        ctx.beginPath();
        ctx.moveTo(this.prevPosition.x, this.prevPosition.y);
        ctx.lineTo(this.position.x, this.position.y);
        ctx.closePath();

        ctx.stroke();

        // ctx.shadowColor = "rgba(255, 255, 255, 0.1)";
        ctx.shadowColor = "rgba(18, 17, 31, 0.25)";
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;
        ctx.fill();


        this.updatePrev();
    }
}