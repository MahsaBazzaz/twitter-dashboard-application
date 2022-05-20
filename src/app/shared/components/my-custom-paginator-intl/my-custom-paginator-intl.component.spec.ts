import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCustomPaginatorIntlComponent } from './my-custom-paginator-intl.component';

describe('MyCustomPaginatorIntlComponent', () => {
  let component: MyCustomPaginatorIntlComponent;
  let fixture: ComponentFixture<MyCustomPaginatorIntlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCustomPaginatorIntlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCustomPaginatorIntlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
