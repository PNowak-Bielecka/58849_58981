import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersService } from '@features/users/service/users.service';
import { map, tap } from 'rxjs/operators';

enum Action {
  EDIT = 'edit',
  NEW = 'new'
}

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  addUserForm!: FormGroup;
  actionTODO = Action.NEW;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private formBuilder: FormBuilder,
  private breakepointObserver: BreakpointObserver,
  private usersService: UsersService) { }

  ngOnInit(): void {
    this.buildForm();
    if(this.data.user.hasOwnProperty('id')) {
      this.actionTODO = Action.EDIT;
      this.data.title = "Edytuj użytkownika";
      this.pathFormData();
    }
  }

  onSave() {
    const formValue = this.addUserForm.value;

    if(this.actionTODO === Action.NEW) {

      this.usersService.createUser(formValue).subscribe();
    } else {
      const userId = this.data.user.id;
      this.usersService.updateUser(userId, formValue).subscribe();
    }
  }

  isMobile = this.breakepointObserver.observe([
    Breakpoints.Handset,
    Breakpoints.Tablet,
  ]).pipe(
    map( result => result.matches )
  )

  private buildForm() {
    this.addUserForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(8), Validators.nullValidator]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      isEmployee: [false],
      role: ['', [Validators.required]]
    })
  }

  private pathFormData(): void {
    this.addUserForm.patchValue({
      firstName: this.data.user.firstName,
      email: this.data.user.email,
      password: this.data.user.password,
      role: this.data.user.role,
      isEmployee: this.data.user.isEmployee,
      lastName: this.data.user.lastName,
      birthDate: this.data.user.birthDate
    })
  }
}
