import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  public form: FormGroup = this.formBuilder.group({
    email: ['test1@gmail.com', [Validators.required, Validators.email]],
    password: ['12345', [Validators.required, Validators.minLength(5)]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  login(): void {
    console.log(this.form.value);
    const { email, password } = this.form.value;
    if (email && password) {
      this.authService.login(email, password).subscribe({
        next: (resp) => {
          if (resp) {
            this.router.navigateByUrl('/dashboard');
          } else {
            // TODO: Show error message
          }
        },
      });
    }
  }
}
