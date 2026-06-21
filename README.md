# ProjectHub - Team Collaboration & Task Management Platform

A production-ready MVP for team collaboration and task management. Built with React, TypeScript, FastAPI, and SQLite.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [Development](#development)

## Overview

ProjectHub is a simplified version of Trello, Jira, or ClickUp. It allows users to:

- Create and manage projects
- Organize tasks within projects
- Track task progress with status updates
- View comprehensive dashboard analytics
- Secure authentication with JWT tokens

## Features

### Core Features

✅ **User Authentication**
- Secure registration and login
- JWT-based authentication
- Password hashing with bcrypt

✅ **Project Management**
- Create, read, update, delete projects
- Project ownership and access control

✅ **Task Management**
- Create, read, update, delete tasks
- Task status tracking (Todo, In Progress, Completed)
- Task organization within projects

✅ **Dashboard**
- Total projects count
- Total tasks count
- Completed tasks count
- Pending tasks count
- Recent projects overview

✅ **User Profile**
- View user information
- Account details display

## Tech Stack

### Frontend
- **Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM v6
- **HTTP Client**: Axios
- **Form Management**: React Hook Form

### Backend
- **Framework**: FastAPI (Python)
- **Database ORM**: SQLAlchemy
- **Validation**: Pydantic
- **Authentication**: JWT + Passlib
- **Database**: SQLite

### Deployment
- **Frontend**: Vercel
- **Backend**: Render
- **Database**: SQLite (can be migrated to PostgreSQL)

## Prerequisites

- **Node.js** 18+ (for frontend)
- **Python** 3.9+ (for backend)
- **Git** (for version control)

## Installation

### Step 1: Clone or Setup the Project

```bash
cd ProjectHub
```

### Step 2: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create a virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env

# The database will be created automatically on first run
```

### Step 3: Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

## Running the Application

### Start the Backend Server

```bash
cd backend

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Run the FastAPI server
uvicorn app.main:app --reload
```

The backend will be available at `http://localhost:8000`

API Documentation: `http://localhost:8000/docs`

### Start the Frontend Development Server

```bash
cd frontend

# Start Vite development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

## Project Structure

```
ProjectHub/
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API service layer
│   │   ├── hooks/          # Custom React hooks
│   │   ├── types/          # TypeScript type definitions
│   │   ├── utils/          # Utility functions
│   │   ├── routes/         # Route configuration
│   │   ├── App.tsx         # Main app component
│   │   └── main.tsx        # Entry point
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── tailwind.config.js
│
└── backend/
    ├── app/
    │   ├── api/            # API route handlers
    │   ├── models/         # SQLAlchemy models
    │   ├── schemas/        # Pydantic schemas
    │   ├── database/       # Database configuration
    │   ├── auth/           # Authentication logic
    │   └── main.py         # FastAPI application
    ├── requirements.txt
    ├── .env.example
    └── .gitignore
```

## API Endpoints

### Authentication Endpoints

```
POST   /api/auth/register          - Register a new user
POST   /api/auth/login             - Login user
GET    /api/auth/me                - Get current user info
```

### Project Endpoints

```
GET    /api/projects               - Get all user projects
POST   /api/projects               - Create a new project
GET    /api/projects/{id}          - Get project details with tasks
PUT    /api/projects/{id}          - Update project
DELETE /api/projects/{id}          - Delete project
```

### Task Endpoints

```
GET    /api/tasks                  - Get all user tasks
POST   /api/tasks                  - Create a new task
GET    /api/tasks/{id}             - Get task details
PUT    /api/tasks/{id}             - Update task
DELETE /api/tasks/{id}             - Delete task
```

### Dashboard Endpoints

```
GET    /api/dashboard/stats        - Get dashboard statistics
```

## Deployment

### Backend Deployment (Render)

1. Create account on [Render](https://render.com)
2. Connect your GitHub repository
3. Create a new Web Service
4. Set build command: `pip install -r requirements.txt`
5. Set start command: `uvicorn app.main:app --host 0.0.0.0`
6. Add environment variables in Render dashboard:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `SECRET_KEY`: A secure random key
   - `ENVIRONMENT`: `production`

### Frontend Deployment (Vercel)

1. Create account on [Vercel](https://vercel.com)
2. Connect your GitHub repository
3. Select the frontend folder
4. Add environment variable:
   - `VITE_API_URL`: Your backend API URL
5. Deploy

## Development

### Code Style

- Frontend uses TypeScript and follows React best practices
- Backend uses Python with type hints
- All code is formatted and linted

### Adding New Features

1. Create a new branch: `git checkout -b feature/feature-name`
2. Make your changes
3. Test locally
4. Commit and push: `git push origin feature/feature-name`
5. Create a pull request

### Database Migrations

The application uses SQLAlchemy for ORM. To modify the database schema:

1. Update the models in `backend/app/models/`
2. Tables are created automatically on first run

For production, consider using Alembic for migrations:

```bash
# Generate migration
alembic revision --autogenerate -m "description"

# Run migrations
alembic upgrade head
```

## Testing

Run backend tests:

```bash
cd backend
pytest
```

Run frontend tests:

```bash
cd frontend
npm run test
```

## Security

- All passwords are hashed with bcrypt
- JWT tokens expire after 30 minutes
- CORS is configured for secure cross-origin requests
- SQL injection is prevented with parameterized queries

## Troubleshooting

### Backend Issues

**Database Lock Error**
- Delete `projecthub.db` and restart the server

**Port Already in Use**
```bash
uvicorn app.main:app --reload --port 8001
```

**Import Errors**
```bash
# Ensure virtual environment is activated
pip install -r requirements.txt
```

### Frontend Issues

**Node Modules Issues**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Port Already in Use**
```bash
npm run dev -- --port 5174
```

## Support

For issues and feature requests, please create an issue in the repository.

## License

This project is open source and available for portfolio use.

## Author

Built as a Full-Stack Software Developer Internship Portfolio Project

---

**Live Demo**: [Coming Soon]

**Repository**: [Your GitHub URL]
