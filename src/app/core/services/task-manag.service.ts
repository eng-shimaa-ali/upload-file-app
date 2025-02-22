import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root',
})
export class TaskManagService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  constructor() {
    this.loadTasksFromLocalStorage();
  }
  private loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    this.tasksSubject.next(tasks);
  }
  private saveTasksToLocalStorage(tasks: Task[]) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    this.tasksSubject.next(tasks);
  }
  addTask(task: Task) {
    const tasks = this.tasksSubject.value;
    task.id = tasks.length + 1; // Generate a unique ID
    tasks.push(task);
    this.saveTasksToLocalStorage(tasks);
  }
  updateTaskStatus(taskId: number, newStatus: string) {
    const tasks = this.tasksSubject.value;
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.status = newStatus;
      this.saveTasksToLocalStorage(tasks);
    }
  }
  getTasks() {
    return this.tasksSubject.value;
  }
}
