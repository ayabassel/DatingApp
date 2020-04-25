import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { AuthService } from '../_Services/Auth.service';
import { AlertifyService } from '../_Services/Alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { User } from '../_models/user';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  bsConfig: Partial<BsDatepickerConfig>;
  registerForm: FormGroup;
  user: User;
  @Input() valueFromHome: any ;
  @Output() cancelRegister = new EventEmitter();
  constructor(private authService: AuthService, private alertify: AlertifyService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
   this.createFormGroup();
   this.bsConfig = {containerClass: 'theme-red'};
  }

  createFormGroup() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {validators: this.checkConfirmPassword});
  }

  checkConfirmPassword(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value  ? null : {'mismatch': true};
  }

  register() {
    this.user = Object.assign({}, this.registerForm.value);
    this.authService.register(this.user).subscribe(() => {
      this.alertify.success('Registered Successfully!');
    }, error => {
      this.alertify.error(error);
    }, () => {
      this.authService.login(this.user).subscribe( () => {
        this.router.navigate(['/members']);
      });
    });
  }
  cancel() {
    this.cancelRegister.emit(false);
  }
}
