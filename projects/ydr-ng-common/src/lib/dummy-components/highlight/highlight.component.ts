import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'lib-highlight',
  templateUrl: './highlight.component.html',
  styleUrls: ['./highlight.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HighlightComponent {

  spritePath = 'assets/sprite.svg';

  iconPrefix = '#icon-';

  @Input() iconName: string;
  @Input() heading: string;
  @Input() text: string;

    
  constructor() {}

}