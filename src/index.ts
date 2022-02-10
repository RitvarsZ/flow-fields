import Game from './game';
import Config from './config';

let canvas = document.getElementById('game') as HTMLCanvasElement;
let ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

canvas.width = Config.GAME_WIDTH;
canvas.height = Config.GAME_HEIGHT;

let game = new Game();
let time = 0;

ctx.fillStyle = "#11111f";
ctx.fillRect(0, 0, Config.GAME_WIDTH, Config.GAME_HEIGHT);

function gameLoop(timestamp: number) {
    let dt = timestamp - time;
    time = timestamp;

    // Clear the canvas before each frame.
    // ctx.clearRect(0, 0, Config.GAME_WIDTH, Config.GAME_HEIGHT);

    game.update(dt);
    game.draw(ctx);

    requestAnimationFrame(gameLoop);
}

// Start the game loop
requestAnimationFrame(gameLoop);
