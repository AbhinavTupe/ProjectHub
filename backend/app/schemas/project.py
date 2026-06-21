from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List


class ProjectBase(BaseModel):
    title: str
    description: Optional[str] = None


class ProjectCreate(ProjectBase):
    pass


class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None


class ProjectResponse(ProjectBase):
    id: int
    owner_id: int
    created_at: datetime

    class Config:
        from_attributes = True


class ProjectWithTasks(ProjectResponse):
    tasks: List["TaskResponse"] = []


class ProjectWithOwner(ProjectResponse):
    owner: Optional["UserResponse"] = None


from app.schemas.user import UserResponse
from app.schemas.task import TaskResponse
ProjectWithTasks.model_rebuild()
ProjectWithOwner.model_rebuild()
