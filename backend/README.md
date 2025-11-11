# OpenHealth Admin Backend

Backend API para el Sistema de Administración de Refugios OpenHealth.

## 🚀 Características

- ✅ FastAPI con WebSocket support
- ✅ SQLModel para ORM (Object-Relational Mapping)
- ✅ Autenticación JWT
- ✅ CORS habilitado
- ✅ Base de datos SQLite
- ✅ Gestión de usuarios, refugios, residentes, eventos y alertas
- ✅ Sistema de investigación y reportes

## 📋 Requisitos Previos

- Python 3.9+
- pip o conda
- Virtual environment (recomendado)

## 🔧 Instalación

### 1. Crear Virtual Environment

```bash
# En Linux/Mac
python -m venv venv
source venv/bin/activate

# En Windows
python -m venv venv
venv\Scripts\activate
```

### 2. Instalar Dependencias

```bash
pip install -r requirements.txt
```

### 3. Configurar Variables de Entorno

Crear un archivo `.env` en la carpeta backend:

```bash
cp .env.example .env
```

Editar `.env` y cambiar los valores según sea necesario:

```env
DATABASE_URL=sqlite:///./openhealth.db
SECRET_KEY=your-secret-key-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
DEBUG=True
API_VERSION=v1
```

### 4. Ejecutar la Aplicación

```bash
python main.py
```

La API estará disponible en: `http://localhost:8000`

## 📚 Documentación API

Una vez que el servidor esté corriendo, puedes acceder a:

- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

## 🗂️ Estructura del Proyecto

```
backend/
├── main.py           # Aplicación principal de FastAPI
├── models.py         # Modelos de base de datos (SQLModel)
├── schemas.py        # Esquemas de validación (Pydantic)
├── security.py       # Funciones de seguridad y JWT
├── config.py         # Configuración de la aplicación
├── requirements.txt  # Dependencias del proyecto
├── .env              # Variables de entorno
└── README.md         # Este archivo
```

## 📡 Endpoints Principales

### Autenticación
- `POST /api/auth/login` - Login de usuario
- `POST /api/auth/register` - Registrar nuevo usuario

### Usuarios
- `GET /api/users` - Obtener todos los usuarios
- `GET /api/users/{user_id}` - Obtener usuario específico

### Refugios
- `GET /api/shelters` - Obtener todos los refugios
- `GET /api/shelters/{shelter_id}` - Obtener refugio específico
- `POST /api/shelters` - Crear nuevo refugio

### Residentes
- `GET /api/residents` - Obtener todos los residentes
- `GET /api/shelters/{shelter_id}/residents` - Residentes de un refugio
- `POST /api/residents` - Crear nuevo residente

### Eventos
- `GET /api/events` - Obtener todos los eventos
- `POST /api/events` - Crear nuevo evento

### Alertas de Riesgo
- `GET /api/alerts` - Obtener todas las alertas
- `POST /api/alerts` - Crear nueva alerta

### Datos de Investigación
- `GET /api/research` - Obtener datos de investigación
- `POST /api/research` - Crear datos de investigación

### Health Check
- `GET /health` - Verificar estado del servidor

## 🔐 Autenticación

El backend usa JWT (JSON Web Tokens) para autenticación. 

### Flujo de Login:

1. Usuario envía credenciales a `/api/auth/login`
2. Servidor valida y retorna un token JWT
3. Cliente envía el token en el header `Authorization: Bearer <token>`

### Ejemplo con cURL:

```bash
# Login
curl -X POST "http://localhost:8000/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"password123"}'

# Usar el token
curl -X GET "http://localhost:8000/api/users" \
  -H "Authorization: Bearer <token>"
```

## 🗄️ Base de Datos

La aplicación usa SQLite por defecto. Los datos se almacenan en `openhealth.db`.

Para usar PostgreSQL o MySQL, cambiar `DATABASE_URL` en `.env`:

```env
# PostgreSQL
DATABASE_URL=postgresql://user:password@localhost/openhealth

# MySQL
DATABASE_URL=mysql+pymysql://user:password@localhost/openhealth
```

## 🧪 Testing

```bash
# Ejecutar tests
pytest

# Con cobertura
pytest --cov=.
```

## 🚀 Deployment

### Con Gunicorn (Producción):

```bash
pip install gunicorn
gunicorn main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

### Con Docker:

```bash
docker build -t openhealth-api .
docker run -p 8000:8000 openhealth-api
```

## 📝 Variables de Entorno Importantes

| Variable | Descripción | Ejemplo |
|----------|------------|---------|
| DATABASE_URL | URL de conexión a BD | sqlite:///./openhealth.db |
| SECRET_KEY | Clave para JWT | your-secret-key-here |
| ALGORITHM | Algoritmo JWT | HS256 |
| ACCESS_TOKEN_EXPIRE_MINUTES | Minutos hasta expiración de token | 30 |
| DEBUG | Modo debug | True |
| API_VERSION | Versión de la API | v1 |

## 🤝 Conexión con Frontend

El frontend en `/OpenHealth_admin` hace requests a:
- `http://localhost:8000/api/...`

Asegurate de que:
1. El backend está corriendo en puerto 8000
2. CORS está configurado correctamente
3. Los tokens JWT son enviados en requests autenticados

## ⚠️ Seguridad en Producción

Antes de deployar a producción:

- ✅ Cambiar `SECRET_KEY` en `.env`
- ✅ Cambiar `DEBUG=False`
- ✅ Usar una base de datos real (PostgreSQL/MySQL)
- ✅ Configurar HTTPS/SSL
- ✅ Implementar rate limiting
- ✅ Validar y sanitizar inputs
- ✅ Usar variables de entorno seguras

## 📞 Soporte

Para reportar issues o sugerencias, contacta al equipo de desarrollo.

## 📄 Licencia

ISC License
