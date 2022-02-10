export default class Angle {
    public static radToDeg(radians: number): number {
        return radians * 180 / Math.PI;
    }

    public static degToRad(degrees: number): number {
        return degrees * Math.PI / 180;
    }
}
