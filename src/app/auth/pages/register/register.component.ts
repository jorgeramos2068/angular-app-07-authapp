import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  public form: FormGroup = this.formBuilder.group({
    name: ['Test 1', [Validators.required]],
    email: ['test1@gmail.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(5)]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  register(): void {
    const { name, email, password } = this.form.value;
    if (name && email && password) {
      this.authService.register(name, email, password).subscribe({
        next: (resp) => {
          if (resp === true) {
            this.router.navigateByUrl('/dashboard');
          } else {
            Swal.fire('Error', resp.toString(), 'error');
          }
        },
      });
    }
  }
}
