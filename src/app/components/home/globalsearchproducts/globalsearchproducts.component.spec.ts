import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalsearchproductsComponent } from './globalsearchproducts.component';

describe('GlobalsearchproductsComponent', () => {
  let component: GlobalsearchproductsComponent;
  let fixture: ComponentFixture<GlobalsearchproductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalsearchproductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalsearchproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
