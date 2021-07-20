import { Component, OnInit } from '@angular/core';
import { CanvasUtilsService } from './canvas-utils';

@Component({
  selector: 'app-image-modification',
  templateUrl: './image-modification.component.html',
  styleUrls: ['./image-modification.component.scss']
})
export class ImageModificationComponent implements OnInit {

  file: File | undefined;
  canvas!: HTMLCanvasElement;
  constructor(private canvasUtils: CanvasUtilsService) { }

  ngOnInit(): void {

  }

  initBaseCanvas(): void{
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
    console.log(this.canvas);
    this.canvasUtils.init(this.canvas, 800, 600);
  }

  getFile(file: File): void{
    console.log(file);
    this.file = file;
    this.initBaseCanvas();
    this.canvasUtils.loadImage(file);
  }

  makeDotsStyle(): void {
    this.canvasUtils.getCanvasColorData();
  }


}
