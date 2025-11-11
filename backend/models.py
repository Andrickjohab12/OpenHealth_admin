from sqlmodel import SQLModel, Field, Relationship
from typing import Optional
from datetime import datetime

# Modelo de Usuario
class UserBase(SQLModel):
    username: str = Field(index=True, unique=True)
    email: Optional[str] = None
    full_name: Optional[str] = None
    role: str = Field(default="user")  # admin, director, volunteer

class User(UserBase, table=True):
    __tablename__ = "users"
    id: Optional[int] = Field(default=None, primary_key=True)
    hashed_password: str
    is_active: bool = Field(default=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    shelters: list["Shelter"] = Relationship(back_populates="manager")
    alerts: list["RiskAlert"] = Relationship(back_populates="created_by")

class UserResponse(UserBase):
    id: int
    created_at: datetime
    is_active: bool

# Modelo de Refugio
class ShelterBase(SQLModel):
    name: str = Field(index=True)
    location: str
    capacity: int
    current_occupancy: int = Field(default=0)
    phone: str
    email: str
    address: str
    manager_id: Optional[int] = Field(default=None, foreign_key="users.id")

class Shelter(ShelterBase, table=True):
    __tablename__ = "shelters"
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    manager: Optional[User] = Relationship(back_populates="shelters")
    residents: list["Resident"] = Relationship(back_populates="shelter")
    events: list["Event"] = Relationship(back_populates="shelter")

class ShelterResponse(ShelterBase):
    id: int
    created_at: datetime
    updated_at: datetime

# Modelo de Residente
class ResidentBase(SQLModel):
    name: str
    age: int
    gender: str
    phone: Optional[str] = None
    shelter_id: int = Field(foreign_key="shelters.id")
    status: str = Field(default="active")  # active, inactive, transferred

class Resident(ResidentBase, table=True):
    __tablename__ = "residents"
    id: Optional[int] = Field(default=None, primary_key=True)
    check_in_date: datetime = Field(default_factory=datetime.utcnow)
    check_out_date: Optional[datetime] = None
    
    shelter: Shelter = Relationship(back_populates="residents")

class ResidentResponse(ResidentBase):
    id: int
    check_in_date: datetime

# Modelo de Evento
class EventBase(SQLModel):
    title: str
    description: str
    event_date: datetime
    location: str
    shelter_id: int = Field(foreign_key="shelters.id")
    type: str  # training, meeting, emergency, etc.

class Event(EventBase, table=True):
    __tablename__ = "events"
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    shelter: Shelter = Relationship(back_populates="events")

class EventResponse(EventBase):
    id: int
    created_at: datetime

# Modelo de Alerta de Riesgo
class RiskAlertBase(SQLModel):
    title: str
    description: str
    risk_level: str = Field(default="medium")  # low, medium, high, critical
    shelter_id: int = Field(foreign_key="shelters.id")
    is_resolved: bool = Field(default=False)
    created_by_id: int = Field(foreign_key="users.id")

class RiskAlert(RiskAlertBase, table=True):
    __tablename__ = "risk_alerts"
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    resolved_at: Optional[datetime] = None
    
    created_by: User = Relationship(back_populates="alerts")

class RiskAlertResponse(RiskAlertBase):
    id: int
    created_at: datetime
    resolved_at: Optional[datetime] = None

# Modelo de Investigación
class ResearchDataBase(SQLModel):
    title: str
    description: str
    data_type: str  # survey, interview, observation
    shelter_id: int = Field(foreign_key="shelters.id")

class ResearchData(ResearchDataBase, table=True):
    __tablename__ = "research_data"
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)

class ResearchDataResponse(ResearchDataBase):
    id: int
    created_at: datetime
