from pydantic import BaseModel
from typing import Optional
from datetime import datetime

# ==================== ESQUEMAS DE AUTENTICACIÓN ====================

class LoginRequest(BaseModel):
    username: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    user: dict

class TokenData(BaseModel):
    username: Optional[str] = None
    user_id: Optional[int] = None
    role: Optional[str] = None

# ==================== ESQUEMAS DE USUARIOS ====================

class UserLoginResponse(BaseModel):
    id: int
    username: str
    email: Optional[str]
    full_name: Optional[str]
    role: str
    is_active: bool

# ==================== ESQUEMAS DE REFUGIOS ====================

class ShelterStats(BaseModel):
    total_capacity: int
    total_occupancy: int
    occupancy_rate: float
    active_shelters: int

# ==================== ESQUEMAS DE DASHBOARD ====================

class DashboardStats(BaseModel):
    total_residents: int
    total_shelters: int
    active_alerts: int
    upcoming_events: int
    shelter_stats: ShelterStats

# ==================== ESQUEMAS DE REPORTES ====================

class ReportRequest(BaseModel):
    shelter_id: Optional[int] = None
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    report_type: str  # occupancy, alerts, events, etc.

class ReportData(BaseModel):
    title: str
    description: str
    data: dict
    generated_at: datetime
