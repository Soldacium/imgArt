import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-upload-picture',
  templateUrl: './upload-picture.component.html',
  styleUrls: ['./upload-picture.component.scss']
})
export class UploadPictureComponent implements OnInit {

  isDraggedOver = false;
  file!: File;
  filePath: any;
  fileUrl = '';

  @Output()
  fileChange = new EventEmitter<File>();

  constructor() { }

  ngOnInit(): void {
  }

  dropHandler(event: DragEvent): void {
    event.preventDefault();
    this.pickFile(event.dataTransfer?.files as FileList);
  }

  dragOverHandler(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDraggedOver = true;
  }

  dragLeaveHandler(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDraggedOver = false;
  }

  pickFileHandler(): void {
    const fileInputElement = document.getElementById('file-input') as HTMLInputElement;
    fileInputElement.click();
  }

  pickFile(files: FileList | null): void {

    if (!files) { return; }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) { return; }

    const reader = new FileReader();
    this.file = files[0];
    this.filePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (event) => {
      this.fileUrl = reader.result as string;
    };

    this.fileChange.emit(this.file);
  }
}
