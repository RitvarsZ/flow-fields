export default class V2 {
    public x: number;
    public y: number;

    constructor(x: number, y: number|null = 0) {
        this.x = x;

        if (y === null) {
            this.y = x;
        } else {
            this.y = y;
        }
    }

    public add(v: V2): V2 { return new V2(this.x + v.x, this.y + v.y) }
    public sub(v: V2): V2 { return new V2(this.x - v.x, this.y - v.y) }
    public mul(v: V2): V2 { return new V2(this.x * v.x, this.y * v.y) }
    public div(c: number): V2 { return new V2(this.x / c, this.y / c) }
    public scale(s: number): V2 { return new V2(this.x * s, this.y * s) }
    public dot(v: V2): number { return this.x * v.x + this.y * v.y }
    public cross(v: V2): number { return this.x * v.y - this.y * v.x }
    public length(): number { return Math.sqrt(this.dot(this)) }
    public normalize(): V2 {
        let l = this.length() ? this.length() : 1;
        return this.scale(1 / l)
    }
    public distance(v: V2): number { return this.sub(v).length() }
    public angle(): number { return Math.atan2(this.y, this.x) }
    public angleTo(v: V2): number { return Math.atan2(v.y - this.y, v.x - this.x)}
    public rotate(angle: number): V2 {
        let s = Math.sin(angle);
        let c = Math.cos(angle);

        return new V2(this.x * c - this.y * s, this.x * s + this.y * c);
    }
}
