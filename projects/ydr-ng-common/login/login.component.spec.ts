import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { AuthFacade, AuthFacadeMockFactory, AuthFacadeMock } from 'ydr-ng-common/auth';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let submitButtonDebugElement: DebugElement;
  let authFacade: AuthFacadeMock;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'dashboard',
            redirectTo: ''
          }
        ]),
        ReactiveFormsModule,
      ],
      providers: [
        FormBuilder,
        {provide: AuthFacade, useFactory: AuthFacadeMockFactory},

      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    authFacade = TestBed.get(AuthFacade);
    authFacade.login.and.returnValue(of({accessToken: 'test'}));
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

      expect(authFacade.login).toHaveBeenCalledWith(fakeCredentials);
    });
  });

  describe('login', () => {
    const fakeCredentials = {email: 'test', password: 'test'};

    beforeEach(() => {
      component.form.setValue(fakeCredentials);
      fixture.detectChanges();
    });

    it('should redirect to transactions page on login success', fakeAsync(() => {
      const router = TestBed.inject(Router);
      const routerSpy = spyOn(router, 'navigateByUrl');

      submitButtonDebugElement.triggerEventHandler('click', null);
      authFacade.changeToken('test');
      
      expect(routerSpy).toHaveBeenCalledWith('dashboard');
    }));

    it('should hide the error message until login failed', () => {
      const errorMessage = fixture.debugElement.query(By.css('.login__error-message'));

      expect(errorMessage).toBeFalsy();
    });

    it('should show an error message on login failed', fakeAsync(() => {
      authFacade.sendLoginError();
      tick();
      fixture.detectChanges();
      const errorMessage = fixture.debugElement.query(By.css('.login__error-message'));

      expect(errorMessage).toBeTruthy();
    }));

  });

});
