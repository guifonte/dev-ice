import { Directive, AfterViewInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[devIceIsEllipsis]',
})
export class EllipsisDirective implements AfterViewInit {
  constructor(private elementRef: ElementRef) {}
  ngAfterViewInit(): void {
    setTimeout(() => {
      const element = this.elementRef.nativeElement;
      if (element.offsetWidth < element.scrollWidth) {
        element.title = element.innerHTML;
      }
    }, 1000);
  }
}
