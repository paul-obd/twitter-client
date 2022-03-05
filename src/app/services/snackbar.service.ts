import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }


  openSnackbar(mssg, action, duration?, panelClass?){
    this.snackBar.open(mssg, action, {
      duration: duration,
      panelClass: panelClass,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    })
  }

  openErrSnackbar(mssg, action){
    this.snackBar.open(mssg, action, {
      duration: 4000,
      panelClass: 'red-snackbar',
      horizontalPosition: 'center',
      verticalPosition: 'top'
    })

  }

  openSuccessSnackbar(mssg, action){
    this.snackBar.open(mssg, action, {
      duration: 2000,
      panelClass: 'green-snackbar',
      horizontalPosition: 'center',
      verticalPosition: 'top'
    })

  }
}
