# ProjectHub - Full-Stack Software Developer Portfolio Project

Welcome to ProjectHub! This is a production-ready MVP demonstrating full-stack development capabilities.

## 📋 Quick Navigation

- 🚀 **[SETUP.md](SETUP.md)** - Quick start guide (5 minutes)
- 📖 **[README.md](README.md)** - Complete project documentation
- 🔌 **[API.md](API.md)** - API endpoints reference
- 🚢 **[DEPLOYMENT.md](DEPLOYMENT.md)** - Deployment instructions
- 👨‍💻 **[DEVELOPMENT.md](DEVELOPMENT.md)** - Development guide

## ⚡ Quick Start

```bash
# Backend
cd backend
python -m venv venv
venv\Scripts\activate  # or: source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload

# Frontend (in new terminal)
cd frontend
npm install
npm run dev
```

Visit: **http://localhost:5173**

## 🎯 Project Overview

**ProjectHub** is a team collaboration and task management platform similar to Trello, Jira, or ClickUp.

### Key Features

✅ User authentication (Register, Login, JWT)
✅ Project management (Create, Read, Update, Delete)
✅ Task management with status tracking
✅ Dashboard with statistics
✅ User profiles
✅ Responsive design

### Tech Stack

- **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS
- **Backend**: FastAPI + SQLAlchemy + Pydantic + JWT
- **Database**: SQLite (PostgreSQL for production)
- **Deployment**: Vercel (Frontend) + Render (Backend)

## 📁 Project Structure

```
ProjectHub/
├── frontend/                 # React + TypeScript application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API integration
│   │   ├── hooks/           # Custom React hooks
│   │   ├── types/           # TypeScript definitions
│   │   ├── utils/           # Helper functions
│   │   └── routes/          # Routing configuration
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
│
├── backend/                 # FastAPI application
│   ├── app/
│   │   ├── api/            # Route handlers
│   │   ├── models/         # Database models
│   │   ├── schemas/        # Data validation
│   │   ├── database/       # DB configuration
│   │   ├── auth/           # Authentication
│   │   └── main.py         # FastAPI app
│   ├── requirements.txt
│   ├── .env.example
│   └── .gitignore
│
├── README.md               # Project documentation
├── SETUP.md               # Setup instructions
├── API.md                 # API documentation
├── DEPLOYMENT.md          # Deployment guide
├── DEVELOPMENT.md         # Developer guide
└── .gitignore
```

## 🔐 Authentication Flow

1. User registers with email/password
2. Password is hashed with bcrypt
3. On login, JWT token is issued
4. Token stored in browser localStorage
5. All API requests include Authorization header
6. Protected routes verify token validity

## 📊 Database Schema

### Users Table
```
id (PK)
name
email (UNIQUE)
password_hash
created_at
```

### Projects Table
```
id (PK)
title
description
owner_id (FK → Users)
created_at
```

### Tasks Table
```
id (PK)
title
description
status (todo | in_progress | completed)
project_id (FK → Projects)
created_at
```

## 🌐 API Endpoints

### Authentication
```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me
```

### Projects
```
GET    /api/projects
POST   /api/projects
GET    /api/projects/{id}
PUT    /api/projects/{id}
DELETE /api/projects/{id}
```

### Tasks
```
GET    /api/tasks
POST   /api/tasks
GET    /api/tasks/{id}
PUT    /api/tasks/{id}
DELETE /api/tasks/{id}
```

### Dashboard
```
GET    /api/dashboard/stats
```

## 🚀 Deployment

### Frontend → Vercel
1. Push to GitHub
2. Connect Vercel to GitHub
3. Deploy automatically

### Backend → Render
1. Push to GitHub
2. Create Web Service on Render
3. Set environment variables
4. Deploy

## 📝 Sample Data

Create test account with:
```
Email: test@example.com
Password: password123
```

Or register a new account in the application.

## 🛠️ Available Commands

### Frontend
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Lint code
```

### Backend
```bash
uvicorn app.main:app --reload          # Start dev server
uvicorn app.main:app --reload --port 8001  # Custom port
```

## 🔒 Security Features

✅ Password hashing with bcrypt
✅ JWT token-based authentication
✅ CORS protection
✅ Secure headers
✅ Input validation with Pydantic
✅ SQL injection prevention (SQLAlchemy)

## 📚 Learning Resources

- React Hooks: https://react.dev/reference/react
- FastAPI: https://fastapi.tiangolo.com/
- SQLAlchemy: https://docs.sqlalchemy.org/
- TypeScript: https://www.typescriptlang.org/docs/
- Tailwind CSS: https://tailwindcss.com/docs

## 🐛 Troubleshooting

**Backend won't start**
- Check Python version (3.9+)
- Activate virtual environment
- Run: `pip install -r requirements.txt`

**Frontend shows blank page**
- Check browser console for errors
- Ensure backend is running
- Verify `VITE_API_URL` in `.env`

**API calls failing**
- Check CORS in `backend/app/main.py`
- Verify authorization token is valid
- Check network tab in browser DevTools

## 📞 Support

For issues:
1. Check the relevant documentation (README, SETUP, API, DEPLOYMENT)
2. Review browser console and terminal logs
3. Check GitHub repository issues

## 📈 Future Enhancements

- [ ] Real-time updates with WebSockets
- [ ] File uploads
- [ ] Comments and mentions
- [ ] Team collaboration
- [ ] Activity logs
- [ ] Email notifications
- [ ] Advanced search
- [ ] Dashboard customization

## ✨ Portfolio Highlights

This project demonstrates:

✅ **Frontend Skills**
- React functional components with hooks
- TypeScript for type safety
- Component composition and reusability
- API integration with Axios
- Form handling with React Hook Form
- Responsive design with Tailwind CSS
- Routing with React Router
- State management best practices

✅ **Backend Skills**
- FastAPI modern web framework
- SQLAlchemy ORM
- Pydantic data validation
- JWT authentication
- Password hashing with bcrypt
- Database design and relationships
- RESTful API design
- Error handling and logging

✅ **Full-Stack Skills**
- Project structure and organization
- Environment configuration
- Git version control
- Documentation
- Testing approach
- Deployment readiness
- Security best practices
- Performance optimization

## 📄 License

Open source - available for portfolio use

## 👤 Author

Full-Stack Software Developer Internship Portfolio

---

**Ready to contribute?** See [DEVELOPMENT.md](DEVELOPMENT.md) for guidelines.

**Ready to deploy?** See [DEPLOYMENT.md](DEPLOYMENT.md) for instructions.

**Need to get started quickly?** See [SETUP.md](SETUP.md) for a 5-minute setup.

---

**Last Updated**: June 2026
**Status**: Production Ready
**Version**: 1.0.0
