import { Block } from "./block";
import { ROWS } from "./constant";
import { Grid } from "./grid";
import { direction, LShape, type Shape } from "./shape";
import { Vector } from "./vector";

export class Game {
	blocks: Block[];
	shape: Shape | null;
	ctx: CanvasRenderingContext2D;
	grid = new Grid(500, 500);
	gameOver = false;
	constructor(ctx: CanvasRenderingContext2D) {
		this.ctx = ctx;
		this.blocks = [];
		const newShape = new LShape(new Vector(4, 0), this.grid.cellSize);
		this.shape = newShape;
		this.handleClick();
		this.handleMove();
	}
	draw(): void {
		this.grid.draw(this.ctx);
		for (let block of this.blocks) {
			block.draw(this.ctx);
		}
		if (this.shape) this.shape.draw(this.ctx);
	}
	spawnShape(): void {
		this.shape = new LShape(new Vector(5, 0), this.grid.cellSize);
	}
	update(): void {
		if (this.shape) {
			this.shape.pos = this.shape.pos.add(new Vector(0, 1));
			this.shape.update();
			this.handleHitBlocks();
			this.handleBottom();
		} else {
			this.spawnShape();
		}
	}
	handleMove() {
		window.addEventListener("keydown", (e) => {
			switch (e.key) {
				case "ArrowLeft":
				case "a":
					if (this.shape) {
						this.shape.move(direction.LEFT);
					}
					break;
				case "ArrowRight":
				case "d":
					if (this.shape) {
						this.shape.move(direction.RIGHT);
					}
					break;

				default:
					break;
			}
		});
	}
	handleClick() {
		window.addEventListener("click", () => {
			if (this.shape) {
				this.shape.rotate();
				this.handleBottom();
			}
		});
	}
	handleBottom(): void {
		if (this.shape) {
			console.log("Shape pos", this.shape.pos);
			for (const block of this.shape.blocks) {
				if (block.pos.y >= ROWS - 1) {
					this.blocks.push(...this.shape.blocks);
					this.shape = null;
					break;
				}
			}
		}
	}
	handleHitBlocks(): void {
		for (const block of this.blocks) {
			if (this.shape) {
				for (const shapeBlock of this.shape.blocks) {
					if (shapeBlock.pos.Eq(block.pos.add(new Vector(0, -1)))) {
						this.blocks.push(...this.shape.blocks);
						this.shape = null;
						console.log("Hit");
						break;
					}
				}
			}
		}
	}
}
