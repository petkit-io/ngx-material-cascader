import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatCascaderComponent } from './mat-cascader.component';

describe('MatCascaderComponent', () => {
  let component: MatCascaderComponent;
  let fixture: ComponentFixture<MatCascaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatCascaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatCascaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
