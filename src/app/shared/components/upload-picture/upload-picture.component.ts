import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-picture',
  templateUrl: './upload-picture.component.html',
  styleUrls: ['./upload-picture.component.scss']
})
export class UploadPictureComponent implements OnInit {

  isDraggedOver = false;
  file!: File;
  filePath: any;
  fileUrl: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  dropHandler(event: DragEvent): void{
    event.preventDefault();
    if(event.dataTransfer !== null){
      this.file = event.dataTransfer.files[0];
      return;
    }
  }

  dragOverHandler(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.isDraggedOver = true; 
  }

  dragLeaveHandler(event: Event){
    event.preventDefault();
    event.stopPropagation();
    this.isDraggedOver = false;
  }

  pickFileHandler(){
    const fileInputElement = document.getElementById("file-input") as HTMLInputElement;
    fileInputElement.click();
  }

  pickImage(files: FileList | null) {

    if (!files) { return; }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) { return; }

    const reader = new FileReader();
    this.file = files[0];
    this.filePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.fileUrl = reader.result as string;
    };
  }
}
