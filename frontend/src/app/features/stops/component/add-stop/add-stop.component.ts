import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogClose, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { StopsService } from '@features/stops/service/stops.service';

enum Action {
  EDIT = 'edit',
  NEW = 'new',
}

@Component({
  selector: 'app-add-stop',
  templateUrl: './add-stop.component.html',
  styleUrls: ['./add-stop.component.scss']
})
export class AddStopComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private breakepointObserver: BreakpointObserver,
    private stopService: StopsService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) { }

  stopForm!: FormGroup;
  actionTODO = Action.NEW;

  ngOnInit(): void {
    this.buildForm();
    if(this.data.stop.hasOwnProperty('id')) {
      this.actionTODO = Action.EDIT;
      this.data.title = "Edytuj przystanek";
      this.patchFormData();
    }
  }

  buildForm() {
    this.stopForm = this.formBuilder.group({
      name: ['', [Validators.required]],
    })
  }

  onSave() {
    const formValue = this.stopForm.value;
    let message = "";

    if(this.actionTODO === Action.NEW) {
      this.stopService.createStop(formValue).subscribe(
        (res) => {
          this.openSnackBar("Dodano nowy przystanek");
        },
        (res) => {
          this.openSnackBar(`Nie udało się utworzyć przystanku. ${res.error.message}`);
        }
      );
    } else {
      const stopId = this.data.stop.id;
      this.stopService.updateStop(stopId, formValue).subscribe(
        (res) => {
          this.openSnackBar("Pomyślnie zaktualizowano przystanek");
        },
        (res) => {
          this.openSnackBar(`${res.error.message}`);
        }
      );
    }


  }

  openSnackBar(message: string, action: string = "Zamknij") {
    this._snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }

  patchFormData(): void {
    this.stopForm.patchValue({
      name: this.data.stop.name
    })
  }
}
