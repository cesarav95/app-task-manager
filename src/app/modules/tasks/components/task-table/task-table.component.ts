import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { TableColumn, Task } from 'src/app/shared/types/task.types';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.scss']
})
export class TaskTableComponent implements OnChanges {
  @Input() data: Task[] = [];

  @Output() updateTask = new EventEmitter<Task>();

  @Output() editTask = new EventEmitter<Task>();

  @Output() deleteTask = new EventEmitter<Task>();

  columns: TableColumn[] = [
    {
      field: 'title',
      name: 'Titulo'
    },
    {
      field: 'description',
      name: 'Descripcion'
    },
    {
      field: 'status',
      name: 'Estado'
    },
    {
      field: '',
      name: ''
    }
  ];

  statusOptions: any[] = [
    { name: 'Completado', value: 'completed' },
    { name: 'Pendiente', value: 'pending' },
  ];

  faEdit = faPenToSquare;

  faTrash = faTrash;

  filteredTask: Task[] = [];

  page = 1;

  pageSize = 5;

  listTask: Task[] = [];

  showOnlyPending = false;

  textSearch = '';

  ngOnChanges(changes: any): void {
    this.searchTask('');
  }

  onKeyupSearchInput(event: any) {
    this.searchTask(event.target.value);
  }

  onChangePedingFlag() {
    this.searchTask(this.textSearch??'');
  }

  searchTask(text: string) {
    const textSearch =  text.toLowerCase();
    this.filteredTask = this.data.filter(
      task => (task.title.toLowerCase().includes(textSearch) ||
        task.description.toLowerCase().includes(textSearch)) &&
        (!this.showOnlyPending || task.status === 'pending')

    );
    this.refreshList();
  }

  refreshList() {
    this.listTask = this.filteredTask?.slice(
			(this.page - 1) * this.pageSize,
			(this.page - 1) * this.pageSize + this.pageSize,
		) as Task[];
  }

  onChangeStateTask(task: Task) {
    this.updateTask.emit(task);
  }

  onEditTask(task: Task) {
    this.editTask.emit(task);
  }

  onDeleteTask(task: Task) {
    this.deleteTask.emit(task);
  }

  get totalRecords() { return this.filteredTask?.length as number }
}
