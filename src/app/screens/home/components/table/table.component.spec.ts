import { TestBed } from '@angular/core/testing';
import { mockDeclarations } from 'src/app/utils/mock-declarations';
import { TableComponent } from './table.component';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule(mockDeclarations));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(TableComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
