import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoutesService } from '@features/routes/service/routes.service';
import { map } from 'rxjs/operators';
import { AddRouteComponent } from '../add-route/add-route.component';

@Component({
  selector: 'app-routes-list',
  templateUrl: './routes-list.component.html',
  styleUrls: ['./routes-list.component.scss']
})
export class RoutesListComponent implements OnInit {

  dataSource: any;
  displayedColumns: string[] = ['id', 'start', 'end', 'arrival_date', 'driver', 'menu'];
  message: string = "";

  constructor(
    private routesService: RoutesService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.initDataSource();
  }

  initDataSource() {
    this.routesService.getRoutes().pipe(
      map(routes => this.dataSource = routes)
    ).subscribe(response => this.openSnackBar("Pobrano pomyślnie"), response => this.openSnackBar("Wystąpił błąd podczas wczytywania danych"));
  }

  openSnackBar(message: string, action: string = "Zamknij") {
    this._snackBar.open(message, action, {
      duration: 1500,
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }

  openModal(route = {}) {
    let dialogRef = this.dialog.open(AddRouteComponent, {
      minWidth: '400px',
      hasBackdrop: true,
      data: { title: 'Dodaj nową trase', route}
    });

    dialogRef.afterClosed().subscribe((res) => {
      setTimeout(() => this.initDataSource(), 1500)
    });
  }

  onDelete(id: number) {
    if (window.confirm(`Na pewno chcesz usunąc ten trase?`)) {
      this.routesService.deleteRoute(id).subscribe((res) => {
        this.initDataSource();
        this.openSnackBar(`Usunięto trasę o numerze ${id},`)
      }, (res) => {
        this.openSnackBar(`Wystąpił błąd podczas usuwania trasy. Spróbuj później`);
      })
    }
  }
}
