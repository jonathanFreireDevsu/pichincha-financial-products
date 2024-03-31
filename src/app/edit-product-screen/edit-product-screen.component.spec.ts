import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductScreenComponent } from './edit-product-screen.component';

describe('EditProductScreenComponent', () => {
  let component: EditProductScreenComponent;
  let fixture: ComponentFixture<EditProductScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditProductScreenComponent]
    });
    fixture = TestBed.createComponent(EditProductScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
