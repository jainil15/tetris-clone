export class Vector {
	x: number;
	y: number;
	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}
	add(vec: Vector): Vector {
		return new Vector(this.x + vec.x, this.y + vec.y);
	}
	constantMul(c: number): Vector {
		return new Vector(this.x * c, this.y * c);
	}
	Eq(vec: Vector): boolean {
		if (this.x === vec.x && this.y === vec.y) {
			return true;
		}
		return false;
	}
}
