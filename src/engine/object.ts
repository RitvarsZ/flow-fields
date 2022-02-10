
import Config from "../config";
import V2 from "./util/vector";

export default class Object {
    public position: V2;
    public size: V2;
    public mass: number = 2;
    public angle: number = 0; // Angle in radians
    public velocity: V2 = new V2(0);
    public acceleration: V2 = new V2(0);
    public isStatic: boolean = false;

    constructor(position: V2, size: V2) {
        this.position = position;
        this.size = size;
        console.log(this.position)
    }

    public applyForce(force: V2) {
        this.acceleration = this.acceleration.add(force.div(this.mass));
    }

    public applyForces(dt: number) {
        if (this.isStatic) {
            return;
        }

        // Apply gravity.
        let gravity = new V2(0, Config.GRAVITY*this.mass);
        this.applyForce(gravity);

        // Apply friction.
        let friction = this.velocity
            .scale(-1) // Opposite to velocity
            .normalize() // Normalize to unit vector
            .scale(Config.FRICTION); // Scale by friction constant
        this.applyForce(friction);
    }

    public update(dt: number): void {
        if (this.isStatic) {
            return;
        }

        this.velocity = this.velocity.add(this.acceleration);
        this.position = this.position.add(this.velocity);

        // Temporary collision detection.
        if (this.position.y + this.size.y > Config.GAME_HEIGHT) {
            this.position.y = Config.GAME_HEIGHT - this.size.y;
            this.velocity.y = 0;

        }

        this.acceleration = new V2(0);
    }

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.rotate(this.angle);
        ctx.strokeStyle = "#fff";
        ctx.strokeRect(this.position.x, this.position.y, this.size.x, this.size.y);
        ctx.restore();
    }
}
