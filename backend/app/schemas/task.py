from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List


class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    status: Optional[str] = "todo"


class TaskCreate(TaskBase):
    project_id: int


class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None


class TaskResponse(TaskBase):
    id: int
    project_id: int
    created_at: datetime

    class Config:
        from_attributes = True


class TaskWithProject(TaskResponse):
    project: Optional["ProjectResponse"] = None


from app.schemas.project import ProjectResponse
TaskWithProject.model_rebuild()
