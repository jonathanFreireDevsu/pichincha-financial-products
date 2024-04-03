import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor  } from '@angular/forms';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFormComponent),
      multi: true
    }
  ]
})
export class InputFormComponent implements ControlValueAccessor {
  constructor () {

  }

  @Input() title: string = '';
  @Input() errorMessage: string = '';
  @Input() type: string | undefined= 'text';
  @Input() disabled: boolean | undefined = false;

  
  value: string = '';
  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any): void {
    this.value = value;
    this.onChange(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  updateValue(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    this.value = value || '';
    
    this.onChange(value);
  }

  onBlur() {
    this.onTouched();
  }
}
