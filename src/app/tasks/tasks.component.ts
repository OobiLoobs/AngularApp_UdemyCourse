import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { dummyTasks } from './dummy-tasks';
import { type Task, type NewTaskData } from './task.model';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent, NewTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  @Input({ required: true }) userId!: string;
  @Input({ required: true }) name!: string;

  tasks = dummyTasks;
  isAddingTask = false;

  get selectedUserTasks() {
    return this.tasks.filter((task) => task.userId === this.userId);
  }

  createNewTaskId() {
    const lastTaskId = this.tasks.at(-1)!.id;
    const part1 = lastTaskId.slice(0, 1);
    const part2Number = +lastTaskId.slice(1) + 1;
    const part2String = part2Number.toString();
    const parts = [part1, part2String];
    return parts.join('');
  }

  createNewTask = (title: string, summary: string, dueDate: string): Task => {
    const newTask: Task = {
      id: this.createNewTaskId(),
      userId: this.userId,
      title,
      summary,
      dueDate,
    };
    return newTask;
  };

  onCompleteTask(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  onStartAddTask() {
    this.isAddingTask = true;
  }

  onAddTask(taskData: NewTaskData) {
    this.tasks.unshift(this.createNewTask(
      taskData.title,
      taskData.summary,
      taskData.date
    ));
    this.isAddingTask = false;
  }

  onAttemptExit() {
    this.isAddingTask = false;
  }
}
