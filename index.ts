import { DISPLAY_HEIGHT, DISPLAY_WIDTH } from "./src/constant";
import { Game } from "./src/game";

function animate(ctx: CanvasRenderingContext2D, game: Game): void {
	ctx.clearRect(0, 0, DISPLAY_WIDTH, DISPLAY_HEIGHT);
	game.draw();
	game.update();
	setTimeout(() => {
		// game.draw();
		animate(ctx, game);
	}, 500);
}
window.onload = function () {
	const canvas = document.getElementById("game") as HTMLCanvasElement | null;
	if (!canvas) {
		return;
	}
	const ctx = canvas.getContext("2d");
	if (!ctx) {
		return;
	}
	const game = new Game(ctx);
	window.addEventListener("keydown", () => {
		if (game.shape) {
			ctx.clearRect(0, 0, DISPLAY_WIDTH, DISPLAY_HEIGHT);
			game.draw();
			game.shape.update();
		}
	});
	window.addEventListener("click", () => {
		if (game.shape) {
			ctx.clearRect(0, 0, DISPLAY_WIDTH, DISPLAY_HEIGHT);
			game.draw();
			game.shape.update();
		}
	});
	// game.draw();
	animate(ctx, game);
};
