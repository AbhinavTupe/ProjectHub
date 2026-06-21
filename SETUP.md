# SETUP INSTRUCTIONS

## Prerequisites

- Node.js 18+ (for frontend)
- Python 3.9+ (for backend)
- Git
- A code editor (VS Code recommended)

## Quick Start (5 minutes)

### 1. Backend Setup

```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Copy environment file
copy .env.example .env
# or on macOS/Linux:
cp .env.example .env

# Run backend
uvicorn app.main:app --reload
```

Backend will run on: **http://localhost:8000**
API Docs available at: **http://localhost:8000/docs**

### 2. Frontend Setup

```bash
# In a new terminal, navigate to frontend
cd frontend

# Install dependencies
npm install

# Copy environment file
copy .env.example .env
# or on macOS/Linux:
cp .env.example .env

# Run frontend
npm run dev
```

Frontend will run on: **http://localhost:5173**

## Testing the Application

1. **Open the App**: Navigate to http://localhost:5173
2. **Register**: Click "Sign Up" and create an account
3. **Login**: Use your credentials to login
4. **Create a Project**: Go to Projects page and create your first project
5. **Add Tasks**: Click on a project and add tasks
6. **Track Progress**: Update task statuses (Todo → In Progress → Completed)
7. **View Dashboard**: Check dashboard for statistics

## Default Configuration

### Backend (.env)

```
DATABASE_URL=sqlite:///./projecthub.db
SECRET_KEY=your-secret-key-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
DEBUG=true
ENVIRONMENT=development
```

### Frontend (.env)

```
VITE_API_URL=http://localhost:8000
```

## Project Structure

```
ProjectHub/
├── backend/
│   ├── app/
│   │   ├── api/           # API routes
│   │   ├── models/        # Database models
│   │   ├── schemas/       # Data validation
│   │   ├── auth/          # Authentication
│   │   └── main.py        # FastAPI app
│   ├── requirements.txt
│   ├── .env.example
│   └── .gitignore
│
└── frontend/
    ├── src/
    │   ├── components/    # React components
    │   ├── pages/         # Page components
    │   ├── services/      # API calls
    │   ├── hooks/         # Custom hooks
    │   ├── types/         # TypeScript types
    │   ├── utils/         # Helper functions
    │   └── routes/        # Route config
    ├── package.json
    ├── vite.config.ts
    ├── tsconfig.json
    └── index.html
```

## Available Commands

### Backend

```bash
# Run development server
uvicorn app.main:app --reload

# Run with specific port
uvicorn app.main:app --reload --port 8001

# Access API documentation
# Navigate to: http://localhost:8000/docs
```

### Frontend

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Common Issues & Solutions

### Issue: "Port 8000 already in use"

**Solution**:
```bash
# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :8000
kill -9 <PID>
```

### Issue: "Cannot find module 'app'"

**Solution**:
```bash
# Make sure you're in the backend directory and virtual environment is activated
cd backend
venv\Scripts\activate  # Windows
pip install -r requirements.txt
```

### Issue: "Module 'pydantic' not found"

**Solution**:
```bash
# Reinstall dependencies
pip install --upgrade -r requirements.txt
```

### Issue: "npm command not found"

**Solution**:
- Install Node.js from https://nodejs.org/
- Restart your terminal
- Verify: `node --version` and `npm --version`

### Issue: "CORS errors in browser console"

**Solution**:
- Make sure backend is running on http://localhost:8000
- Check frontend .env file has: `VITE_API_URL=http://localhost:8000`
- Clear browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)

## Database

The application uses SQLite by default. The database file will be created automatically as `projecthub.db` in the backend directory on first run.

To reset the database:

```bash
# Delete the database file
rm projecthub.db

# Restart the backend server
# Tables will be recreated automatically
```

## Production Deployment

### Deploy Backend to Render

1. Create account at https://render.com
2. Connect GitHub repository
3. Create Web Service with:
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0`
   - **Environment**: `ENVIRONMENT=production`

### Deploy Frontend to Vercel

1. Create account at https://vercel.com
2. Connect GitHub repository
3. Select frontend directory
4. Add environment variable: `VITE_API_URL=<your-backend-url>`

## Authentication Flow

1. User registers with email and password
2. Password is hashed with bcrypt
3. On login, JWT token is issued
4. Token is stored in localStorage
5. All API requests include Authorization header with token
6. Protected routes check token validity

## API Usage Example

```bash
# Register
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"pass123"}'

# Login
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"pass123"}'

# Create Project (requires token)
curl -X POST http://localhost:8000/api/projects \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"title":"My Project","description":"Project description"}'
```

## Next Steps

1. ✅ Backend and frontend running
2. ✅ User registration and login working
3. ✅ Projects and tasks CRUD operations
4. Deploy to production (Render + Vercel)
5. Add more features (file uploads, comments, team collaboration)
6. Add comprehensive test suite
7. Implement real-time updates with WebSockets

## Support

For issues, check:
1. Browser console (frontend errors)
2. Terminal output (backend errors)
3. Network tab (API calls)
4. See README.md for more details

---

**Happy coding!** 🚀
