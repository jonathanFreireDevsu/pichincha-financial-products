import { TestBed } from '@angular/core/testing';
import { mockDeclarations } from '../../utils/mock-declarations';
import { AddProductComponent } from './add-product.component';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule(mockDeclarations));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AddProductComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
