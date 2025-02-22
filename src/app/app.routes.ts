import { Routes } from '@angular/router';
import { FileUploadComponent } from './pages/file-upload/file-upload-list/file-upload.component';
import { HomeComponent } from './pages/home/home/home.component';
import { TaskMangmentComponent } from './pages/task-mangments/task-mangment/task-mangment.component';
import { AddNewTaskComponent } from './pages/task-mangments/add-new-task/add-new-task.component';
// import { TaskManagmentComponent } from './pages/task-managment/task-managment.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'task-mang',
    component: TaskMangmentComponent,
  },
  {
    path: 'task-mang/add',
    component: AddNewTaskComponent,
  },
  {
    path: 'file-upload',
    component: FileUploadComponent,
  },
];
