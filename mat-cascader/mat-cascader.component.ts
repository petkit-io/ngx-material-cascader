import {
  Component,
  OnInit,
  OnChanges,
  AfterViewInit,
  Input,
  Output,
  EventEmitter,
  QueryList,
  ViewChildren,
  ElementRef,
} from '@angular/core';
import {
  IMatCascader,
  IMatCascaderView,
  IMatCascaderContainer,
} from './mat-cascader.interface';
import {
  MatCascaderService,
} from './mat-cascader.service';
import {
  MatMenuTrigger,
  MatMenu,
} from '@angular/material';

@Component({
  selector: 'ngx-mat-cascader',
  templateUrl: './mat-cascader.component.html',
  styleUrls: ['./mat-cascader.component.scss']
})
export class MatCascaderComponent implements OnInit, AfterViewInit, OnChanges {
  @Input()
  data: IMatCascader[] = [];
  @Input()
  onlyLeaf = true;

  private _value: (string | number)[] = [];
  @Input()
  get value() {
    return this._value;
  }
  set value(nV) {
    if (this._value !== nV) {
      this._value = nV;
      this.valueChange.emit(nV);
    }
  }
  @Output()
  valueChange = new EventEmitter<(string | number)[]>();

  @Input()
  placeholder = '';

  @Input()
  separate = ' / ';

  valueText = '';


  @ViewChildren(MatMenu)
  matMenus: QueryList<MatMenu>;
  matMenuContainers: IMatCascaderContainer[] = [];
  root: MatMenu | null;

  constructor(
    private _matCascaderService: MatCascaderService,
  ) { }

  ngOnInit() {
    this._initContainers();
  }

  ngAfterViewInit() {
    this._initRefs();
  }

  ngOnChanges(changes) {
    const {
      data,
    } = changes;

    if (data && !data.firstChange) {
      const {
        currentValue,
      } = data;

      console.log(data);
      this.root = null;
      this._initContainers();
      setTimeout(() => {
        this._initRefs();
      });
    }
  }

  private _initContainers() {
    this.matMenuContainers = this._flatten(this.data);
    this._setValueTextByValue(this.value);
  }

  private _initRefs() {
    console.log(this.matMenuContainers);
    console.log(this.matMenus);

    this.matMenuContainers.forEach(item => {
      const el = this.matMenus.find((menu => (menu['_elementRef'] as ElementRef).nativeElement.id === item.id)) as MatMenu;

      console.log(item.parent, el);

      setTimeout(() => {
        if (item.parent === null) {
          this.root = el;
        } else {
          item.parent.childRef = el;
        }
      });
    });
  }

  onMenuItemClick(menu: IMatCascaderView): void {
    if (this.onlyLeaf) {
      this._setValueOfLeaf(menu);
    } else {
      this._setValueOfPath(menu);
    }
  }

  private _setValueOfLeaf(menu: IMatCascaderView): void {
    if (menu.children !== undefined) {
      return;
    }

    this._setValueOfPath(menu);
  }

  private _setValueOfPath(menu: IMatCascaderView): void {
    this.value = this._getValueByMenu(menu);
    this.valueText = this._getValueTextByMenu(menu);
  }

  private _setValueTextByValue(value: (string | number)[]): void {
    value = value || this.value;

    const text = this._getTextByValue(this.data, value);

    this.valueText = this._getValueTextByTexts(text);
  }

  private _getTextByValue(data: IMatCascader[], value: (string | number)[]): string[] {
    const [curr, ...rest] = value;

    if (!curr) {
      return [];
    }

    const node = data.find(item => item.value === curr) as IMatCascader;

    let result: string[] = [];
    result.push(node.text);

    if (rest && node.children) {
      result = result.concat(this._getTextByValue(node.children, rest));
    }

    return result;
  }

  private _getValueByMenu(menu: IMatCascaderView): (string | number)[] {
    let _value: (string | number)[] = [];
    _value.push(menu.value);

    if (menu.container !== undefined && menu.container.parent !== null) {
      _value = _value.concat(this._getValueByMenu(menu.container.parent));
    }

    return _value.reverse();
  }

  private _getValueTextByMenu(menu: IMatCascaderView): string {
    let _text: string[] = [];
    _text.push(menu.text);

    if (menu.container !== undefined && menu.container.parent !== null) {
      _text = _text.concat(this._getValueTextByMenu(menu.container.parent));
    }

    return this._getValueTextByTexts(_text.reverse());
  }

  private _getValueTextByTexts(texts: string[]): string {
    return texts.join(this.separate);
  }

  private _flatten(before: IMatCascaderView[] = [], parent: IMatCascaderView | null = null): IMatCascaderContainer[] {
    let after: IMatCascaderContainer[] = [];

    const menu: IMatCascaderContainer = {
      id: this._matCascaderService.id,
      menus: before,
      parent,
    };

    after.push(menu);

    before.forEach(view => {
      view.container = menu;

      if (view.children && Object.prototype.toString.call(view.children) === '[object Array]') {
        after = after.concat(this._flatten(view.children, view));
      }
    });

    return after;
  }
}
