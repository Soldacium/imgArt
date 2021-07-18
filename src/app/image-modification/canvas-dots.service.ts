import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CanvasDotsService {
  ctx!: CanvasRenderingContext2D;


  animationObjectsSize = 20;

  constructor() { }

  init(canvas: HTMLCanvasElement, width: number, height: number){
    canvas.height = height;
    canvas.width = width;
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  }

  animate(){

  }
}
