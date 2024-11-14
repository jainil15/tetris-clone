export class Grid {
	width: number;
	height: number;
	cellSize = 50;
	constructor(width: number, height: number) {
		this.width = width;
		this.height = height;
	}
	draw(ctx: CanvasRenderingContext2D): void {
		ctx.save();
		for (let i = 0; i < this.width; i += this.cellSize) {
			ctx.beginPath();
			ctx.moveTo(0, i);
			ctx.lineTo(this.height, i);
			ctx.stroke();
			ctx.moveTo(0, i + this.cellSize);
		}
		ctx.restore();
		ctx.save();
		for (let i = 0; i < this.height; i += this.cellSize) {
			ctx.beginPath();
			ctx.moveTo(i, 0);
			ctx.lineTo(i, this.width);
			ctx.stroke();
			ctx.moveTo(i + this.cellSize, 0);
		}
		ctx.restore();
	}
}
