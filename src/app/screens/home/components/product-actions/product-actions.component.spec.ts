import { TestBed } from '@angular/core/testing';
import { ProductActionsComponent } from './product-actions.component';
import { mockDeclarations } from 'src/app/utils/mock-declarations';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule(mockDeclarations));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(ProductActionsComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
