import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { MessageDialogComponent } from '../components/message-dialog/message-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  public showConfirmDialog() {
    return this.dialog.open(ConfirmDialogComponent).afterClosed();
  }

  public showSuccessMessage(successType: ESuccessType) {
    let message = "";
    switch (successType)
    {
      case ESuccessType.INSERT: message = "Se ha insertado correctamente"; break;
      case ESuccessType.MODIFY: message = "Se ha modificado correctamente"; break;
      case ESuccessType.REMOVE: message = "Se ha eliminado correctamente"; break;
    }
    const dialogConfig = new MatDialogConfig()
    dialogConfig.data = {
      title: "Exito",
      description: message
    }
    return this.dialog.open(MessageDialogComponent, dialogConfig).afterClosed();
  }

  public showErrorMessage(error: any) {
    console.log(error);
    const dialogConfig = new MatDialogConfig()
    dialogConfig.data = {
      title: "Error",
      description: "Ha habido un error. \nIntentalo de nuevo y si sigue fallando, consulta con Aitor :)."
    }
    return this.dialog.open(MessageDialogComponent, dialogConfig).afterClosed();
  }
}
export enum ESuccessType { INSERT, MODIFY, REMOVE };
