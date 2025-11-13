from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel, create_engine, Session
from sqlmodel import select
from datetime import timedelta
from contextlib import asynccontextmanager

from config import get_settings
from models import (
    User, UserResponse, UserBase,
    Shelter, ShelterResponse, ShelterBase,
    Resident, ResidentResponse, ResidentBase,
    Event, EventResponse, EventBase,
    RiskAlert, RiskAlertResponse, RiskAlertBase,
    ResearchData, ResearchDataResponse, ResearchDataBase
)
from security import get_password_hash, verify_password, create_access_token, decode_token
from schemas import LoginRequest, TokenResponse

settings = get_settings()

# Configurar base de datos PostgreSQL
engine = create_engine(
    settings.database_url,
    echo=True,
    future=True,
    pool_pre_ping=True,
    pool_size=10,
    max_overflow=20,
)

def create_db_and_tables():
    """Crea las tablas en la base de datos"""
    SQLModel.metadata.create_all(engine)

def get_session():
    """Obtiene una sesión de base de datos"""
    with Session(engine) as session:
        yield session

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Crea las tablas al iniciar la aplicación"""
    create_db_and_tables()
    yield

# Crear aplicación FastAPI
app = FastAPI(
    title=settings.app_name,
    version=settings.api_version,
    lifespan=lifespan
)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==================== RUTAS DE AUTENTICACIÓN ====================

@app.post("/api/auth/login", response_model=TokenResponse)
async def login(credentials: LoginRequest, session: Session = Depends(get_session)):
    """Login del usuario"""
    # Buscar usuario en la base de datos
    statement = select(User).where(User.username == credentials.username)
    user = session.exec(statement).first()
    
    if not user or not verify_password(credentials.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciales inválidas",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Usuario inactivo"
        )
    
    access_token = create_access_token(
        data={"sub": user.username, "id": user.id, "role": user.role}
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": UserResponse.from_orm(user)
    }

@app.post("/api/auth/register", response_model=UserResponse)
async def register(user_data: UserBase, session: Session = Depends(get_session)):
    """Registrar nuevo usuario"""
    # Verificar si el usuario ya existe
    statement = select(User).where(User.username == user_data.username)
    existing_user = session.exec(statement).first()
    
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El usuario ya existe"
        )
    
    # Crear nuevo usuario
    db_user = User(
        username=user_data.username,
        email=user_data.email,
        full_name=user_data.full_name,
        role=user_data.role,
        hashed_password=get_password_hash("temp_password_123"),  # Cambiar esto
        is_active=True
    )
    
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    
    return UserResponse.from_orm(db_user)

# ==================== RUTAS DE USUARIOS ====================

@app.get("/api/users", response_model=list[UserResponse])
async def get_users(session: Session = Depends(get_session)):
    """Obtener todos los usuarios"""
    users = session.exec(select(User)).all()
    return [UserResponse.from_orm(user) for user in users]

@app.get("/api/users/{user_id}", response_model=UserResponse)
async def get_user(user_id: int, session: Session = Depends(get_session)):
    """Obtener un usuario específico"""
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuario no encontrado"
        )
    return UserResponse.from_orm(user)

# ==================== RUTAS DE REFUGIOS ====================

@app.get("/api/shelters", response_model=list[ShelterResponse])
async def get_shelters(session: Session = Depends(get_session)):
    """Obtener todos los refugios"""
    shelters = session.exec(select(Shelter)).all()
    return [ShelterResponse.from_orm(shelter) for shelter in shelters]

@app.get("/api/shelters/{shelter_id}", response_model=ShelterResponse)
async def get_shelter(shelter_id: int, session: Session = Depends(get_session)):
    """Obtener un refugio específico"""
    shelter = session.get(Shelter, shelter_id)
    if not shelter:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Refugio no encontrado"
        )
    return ShelterResponse.from_orm(shelter)

@app.post("/api/shelters", response_model=ShelterResponse)
async def create_shelter(shelter_data: ShelterBase, session: Session = Depends(get_session)):
    """Crear un nuevo refugio"""
    db_shelter = Shelter(**shelter_data.dict())
    session.add(db_shelter)
    session.commit()
    session.refresh(db_shelter)
    return ShelterResponse.from_orm(db_shelter)

# ==================== RUTAS DE RESIDENTES ====================

@app.get("/api/residents", response_model=list[ResidentResponse])
async def get_residents(session: Session = Depends(get_session)):
    """Obtener todos los residentes"""
    residents = session.exec(select(Resident)).all()
    return [ResidentResponse.from_orm(resident) for resident in residents]

@app.get("/api/shelters/{shelter_id}/residents", response_model=list[ResidentResponse])
async def get_shelter_residents(shelter_id: int, session: Session = Depends(get_session)):
    """Obtener residentes de un refugio específico"""
    statement = select(Resident).where(Resident.shelter_id == shelter_id)
    residents = session.exec(statement).all()
    return [ResidentResponse.from_orm(resident) for resident in residents]

@app.post("/api/residents", response_model=ResidentResponse)
async def create_resident(resident_data: ResidentBase, session: Session = Depends(get_session)):
    """Crear un nuevo residente"""
    db_resident = Resident(**resident_data.dict())
    session.add(db_resident)
    session.commit()
    session.refresh(db_resident)
    return ResidentResponse.from_orm(db_resident)

# ==================== RUTAS DE EVENTOS ====================

@app.get("/api/events", response_model=list[EventResponse])
async def get_events(session: Session = Depends(get_session)):
    """Obtener todos los eventos"""
    events = session.exec(select(Event)).all()
    return [EventResponse.from_orm(event) for event in events]

@app.post("/api/events", response_model=EventResponse)
async def create_event(event_data: EventBase, session: Session = Depends(get_session)):
    """Crear un nuevo evento"""
    db_event = Event(**event_data.dict())
    session.add(db_event)
    session.commit()
    session.refresh(db_event)
    return EventResponse.from_orm(db_event)

# ==================== RUTAS DE ALERTAS DE RIESGO ====================

@app.get("/api/alerts", response_model=list[RiskAlertResponse])
async def get_alerts(session: Session = Depends(get_session)):
    """Obtener todas las alertas de riesgo"""
    alerts = session.exec(select(RiskAlert)).all()
    return [RiskAlertResponse.from_orm(alert) for alert in alerts]

@app.post("/api/alerts", response_model=RiskAlertResponse)
async def create_alert(alert_data: RiskAlertBase, session: Session = Depends(get_session)):
    """Crear una nueva alerta de riesgo"""
    db_alert = RiskAlert(**alert_data.dict())
    session.add(db_alert)
    session.commit()
    session.refresh(db_alert)
    return RiskAlertResponse.from_orm(db_alert)

# ==================== RUTAS DE INVESTIGACIÓN ====================

@app.get("/api/research", response_model=list[ResearchDataResponse])
async def get_research_data(session: Session = Depends(get_session)):
    """Obtener todos los datos de investigación"""
    research = session.exec(select(ResearchData)).all()
    return [ResearchDataResponse.from_orm(r) for r in research]

@app.post("/api/research", response_model=ResearchDataResponse)
async def create_research_data(research_data: ResearchDataBase, session: Session = Depends(get_session)):
    """Crear nuevos datos de investigación"""
    db_research = ResearchData(**research_data.dict())
    session.add(db_research)
    session.commit()
    session.refresh(db_research)
    return ResearchDataResponse.from_orm(db_research)

# ==================== HEALTH CHECK ====================

@app.get("/health")
async def health_check():
    """Verificar que el servidor está funcionando"""
    return {"status": "healthy", "version": settings.api_version}

@app.get("/api")
async def root():
    """API raíz"""
    return {
        "app": settings.app_name,
        "version": settings.api_version,
        "status": "running"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
