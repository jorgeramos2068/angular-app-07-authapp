import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  register(): void {
    console.log(this.form.value);
    this.router.navigateByUrl('/dashboard');
  }
}
