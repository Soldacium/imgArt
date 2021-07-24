import { Component, OnInit } from '@angular/core';
import { CanvasDotsService } from './canvas-dots.service';
import { CanvasUtilsService } from './canvas-utils';

@Component({
  selector: 'app-image-modification',
  templateUrl: './image-modification.component.html',
  styleUrls: ['./image-modification.component.scss']
})
export class ImageModificationComponent implements OnInit {

  file: File | undefined;
  canvas!: HTMLCanvasElement;
  constructor(
    private canvasUtils: CanvasUtilsService

    ) { }

  ngOnInit(): void {

  }

  initBaseCanvas(): void{
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
    this.canvasUtils.init(this.canvas, 800, 600);
  }

  async getFile(file: File): Promise<void>{
    this.file = file;
    this.initBaseCanvas();
    this.canvasUtils.loadImage(file);
  }

  makeDotsStyle(): void {
    this.canvasUtils.drawDots();
  }

  drawGrayscaleDots(): void{
    this.canvasUtils.drawAverageColorDots();
  }




}
