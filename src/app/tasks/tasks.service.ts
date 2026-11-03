import { Injectable } from '@angular/core';
import { NewTaskData, Task } from './task.model';

@Injectable({ providedIn: 'root' })

export class TasksService {
  private tasks = [
    {
      id: 't1',
      userId: 'u1',
      title: 'Master Angular',
      summary:
        'Learn all the basic and advanced features of Angular & how to apply them.',
      dueDate: '2025-12-31',
    },
    {
      id: 't2',
      userId: 'u3',
      title: 'Build first prototype',
      summary: 'Build a first prototype of the online shop website',
      dueDate: '2024-05-31',
    },
    {
      id: 't3',
      userId: 'u3',
      title: 'Prepare issue template',
      summary:
        'Prepare and describe an issue template which will help with project management',
      dueDate: '2024-06-15',
    },
  ];

  constructor() {
    const tasks = localStorage.getItem('tasks');

    if (tasks) {
      this.tasks = JSON.parse(tasks);
    }
  }

  getUserTasks(userId: string) {
    return this.tasks.filter((task) => task.userId === userId);
  }

  createNewTaskId() {
    const lastTaskId = this.tasks.at(-1)!.id;
    const part1 = lastTaskId.slice(0, 1);
    const part2Number = +lastTaskId.slice(1) + 1;
    const part2String = part2Number.toString();
    const parts = [part1, part2String];
    return parts.join('');
  }

  createNewTask = (
    userId: string,
    title: string,
    summary: string,
    dueDate: string,
  ): Task => {
    const newTask: Task = {
      id: this.createNewTaskId(),
      userId: userId,
      title,
      summary,
      dueDate,
    };
    return newTask;
  };

  addTask(taskData: NewTaskData, userId: string) {
    this.tasks.unshift(
      this.createNewTask(
        userId,
        taskData.title,
        taskData.summary,
        taskData.date,
      ),
    );
    this.saveTasks();
  }

  removeTask(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.saveTasks();
  }

  private saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}
