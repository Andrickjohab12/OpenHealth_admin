# 🐘 Configuración de PostgreSQL para OpenHealth Admin

## 📋 Requisitos Previos

- PostgreSQL 12+ instalado
- psql (cliente de PostgreSQL) disponible
- Variables de entorno configuradas

## 🔧 Instalación de PostgreSQL

### En Ubuntu/Debian:

```bash
# Actualizar paquetes
sudo apt update

# Instalar PostgreSQL
sudo apt install postgresql postgresql-contrib

# Iniciar el servicio
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Verificar que está corriendo
sudo systemctl status postgresql
```

### En macOS:

```bash
# Usar Homebrew
brew install postgresql

# Iniciar servicio
brew services start postgresql

# Verificar
psql --version
```

### En Windows:

1. Descargar instalador desde [postgresql.org](https://www.postgresql.org/download/windows/)
2. Ejecutar el instalador
3. Recordar la contraseña del usuario `postgres`

---

## 🗄️ Crear la Base de Datos

### Opción 1: Usando psql

```bash
# Conectar como usuario postgres
sudo -u postgres psql

# O si tienes contraseña:
psql -U postgres
```

Una vez dentro de psql:

```sql
-- Crear usuario (si no existe)
CREATE USER openhealth_user WITH PASSWORD 'openhealth_password';

-- Crear base de datos
CREATE DATABASE openhealth OWNER openhealth_user;

-- Dar permisos
GRANT ALL PRIVILEGES ON DATABASE openhealth TO openhealth_user;

-- Salir
\q
```

### Opción 2: Usando comandos bash

```bash
# Crear usuario
sudo -u postgres createuser openhealth_user

# Crear base de datos
sudo -u postgres createdb -O openhealth_user openhealth

# Establecer contraseña (conectar primero como postgres)
sudo -u postgres psql -c "ALTER USER openhealth_user WITH PASSWORD 'openhealth_password';"
```

---

## 🔐 Configurar Variables de Entorno

Editar `.env` en el directorio `backend/`:

```bash
# DATABASE PostgreSQL
DB_USER=openhealth_user
DB_PASSWORD=openhealth_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=openhealth

# SECURITY
SECRET_KEY=your-super-secret-key-change-this-in-production-12345
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# API
DEBUG=True
API_VERSION=v1
```

---

## 📦 Instalar Dependencias Python

```bash
# Navegar al directorio backend
cd backend

# Instalar dependencias actualizadas (con PostgreSQL)
pip install -r requirements.txt

# O manualmente:
pip install psycopg2-binary
```

---

## 🚀 Ejecutar la Aplicación

```bash
# Desde el directorio backend
cd backend

# Ejecutar FastAPI con Uvicorn
python3 main.py

# O usar uvicorn directamente:
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

La aplicación debería crear las tablas automáticamente en la base de datos.

---

## ✅ Verificar la Conexión

### Desde psql:

```bash
# Conectar a la base de datos
psql -U openhealth_user -h localhost -d openhealth

# Ver tablas
\dt

# Ver estructura de tabla
\d "user"

# Salir
\q
```

### Desde Python:

```python
from sqlmodel import create_engine, Session
from sqlmodel import select
from models import User

database_url = "postgresql+psycopg2://openhealth_user:openhealth_password@localhost:5432/openhealth"

engine = create_engine(database_url, echo=True)

with Session(engine) as session:
    users = session.exec(select(User)).all()
    print(f"Total de usuarios: {len(users)}")
```

---

## 🐛 Troubleshooting

### Error: "psycopg2.OperationalError: could not connect to server"

**Solución:**
```bash
# Verificar que PostgreSQL está corriendo
sudo systemctl status postgresql

# Iniciar si no está corriendo
sudo systemctl start postgresql

# Verificar el host y puerto
psql -U postgres -h localhost -p 5432
```

### Error: "FATAL: role "openhealth_user" does not exist"

**Solución:**
```bash
# Crear el usuario
sudo -u postgres createuser openhealth_user

# O si necesitas especificar contraseña:
sudo -u postgres psql -c "CREATE USER openhealth_user WITH PASSWORD 'openhealth_password';"
```

### Error: "database "openhealth" does not exist"

**Solución:**
```bash
# Crear la base de datos
sudo -u postgres createdb -O openhealth_user openhealth
```

### Error: "FATAL: password authentication failed"

**Solución:**
```bash
# Verificar que las credenciales en .env son correctas
# Cambiar contraseña si es necesario:
sudo -u postgres psql -c "ALTER USER openhealth_user WITH PASSWORD 'nueva_contraseña';"

# Actualizar .env con la nueva contraseña
```

---

## 🔄 Migración de SQLite a PostgreSQL (si ya tienes datos)

### Paso 1: Exportar datos desde SQLite

```python
# export_sqlite_to_postgres.py
import sqlite3
import json
from sqlmodel import create_engine, Session, select
from models import User, Shelter, Resident, Event, RiskAlert, ResearchData

# Conectar a SQLite
sqlite_conn = sqlite3.connect('openhealth.db')
sqlite_cursor = sqlite_conn.cursor()

# Obtener datos de SQLite
sqlite_cursor.execute("SELECT * FROM 'user'")
users = sqlite_cursor.fetchall()

# Convertir a JSON para inspeccionar
print(json.dumps(users, indent=2, default=str))

sqlite_conn.close()
```

### Paso 2: Importar a PostgreSQL

```python
# import_to_postgres.py
from sqlmodel import create_engine, Session
from models import User, Shelter, Resident, Event, RiskAlert, ResearchData

pg_engine = create_engine(
    "postgresql+psycopg2://openhealth_user:openhealth_password@localhost:5432/openhealth"
)

# Crear tablas
from sqlmodel import SQLModel
SQLModel.metadata.create_all(pg_engine)

# Importar datos
with Session(pg_engine) as session:
    # Insertar usuarios
    for user_data in users:
        user = User(**user_data)
        session.add(user)
    
    session.commit()
    print("✅ Datos importados exitosamente")
```

---

## 📊 Monitorear PostgreSQL

### Ver conexiones activas:

```sql
SELECT datname, usename, client_addr, state FROM pg_stat_activity;
```

### Ver tamaño de la base de datos:

```sql
SELECT pg_database.datname, pg_size_pretty(pg_database_size(pg_database.datname)) 
FROM pg_database 
ORDER BY pg_database_size(pg_database.datname) DESC;
```

### Ver tamaño de tablas:

```sql
SELECT schemaname, tablename, pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) 
FROM pg_tables 
WHERE schemaname NOT IN ('pg_catalog', 'information_schema') 
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

---

## 🔐 Seguridad en Producción

### Cambiar la contraseña:

```sql
ALTER USER openhealth_user WITH PASSWORD 'nueva_contraseña_segura';
```

### Crear usuario de solo lectura (para backups):

```sql
CREATE USER openhealth_readonly WITH PASSWORD 'readonly_password';
GRANT CONNECT ON DATABASE openhealth TO openhealth_readonly;
GRANT USAGE ON SCHEMA public TO openhealth_readonly;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO openhealth_readonly;
```

### Habilitar SSL:

En `postgresql.conf`:
```
ssl = on
ssl_cert_file = 'server.crt'
ssl_key_file = 'server.key'
```

---

## 📚 Comandos Útiles de PostgreSQL

```bash
# Conectar a la base de datos
psql -U openhealth_user -h localhost -d openhealth

# Listar bases de datos
\l

# Listar usuarios
\du

# Cambiar a una base de datos
\c openhealth

# Listar tablas
\dt

# Ver estructura de tabla
\d "user"

# Ver privilegios
\dp

# Salir
\q
```

---

## ✨ Siguiente Paso

Una vez configurado PostgreSQL:

```bash
cd backend
pip install -r requirements.txt
python3 main.py
```

Accede a la documentación interactiva en: **http://localhost:8000/docs**
