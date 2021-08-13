import { OnInit, Component, Input, Output, EventEmitter, ElementRef, Renderer2, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'lib-section',
  templateUrl: './section.component.html',
  styleUrls: ['section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'role': 'section'
  }
})
export class SectionComponent implements OnInit {
  @Input() imageAuthor: string;
  @Input() heading: string;
  @Input() subheading: string;
  @Input() buttonText: string;
  @Output() buttonClicked = new EventEmitter<void>();

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) { }

  ngOnInit() {
  }

  emitButtonClicked() {
    this.buttonClicked.emit();
  }

  @Input() set backgroundImage (backgroundImage: string) {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'background-image',
      'url('+ backgroundImage + ')'
    );
  }

}
