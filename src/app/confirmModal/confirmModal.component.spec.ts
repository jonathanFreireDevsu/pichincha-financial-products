import { TestBed } from '@angular/core/testing';
import { mockDeclarations } from './../utils/mockDeclarations';
import { ConfirmModalComponent } from './confirmModal.component';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule(mockDeclarations));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(ConfirmModalComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
