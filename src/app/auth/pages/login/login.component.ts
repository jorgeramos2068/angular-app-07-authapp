import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
    const { email, password } = this.form.value;
    if (email && password) {
      this.authService.login(email, password).subscribe({
        next: (resp) => {
          if (resp === true) {
            this.router.navigateByUrl('/dashboard');
          } else {
            Swal.fire(
              'Error',
              'There is an error with your credentials',
              'error'
            );
          }
        },
      });
    }
  }
}
