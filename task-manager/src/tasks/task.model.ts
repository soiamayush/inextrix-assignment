export enum TaskStatus {
  PENDING = 'Pending',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
}

export class Task {
  public createdAt: Date; // Declare the createdAt property

  constructor(
    public id: string,
    public title: string,
    public description: string,
    public status: TaskStatus,
  ) {
    this.createdAt = new Date(); // Initialize createdAt with the current date and time
  }
}
