import { Block } from "./block";
import { COLUMNS, ROWS } from "./constant";
import { Vector } from "./vector";

export interface Shape {
  pos: Vector;
  blocks: Block[];
  cellSize: number;
  update(): void;
  rotate(): void;
  draw(ctx: CanvasRenderingContext2D): void;
  move(dir: direction): void;
  validRotation(blocks: Block[]): boolean;
}
export enum direction {
  LEFT,
  RIGHT,
}
export class LShape implements Shape {
  blocks: Block[];
  cellSize: number;
  pos: Vector;
  rotation: number;

  constructor(pos: Vector, cellSize: number) {
    this.pos = pos;
    this.rotation = 0;
    this.cellSize = cellSize;
    this.blocks = this.create();
  }
  create(): Block[] {
    switch (this.rotation) {
      case 0:
        return [
          new Block(this.pos, this.cellSize),
          new Block(this.pos.add(new Vector(0, 1)), this.cellSize),
          new Block(this.pos.add(new Vector(1, 1)), this.cellSize),
          new Block(this.pos.add(new Vector(0, -1)), this.cellSize),
        ];
      case 1:
        return [
          new Block(this.pos, this.cellSize),
          new Block(this.pos.add(new Vector(1, 0)), this.cellSize),
          new Block(this.pos.add(new Vector(1, 1)), this.cellSize),
          new Block(this.pos.add(new Vector(-1, 0)), this.cellSize),
        ];
      case 2:
        return [
          new Block(this.pos, this.cellSize),
          new Block(this.pos.add(new Vector(0, -1)), this.cellSize),
          new Block(this.pos.add(new Vector(-1, -1)), this.cellSize),
          new Block(this.pos.add(new Vector(0, 1)), this.cellSize),
        ];
      case 3:
        return [
          new Block(this.pos, this.cellSize),
          new Block(this.pos.add(new Vector(-1, 0)), this.cellSize),
          new Block(this.pos.add(new Vector(-1, -1)), this.cellSize),
          new Block(this.pos.add(new Vector(1, 0)), this.cellSize),
        ];
      default:
        return [
          new Block(this.pos, this.cellSize),
          new Block(this.pos.add(new Vector(0, 1)), this.cellSize),
          new Block(this.pos.add(new Vector(1, 1)), this.cellSize),
          new Block(this.pos.add(new Vector(0, -1)), this.cellSize),
        ];
    }
  }

  update(): void {
    this.blocks = this.create();
  }
  rotate() {
    this.rotation = (this.rotation + 1) % 4;
    console.log(this.rotation);
  }
  move(dir: direction): void {
    // for (let block of this.blocks) {
    // }
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
  validRotation(blocks: Block[]): boolean{
    if (blocks.length === 0) {
      const rotation = this.rotation
      this.rotate()
      const shapeBlocks = this.create()
      this.rotation = rotation
      for (const shapeBlock of shapeBlocks){
        if (shapeBlock.pos.y >= ROWS -1 || shapeBlock.pos.x <= 0 || shapeBlock.pos.x >= COLUMNS - 1) {
          return false
        }
      }
      this.rotation = rotation
      return true
    }
    for (const block of blocks) {
      const rotation = this.rotation
      this.rotate()
      const shapeBlocks = this.create()
      this.rotation = rotation
      for (const shapeBlock of shapeBlocks){
        if (shapeBlock.pos.Eq(block.pos) || shapeBlock.pos.y >= ROWS -1 || shapeBlock.pos.x <= 0 || shapeBlock.pos.x >= COLUMNS - 1) {
          return false
        }
      }
    }
    return true
  }
} 
