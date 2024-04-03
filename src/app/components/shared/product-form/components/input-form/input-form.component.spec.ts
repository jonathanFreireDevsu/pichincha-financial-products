import { TestBed } from '@angular/core/testing';
import { mockDeclarations } from '../../../../../utils/mock-declarations';
import { InputFormComponent } from './input-form.component';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule(mockDeclarations));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(InputFormComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
