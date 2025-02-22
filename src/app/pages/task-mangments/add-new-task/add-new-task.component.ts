import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TaskManagService } from '../../../core/services/task-manag.service';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-add-new-task',
  templateUrl: './add-new-task.component.html',
  styleUrls: ['./add-new-task.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    DropdownModule,
    ReactiveFormsModule,
    BreadcrumbModule,
    RouterModule,
    BreadcrumbModule,
  ],
})
export class AddNewTaskComponent implements OnInit {
  items: MenuItem[] | undefined;
  form: FormGroup;
  savedForms: any[] = [];
  newTask = { id: '', name: '', title: '', statue: '' };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private taskService: TaskManagService
  ) {
    this.form = this.fb.group({
      id: ['', Validators.required],
      title: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.items = [
      { icon: 'pi pi-home', route: '/' },
      { label: 'Home', route: '/' },
      { label: 'Task-Manegment ', route: '/task-mang' },
      { label: 'Task-Manegment Create ' },
    ];
    this.loadSavedForms();
  }

  saveForm() {
    if (this.form.valid) {
      const newTask = this.form.value;
      this.taskService.addTask(newTask);
      this.router.navigate(['/task-mang']);
    }
  }

  loadSavedForms() {
    const storedData = localStorage.getItem('savedForms');
    if (storedData) {
      this.savedForms = JSON.parse(storedData);
    }
  }

  clearStorage() {
    localStorage.removeItem('savedForms');
    this.savedForms = [];
  }
}
