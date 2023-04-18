import { Position } from "../Interfaces/IPosition";

interface IBoundary {
  position: Position;
}

export class Boundary {
  private position;
  private width;
  private height;
  static width = 48;
  static height = 48;

  constructor({ position }: IBoundary) {
    this.position = position;
    this.width = 38;
    this.height = 48;
  }

  draw(ctx: CanvasRenderingContext2D) {
    // ctx.fillStyle = "rgba(255,0,0,.2)";
    ctx.fillStyle = "rgba(255,0,0,0)";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  set yPosition(y: number) {
    WritableStreamDefaultWriter;
    this.position.y = y;
  }

  get yPosition() {
    return this.position.y;
  }

  set xPosition(x: number) {
    this.position.x = x;
  }

  get xPosition() {
    return this.position.x;
  }

  get getWidth() {
    return this.width;
  }

  get getHeight() {
    return this.height;
  }
}
