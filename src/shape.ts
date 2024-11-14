import { Block } from "./block";
import { COLUMNS, ROWS } from "./constant";
import { Vector } from "./vector";

export enum direction {
	LEFT,
	RIGHT,
}
export enum shapes {
	Z = 0,
	T = 1,
	L = 2,
	Line = 3,
	Square = 4,
}

export interface IShape {
	color: string;
	create(rotation: number, pos: Vector, cellSize: number): Block[];
}
export class Shape {
	blocks: Block[];
	cellSize: number;
	pos: Vector;
	rotation: number;
	private shape: IShape;

	constructor(pos: Vector, cellSize: number, shape: IShape) {
		this.pos = pos;
		this.rotation = 0;
		this.cellSize = cellSize;
		this.shape = shape;
		this.blocks = this.shape.create(this.rotation, this.pos, this.cellSize);
	}

	update(): void {
		this.blocks = this.shape.create(this.rotation, this.pos, this.cellSize);
	}
	rotate() {
		this.rotation = (this.rotation + 1) % 4;
		console.log(this.rotation);
	}
	move(dir: direction): void {
		switch (dir) {
			case direction.LEFT:
				this.pos = this.pos.add(new Vector(-1, 0));
				break;
			case direction.RIGHT:
				this.pos = this.pos.add(new Vector(1, 0));
				break;
		}
	}
	draw(ctx: CanvasRenderingContext2D): void {
		for (let block of this.blocks) {
			block.draw(ctx);
		}
	}
	validRotation(blocks: Block[]): boolean {
		if (blocks.length === 0) {
			const rotation = this.rotation;
			this.rotate();

			const shapeBlocks = this.shape.create(
				this.rotation,
				this.pos,
				this.cellSize,
			);
			this.rotation = rotation;
			for (const shapeBlock of shapeBlocks) {
				if (
					shapeBlock.pos.y >= ROWS - 1 ||
					shapeBlock.pos.x <= 0 ||
					shapeBlock.pos.x >= COLUMNS - 1
				) {
					return false;
				}
			}
			this.rotation = rotation;
			return true;
		}
		for (const block of blocks) {
			const rotation = this.rotation;
			this.rotate();
			const shapeBlocks = this.shape.create(
				this.rotation,
				this.pos,
				this.cellSize,
			);
			this.rotation = rotation;
			for (const shapeBlock of shapeBlocks) {
				if (
					shapeBlock.pos.Eq(block.pos) ||
					shapeBlock.pos.y >= ROWS - 1 ||
					shapeBlock.pos.x <= 0 ||
					shapeBlock.pos.x >= COLUMNS - 1
				) {
					return false;
				}
			}
		}
		return true;
	}
}
export class SquareShape implements IShape {
	color = "#4B0082";
	create(rotation: number, pos: Vector, cellSize: number): Block[] {
		switch (rotation) {
			default:
				return [
					new Block(pos, cellSize, this.color),
					new Block(pos.add(new Vector(0, 1)), cellSize, this.color),
					new Block(pos.add(new Vector(1, 1)), cellSize, this.color),
					new Block(pos.add(new Vector(1, 0)), cellSize, this.color),
				];
		}
	}
}
export class LShape implements IShape {
	color = "#BA55D3";
	create(rotation: number, pos: Vector, cellSize: number): Block[] {
		switch (rotation) {
			case 0:
				return [
					new Block(pos, cellSize, this.color),
					new Block(pos.add(new Vector(0, 1)), cellSize, this.color),
					new Block(pos.add(new Vector(1, 1)), cellSize, this.color),
					new Block(pos.add(new Vector(0, -1)), cellSize, this.color),
				];
			case 1:
				return [
					new Block(pos, cellSize, this.color),
					new Block(pos.add(new Vector(1, 0)), cellSize, this.color),
					new Block(pos.add(new Vector(1, 1)), cellSize, this.color),
					new Block(pos.add(new Vector(-1, 0)), cellSize, this.color),
				];
			case 2:
				return [
					new Block(pos, cellSize, this.color),
					new Block(pos.add(new Vector(0, -1)), cellSize, this.color),
					new Block(pos.add(new Vector(-1, -1)), cellSize, this.color),
					new Block(pos.add(new Vector(0, 1)), cellSize, this.color),
				];
			case 3:
				return [
					new Block(pos, cellSize, this.color),
					new Block(pos.add(new Vector(-1, 0)), cellSize, this.color),
					new Block(pos.add(new Vector(-1, -1)), cellSize, this.color),
					new Block(pos.add(new Vector(1, 0)), cellSize, this.color),
				];
			default:
				return [
					new Block(pos, cellSize, this.color),
					new Block(pos.add(new Vector(0, 1)), cellSize, this.color),
					new Block(pos.add(new Vector(1, 1)), cellSize, this.color),
					new Block(pos.add(new Vector(0, -1)), cellSize, this.color),
				];
		}
	}
}
export class ZShape implements IShape {
	color = "#0000FF";
	create(rotation: number, pos: Vector, cellSize: number): Block[] {
		switch (rotation) {
			case 0:
			case 2:
				return [
					new Block(pos, cellSize, this.color),
					new Block(pos.add(new Vector(0, 1)), cellSize, this.color),
					new Block(pos.add(new Vector(-1, 1)), cellSize, this.color),
					new Block(pos.add(new Vector(1, 0)), cellSize, this.color),
				];
			case 1:
			case 3:
				return [
					new Block(pos, cellSize, this.color),
					new Block(pos.add(new Vector(1, 0)), cellSize, this.color),
					new Block(pos.add(new Vector(1, 1)), cellSize, this.color),
					new Block(pos.add(new Vector(0, -1)), cellSize, this.color),
				];
			default:
				return [
					new Block(pos, cellSize, this.color),
					new Block(pos.add(new Vector(1, 0)), cellSize, this.color),
					new Block(pos.add(new Vector(1, 1)), cellSize, this.color),
					new Block(pos.add(new Vector(0, -1)), cellSize, this.color),
				];
		}
	}
}
export class TShape implements IShape {
	color = "#FFFF33";
	create(rotation: number, pos: Vector, cellSize: number): Block[] {
		switch (rotation) {
			case 0:
				return [
					new Block(pos, cellSize, this.color),
					new Block(pos.add(new Vector(0, -1)), cellSize, this.color),
					new Block(pos.add(new Vector(1, 0)), cellSize, this.color),
					new Block(pos.add(new Vector(-1, 0)), cellSize, this.color),
				];
			case 1:
				return [
					new Block(pos, cellSize, this.color),
					new Block(pos.add(new Vector(0, -1)), cellSize, this.color),
					new Block(pos.add(new Vector(0, 1)), cellSize, this.color),
					new Block(pos.add(new Vector(1, 0)), cellSize, this.color),
				];
			case 2:
				return [
					new Block(pos, cellSize, this.color),
					new Block(pos.add(new Vector(1, 0)), cellSize, this.color),
					new Block(pos.add(new Vector(-1, 0)), cellSize, this.color),
					new Block(pos.add(new Vector(0, 1)), cellSize, this.color),
				];
			case 3:
				return [
					new Block(pos, cellSize, this.color),
					new Block(pos.add(new Vector(0, 1)), cellSize, this.color),
					new Block(pos.add(new Vector(0, -1)), cellSize, this.color),
					new Block(pos.add(new Vector(-1, 0)), cellSize, this.color),
				];
			default:
				return [
					new Block(pos, cellSize, this.color),
					new Block(pos.add(new Vector(1, 0)), cellSize, this.color),
					new Block(pos.add(new Vector(1, 1)), cellSize, this.color),
					new Block(pos.add(new Vector(0, -1)), cellSize, this.color),
				];
		}
	}
}

export class LineShape implements IShape {
	color = "#CC0000";
	create(rotation: number, pos: Vector, cellSize: number): Block[] {
		switch (rotation) {
			case 0:
			case 2:
				return [
					new Block(pos, cellSize, this.color),
					new Block(pos.add(new Vector(1, 0)), cellSize, this.color),
					new Block(pos.add(new Vector(-1, 0)), cellSize, this.color),
					new Block(pos.add(new Vector(-2, 0)), cellSize, this.color),
				];
			case 1:
			case 3:
				return [
					new Block(pos, cellSize, this.color),
					new Block(pos.add(new Vector(0, -1)), cellSize, this.color),
					new Block(pos.add(new Vector(0, 1)), cellSize, this.color),
					new Block(pos.add(new Vector(0, 2)), cellSize, this.color),
				];
			default:
				return [
					new Block(pos, cellSize, this.color),
					new Block(pos.add(new Vector(0, -1)), cellSize, this.color),
					new Block(pos.add(new Vector(0, 1)), cellSize, this.color),
					new Block(pos.add(new Vector(0, 2)), cellSize, this.color),
				];
		}
	}
}
export function shapeBuilder(shape: shapes): IShape {
	switch (shape) {
		case shapes.L:
			return new LShape();
		case shapes.Z:
			return new ZShape();
		case shapes.T:
			return new TShape();
		case shapes.Line:
			return new LineShape();
		case shapes.Square:
			return new SquareShape();
	}
}
