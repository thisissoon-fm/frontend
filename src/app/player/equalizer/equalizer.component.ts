import { Component, Input, AfterViewInit, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'sfm-equalizer',
  templateUrl: './equalizer.component.html',
  styleUrls: ['./equalizer.component.scss']
})
export class EqualizerComponent implements AfterViewInit {
  /**
   * Number of equalizer bars and also determines
   * the width of the component
   *
   * @type {number}
   * @memberof EqualizerComponent
   */
  public width = 300;
  /**
   * Create an array to iterate over
   *
   * @type {number[]}
   * @memberof EqualizerComponent
   */
  public items: number[] = [];
  /**
   * Whether the animation should be playing
   *
   * @type {boolean}
   * @memberof EqualizerComponent
   */
  @Input('playing')
  public playing = true;
  /**
   * Creates an instance of EqualizerComponent.
   * @param {ElementRef} el
   * @memberof EqualizerComponent
   */
  constructor(private el: ElementRef) { }
  /**
   * Create array and assign random height to each item one
   *
   * @memberof EqualizerComponent
   */
  public ngAfterViewInit(): void {
    this.width = (<HTMLElement>this.el.nativeElement).offsetWidth;
    for (let i = 0; i < this.width; i++) {
      this.items.push(Math.random());
    }
  }
}
