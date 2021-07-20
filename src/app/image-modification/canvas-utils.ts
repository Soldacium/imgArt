import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CanvasUtilsService {
  ctx!: CanvasRenderingContext2D;
  imageFile!: File;
  image!: HTMLImageElement;
  cWidth = 800;
  cHeight = 600;


  animationObjectsSize = 20;

  constructor() { }

  init(canvas: HTMLCanvasElement, width: number, height: number): void{
    this.cWidth = canvas.width = width;
    this.cHeight = canvas.height = height;
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    this.ctx.fillStyle = '#111111';
    this.ctx.fillRect(0, 0, width, height);
  }

  loadImage(image: File): HTMLImageElement {
    this.imageFile = image;
    this.image = new Image();
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = (e) => {
      this.image.src = reader.result as string;
      this.ctx.drawImage(this.image, 0, 0, 800, 600);
    };
    return this.image;
  }

  getCanvasColorData(): Uint8ClampedArray {
    console.log(this.ctx.getImageData(0, 0, this.cWidth, this.cHeight).data);
    return this.ctx.getImageData(0, 0, this.cWidth, this.cHeight).data;
  }

  animate(): void {

  }
}
