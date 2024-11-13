import { Block } from "./block";
import { COLUMNS, ROWS } from "./constant";
import { Grid } from "./grid";
import {
	direction,
	LineShape,
	Shape,
	SquareShape,
	TShape,
	ZShape,
} from "./shape";
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
		this.shape = null;
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
		this.shape = new Shape(
			new Vector(5, 0),
			this.grid.cellSize,
			new LineShape(),
		);
	}
	fallDown(): void {
		if (this.shape) {
			this.shape.pos = this.shape.pos.add(new Vector(0, 1));
			this.shape.update();
		} else {
			this.spawnShape();
		}
	}
	update(): void {
		if (this.gameOver) {
			console.log("Game OVER");
			return;
		}
		if (this.shape) {
			this.handleHitBlocks();
			this.handleBottom();
		}
		if (this.shape) {
			this.shape.pos = this.shape.pos.add(new Vector(0, 1));
			this.shape.update();
		} else {
			this.clearRow();
			this.spawnShape();
		}
	}
	handleMove() {
		window.addEventListener("keydown", (e) => {
			switch (e.key) {
				case "ArrowLeft":
				case "a":
					if (this.shape) {
						if (this.blocks.length != 0) {
							for (const block of this.blocks) {
								for (const shapeBlock of this.shape.blocks) {
									if (
										shapeBlock.pos.Eq(block.pos.add(new Vector(-1, 0))) ||
										shapeBlock.pos.Eq(block.pos.add(new Vector(1, 0))) ||
										shapeBlock.pos.x <= 0
									) {
										return;
									}
								}
							}
						} else {
							for (const shapeBlock of this.shape.blocks) {
								if (shapeBlock.pos.x <= 0) {
									return;
								}
							}
						}

						this.shape.move(direction.LEFT);
					}
					break;
				case "ArrowRight":
				case "d":
					if (this.shape) {
						if (this.blocks.length != 0) {
							for (const block of this.blocks) {
								for (const shapeBlock of this.shape.blocks) {
									if (
										shapeBlock.pos.Eq(block.pos.add(new Vector(-1, 0))) ||
										shapeBlock.pos.Eq(block.pos.add(new Vector(1, 0))) ||
										shapeBlock.pos.x >= COLUMNS - 1
									) {
										return;
									}
								}
							}
						} else {
							for (const shapeBlock of this.shape.blocks) {
								if (shapeBlock.pos.x >= COLUMNS - 1) {
									return;
								}
							}
						}

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
				if (this.shape.validRotation(this.blocks)) {
					this.shape.rotate();
				}
				// this.shape.rotate();
				this.handleBottom();
			}
		});
	}
	handleBottom(): void {
		if (this.shape) {
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
						if (shapeBlock.pos.y <= 0) {
							console.log("Game Over");
							this.gameOver = true;
						}
						this.blocks.push(...this.shape.blocks);
						this.shape = null;
						break;
					}
				}
			}
		}
	}
	clearRow(): void {
		const clearRows: number[] = [];
		for (let row = 0; row < ROWS; row++) {
			let cont = true;
			for (let col = 0; col < COLUMNS; col++) {
				let empty = true;
				for (const block of this.blocks) {
					if (block.pos.Eq(new Vector(col, row))) {
						empty = false;
						break;
					}
				}
				if (empty) {
					cont = false;
					break;
				}
			}
			if (cont) {
				clearRows.push(row);
			}
		}
		console.log("Rows to clear", clearRows);
		for (const row of clearRows) {
			console.log(this.blocks);
			this.blocks = this.blocks.filter((block) => block.pos.y !== row);
			this.blocks.map((block) => {
				if (block.pos.y <= row) {
					block.pos.y++;
				}
			});
		}
	}
}
