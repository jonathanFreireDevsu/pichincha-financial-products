import { TestBed } from '@angular/core/testing';
import { mockDeclarations } from '../../utils/mockDeclarations';
import { EditProductScreenComponent } from './edit-product-screen.component';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule(mockDeclarations));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(EditProductScreenComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
