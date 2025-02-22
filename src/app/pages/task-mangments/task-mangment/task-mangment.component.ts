import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TaskManagService } from '../../../core/services/task-manag.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-task-mangment',
  templateUrl: './task-mangment.component.html',
  styleUrls: ['./task-mangment.component.scss'],
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    RouterModule,
    CommonModule,
    BreadcrumbModule,
    TableModule,
  ],
})
export class TaskMangmentComponent {
  items: MenuItem[] | undefined;
  tasks: any[] = [];
  optionsState: any;
  constructor(private router: Router, private taskService: TaskManagService) {}

  ngOnInit() {
    this.items = [
      { icon: 'pi pi-home', route: '/' },
      { label: 'Home', route: '/' },
      { label: 'Task-Manegment ', route: '/' },
    ];
    this.taskService.tasks$.subscribe((tasks) => {
      this.tasks = tasks;
    });
  }
  addnewTask() {
    this.router.navigate(['/task-mang', 'add']);
  }
  changeStaues(task: any) {
    const newStatues = task.status === 'complete' ? 'in-progress' : 'complete';
    this.taskService.updateTaskStatus(task.id, newStatues);
  }
}
