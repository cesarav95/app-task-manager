import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from 'src/app/shared/types/task.types';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  BASE_URI = environment.apiUrl+'/tasks';

  constructor(
    private http: HttpClient
  ) { }

  getTasks() {
    return this.http.get(this.BASE_URI);
  }

  createTask(task: Task) {
    return this.http.post(this.BASE_URI, task);
  }

  updateTask(task: Task) {
    return this.http.put(`${this.BASE_URI}/${task.id}`, task);
  }

  deleteTask(task: Task) {
    return this.http.delete(`${this.BASE_URI}/${task.id}`);
  }
}
