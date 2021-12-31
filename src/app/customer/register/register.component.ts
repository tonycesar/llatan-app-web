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
  minDateOfBirth = '1900-01-01';
  maxDateOfBirth = [new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()].join('-')
  constructor() { }

  ngOnInit(): void {
    this.form.get('dateOfBirthControl')?.valueChanges.subscribe(date => {
      let dateParsed = new Date(date);
      dateParsed.setHours(+dateParsed.getHours() + dateParsed.getTimezoneOffset() / 60)
      this.form.get('ageControl')?.setValue(this.ageFormBirthDate(dateParsed))
    })
  }

  ageFormBirthDate(birthDate: Date) {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const months = today.getMonth() - birthDate.getMonth();
    if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  onSubmit() {

  }

}
