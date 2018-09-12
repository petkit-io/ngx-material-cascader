import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// material
import {
  MatMenuModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
} from '@angular/material';

import { MatCascaderComponent } from './mat-cascader.component';

@NgModule({
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  declarations: [
    MatCascaderComponent
  ],
  exports: [
    MatCascaderComponent,
  ],
})
export class MatCascaderModule { }
