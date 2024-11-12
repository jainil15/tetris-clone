// const DISPLAY_WIDTH = 500;
// const DISPLAY_HEIGHT = 500;
// const COLUMNS = 10;

import { DISPLAY_HEIGHT, DISPLAY_WIDTH } from "./src/constant";
import { Game } from "./src/game";

// const ROWS = 10;
function animate(ctx: CanvasRenderingContext2D, game: Game): void {
	ctx.clearRect(0, 0, DISPLAY_WIDTH, DISPLAY_HEIGHT);
	game.update();
	game.draw();

	window.setTimeout(() => {
		game.draw();
		animate(ctx, game);
	}, 150);
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
		ctx.clearRect(0, 0, DISPLAY_WIDTH, DISPLAY_HEIGHT);
		// game.update();
		game.draw();
		if (game.shape) {
			game.shape.update();
		}
	});
	window.addEventListener("click", () => {
		ctx.clearRect(0, 0, DISPLAY_WIDTH, DISPLAY_HEIGHT);
		// game.update();
		game.draw();
		if (game.shape) {
			game.shape.update();
		}
	});
	// game.draw();
	animate(ctx, game);
};

// class Game {
// 	blocks: Block[];
// 	shape: Shape | null;
// 	ctx: CanvasRenderingContext2D;
// 	grid = new Grid(500, 500);
// 	gameOver = false;
// 	constructor(ctx: CanvasRenderingContext2D) {
// 		this.ctx = ctx;
// 		this.blocks = [];
// 		const newShape = new LShape(new Vector(4, 0), this.grid.cellSize);
// 		this.shape = newShape;
// 		this.handleClick();
// 		this.handleMove();
// 	}
// 	draw(): void {
// 		this.grid.draw(this.ctx);
// 		for (let block of this.blocks) {
// 			block.draw(this.ctx);
// 		}
// 		if (this.shape) this.shape.draw(this.ctx);
// 	}
// 	spawnShape(): void {
// 		this.shape = new LShape(new Vector(5, 0), this.grid.cellSize);
// 	}
// 	update(): void {
// 		if (this.shape) {
// 			this.shape.pos = this.shape.pos.add(new Vector(0, 1));
// 			this.shape.update();
// 			this.handleHitBlocks();
// 			this.handleBottom();
// 		} else {
// 			this.spawnShape();
// 		}
// 	}
// 	handleMove() {
// 		window.addEventListener("keydown", (e) => {
// 			switch (e.key) {
// 				case "ArrowLeft":
// 				case "a":
// 					if (this.shape) {
// 						this.shape.move(direction.LEFT);
// 					}
// 					break;
// 				case "ArrowRight":
// 				case "d":
// 					if (this.shape) {
// 						this.shape.move(direction.RIGHT);
// 					}
// 					break;
//
// 				default:
// 					break;
// 			}
// 		});
// 	}
// 	handleClick() {
// 		window.addEventListener("click", () => {
// 			if (this.shape) {
// 				this.shape.rotate();
// 				this.handleBottom();
// 			}
// 		});
// 	}
// 	handleBottom(): void {
// 		if (this.shape) {
// 			console.log("Shape pos", this.shape.pos);
// 			for (const block of this.shape.blocks) {
// 				if (block.pos.y >= ROWS - 1) {
// 					this.blocks.push(...this.shape.blocks);
// 					this.shape = null;
// 					break;
// 				}
// 			}
// 		}
// 	}
// 	handleHitBlocks(): void {
// 		for (const block of this.blocks) {
// 			if (this.shape) {
// 				for (const shapeBlock of this.shape.blocks) {
// 					if (shapeBlock.pos.Eq(block.pos.add(new Vector(0, -1)))) {
// 						this.blocks.push(...this.shape.blocks);
// 						this.shape = null;
// 						console.log("Hit");
// 						break;
// 					}
// 				}
// 			}
// 		}
// 	}
// }
// class Grid {
// 	width: number;
// 	height: number;
// 	cellSize = 50;
// 	constructor(width: number, height: number) {
// 		this.width = width;
// 		this.height = height;
// 	}
// 	draw(ctx: CanvasRenderingContext2D): void {
// 		ctx.moveTo(0, 0);
// 		ctx.save();
// 		for (let i = 0; i < this.width; i += this.cellSize) {
// 			ctx.lineTo(this.height, i);
// 			ctx.stroke();
// 			ctx.moveTo(0, i + this.cellSize);
// 		}
// 		ctx.restore();
// 		for (let i = 0; i < this.height; i += this.cellSize) {
// 			ctx.lineTo(i, this.width);
// 			ctx.stroke();
// 			ctx.moveTo(i + this.cellSize, 0);
// 		}
// 	}
// }
//
// class Block {
// 	pos: Vector;
// 	cellSize: number;
// 	constructor(pos: Vector, cellSize: number) {
// 		this.pos = pos;
// 		this.cellSize = cellSize;
// 	}
// 	draw(ctx: CanvasRenderingContext2D): void {
// 		ctx.fillRect(
// 			this.pos.x * this.cellSize,
// 			this.pos.y * this.cellSize,
// 			this.cellSize,
// 			this.cellSize,
// 		);
// 	}
// }
//
// class Vector {
// 	x: number;
// 	y: number;
// 	constructor(x: number, y: number) {
// 		this.x = x;
// 		this.y = y;
// 	}
// 	add(vec: Vector): Vector {
// 		return new Vector(this.x + vec.x, this.y + vec.y);
// 	}
// 	constantMul(c: number): Vector {
// 		return new Vector(this.x * c, this.y * c);
// 	}
// 	Eq(vec: Vector): boolean {
// 		if (this.x === vec.x && this.y === vec.y) {
// 			return true;
// 		}
// 		return false;
// 	}
// }
// interface Shape {
// 	pos: Vector;
// 	blocks: Block[];
// 	cellSize: number;
// 	update(): void;
// 	rotate(): void;
// 	draw(ctx: CanvasRenderingContext2D): void;
// 	move(dir: direction): void;
// }
// enum direction {
// 	LEFT,
// 	RIGHT,
// }
// class LShape implements Shape {
// 	blocks: Block[];
// 	cellSize: number;
// 	pos: Vector;
// 	rotation: number;
//
// 	constructor(pos: Vector, cellSize: number) {
// 		this.pos = pos;
// 		this.rotation = 0;
// 		this.cellSize = cellSize;
// 		this.blocks = this.create();
// 	}
// 	create(): Block[] {
// 		switch (this.rotation) {
// 			case 0:
// 				return [
// 					new Block(this.pos, this.cellSize),
// 					new Block(this.pos.add(new Vector(0, 1)), this.cellSize),
// 					new Block(this.pos.add(new Vector(1, 1)), this.cellSize),
// 					new Block(this.pos.add(new Vector(0, -1)), this.cellSize),
// 				];
// 			case 1:
// 				return [
// 					new Block(this.pos, this.cellSize),
// 					new Block(this.pos.add(new Vector(1, 0)), this.cellSize),
// 					new Block(this.pos.add(new Vector(1, 1)), this.cellSize),
// 					new Block(this.pos.add(new Vector(-1, 0)), this.cellSize),
// 				];
// 			case 2:
// 				return [
// 					new Block(this.pos, this.cellSize),
// 					new Block(this.pos.add(new Vector(0, -1)), this.cellSize),
// 					new Block(this.pos.add(new Vector(-1, -1)), this.cellSize),
// 					new Block(this.pos.add(new Vector(0, 1)), this.cellSize),
// 				];
// 			case 3:
// 				return [
// 					new Block(this.pos, this.cellSize),
// 					new Block(this.pos.add(new Vector(-1, 0)), this.cellSize),
// 					new Block(this.pos.add(new Vector(-1, -1)), this.cellSize),
// 					new Block(this.pos.add(new Vector(1, 0)), this.cellSize),
// 				];
// 			default:
// 				return [
// 					new Block(this.pos, this.cellSize),
// 					new Block(this.pos.add(new Vector(0, 1)), this.cellSize),
// 					new Block(this.pos.add(new Vector(1, 1)), this.cellSize),
// 					new Block(this.pos.add(new Vector(0, -1)), this.cellSize),
// 				];
// 		}
// 	}
//
// 	update(): void {
// 		this.blocks = this.create();
// 	}
// 	rotate() {
// 		this.rotation = (this.rotation + 1) % 4;
// 		console.log(this.rotation);
// 	}
// 	move(dir: direction): void {
// 		for (let block of this.blocks) {
// 		}
// 		switch (dir) {
// 			case direction.LEFT:
// 				this.pos = this.pos.add(new Vector(-1, 0));
// 				break;
// 			case direction.RIGHT:
// 				this.pos = this.pos.add(new Vector(1, 0));
// 				break;
// 		}
// 	}
// 	draw(ctx: CanvasRenderingContext2D): void {
// 		for (let block of this.blocks) {
// 			block.draw(ctx);
// 		}
// 	}
// }
