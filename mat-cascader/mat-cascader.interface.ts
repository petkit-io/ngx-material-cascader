import {
  MatMenu,
} from '@angular/material';
import {
  ElementRef,
} from '@angular/core';

export interface IMatCascader {
  value: string | number;
  text: string;
  children?: IMatCascader[];
}

export interface IMatCascaderView extends IMatCascader {
  childRef?: MatMenu;
  container?: IMatCascaderContainer;
}

export interface IMatCascaderContainer {
  id: string;
  parent: IMatCascaderView | null;
  menus: IMatCascaderView[];
}


