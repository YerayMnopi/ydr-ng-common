import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { takeWhile, filter } from 'rxjs/operators';
import { AuthFacade } from 'ydr-ng-common/auth';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy {

  /**
   * Enables/disables the submit button
   */
  allowSubmit = false;

  /**
   * The login form group
   */
  form!: FormGroup;

  /**
   * Useful for showing an error message
   */
  loginFailed = false;

  /**
   * When false the tracking of the status changes ends.
   */
  private subscriptionActive = true;

  constructor(
    private readonly authFacade: AuthFacade,
    private readonly changeDetector: ChangeDetectorRef,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.onLoginSuccess();
    this.onLoginError();
  }

  ngOnDestroy() {
    this.subscriptionActive = false;

  }

  /**
   * Log with the form data
   */
  login() {
    this.loginFailed = false;

    this.authFacade.login(this.form.value);
  }

  private onLoginSuccess() {
    this.authFacade.token.pipe(
      takeWhile(() => this.subscriptionActive),
      filter(token => !!token)
    ).subscribe(
      token => this.router.navigateByUrl(this.activatedRoute.snapshot.data['redirectTo'] || 'dashboard')
    );
  }

  private onLoginError() {
    this.authFacade.loginError.pipe(
      takeWhile(() => this.subscriptionActive),
    ).subscribe(
      error => {
        this.loginFailed = true;
        this.changeDetector.detectChanges();
      }
    );
  }

  /**
   * Creates the form
   */
  private buildForm() {
    const loginPayload = {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    };
    this.form = this.formBuilder.group(loginPayload);

    this.form.statusChanges.pipe(takeWhile(() => this.subscriptionActive)).subscribe(() => {
      this.allowSubmit = this.form.valid;
      this.changeDetector.detectChanges();
    });
  }
}
