from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.database.session import get_db
from app.models.user import User
from app.models.project import Project
from app.models.task import Task, TaskStatus
from app.auth import get_current_user

router = APIRouter()


@router.get("/stats")
def get_dashboard_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Get statistics for current user
    total_projects = db.query(func.count(Project.id)).filter(
        Project.owner_id == current_user.id
    ).scalar() or 0
    
    # Get all tasks for user's projects
    user_project_ids = db.query(Project.id).filter(
        Project.owner_id == current_user.id
    ).all()
    project_ids = [p[0] for p in user_project_ids]
    
    total_tasks = db.query(func.count(Task.id)).filter(
        Task.project_id.in_(project_ids)
    ).scalar() or 0
    
    completed_tasks = db.query(func.count(Task.id)).filter(
        Task.project_id.in_(project_ids),
        Task.status == TaskStatus.COMPLETED
    ).scalar() or 0
    
    pending_tasks = total_tasks - completed_tasks
    
    return {
        "total_projects": total_projects,
        "total_tasks": total_tasks,
        "completed_tasks": completed_tasks,
        "pending_tasks": pending_tasks
    }
