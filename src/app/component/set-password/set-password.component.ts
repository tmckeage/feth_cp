import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss']
})
export class SetPasswordComponent implements OnInit {
  setPassword!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.setPassword = new FormGroup({
			"password": new FormControl(null, [Validators.required]),
			"verifyPassword": new FormControl(null, [Validators.required])
	  });
  }

  onSubmit(){
    console.log(this.setPassword);
  }

  get setPwdForm() { return this.setPassword.controls; }

}
