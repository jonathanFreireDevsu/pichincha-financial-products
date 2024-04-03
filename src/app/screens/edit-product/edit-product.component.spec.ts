import { TestBed } from '@angular/core/testing';
import { mockDeclarations } from '../../utils/mock-declarations';
import { EditProductComponent } from './edit-product.component';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule(mockDeclarations));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(EditProductComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
