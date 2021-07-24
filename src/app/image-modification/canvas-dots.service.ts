import { Injectable } from '@angular/core';
import { CanvasOptions } from '@shared/models/canvas-options.model';
import { Coordinates } from '@shared/models/coordinates.model';

@Injectable({
  providedIn: 'root'
})
export class CanvasDotsService {
  options: CanvasOptions = {
    width: 800,
    height: 600,
    size: 5,
    spread: 0
  };

  step = 0;

  constructor() { }

  getCircleColorsCoordinates(x0: number, y0: number, r: number): [Coordinates[], Coordinates[]] {
    const rSquare = r ** 2;
    const coloredPixelsArray: Coordinates[] = [];
    const emptyPixelsArray: Coordinates[] = [];

    for (let i = x0 - r; i < x0 + r + this.options.spread; i++){
      for (let j = y0 - r; j < y0 + r + this.options.spread; j++){
        const coords: Coordinates = {x: i, y: j};
        if ((i - x0) ** 2 + (j - y0) ** 2 <= rSquare ){ // && i != x0 + r && i != x0 - r && j != y0 + r && j != y0 - r
          coloredPixelsArray.push(coords);
        }else{
          emptyPixelsArray.push(coords);
        }
      }
    }
    return [coloredPixelsArray, emptyPixelsArray];
  }

  getRhombusColorsCoordinates(x0: number, y0: number, r: number, deg: number): void{
    const rSquare = r ** 2;
    const coordsArray: Coordinates[] = [];

    for (let i = x0 - r; i < x0 + r + this.options.spread; i++){
      for (let j = y0 - r; j < y0 + r + this.options.spread; j++){
        if (j <= i + r && j <= -Math.abs(i) + r && j >= -Math.abs(i) - r && j >= i - r){
          const coords: Coordinates = {x: i, y: j};
          coordsArray.push(coords);
        }
      }
    }
   // return coordsArray;
  }

  // tslint:disable-next-line: max-line-length
  drawAverageColorCircle(x0: number, y0: number, r: number, colorsArray: Uint8ClampedArray, ctx: CanvasRenderingContext2D): Uint8ClampedArray{
    const [coloredPixelsArr, emptyPixelsArray] = this.getCircleColorsCoordinates(x0, y0, r);
    return this.drawAverageColorShape(x0, y0, coloredPixelsArr, emptyPixelsArray, colorsArray, ctx);
  }

  // tslint:disable-next-line: max-line-length
  drawAverageColorShape(x: number, y: number, coloredArray: Coordinates[], uncoloredArray: Coordinates[], colorsArray: Uint8ClampedArray, ctx: CanvasRenderingContext2D): Uint8ClampedArray{
    // const coordsArray = this.getCircleColorsCoordinates(x, y, r);
    let arrayPosition = 0;
    let tR = 0;
    let tG = 0;
    let tB = 0;

    uncoloredArray.forEach(coords => {
      arrayPosition = (coords.x + coords.y * this.options.width) * 4;
      colorsArray[arrayPosition] = 100;
      colorsArray[arrayPosition + 1] = 100;
      colorsArray[arrayPosition + 2] = 100;
    });
    coloredArray.forEach(coords => {
      // colorArray is 4 times larger than number of points, as each point is defined by it red,green, blue, alpha values
      arrayPosition = (coords.x + coords.y * this.options.width) * 4;
      tR += colorsArray[arrayPosition];
      tG += colorsArray[arrayPosition + 1];
      tB += colorsArray[arrayPosition + 2];
    });
    const arrLength = coloredArray.length;
    ctx.fillStyle = `rgb(${tR / arrLength},${tG / arrLength},${tB / arrLength})`;
    coloredArray.forEach(coords => {
      arrayPosition = (coords.x + coords.y * this.options.width) * 4;
      colorsArray[arrayPosition] = tR / arrLength;
      colorsArray[arrayPosition + 1] = tG / arrLength;
      colorsArray[arrayPosition + 2] = tB / arrLength;
    });
    return colorsArray;
  }

  drawAverageColorCircles(ctx: CanvasRenderingContext2D, imageData: ImageData): void{
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, this.options.width, this.options.height);
    for (let i = this.options.size + this.options.spread; i < this.options.width; i += this.options.size * 2 + this.options.spread){
      for (let j = this.options.size + this.options.spread; j < this.options.width; j += this.options.size * 2 + this.options.spread){
        this.drawAverageColorCircle(i, j, this.options.size, imageData.data, ctx);
      }
    }
    ctx.putImageData(imageData, 0, 0);
  }

}

