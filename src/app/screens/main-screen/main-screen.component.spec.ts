import { TestBed } from '@angular/core/testing';
import { mockDeclarations } from '../../utils/mockDeclarations';
import { MainScreenComponent } from './main-screen.component';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule(mockDeclarations));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(MainScreenComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
