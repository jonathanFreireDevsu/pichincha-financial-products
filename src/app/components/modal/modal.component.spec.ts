import { TestBed } from '@angular/core/testing';
import { mockDeclarations } from '../../utils/mockDeclarations';
import { ModalComponent } from './modal.component';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule(mockDeclarations));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(ModalComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
