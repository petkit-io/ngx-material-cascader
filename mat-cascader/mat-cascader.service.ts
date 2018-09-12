import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatCascaderService {
  static _id = 0;

  constructor() { }

  get id() {
    return `mat-cascader-${MatCascaderService._id++}`;
  }
}
