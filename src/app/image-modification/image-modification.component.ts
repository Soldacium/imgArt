import { Component, OnInit } from '@angular/core';
import { CanvasOptions } from '@shared/models/canvas-options.model';
import { CanvasUtilsService } from './canvas-utils';

@Component({
  selector: 'app-image-modification',
  templateUrl: './image-modification.component.html',
  styleUrls: ['./image-modification.component.scss']
})
export class ImageModificationComponent implements OnInit {

  file: File | undefined;
  canvas!: HTMLCanvasElement;
  buttons: Mode[] = ['dots', 'rhombs', 'normal'];
  mode: Mode = 'rhombs';
  options: CanvasOptions = {
    width: 800,
    height: 600,
    size: 5,
    spread: 0
  };

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

  changeOptions(){
    this.canvasUtils.changeOptions(this.options);
  }

  pickMode(mode: Mode): void{
    this.mode = mode;
  }

  draw(){
    switch (this.mode) {
      case 'dots':
        this.canvasUtils.drawAverageColorDots();
        break;
      case 'rhombs':
        this.canvasUtils.drawAverageColorRhombuses();
        break;
      default:
        break;
    }
  }
}

export type Mode = 'dots' | 'normal' | 'rhombs' ;
