import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from 'src/app/shared/types/task.types';
import { NgxSpinnerService } from "ngx-spinner";
import { TaskFormComponent } from '../../components/task-form/task-form.component';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-task-main',
  templateUrl: './task-main.component.html',
  styleUrls: ['./task-main.component.scss']
})
export class TaskMainComponent implements OnInit{
  @ViewChild('formTask') formTaskRef!: TaskFormComponent;

  constructor(
    private taskService: TaskService,
    private spinner: NgxSpinnerService,
    private toastService: ToastService
  ) {}

  tasks: Task[] = [];

  selectedTask!: Task;

  modeSelected: 'new' | 'edit' = 'new';

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    this.spinner.show();
    this.taskService.getTasks().subscribe({
      next: (response: any) => {
        this.tasks = response.data;
        console.log(response);
        this.spinner.hide();
      },
      error: () => {
        this.spinner.hide();
      }
    })
  }

  onSubmitForm(task: Task) {
    if (task.id) {
      this.onUpdateTask(task);
    } else {
      this.createTask(task);
    }
  }

  createTask(task: Task) {
    this.spinner.show();
    this.taskService.createTask(task).subscribe({
      next: (response: any) => {
        this.spinner.hide();
        this.getTasks();
        this.formTaskRef.clearForm();
        this.toastService.showSuccess('Tarea creada correctamente.');
      },
      error: (err) => {
        console.log(err);
        this.spinner.hide();
        console.log(err);
        const errorMessage = err.error.errors.map((error: any) => `${error.msg} ${error.path}`).join('\n');
        this.toastService.showDanger('Ocurrio un error al crear la tarea .'+ errorMessage);
      }
    });
  }

  onUpdateTask(task: Task) {
    this.spinner.show();
    this.taskService.updateTask(task).subscribe({
      next: (response: any) => {
        this.getTasks();
        this.formTaskRef.clearForm();
        this.spinner.hide();
        this.onCancelForm();
        this.toastService.showSuccess('Tarea actualizada correctamente.');
      },
      error: (err) => {
        console.log(err);
        this.spinner.hide();
        const errorMessage = err.error.errors.map((error: any) => `${error.msg} ${error.path}`).join('\n');
        this.toastService.showDanger('Ocurrio un error al actualizar la tarea .'+ errorMessage);
      }
    });
  }

  onDeleteTask(task: Task) {
    this.spinner.show();
    this.taskService.deleteTask(task).subscribe({
      next: (response: any) => {
        this.getTasks();
        this.formTaskRef.clearForm();
        this.onCancelForm();
        this.toastService.showSuccess('Tarea eliminada correctamente.');
      },
      error: (err) => {
        this.getTasks();
        this.toastService.showDanger('Ocurrio un error al eliminar la tarea .'+ err.message);
      }
    });
  }

  onEditTask(task: Task) {
    this.selectedTask = task;
    this.modeSelected = 'edit';
  }

  onCancelForm() {
    this.selectedTask = null as any;
    this.modeSelected = 'new';
  }
}
