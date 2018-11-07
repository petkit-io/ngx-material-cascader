import { ControlValueAccessor } from '@angular/forms';
import { Subject } from 'rxjs';

export class NgModelBase implements ControlValueAccessor {
  public _innerValue: any[] = [];
  public _innerValue$: Subject<any> = new Subject();

  public propagateChange: (v: any) => void = (v: any) => v;

  set value(v: any) {
    if (v !== this._innerValue) {
      this._innerValue = v;
      this.propagateChange(v);
    }
  }

  get value(): any {
    return this._innerValue;
  }

  writeValue(v: any) {
    if (v !== this._innerValue) {
      this._innerValue = v;
      this._innerValue$.next(v);
    }
  }

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}
}
