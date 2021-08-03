import { Directive, ElementRef, HostListener, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appButtonFlat]'
})
export class ButtonFlatDirective implements OnChanges {

  @Input() defaultColor = '#232323';
  @Input() hoverColor = '#333333';
  @Input() activeColor = 'var(--colorAccent1)';
  @Input() inactiveColor = '#232323';
  @Input() fontSize = '1rem';
  @Input() active = false;

  @HostListener('mouseenter') onMouseEnter(): void {
    this.highlight('#ffffff32');
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.highlight(this.defaultColor);
  }

  private highlight(color: string): void {
    this.el.nativeElement.style.backgroundColor = color;
  }

  private changeDefaultColor(): void{
    if (this.active){
      this.defaultColor = this.activeColor;
      this.el.nativeElement.style.backgroundColor = this.defaultColor;
    }else{
      this.defaultColor = this.inactiveColor;
      this.el.nativeElement.style.backgroundColor = this.defaultColor;
    }
  }

  constructor(private el: ElementRef) {
    const buttonStyle = el.nativeElement.style;
    buttonStyle.backgroundColor = this.defaultColor;
    buttonStyle.border = 'none';
    buttonStyle['font-size'] = this.fontSize;
    buttonStyle.padding = '0.5rem 1rem';
    buttonStyle.transition = '0.2s ease background-color';
    buttonStyle.cursor = 'pointer';
    buttonStyle['border-radius'] = '0.5rem';
    
    // buttonStyle.border = '2px dashed var(--colorAccent3)';
    buttonStyle.color = 'white';

  }

  ngOnChanges(changes: SimpleChanges): void{
    if(changes.active){
      this.changeDefaultColor();
    }
  }
}
