import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from '@features/users/service/users.service';
import { map, tap } from 'rxjs/operators';
import { User } from 'src/app/api/model/user.model';
import { AddUserComponent } from '../add-user/add-user.component';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})


export class UsersListComponent implements OnInit {

  dataSource: any;
  displayedColumns: string[] = ['id', 'email', 'firstName', 'lastName', 'birthDate', 'isEmployee', 'role', 'menu'];

  constructor(
    private usersService: UsersService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.initDataSource();
  }

  openModal(user = {}) {
    const dialogRef = this.dialog.open(AddUserComponent, {
      minWidth: '400px',
      minHeight: '600px',
      hasBackdrop: true,
      data: { title: 'Dodaj nowego użytkownika', user}
    });
  }

  onDelete(id: number) {
    if (window.confirm('Na pewno chcesz usunąc użytkownika?')) {
      this.usersService.deleteUser(id).subscribe((res) => {
        this.initDataSource();
        window.alert("Użytkownik usunięty pomyślnie");
      });
    }
  }

  /*initDataSource(): any {
    this.usersService.findAll().pipe(
      tap(user => console.log(user)),
      map((user: User) => this.dataSource.data = user)
    ).subscribe();
    return user;
  }*/

  initDataSource() {
    this.usersService.getUsers().pipe(
      map((user: User) => this.dataSource = user)
    ).subscribe();
  }

}