# ngx-material-cascader
Angular material cascader component
![example](https://github.com/petkit-io/assets/blob/master/ngx-material-cascader.gif)

# Installation

```bash
npm install --save @petkit/ngx-material-cascader
```

# Usage

## Import Module

```ts
import { MatCascaderModule } from '@petkit/ngx-material-cascader';

@NgModule({
  imports: [
    MatCascaderModule,
  ],
}
```

## Simple

```html
<ngx-mat-cascader
  placeholder="Select"
  [data]="data"
  [(value)]="value"
></ngx-mat-cascader>
```

```ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-mat-cascader-simple',
  templateUrl: './mat-cascader-simple.component.html',
  styleUrls: ['./mat-cascader-simple.component.scss']
})
export class MatCascaderSimpleComponent implements OnInit {
  data = [{
    value: 1,
    text: 'one',
    children: [{
      value: 11,
      text: 'one one',
    }, {
      value: 12,
      text: 'one two'
    }]
  }, {
    value: 2,
    text: 'two',
  }];
  value: number[] = [];

  constructor() { }

  ngOnInit() {
  }
}
```

# License
MIT

