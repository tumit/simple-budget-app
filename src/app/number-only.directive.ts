import {
  Directive,
  ElementRef,
  HostListener,
  Renderer2,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

// providers is make NumberOnlyDirective class to be numberOnly directive
// and need to implements ControlValueAccessor for ReactiveForm Style
@Directive({
  selector: '[numberOnly]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumberOnlyDirective),
      multi: true,
    },
  ],
})
export class NumberOnlyDirective implements ControlValueAccessor {
  private onChange = (_: number | null) => {};
  private onTouched = () => {};
  private value = '';

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  // ControlValueAccessor Interface
  // need 4 methods
  // - registerOnChange for on change input value ex. formControl.valueChange.subscribe(...)
  // - registerOnTouched for make touched property ex. formControl.touched
  // - setDisabledState for disable formControl ex. formControl.disable()
  // - writeValue for init/set value ex. new FormControl(0)
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.renderer.setProperty(
      this.elementRef.nativeElement,
      'disabled',
      isDisabled
    );
  }

  writeValue(value: any): void {
    value = value ? String(value) : '';
    this.setValueProperty(value, false);
  }

  // Dom listener
  // make listening interact with input
  // we focus on 2 events
  // - input => when input change
  // - blur => when enter to input & out of input
  @HostListener('input', ['$event.target.value'])
  changeByInput(value: string): void {
    this.setValueProperty(value.replace(/[^0-9]*/g, ''), this.value !== value);
  }

  @HostListener('blur')
  onBlur(): void {
    this.onTouched();
  }

  // use render to set attr.value of <input>
  // with filtered value
  // and check isChanged or not for tick onChange
  // then keep new value for check next change
  private setValueProperty(value: string, isChanged: boolean): void {
    this.renderer.setProperty(this.elementRef.nativeElement, 'value', value);

    if (isChanged) {
      this.onChange(value ? Number(value) : null);
    }

    this.value = value;
  }
}
