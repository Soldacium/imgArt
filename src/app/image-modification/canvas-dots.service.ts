import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CanvasDotsService {
  ctx!: CanvasRenderingContext2D;
  cWidth = 800;
  cHeight = 600;

  dotRadius = 5; // in pixels
  step = 0;

  constructor() { }

  init(canvas: HTMLCanvasElement, width: number, height: number): void {
    canvas.height = this.cHeight = height;
    canvas.width = this.cWidth = width;
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  }

  getCircleColorsCoordinates(x0: number, y0: number, r: number): Coordinates[] {
    const rSquare = r ** 2;
    const coordsArray: Coordinates[] = [];

    for (let i = x0 - r; i < x0 + r; i++){
      for (let j = y0 - r; j < y0 + r; j++){
        if ((i - x0) ** 2 + (j - y0) ** 2 <= rSquare ){
          const coords: Coordinates = {x: i, y: j};
          coordsArray.push(coords);
        }
      }
    }
    return coordsArray;
  }

  drawAverageColorCircle(x: number, y: number, r: number, colorsArray: Uint8ClampedArray, ctx: CanvasRenderingContext2D): void{
    const coordsArray = this.getCircleColorsCoordinates(x, y, r);
    let arrayPosition = 0;
    let tR = 0;
    let tG = 0;
    let tB = 0;
    coordsArray.forEach(coords => {
      // colorArray is 4 times larger than number of points, as each point is defined by it red,green, blue, alpha values
      arrayPosition = (coords.x + coords.y * this.cWidth) * 4;
      tR += colorsArray[arrayPosition];
      tG += colorsArray[arrayPosition + 1];
      tB += colorsArray[arrayPosition + 2];
    });
    const arrLength = coordsArray.length;
    ctx.fillStyle = `rgb(${tR / arrLength},${tG / arrLength},${tB / arrLength})`;
    ctx.beginPath();
    ctx.arc(x, y, this.dotRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }

  drawBlackDots(ctx: CanvasRenderingContext2D): void{
    ctx.fillStyle = 'red';
    for (let i = this.dotRadius; i < this.cWidth; i += this.dotRadius * 2){
      for (let j = this.dotRadius; j < this.cHeight; j += this.dotRadius * 2){
      }
    }
  }

  drawAverageColorCircles(ctx: CanvasRenderingContext2D, colorsArray: Uint8ClampedArray): void{
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, this.cWidth, this.cHeight);
    for (let i = this.dotRadius; i < this.cWidth; i += this.dotRadius * 2){
      for (let j = this.dotRadius; j < this.cHeight; j += this.dotRadius * 2){
        this.drawAverageColorCircle(i, j, this.dotRadius, colorsArray, ctx);
      }
    }
  }

}

export interface Coordinates{
  x: number;
  y: number;
}

      /*
      const avg = Math.floor((colorsArray[arrayPosition] + colorsArray[arrayPosition + 1] + colorsArray[arrayPosition + 2]) / 3);
      ctx.fillStyle = `rgb(${avg},${avg},${avg})`;
      ctx.beginPath();
      ctx.rect(coords.x, coords.y, 1, 1);
      ctx.fill();
      ctx.closePath();
      */
