import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-choose-shape',
  templateUrl: './choose-shape.component.html',
  styleUrls: ['./choose-shape.component.scss']
})
export class ChooseShapeComponent implements OnInit {

  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;

  constructor() { }

  ngOnInit(): void {
  }

  initCanvas(): void {
    this.canvas = document.getElementById("shape") as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
  }

}
