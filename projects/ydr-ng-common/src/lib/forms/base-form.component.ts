import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

/**
 * A base class for form components
 */
@Component({
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseFormComponent implements OnInit, OnDestroy {
  /**
   * Emits the formgroup when its ready to be used. Useful for tracking the
   * changes and validity of the form from outside of the component.
   */
  @Output() formReady: EventEmitter<FormGroup> = new EventEmitter();
  
  @Output() formSubmitted: EventEmitter<FormGroup> = new EventEmitter();

  /**
   * The reactive form
   */
  form: FormGroup;

  /**
   * The group to create the form from
   */
  group: { [key: string]: AbstractControl | number | string | boolean };

  /**
   * When false the tracking of the status changes ends.
   */
  protected subscriptionActive = true;

  /**
   * Subject called on ngOnDestroy, useful to use along with takeUntil to cancel HttpRequest
   * @protected
   */
  protected ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(protected readonly changeDetector: ChangeDetectorRef, protected readonly formBuilder: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
  }

  ngOnDestroy() {
    this.subscriptionActive = false;
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  /**
   * Creates the form from the property group
   */
  private buildForm() {
    this.form = this.formBuilder.group(this.group);

    this.formReady.emit(this.form);

    this.form.statusChanges.pipe(takeWhile(() => this.subscriptionActive)).subscribe(() => {
      this.changeDetector.detectChanges();
    });
  }
}
