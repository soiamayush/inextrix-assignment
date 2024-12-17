import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './update-task-status.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createTask(@Body() createTaskDto: CreateTaskDto): {
    message: string;
    data: Task;
  } {
    const task = this.tasksService.createTask(
      createTaskDto.title,
      createTaskDto.description,
    );
    return { message: 'Task created successfully', data: task };
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): { message: string } {
    this.tasksService.deleteTask(id);
    return { message: 'Task deleted successfully' };
  }

  @Delete()
  deleteAllTasks(): { message: string } {
    this.tasksService.deleteAllTasks();
    return { message: 'All tasks deleted successfully' };
  }

  @Patch('/:id')
  updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): { message: string; data: Task } {
    const updatedTask = this.tasksService.updateTask(id, updateTaskDto);
    return {
      message: 'Task updated successfully',
      data: updatedTask,
    };
  }
  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): { message: string; data: Task } {
    const updatedTask = this.tasksService.updateTaskStatus(
      id,
      updateTaskStatusDto.status,
    );
    return { message: 'Task status updated successfully', data: updatedTask };
  }
}
