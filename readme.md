# Task Manager Project

## Overview

This is a full-stack **Task Management Application** with the backend built using **NestJS** and the frontend using **Next.js**. The application includes CRUD functionality to manage tasks, such as adding, updating, and deleting tasks, with a clean and user-friendly UI.

---

## Project Structure

```plaintext
task-manager-frontend/  --> Next.js frontend project
task-manager/           --> NestJS backend project

```

## Part 1: Backend (NestJS)

### Features

#### Task Entity:

- **id**: Unique identifier
- **title**: Task title _(required)_
- **description**: Task description _(optional)_
- **status**: Enum _(Pending, In Progress, Completed)_
- **createdAt**: Timestamp for task creation

#### API Endpoints:

- **GET `/tasks`**: Retrieve all tasks
- **POST `/tasks`**: Create a new task
- **DELETE `/tasks/:id`**: Delete a task by ID
- **PATCH `/tasks/:id/status`**: Update task status
- **PATCH `/tasks/:id`**: Update task title or description

#### Validation:

- **DTOs** (Data Transfer Objects) are used to validate incoming data for task creation and updates.

#### Error Handling:

- Handles common errors like invalid inputs or "Task not found."

# Setup Instructions

## Step 1: Install Dependencies

Navigate to the backend folder:

```bash
cd task-manager
npm install
```

## Step 2: Configure Backend API URL

Ensure the backend API URL is correctly configured in your frontend API calls.

**Example in your code:**

```typescript
const response = await axios.get("http://localhost:3000/tasks");
```

## Step 3: Start the Next.js Frontend

Run the Next.js development server:

```bash
npm run dev
```

#### The frontend will start at http://localhost:3000/tasks.

## Technologies Used

### Backend:

##### NestJS: Framework for building scalable server-side applications.

TypeScript: Static type checking.

Validation Pipes: Validates input using DTOs.

UUID: Generates unique IDs for tasks.

Frontend:
Next.js: React framework for server-side rendering.
Tailwind CSS: Utility-first CSS framework for clean UI.

Axios: Promise-based HTTP client for API requests.
React Hooks: Used for state management (useState, useEffect).
