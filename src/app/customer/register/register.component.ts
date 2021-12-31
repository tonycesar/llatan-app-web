import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  form = new FormGroup({
    nameControl: new FormControl('', [Validators.required]),
    lastnameControl: new FormControl('', [Validators.required]),
    dateOfBirthControl: new FormControl('', [Validators.required]),
    ageControl: new FormControl({ value: '', disabled: true }, [Validators.required]),
  });
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {

  }

}
