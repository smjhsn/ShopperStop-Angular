import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductInsertComponent } from './admin-product-insert.component';

describe('AdminProductInsertComponent', () => {
  let component: AdminProductInsertComponent;
  let fixture: ComponentFixture<AdminProductInsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProductInsertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProductInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
