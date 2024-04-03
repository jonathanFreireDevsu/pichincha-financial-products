import { TestBed } from '@angular/core/testing';
import { mockDeclarations } from '../../../utils/mock-declarations';
import { ProductFormComponent } from './product-form.component';

describe('Product form component', () => {
  beforeEach(() => TestBed.configureTestingModule(mockDeclarations));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(ProductFormComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
