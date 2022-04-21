import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.scss']
})
export class MessageDialogComponent {

  title: string = ""
  description: string = ""

  constructor(@Inject(MAT_DIALOG_DATA) data) {
    this.title = data.title
    this.description = data.description
  }
}