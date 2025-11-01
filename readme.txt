🏆 FootSport — Plataforma deportiva interactiva

FootSport es una aplicación web que combina pasión por el deporte con mecánicas de juego y competencia. Permite a los usuarios autenticarse, elegir su equipo favorito, seguir partidos en vivo, acceder a resultados y noticias, y participar en desafíos competitivos 5 vs 5 mediante salas privadas en tiempo real (funcionalidad en desarrollo).

- Características principales
- Autenticación segura con JWT y manejo de sesiones.
- Selección de equipo favorito y personalización de perfil deportivo.
- Noticias y resultados actualizados en tiempo real desde APIs deportivas.
- Sistema de puntos y recompensas: los usuarios ganan puntos participando y pueden canjearlos por sobres coleccionables.
- Modo competitivo (5 vs 5): enfrentamientos entre jugadores en salas privadas vía WebSocket (en progreso).
- Arquitectura modular: Express + PostgreSQL + Prisma ORM.
- Enfoque escalable con buenas prácticas RESTful y separación de capas (controllers, services, middlewares).

🛠️ Stack Tecnológico
- Node.js, Express.js, PostgreSQL + Prisma ORM
- Autenticación	JWT, bcrypt
- Tiempo real (en progreso)	Socket.io
- Testing	Jest / Supertest
- Documentación	Swagger / Postman
- Despliegue	Render / Docker

⚙️ Instalación y uso

# Clonar el repositorio
git clone https://github.com/tuusuario/footsport.git
cd footsport

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Ejecutar migraciones de Prisma
npx prisma migrate dev

# Iniciar el servidor
npm run dev


Servidor disponible en:
👉 http://localhost:3000

🧩 Estructura del proyecto
footsport/
├── src/
│   ├── controllers/
│   ├── services/
│   ├── routes/
│   ├── middlewares/
│   ├── prisma/
│   └── utils/
├── prisma/
│   └── schema.prisma
├── tests/
├── .env.example
├── package.json
└── README.md

🧠 Próximas mejoras
- Integrar Socket.io para las salas 5 vs 5.
- Dashboard con estadísticas de usuario y ranking global.
- Chat en tiempo real entre competidores.
- Sistema de notificaciones push.
- Despliegue continuo (CI/CD) con GitHub Actions.

👨‍💻 Autor
Nicolás Romero  |  Backend Developer (Node.js / Express / PostgreSQL)

🔗 LinkedIn
 | 🌐 Portafolio
