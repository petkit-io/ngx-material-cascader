import { ControlValueAccessor } from '@angular/forms';
import { Subject } from 'rxjs';

export class NgModelBase implements ControlValueAccessor {
  public propagateChange = (v: any) => {};
  public _innerValue: any;
  public _innerValue$: Subject<any> = new Subject();

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

  registerOnTouched(fn: any) {}
}
