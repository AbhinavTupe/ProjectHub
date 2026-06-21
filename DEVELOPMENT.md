# DEVELOPMENT GUIDE

## Getting Started for Developers

This guide helps developers understand the project structure and how to contribute.

## Understanding the Architecture

### Frontend Architecture

**Three-Tier Structure**:

1. **Presentation Layer** (`components/`, `pages/`)
   - React components
   - Page layouts
   - UI components (Button, Input, Card, etc.)

2. **Business Logic Layer** (`services/`, `hooks/`)
   - API calls via services
   - Custom hooks for state management
   - Authentication logic

3. **Data Layer** (`types/`, `utils/`)
   - TypeScript interfaces
   - Helper functions
   - Utility functions

**Data Flow**:
```
User Interaction → Component → Hook → Service → API → Backend → Response → State → Re-render
```

### Backend Architecture

**Layered Structure**:

1. **API Layer** (`api/`)
   - Route handlers
   - Request/response handling
   - Dependency injection

2. **Business Logic Layer** (`models/`, `auth/`)
   - Database models
   - Authentication logic
   - Business rules

3. **Data Layer** (`database/`, `schemas/`)
   - Database configuration
   - ORM setup
   - Data validation (Pydantic)

**Request Flow**:
```
HTTP Request → Route Handler → Dependency Injection → Database Query → Response
```

## Adding Features

### Adding a New Frontend Component

1. Create file in `frontend/src/components/YourComponent.tsx`:

```typescript
import React from 'react';

interface YourComponentProps {
  // Props here
}

export const YourComponent: React.FC<YourComponentProps> = (props) => {
  return (
    <div>
      {/* Component content */}
    </div>
  );
};
```

2. Export from `frontend/src/components/index.ts`
3. Import and use in pages

### Adding a New API Endpoint

1. Create file in `backend/app/api/yourfeature.py`:

```python
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.auth import get_current_user
from app.models.user import User

router = APIRouter()

@router.get("/yourfeature")
def your_endpoint(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Your logic here
    return {"message": "Success"}
```

2. Register in `backend/app/main.py`:

```python
from app.api import yourfeature
app.include_router(yourfeature.router, prefix="/api/yourfeature")
```

3. Update frontend service in `frontend/src/services/api.ts`

### Adding a New Database Model

1. Create file in `backend/app/models/yourmodel.py`:

```python
from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from app.models.base import Base

class YourModel(Base):
    __tablename__ = "your_models"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)
```

2. Import in `backend/app/models/__init__.py`
3. Tables are created automatically on next run

### Adding Validation (Pydantic Schema)

1. Create in `backend/app/schemas/yourmodel.py`:

```python
from pydantic import BaseModel
from datetime import datetime

class YourModelBase(BaseModel):
    name: str

class YourModelCreate(YourModelBase):
    pass

class YourModelResponse(YourModelBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True
```

## Code Style Guidelines

### Frontend (TypeScript/React)

**File Naming**:
- Components: `MyComponent.tsx`
- Pages: `MyPage.tsx`
- Hooks: `useMyHook.ts`
- Services: `myService.ts`

**Component Structure**:
```typescript
// 1. Imports
import React, { useState } from 'react';
import { Button } from '@/components';

// 2. Interface/Types
interface MyComponentProps {
  title: string;
}

// 3. Component
export const MyComponent: React.FC<MyComponentProps> = ({ title }) => {
  // Hooks
  const [state, setState] = useState('');
  
  // Handlers
  const handleClick = () => {
    // Logic
  };
  
  // Render
  return <div>{title}</div>;
};
```

**Styling**:
- Use Tailwind CSS classes
- Keep styles in className
- Use consistent spacing (gap, padding, margin)

### Backend (Python)

**File Naming**:
- Models: `user.py`, `project.py`
- Routes: `auth.py`, `projects.py`
- Schemas: `user.py`, `project.py`

**Code Structure**:
```python
# 1. Imports
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

# 2. Router setup
router = APIRouter()

# 3. Routes
@router.get("/endpoint")
def endpoint(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    # Implementation
    return {}
```

**Best Practices**:
- Use type hints everywhere
- Use dependency injection
- Keep functions small and focused
- Handle errors explicitly

## Database Changes

### Adding a New Field to Model

1. Edit the model file:

```python
class YourModel(Base):
    __tablename__ = "your_models"
    
    id = Column(Integer, primary_key=True)
    # Add new field:
    new_field = Column(String, nullable=True)
```

2. Delete `backend/projecthub.db` (development only)
3. Restart backend - database will be recreated
4. Update corresponding Pydantic schema

### For Production (use Alembic):

```bash
cd backend
alembic revision --autogenerate -m "Add new field"
alembic upgrade head
```

## Testing

### Frontend Testing

```bash
cd frontend

# Run tests
npm run test

# Watch mode
npm run test -- --watch
```

Example test:
```typescript
import { render, screen } from '@testing-library/react';
import { Button } from '@/components';

describe('Button', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

### Backend Testing

```bash
cd backend

# Run tests
pytest

# With coverage
pytest --cov=app
```

Example test:
```python
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_register():
    response = client.post(
        "/api/auth/register",
        json={
            "name": "Test User",
            "email": "test@example.com",
            "password": "pass123"
        }
    )
    assert response.status_code == 200
```

## Performance Tips

### Frontend
- Use React.memo for expensive components
- Lazy load pages with React.lazy()
- Optimize images
- Use CSS-in-JS sparingly
- Profile with React DevTools

### Backend
- Use connection pooling
- Cache frequently accessed data
- Optimize database queries
- Use pagination for large datasets
- Add database indexes

## Security Best Practices

### Frontend
- Never store sensitive data in localStorage (besides JWT token)
- Validate user input before sending
- Use HTTPS in production
- Implement CSRF protection

### Backend
- Hash passwords with bcrypt
- Validate all inputs
- Use SQL parameterization (SQLAlchemy handles this)
- Implement rate limiting
- Use HTTPS in production
- Keep dependencies updated

## Debugging

### Frontend
1. Open browser DevTools (F12)
2. Check Console for errors
3. Check Network tab for API calls
4. Use React DevTools extension
5. Use VS Code debugger

### Backend
1. Check terminal output
2. Enable DEBUG=true
3. Check FastAPI docs at /docs
4. Use print() statements
5. Use VS Code Python debugger

## Useful Extensions

### VS Code
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- Python
- Pylance
- REST Client

### Browser
- React DevTools
- Redux DevTools
- Network Interceptor

## Contributing Workflow

1. Create a feature branch: `git checkout -b feature/my-feature`
2. Make changes
3. Test thoroughly
4. Commit with clear messages: `git commit -m "Add new feature"`
5. Push: `git push origin feature/my-feature`
6. Create pull request with description

## Common Tasks

### Update Dependencies

**Frontend**:
```bash
cd frontend
npm update
npm audit fix
```

**Backend**:
```bash
cd backend
pip list --outdated
pip install --upgrade package-name
```

### Formatting & Linting

**Frontend**:
```bash
# Format with Prettier (if configured)
npm run format

# Lint
npm run lint
```

**Backend**:
```bash
# Format with Black
black app/

# Lint with Pylint
pylint app/

# Type check with mypy
mypy app/
```

### Building for Production

**Frontend**:
```bash
cd frontend
npm run build
# Output in dist/
```

**Backend**:
```bash
# Use Gunicorn for production
gunicorn app.main:app --workers 4
```

## Resources

- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [SQLAlchemy Docs](https://docs.sqlalchemy.org/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

## Getting Help

1. Check existing code for similar patterns
2. Read API documentation
3. Search GitHub issues
4. Check Stack Overflow
5. Ask in development chat

---

Happy coding! 🚀
