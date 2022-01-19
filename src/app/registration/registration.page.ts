import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})

export class RegistrationPage implements OnInit {
  form: FormGroup;

  constructor(
    public authService: AuthenticationService,
    public router: Router
  ) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(){}

  send() {
    if(!this.form.invalid) {
      this.authService.signup(this.form.get('email').value, this.form.get('password').value)
        .then(() => {
          // this.authService.sendVerificationMail();
          // this.router.navigate(['verify-email']);

          this.authService.login(this.form.get('email').value, this.form.get('password').value)
            .then(() => {
              this.router.navigate(['tutorial']);
            }).catch((error) => {
            window.alert(error.message);
          });

        }).catch((err) => {
        switch(err.code) {
          case 'auth/invalid-email':
            window.alert('Invalid email address');
            break;
          case 'auth/weak-password':
            window.alert('Password should have at least 6 characters');
            break;
          default:
            console.log(JSON.stringify(err));
            window.alert(err);
        }
      });
    }
  }

}
