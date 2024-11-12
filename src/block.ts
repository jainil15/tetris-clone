import type { Vector } from "./vector";

export class Block {
	pos: Vector;
	cellSize: number;
	constructor(pos: Vector, cellSize: number) {
		this.pos = pos;
		this.cellSize = cellSize;
	}
	draw(ctx: CanvasRenderingContext2D): void {
		ctx.fillRect(
			this.pos.x * this.cellSize,
			this.pos.y * this.cellSize,
			this.cellSize,
			this.cellSize,
		);
	}
}
