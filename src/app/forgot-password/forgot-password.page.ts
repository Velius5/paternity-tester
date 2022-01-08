import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  resetPasswordLinkSent: boolean;
  form: FormGroup;

  constructor(public authService: AuthenticationService) {
    this.resetPasswordLinkSent = false;
    this.form = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required])
    });
  }

  ngOnInit() {

  }

  send() {
    if(!this.form.invalid) {
      this.authService.PasswordRecover(this.form.get('email').value)
        .then((res) => {
          this.resetPasswordLinkSent = true;
        }).catch((error) => {
        window.alert('Cannot reset password for given e-mail address.');
      });
    }
  }

}
