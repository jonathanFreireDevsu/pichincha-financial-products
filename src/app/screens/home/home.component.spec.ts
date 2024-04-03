import { TestBed } from '@angular/core/testing';
import { mockDeclarations } from '../../utils/mock-declarations';
import { HomeComponent } from './home.component';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule(mockDeclarations));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
