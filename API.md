# ProjectHub Backend API Documentation

Complete API documentation for the ProjectHub backend.

## Base URL

- Development: `http://localhost:8000`
- Production: `https://projecthub-api.onrender.com`

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Response Format

All responses are in JSON format.

### Success Response (200)

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "created_at": "2024-06-21T10:00:00"
}
```

### Error Response (400, 401, 404, etc.)

```json
{
  "detail": "Error message here"
}
```

---

## Authentication Endpoints

### POST `/api/auth/register`

Register a new user.

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response** (201):
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "created_at": "2024-06-21T10:00:00"
}
```

**Error Cases**:
- 400: Email already registered
- 422: Validation error

---

### POST `/api/auth/login`

Login and get access token.

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response** (200):
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "created_at": "2024-06-21T10:00:00"
  }
}
```

**Error Cases**:
- 401: Incorrect email or password
- 422: Validation error

---

### GET `/api/auth/me`

Get current authenticated user information.

**Headers**: Required Authorization header

**Response** (200):
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "created_at": "2024-06-21T10:00:00"
}
```

**Error Cases**:
- 401: Invalid or expired token

---

## Project Endpoints

### GET `/api/projects`

Get all projects for the authenticated user.

**Headers**: Required Authorization header

**Response** (200):
```json
[
  {
    "id": 1,
    "title": "Website Redesign",
    "description": "Redesign company website",
    "owner_id": 1,
    "created_at": "2024-06-21T10:00:00"
  },
  {
    "id": 2,
    "title": "Mobile App",
    "description": "Build iOS and Android app",
    "owner_id": 1,
    "created_at": "2024-06-20T15:30:00"
  }
]
```

---

### POST `/api/projects`

Create a new project.

**Headers**: Required Authorization header

**Request Body**:
```json
{
  "title": "Website Redesign",
  "description": "Redesign company website"
}
```

**Response** (201):
```json
{
  "id": 1,
  "title": "Website Redesign",
  "description": "Redesign company website",
  "owner_id": 1,
  "created_at": "2024-06-21T10:00:00"
}
```

**Error Cases**:
- 401: Unauthorized
- 422: Validation error

---

### GET `/api/projects/{id}`

Get project details with all associated tasks.

**Headers**: Required Authorization header

**Response** (200):
```json
{
  "id": 1,
  "title": "Website Redesign",
  "description": "Redesign company website",
  "owner_id": 1,
  "created_at": "2024-06-21T10:00:00",
  "tasks": [
    {
      "id": 1,
      "title": "Design mockups",
      "description": "Create UI mockups",
      "status": "in_progress",
      "project_id": 1,
      "created_at": "2024-06-21T10:05:00"
    }
  ]
}
```

**Error Cases**:
- 401: Unauthorized
- 404: Project not found

---

### PUT `/api/projects/{id}`

Update a project.

**Headers**: Required Authorization header

**Request Body** (fields optional):
```json
{
  "title": "Website Redesign v2",
  "description": "Updated description"
}
```

**Response** (200):
```json
{
  "id": 1,
  "title": "Website Redesign v2",
  "description": "Updated description",
  "owner_id": 1,
  "created_at": "2024-06-21T10:00:00"
}
```

**Error Cases**:
- 401: Unauthorized
- 404: Project not found

---

### DELETE `/api/projects/{id}`

Delete a project and all associated tasks.

**Headers**: Required Authorization header

**Response** (200):
```json
{
  "message": "Project deleted successfully"
}
```

**Error Cases**:
- 401: Unauthorized
- 404: Project not found

---

## Task Endpoints

### GET `/api/tasks`

Get all tasks for all user's projects.

**Headers**: Required Authorization header

**Response** (200):
```json
[
  {
    "id": 1,
    "title": "Design mockups",
    "description": "Create UI mockups",
    "status": "in_progress",
    "project_id": 1,
    "created_at": "2024-06-21T10:05:00"
  }
]
```

---

### POST `/api/tasks`

Create a new task in a project.

**Headers**: Required Authorization header

**Request Body**:
```json
{
  "title": "Design mockups",
  "description": "Create UI mockups",
  "status": "todo",
  "project_id": 1
}
```

**Response** (201):
```json
{
  "id": 1,
  "title": "Design mockups",
  "description": "Create UI mockups",
  "status": "todo",
  "project_id": 1,
  "created_at": "2024-06-21T10:05:00"
}
```

**Error Cases**:
- 401: Unauthorized
- 404: Project not found
- 422: Validation error

---

### GET `/api/tasks/{id}`

Get a specific task.

**Headers**: Required Authorization header

**Response** (200):
```json
{
  "id": 1,
  "title": "Design mockups",
  "description": "Create UI mockups",
  "status": "in_progress",
  "project_id": 1,
  "created_at": "2024-06-21T10:05:00"
}
```

**Error Cases**:
- 401: Unauthorized
- 404: Task not found

---

### PUT `/api/tasks/{id}`

Update a task.

**Headers**: Required Authorization header

**Request Body** (fields optional):
```json
{
  "title": "Design mockups - Final",
  "status": "completed"
}
```

**Valid Status Values**:
- `todo`
- `in_progress`
- `completed`

**Response** (200):
```json
{
  "id": 1,
  "title": "Design mockups - Final",
  "description": "Create UI mockups",
  "status": "completed",
  "project_id": 1,
  "created_at": "2024-06-21T10:05:00"
}
```

**Error Cases**:
- 401: Unauthorized
- 404: Task not found

---

### DELETE `/api/tasks/{id}`

Delete a task.

**Headers**: Required Authorization header

**Response** (200):
```json
{
  "message": "Task deleted successfully"
}
```

**Error Cases**:
- 401: Unauthorized
- 404: Task not found

---

## Dashboard Endpoints

### GET `/api/dashboard/stats`

Get dashboard statistics for the authenticated user.

**Headers**: Required Authorization header

**Response** (200):
```json
{
  "total_projects": 5,
  "total_tasks": 23,
  "completed_tasks": 15,
  "pending_tasks": 8
}
```

---

## Health Check

### GET `/health`

Check if the API is running.

**Response** (200):
```json
{
  "status": "healthy"
}
```

---

## Root Endpoint

### GET `/`

Get API information.

**Response** (200):
```json
{
  "message": "ProjectHub API is running",
  "version": "1.0.0",
  "docs": "/docs"
}
```

---

## Error Codes

| Code | Message | Meaning |
|------|---------|---------|
| 200 | OK | Request successful |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Invalid request data |
| 401 | Unauthorized | Missing or invalid authentication |
| 404 | Not Found | Resource not found |
| 422 | Validation Error | Invalid data format |
| 500 | Internal Server Error | Server error |

---

## Rate Limiting

Currently no rate limiting. For production, consider implementing:
- 100 requests per minute per user
- 1000 requests per hour per IP

---

## Pagination

Pagination can be added in future versions with:
- `?skip=0&limit=10` parameters
- Response format with `total` and `items`

---

## Examples

### Complete User Flow

```bash
# 1. Register
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "pass123"
  }'

# 2. Login
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "pass123"
  }'

# Store token from response
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# 3. Create Project
curl -X POST http://localhost:8000/api/projects \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Project",
    "description": "My first project"
  }'

# 4. Create Task
curl -X POST http://localhost:8000/api/tasks \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "First Task",
    "description": "Complete first task",
    "status": "todo",
    "project_id": 1
  }'

# 5. Get Stats
curl -X GET http://localhost:8000/api/dashboard/stats \
  -H "Authorization: Bearer $TOKEN"
```

---

## OpenAPI/Swagger Documentation

Access interactive API documentation at:
- http://localhost:8000/docs (Swagger UI)
- http://localhost:8000/redoc (ReDoc)

---

For more information, see main README.md
