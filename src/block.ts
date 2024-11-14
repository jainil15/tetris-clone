import type { Vector } from "./vector";

export class Block {
	pos: Vector;
	cellSize: number;
	color: string;
	constructor(pos: Vector, cellSize: number, color: string) {
		this.pos = pos;
		this.cellSize = cellSize;
		this.color = color;
	}
	draw(ctx: CanvasRenderingContext2D): void {
		ctx.save();
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.roundRect(
			this.pos.x * this.cellSize + 2.5,
			this.pos.y * this.cellSize + 2.5,
			this.cellSize - 5,
			this.cellSize - 5,
			10,
		);
		ctx.fill();
		ctx.stroke();
		ctx.restore();
	}
}
