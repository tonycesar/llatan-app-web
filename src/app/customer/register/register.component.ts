import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/common/services/api.service';
import {MatSnackBar} from '@angular/material/snack-bar';

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
  constructor(private apiService: ApiService, private _snackBar: MatSnackBar) { }

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
    if (this.form.invalid) return;
    const { dateOfBirthControl, lastnameControl, nameControl } = this.form.value;
    const birthDate = new Date(dateOfBirthControl);
    birthDate.setHours(+birthDate.getHours() + birthDate.getTimezoneOffset() / 60)
    this.apiService.createCustomer({
      name: nameControl,
      lastname: lastnameControl,
      birthDate: birthDate.getFullYear() + '-' + (birthDate.getMonth() + 1) + '-' + birthDate.getDate(),
      age: this.ageFormBirthDate(birthDate)
    }).subscribe((ok) => {
      console.log(ok)
      this._snackBar.open('Documento guardado','Listo',{duration: 3000});
    }, (error) => {
      this._snackBar.open(error.message,'Entendido',{duration: 3000});
    })
  }

}
