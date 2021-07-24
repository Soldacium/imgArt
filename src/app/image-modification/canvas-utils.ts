import { Injectable } from '@angular/core';
import { CanvasOptions } from '@shared/models/canvas-options.model';
import { CanvasDotsService } from './canvas-dots.service';

@Injectable({
  providedIn: 'root'
})
export class CanvasUtilsService {
  ctx!: CanvasRenderingContext2D;
  imageFile!: File;
  image!: HTMLImageElement;
  imageData!: ImageData;
  options: CanvasOptions = {
    width: 800,
    height: 600,
    size: 5,
    spread: 0
  };

  animationObjectsSize = 20;

  constructor(
    private canvasDots: CanvasDotsService
    ) {}

  init(canvas: HTMLCanvasElement, width: number, height: number): void{
    this.options.width = canvas.width = width;
    this.options.height = canvas.height = height;
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    this.ctx.fillStyle = '#111111';
    this.ctx.fillRect(0, 0, width, height);
  }

  loadImage(image: File): void {
    this.imageFile = image;
    this.image = new Image();
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = (e) => {
      this.image.src = reader.result as string;
      this.image.onload = (ev) => {
        this.ctx.drawImage(this.image, 0, 0, 800, 600);
        this.imageData = this.ctx.getImageData(0, 0, this.options.width, this.options.height);
      };
    };
  }

  getCanvasColorData(): ImageData {
    // console.log(this.ctx.getImageData(0, 0, this.options.width, this.options.height));
    return this.imageData;
  }

  changeOptions(options: CanvasOptions): void{
    this.options = options;
    this.canvasDots.options = this.options;
  }

  drawAverageColorDots(): void {
    const imageCopy: ImageData = new ImageData(this.imageData.data.slice(0), this.options.width, this.options.height);
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, 800, 600);
    this.canvasDots.drawAverageColorCircles(this.ctx, imageCopy);
  }

  animate(): void {

  }
}
