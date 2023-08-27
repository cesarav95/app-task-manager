import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TaskMainComponent } from './pages/task-main/task-main.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskTableComponent } from './components/task-table/task-table.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    TaskMainComponent,
    TaskFormComponent,
    TaskTableComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    SharedModule,
    HttpClientModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    NgbPaginationModule,
    NgbTypeaheadModule
  ]
})
export class TasksModule { }
