import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicmodalComponent } from './basicmodal.component';

describe('BasicmodalComponent', () => {
  let component: BasicmodalComponent;
  let fixture: ComponentFixture<BasicmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
