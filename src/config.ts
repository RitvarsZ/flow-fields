export default class Config {
    public static readonly DEBUG: boolean = true;
    public static readonly GAME_WIDTH: number = 1200;
    public static readonly GAME_HEIGHT: number = 900;
    public static readonly FRICTION: number = 0.01;
    public static readonly GRAVITY: number = 0.05;
    public static readonly PHYSICS_STEP: number = 1 / 60;

    public static readonly PARTICLE_COUNT: number = 500;
    public static readonly PARTICLE_MAX_SPEED: number = 8;
    public static readonly GRID_SCALE: number = 6;
    public static readonly VECTOR_INCREMENT: number = 0.005; // How random the vectors are. Lower is less random.
    public static readonly Z_OFFSET_INCREMENT: number = 0.0000006; // How fast the vector field moves. Higher is faster.
}