import Object from "./object";
import Config from "../config";

export default class PhysicsEngine {
    public objectList: Object[] = [];
    public physicsStepAccumulator: number = 0;

    constructor() {}

    public addObject(obj: Object) {
        this.objectList.push(obj);
    };

    public update(dt: number) {
        // Fixed timestep physics.
        this.physicsStepAccumulator += dt;
        if (this.physicsStepAccumulator <= Config.PHYSICS_STEP) {
            return;
        }

        this.physicsStepAccumulator -= Config.PHYSICS_STEP;

        this.objectList.forEach(obj => {
            obj.applyForces(dt);
            obj.update(dt);
        });
    }
}