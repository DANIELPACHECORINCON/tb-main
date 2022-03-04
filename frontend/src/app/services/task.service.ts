import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private env: string;

  constructor(private _htt: HttpClient) { 
    this.env= environment.APP_URL;
  }

  saveTask(task: any){
    return this._htt.post<any>(this.env+'task/saveTask', task);
  }
}
