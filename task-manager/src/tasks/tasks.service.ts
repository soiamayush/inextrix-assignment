import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = []; // Array to hold tasks

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(title: string, description?: string): Task {
    const task: Task = {
      id: uuid(),
      title,
      description: description || 'No description provided', // Default description if none provided
      status: TaskStatus.PENDING,
      createdAt: new Date(),
    };
    this.tasks.push(task);
    return task;
  }

  getTaskById(id: string): Task {
    const found = this.tasks.find((task) => task.id === id);
    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return found;
  }

  deleteTask(id: string): void {
    const found = this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id !== found.id);
  }

  deleteAllTasks(): void {
    this.tasks = [];
  }

  updateTask(id: string, updateTaskDto: UpdateTaskDto): Task {
    const task = this.getTaskById(id);

    task.title = updateTaskDto.title ?? task.title;
    task.description = updateTaskDto.description ?? task.description;

    return task;
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
