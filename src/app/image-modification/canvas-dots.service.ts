import { Injectable } from '@angular/core';
import { CanvasOptions } from '@shared/models/canvas-options.model';
import { Coordinates } from '@shared/models/coordinates.model';

@Injectable({
  providedIn: 'root'
})
export class CanvasDotsService {
  //cWidth = 800;
  //cHeight = 600;
  options: CanvasOptions = {
    width: 800,
    height: 600,
    dotSize: 5,
    dotSpread: 0
  }

  // dotRadius = 5; // in pixels
  step = 0;

  constructor() { }

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
      arrayPosition = (coords.x + coords.y * this.options.width) * 4;
      tR += colorsArray[arrayPosition];
      tG += colorsArray[arrayPosition + 1];
      tB += colorsArray[arrayPosition + 2];
    });
    const arrLength = coordsArray.length;
    ctx.fillStyle = `rgb(${tR / arrLength},${tG / arrLength},${tB / arrLength})`;
    ctx.beginPath();
    ctx.arc(x, y, this.options.dotSize, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }

  drawAverageColorCircles(ctx: CanvasRenderingContext2D, colorsArray: Uint8ClampedArray): void{
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, this.options.width, this.options.height);
    for (let i = this.options.dotSize; i < this.options.width; i += this.options.dotSize * 2){
      for (let j = this.options.dotSize; j < this.options.width; j += this.options.dotSize * 2){
        this.drawAverageColorCircle(i, j, this.options.dotSize, colorsArray, ctx);
      }
    }
  }

}

