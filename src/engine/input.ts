export default class InputHandler {
    public isKeyDown: { [key: string] : boolean} = {};

    constructor() {
        window.addEventListener("keydown", this.keyDown.bind(this));
        window.addEventListener("keyup", this.keyUp.bind(this));
        window.addEventListener("mousedown", this.mouseDown.bind(this));
        window.addEventListener("mouseup", this.mouseUp.bind(this));
        window.addEventListener("mousemove", this.mouseMove.bind(this));
    }

    public keyDown(event: KeyboardEvent) {
        this.isKeyDown[event.key] = true;
    }

    public keyUp(event: KeyboardEvent) {
        this.isKeyDown[event.key] = false;
    }

    public mouseDown(event: MouseEvent) {}
    public mouseUp(event: MouseEvent) {}
    public mouseMove(event: MouseEvent) {}
}
