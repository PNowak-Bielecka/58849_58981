import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StopsService } from '@features/stops/service/stops.service';
import { catchError, map, tap } from 'rxjs/operators';
import { GetStopResponse } from 'src/app/api/model/stops.model';
import { AddStopComponent } from '../add-stop/add-stop.component';

@Component({
  selector: 'app-stops-list',
  templateUrl: './stops-list.component.html',
  styleUrls: ['./stops-list.component.scss']
})
export class StopsListComponent implements OnInit {

  constructor(
    private stopsService: StopsService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  dataSource: any;
  displayedColumns: string[] = ['id', 'name', 'menu'];
  message: string = "";

  ngOnInit(): void {
    this.initDataSource();
  }

  openModal(stop = {}) {
    let dialogRef = this.dialog.open(AddStopComponent, {
      minWidth: '400px',
      hasBackdrop: true,
      data: { title: 'Dodaj nowy przystanek', stop}
    });

    dialogRef.afterClosed().subscribe((res) => {
      setTimeout(()=>this.initDataSource(), 1500)
    });

  }

  openSnackBar(message: string, action: string = "Zamknij") {
    this._snackBar.open(message, action, {
      duration: 1500,
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }

  initDataSource() {
    this.stopsService.getStops().pipe(
      map((response: GetStopResponse) => {
        this.dataSource = response.data,
        this.message = response.message
      })
    ).subscribe(response => this.openSnackBar(this.message), response => this.openSnackBar("Wystąpił błąd podczas wczytywania danych"));
  }

  onDelete(id: number) {
    if (window.confirm(`Na pewno chcesz usunąc ten przystanek?`)) {
      this.stopsService.deleteStop(id).subscribe((res) => {
        this.initDataSource();
        this.openSnackBar(`Usunięto przystanek o numerze ${id}`)
      }, (res) => {
        this.openSnackBar(`Wystąpił błąd podczas usuwania przystanku. Spróbuj później`);
      })
    }
  }

  /*onDelete(id: number) {
    if (window.confirm('Na pewno chcesz usunąc użytkownika?')) {
      this.usersService.deleteUser(id).subscribe((res) => {
        this.initDataSource();
        window.alert("Użytkownik usunięty pomyślnie");
      });
    }
  }*/

}
