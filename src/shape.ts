import { Block } from "./block";
import { COLUMNS, ROWS } from "./constant";
import { Vector } from "./vector";

export enum direction {
	LEFT,
	RIGHT,
}
export interface IShape {
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
	create(rotation: number, pos: Vector, cellSize: number): Block[] {
		switch (rotation) {
			default:
				return [
					new Block(pos, cellSize),
					new Block(pos.add(new Vector(0, 1)), cellSize),
					new Block(pos.add(new Vector(1, 1)), cellSize),
					new Block(pos.add(new Vector(1, 0)), cellSize),
				];
		}
	}
}
export class LShape implements IShape {
	create(rotation: number, pos: Vector, cellSize: number): Block[] {
		switch (rotation) {
			case 0:
				return [
					new Block(pos, cellSize),
					new Block(pos.add(new Vector(0, 1)), cellSize),
					new Block(pos.add(new Vector(1, 1)), cellSize),
					new Block(pos.add(new Vector(0, -1)), cellSize),
				];
			case 1:
				return [
					new Block(pos, cellSize),
					new Block(pos.add(new Vector(1, 0)), cellSize),
					new Block(pos.add(new Vector(1, 1)), cellSize),
					new Block(pos.add(new Vector(-1, 0)), cellSize),
				];
			case 2:
				return [
					new Block(pos, cellSize),
					new Block(pos.add(new Vector(0, -1)), cellSize),
					new Block(pos.add(new Vector(-1, -1)), cellSize),
					new Block(pos.add(new Vector(0, 1)), cellSize),
				];
			case 3:
				return [
					new Block(pos, cellSize),
					new Block(pos.add(new Vector(-1, 0)), cellSize),
					new Block(pos.add(new Vector(-1, -1)), cellSize),
					new Block(pos.add(new Vector(1, 0)), cellSize),
				];
			default:
				return [
					new Block(pos, cellSize),
					new Block(pos.add(new Vector(0, 1)), cellSize),
					new Block(pos.add(new Vector(1, 1)), cellSize),
					new Block(pos.add(new Vector(0, -1)), cellSize),
				];
		}
	}
}
/* This is t
          new Block(pos, cellSize),
          new Block(pos.add(new Vector(1, 0)), cellSize),
          new Block(pos.add(new Vector(1, 1)), cellSize),
          new Block(pos.add(new Vector(1, -1)), cellSize),
 * */
export class ZShape implements IShape {
	create(rotation: number, pos: Vector, cellSize: number): Block[] {
		switch (rotation) {
			case 0:
			case 2:
				return [
					new Block(pos, cellSize),
					new Block(pos.add(new Vector(0, 1)), cellSize),
					new Block(pos.add(new Vector(-1, 1)), cellSize),
					new Block(pos.add(new Vector(1, 0)), cellSize),
				];
			case 1:
			case 3:
				return [
					new Block(pos, cellSize),
					new Block(pos.add(new Vector(1, 0)), cellSize),
					new Block(pos.add(new Vector(1, 1)), cellSize),
					new Block(pos.add(new Vector(0, -1)), cellSize),
				];
			default:
				return [
					new Block(pos, cellSize),
					new Block(pos.add(new Vector(1, 0)), cellSize),
					new Block(pos.add(new Vector(1, 1)), cellSize),
					new Block(pos.add(new Vector(0, -1)), cellSize),
				];
		}
	}
}
export class TShape implements IShape {
	create(rotation: number, pos: Vector, cellSize: number): Block[] {
		switch (rotation) {
			case 0:
				return [
					new Block(pos, cellSize),
					new Block(pos.add(new Vector(0, -1)), cellSize),
					new Block(pos.add(new Vector(1, 0)), cellSize),
					new Block(pos.add(new Vector(-1, 0)), cellSize),
				];
			case 1:
				return [
					new Block(pos, cellSize),
					new Block(pos.add(new Vector(0, -1)), cellSize),
					new Block(pos.add(new Vector(0, 1)), cellSize),
					new Block(pos.add(new Vector(1, 0)), cellSize),
				];
			case 2:
				return [
					new Block(pos, cellSize),
					new Block(pos.add(new Vector(1, 0)), cellSize),
					new Block(pos.add(new Vector(-1, 0)), cellSize),
					new Block(pos.add(new Vector(0, 1)), cellSize),
				];
			case 3:
				return [
					new Block(pos, cellSize),
					new Block(pos.add(new Vector(0, 1)), cellSize),
					new Block(pos.add(new Vector(0, -1)), cellSize),
					new Block(pos.add(new Vector(-1, 0)), cellSize),
				];
			default:
				return [
					new Block(pos, cellSize),
					new Block(pos.add(new Vector(1, 0)), cellSize),
					new Block(pos.add(new Vector(1, 1)), cellSize),
					new Block(pos.add(new Vector(0, -1)), cellSize),
				];
		}
	}
}

export class LineShape implements IShape {
	create(rotation: number, pos: Vector, cellSize: number): Block[] {
		switch (rotation) {
			case 0:
			case 2:
				return [
					new Block(pos, cellSize),
					new Block(pos.add(new Vector(1, 0)), cellSize),
					new Block(pos.add(new Vector(-1, 0)), cellSize),
					new Block(pos.add(new Vector(-2, 0)), cellSize),
				];
			case 1:
			case 3:
				return [
					new Block(pos, cellSize),
					new Block(pos.add(new Vector(0, -1)), cellSize),
					new Block(pos.add(new Vector(0, 1)), cellSize),
					new Block(pos.add(new Vector(0, 2)), cellSize),
				];
			default:
				return [
					new Block(pos, cellSize),
					new Block(pos.add(new Vector(0, -1)), cellSize),
					new Block(pos.add(new Vector(0, 1)), cellSize),
					new Block(pos.add(new Vector(0, 2)), cellSize),
				];
		}
	}
}
export function shapeBuilder(shape: shapes) {}
