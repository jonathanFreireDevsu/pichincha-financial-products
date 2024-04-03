import { TestBed } from '@angular/core/testing';
import { mockDeclarations } from '../../utils/mockDeclarations';
import { AddProductScreenComponent } from './add-product-screen.component';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule(mockDeclarations));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AddProductScreenComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
