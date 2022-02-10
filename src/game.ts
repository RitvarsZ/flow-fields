import Config from "./config";
import PhysicsEngine from "./engine/engine";
import FlowField from "./FlowField";

export default class Game {
    public engineInstance: PhysicsEngine;
    public flowField: FlowField;

    constructor() {
        this.engineInstance = new PhysicsEngine();
        this.flowField = new FlowField(this.engineInstance);
    }

    public update(dt: number) {
        this.flowField.update(dt);
    }

    public draw(ctx: CanvasRenderingContext2D) {
        // ctx.fillStyle = "#222";
        // ctx.fillRect(0, 0, Config.GAME_WIDTH, Config.GAME_HEIGHT);
        // this.flowField.draw(ctx);
        this.engineInstance.objectList.forEach(obj => obj.draw(ctx));
    }

}
