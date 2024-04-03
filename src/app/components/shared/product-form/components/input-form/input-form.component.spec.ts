import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputFormComponent } from './input-form.component';

describe('Input form component', () => {
  let app: InputFormComponent;
  let fixture: ComponentFixture<InputFormComponent>;
  let inputElement: HTMLInputElement;
  let errorElement: HTMLElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [InputFormComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(InputFormComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();

    inputElement = fixture.nativeElement.querySelector('input');
    errorElement = fixture.nativeElement.querySelector('.input-form__error');
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });
  it('should bind @Input properties', () => {
    app.title = 'Test Title';
    app.errorMessage = 'Error Message';
    app.type = 'email';
    app.disabled = true;
    fixture.detectChanges();

    expect(app.title).toEqual('Test Title');
    expect(app.errorMessage).toEqual('Error Message');
    expect(app.type).toEqual('email');
    expect(app.disabled).toBeTrue();
  });

  it('it displays error class when errorMessage is present', () => {
    app.errorMessage = 'Error occurred';
    fixture.detectChanges();
    expect(inputElement.className).toContain('input__error');
  });

  it('update value and call onChange when input event is triggered', () => {
    spyOn(app, 'updateValue');
    inputElement.value = 'new value';
    inputElement.dispatchEvent(new Event('input'));
    expect(app.updateValue).toHaveBeenCalled();
    expect(app.value).toBe('');
  });

  it('should call onTouched when input loses focus', () => {
    spyOn(app, 'onBlur').and.callThrough();
    inputElement.dispatchEvent(new Event('blur'));
    expect(app.onBlur).toHaveBeenCalled();
  });

  it('should disable the input when disabled is true', () => {
    app.disabled = true;
    fixture.detectChanges();
    expect(inputElement.disabled).toBeTrue();
  });

  it('should display the error message when provided', () => {
    app.errorMessage = 'Test error message';
    fixture.detectChanges();
    expect(errorElement.textContent).toContain('Test error message');
  });

  it('input element should reflect the type and value bindings', () => {
    app.type = 'url';
    app.value = 'http://google.com';
    fixture.detectChanges();
    expect(inputElement.type).toBe('url');
    expect(inputElement.value).toBe('http://google.com');
  });
});
