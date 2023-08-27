import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Task } from 'src/app/shared/types/task.types';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit, OnChanges{
  @Input() title: string = 'Titulo del formulario';

  @Input() mode: 'new' | 'edit' = 'new';

  @Input() task: Task = {} as Task;

  @Output() submitForm = new EventEmitter();

  @Output() cancelForm = new EventEmitter();

  taskForm: FormGroup = new FormGroup({});

  statusOptions: any[] = [
    { name: 'Completado', value: 'completed' },
    { name: 'Pendiente', value: 'pending' },
  ];

  ngOnInit(): void {
    // this.taskForm = this.createForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.taskForm = this.createForm();
    console.log(this.task);
  }

  createForm(): FormGroup {
    const newForm = new FormGroup({
      title: new FormControl({ value: this.isModeEdit ? this.task.title : '', disabled: false }, [
        Validators.required,
      ]),
      description: new FormControl({ value: this.isModeEdit ? this.task.description : '', disabled: false }, [
        Validators.required,
      ]),
      status: new FormControl({ value: this.isModeEdit ? this.task.status :'pending', disabled: false }, [
        Validators.required,
      ]),
    });

    return newForm;
  }

  clearForm() {
    this.taskForm.reset();
    this.taskForm.get('status')?.setValue('pending');
  }

  onSubmitForm() {
    const data = {...this.taskForm.value, id: this.task?.id}
    this.submitForm.emit(data);
  }

  cancelEditing() {
    this.cancelForm.emit();
  }

  get isModeEdit() {
    return this.mode === 'edit';
  }
}
