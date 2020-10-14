import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { AuthService } from '../auth/auth.service';
import { AuthServiceMockFactory } from '../auth/auth.service.mock';
import { Spied } from '../testing/spied';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let submitButtonDebugElement: DebugElement;
  let authService: Spied<AuthService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
      ],
      providers: [
        FormBuilder,
        {provide: AuthService, useFactory: AuthServiceMockFactory}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    authService = TestBed.get(AuthService);
    authService.login.and.returnValue(of({accessToken: 'test'}));
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    submitButtonDebugElement = fixture.debugElement.query(By.css('button'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should build the form', () => {
    component.ngOnInit();
    expect(component.form).toBeDefined();
  });

  describe('submit', () => {
    it('should disable submit by default', () => {
      expect(submitButtonDebugElement.nativeElement.attributes.disabled).toBeTruthy();
    });

    it('should disable submit if form invalid', () => {
      const fakeCredentials = {email: '', password: 'test'};
      component.form.setValue(fakeCredentials);
      fixture.detectChanges();

      expect(submitButtonDebugElement.nativeElement.attributes.disabled).toBeTruthy();
    });

    it('should enable submit if form valid', fakeAsync(() => {
      const fakeCredentials = {email: 'test@test.com', password: 'test'};
      component.form.setValue(fakeCredentials);
      tick();
      fixture.detectChanges();

      expect(submitButtonDebugElement.nativeElement.attributes.disabled).toBeFalsy();
    }));

    it('should try to log a user on submit clicked', () => {
      const fakeCredentials = {email: 'test', password: 'test'};
      component.form.setValue(fakeCredentials);
      fixture.detectChanges();

      submitButtonDebugElement.triggerEventHandler('click', null);

      expect(authService.login).toHaveBeenCalledWith(fakeCredentials);
    });
  });

  describe('login', () => {
    const fakeCredentials = {email: 'test', password: 'test'};

    beforeEach(() => {
      component.form.setValue(fakeCredentials);
      fixture.detectChanges();
    });

    it('should redirect to transactions page on login success', () => {
      const router = TestBed.inject(Router);
      const routerSpy = spyOn(router, 'navigateByUrl');

      submitButtonDebugElement.triggerEventHandler('click', null);

      expect(routerSpy).toHaveBeenCalledWith('');
    });

    it('should hide the error message until login failed', () => {
      const errorMessage = fixture.debugElement.query(By.css('.login__error-message'));

      expect(errorMessage).toBeFalsy();
    });

    it('should show an error message on login failed', () => {
      authService.login.and.returnValue(throwError(new Error()));

      submitButtonDebugElement.triggerEventHandler('click', null);
      fixture.detectChanges();
      const errorMessage = fixture.debugElement.query(By.css('.login__error-message'));

      expect(errorMessage).toBeTruthy();
    });

  });

});
