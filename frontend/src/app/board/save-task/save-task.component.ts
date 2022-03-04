import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-save-task',
  templateUrl: './save-task.component.html',
  styleUrls: ['./save-task.component.css'],
})
export class SaveTaskComponent implements OnInit {
  message: string = '';
  saveData: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationinSecons: number = 2000;
  constructor(
    private _router: Router,
    private _taskService: TaskService,
    private _snackBar: MatSnackBar
  ) {
    this.saveData = {};
  }

  saveTask() {
    if (!this.saveData.name || !this.saveData.description) {
      this.message = 'Incomplete data';
      this.openSnackBarError();
    } else {
      this._taskService.saveTask(this.saveData).subscribe({
        next: (v) => {
          this._router.navigate(['/listTask']);
          this.message = 'Registered task';
          this.openSnackBarSuccesfull();
        },
        error: (e) => {
          this.message = e.error.message;
          this.openSnackBarError();
        },
      });
    }
  }

  openSnackBarSuccesfull() {
    this._snackBar.open(this.message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationinSecons,
      panelClass: ['styleSnackBarSuccesfull'],
    });
  }
  openSnackBarError() {
    this._snackBar.open(this.message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationinSecons,
      panelClass: ['styleSnackBarError'],
    });
  }

  ngOnInit(): void {}
}
