# URL Shortener

A full-stack URL management platform built with **Spring Boot and React** that allows users to shorten long URLs, securely manage their links, and analyze link usage through detailed click analytics.

The application focuses on **secure authentication, RESTful API design, relational data management, containerization, and scalable application architecture**.

## Features

* **🔗 URL Shortening** — Generate short, shareable URLs from long links.
* **📊 Analytics Dashboard** — View total click counts and link-level usage analytics.
* **👤 User Tracking** — Associate link interactions with authenticated users.
* **🔐 Authentication & Authorization** — Secure user registration and login using JWT and Spring Security.
* **🗂️ Link Management** — Create, view, manage, and track personal shortened URLs.
* **⚡ RESTful API** — Backend APIs designed for clean and efficient client-server communication.
* **🎨 Modern Frontend** — Responsive single-page application built with React.
* **🐳 Containerized Development** — Docker and Docker Compose support for consistent environments.
* **📈 Monitoring Ready** — Application architecture supports integration with monitoring and observability tools.

---

## Tech Stack

### Backend
| Technology | Purpose | Version / Details |
|---|---|---|
| **Java** | Backend programming language | Java 21 |
| **Spring Boot** | REST API & web framework | 3.4.1 |
| **Spring Security** | Authentication, authorization & filter chain | Stateless security with BCrypt hashing |
| **JSON Web Tokens (JJWT)** | Stateless authentication tokens | `io.jsonwebtoken:jjwt` 0.12.6 |
| **Spring Data JPA & Hibernate** | Object-relational mapping & database persistence | Automatic schema management & repositories |
| **Spring Boot Actuator & Micrometer** | Health metrics & Prometheus observability | `micrometer-registry-prometheus` |
| **Lombok** | Boilerplate reduction (getters, setters, constructors) | 1.18.28 |
| **Maven & Maven Wrapper** | Build automation & dependency management | Included `mvnw` & `mvnw.cmd` |

### Database
| Technology | Purpose | Configuration |
|---|---|---|
| **PostgreSQL** | Cloud relational database persistence | Render-hosted PostgreSQL configuration |
| **MySQL 8.0** | Local/containerized relational database | Docker Compose pre-configured on port 3307 |
| **JPA / Hibernate** | Schema generation & query execution | `ddl-auto=update` |

### Frontend
| Technology | Purpose | Version / Details |
|---|---|---|
| **React** | Single-page application library | 18.3.1 |
| **Vite** | Build tool and dev server | 6.2.1 |
| **Tailwind CSS** | Utility-first CSS styling | 3.4.17 |
| **Material UI (@mui/material)** | UI components and icons | 6.3.1 |
| **React Query (@tanstack/react-query)** | Server state management & caching | 3.39.3 |
| **Chart.js & React-Chartjs-2** | Click analytics visualization & bar charts | 4.4.7 / 5.3.0 |
| **React Router DOM** | Client-side routing & subdomain support | 7.1.1 |
| **React Hook Form** | Form handling & input validation | 7.54.2 |
| **Axios** | HTTP client for REST API communication | 1.7.9 |
| **Vanta.js & Three.js** | Interactive background visual effects | Three 0.180.0 / Vanta 0.5.24 |
| **React Hot Toast & Toastify** | User feedback notifications | Toast notifications |

### DevOps & Infrastructure
* **Containerization (Implemented)**: Dockerfiles for backend multi-stage build (`eclipse-temurin:21-jdk` / `23-jre`) and frontend (`node:18-alpine` with `serve` or Vite dev mode), plus multi-container `docker-compose.yaml` (MySQL 8.0 + Spring Boot).
* **Cloud & CI/CD (Architecture / Deployment)**: Deployed backend on Render, frontend on Vercel, with architectural readiness for Prometheus/Grafana metrics, Jenkins CI/CD, and Kubernetes orchestration.

---

## System Architecture

```text
                    ┌─────────────────────┐
                    │       React UI      │
                    │   React + Axios     │
                    └──────────┬──────────┘
                               │
                               │ HTTP / REST
                               ▼
                    ┌─────────────────────┐
                    │    Spring Boot API  │
                    │                     │
                    │  REST Controllers   │
                    │  Service Layer      │
                    │  Security Layer     │
                    └──────────┬──────────┘
                               │
                  ┌────────────┴────────────┐
                  │                         │
                  ▼                         ▼
        ┌─────────────────┐       ┌─────────────────┐
        │ Spring Security │       │  Spring Data JPA│
        │      + JWT      │       │   + Hibernate   │
        └─────────────────┘       └────────┬────────┘
                                           │
                                           ▼
                                  ┌─────────────────┐
                                  │ PostgreSQL/MySQL │
                                  └─────────────────┘
```

---

## Authentication Flow

The application uses **JWT-based stateless authentication**.

```text
User
 │
 │ Login
 ▼
Spring Boot API
 │
 │ Validate credentials
 ▼
Spring Security
 │
 │ Generate JWT
 ▼
Client
 │
 │ Authorization: Bearer <JWT>
 ▼
Protected API
 │
 │ Validate token
 ▼
Authorized Request
```

This allows protected resources to be accessed without maintaining traditional server-side sessions.

---

## URL Shortening Flow

```text
User submits long URL
          │
          ▼
    Backend validates
          │
          ▼
 Generate unique short code
          │
          ▼
 Store URL + owner
          │
          ▼
 Return shortened URL
          │
          ▼
 User opens short URL
          │
          ▼
 Record click analytics
          │
          ▼
 Redirect to original URL
```

---

## Analytics

The application tracks link usage and provides analytics for authenticated users.

Tracked information can include:

* Total number of clicks
* Link-specific usage
* Authenticated user interactions
* Timestamp-based activity

This allows users to understand how their shortened links are being used.

---

## Project Structure

```text
URLShortener-main/
│
├── Url-Shortner-sb/                      # Backend (Spring Boot 3.4.1, Java 21)
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/url/shortner/
│   │   │   │   ├── controllers/         # Auth, Redirect, Health, UrlMapping
│   │   │   │   ├── dtos/                # Login, Register, UrlMapping, ClickEvent
│   │   │   │   ├── exceptions/          # GlobalExceptionHandler
│   │   │   │   ├── models/              # User, UrlMapping, ClickEvent JPA entities
│   │   │   │   ├── repository/          # Spring Data JPA repositories
│   │   │   │   ├── security/            # WebSecurityConfig, WebConfig (CORS)
│   │   │   │   │   └── jwt/             # JwtUtils, JwtAuthenticationFilter
│   │   │   │   ├── service/             # UserService, UrlMappingService, UserDetails
│   │   │   │   └── UrlShortnerSbApplication.java
│   │   │   └── resources/
│   │   │       └── application.properties # Server port 9090, DB & JWT configs
│   │   └── test/                        # Backend unit & integration tests
│   ├── Dockerfile                       # Multi-stage Java 21 build -> Java 23 JRE run
│   ├── docker-compose.yaml              # Local MySQL 8.0 container + backend container
│   ├── Shortify.postman_collection.json # Ready-to-import Postman test collection
│   ├── pom.xml                          # Maven dependencies & build plugins
│   ├── mvnw & mvnw.cmd                  # Maven wrappers
│   └── README.md                        # Backend-specific instructions
│
├── Url-Shortner-Frontend/                # Frontend (React 18 + Vite 6 + Tailwind CSS)
│   ├── src/
│   │   ├── apis/                        # Axios instance configuration
│   │   ├── components/                  # Navbar, Footer, LandingPage, AboutPage, Login, Register
│   │   │   └── Dashboard/               # DashboardLayout, Graph, ShortenItem, CreateNewShorten
│   │   ├── contextApi/                  # React Context for JWT auth state
│   │   ├── hooks/                       # Custom React Query hooks (useFetchMyShortUrls, etc.)
│   │   ├── utils/                       # Constants, helper functions & subdomain handler
│   │   ├── App.jsx                      # App root with toast and router
│   │   ├── AppRouter.jsx                # Route definitions & subdomain switch
│   │   ├── PrivateRoute.jsx             # Protected route guard
│   │   └── main.jsx                     # Vite entry point
│   ├── Dockerfile                       # Production container (build -> serve on 5173)
│   ├── nonginx.Dockerfile               # Dev mode container
│   ├── package.json                     # Frontend dependencies & scripts
│   ├── tailwind.config.js               # Tailwind design tokens & themes
│   └── vite.config.js                   # Vite configuration
│
└── README.md                            # Main project documentation
```

---

## Getting Started

### Prerequisites

Make sure the following are installed on your machine:

* **JDK 21** (or JDK 17+)
* **Node.js 18+** & **npm**
* **Maven 3.8+** (or use the included `./mvnw` wrapper)
* **Docker & Docker Compose** (optional for containerized setup)
* **MySQL 8.0** or **PostgreSQL** database

---

## 1. Clone the Repository

```bash
git clone https://github.com/srisaisrinivashpanda/UrlShortner.git
cd UrlShortner
```

---

## 2. Database Configuration

You can use either **PostgreSQL** or **MySQL**.

Configure database credentials and connection parameters in:
```text
Url-Shortner-sb/src/main/resources/application.properties
```

#### Option A: PostgreSQL (Default / Render Cloud / Local)
```properties
server.port=9090
spring.datasource.url=jdbc:postgresql://localhost:5432/urlshortenerdb
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.datasource.driver-class-name=org.postgresql.Driver
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=update
```

#### Option B: MySQL (Local / Docker)
```properties
server.port=9090
spring.datasource.url=jdbc:mysql://localhost:3306/urlshortenerdb?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=your_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.hibernate.ddl-auto=update
```

Configure your JWT secrets and CORS client URL:
```properties
jwt.secret=your_64_character_hex_or_base64_secret_key
jwt.expiration=172800000
frontend.url=http://localhost:5173
```

---

## 3. Run the Backend

Navigate to the Spring Boot directory:

```bash
cd Url-Shortner-sb
```

Build the project:
```bash
./mvnw clean install
```
*(On Windows Command Prompt, use `mvnw.cmd clean install`)*

Run the Spring Boot application:
```bash
./mvnw spring-boot:run
```

The backend starts on port **9090**:
* API Base URL: `http://localhost:9090`
* Health Check: `http://localhost:9090/health`
* Actuator: `http://localhost:9090/actuator/health`

---

## 4. Run the Frontend

Open a new terminal window:

```bash
cd Url-Shortner-Frontend
```

Create or verify `.env`:
```env
VITE_BACKEND_URL=http://localhost:9090
VITE_REACT_FRONT_END_URL=http://localhost:5173
VITE_REACT_SUBDOMAIN=http://url.localhost:5173
```

Install dependencies:
```bash
npm install
```

Start the Vite development server:
```bash
npm run dev
```

The frontend application will be running at:
```text
http://localhost:5173
```

---

## 5. Docker Setup (Local Full Stack)

You can launch the entire stack (PostgreSQL 16 + Spring Boot Backend + React/Nginx Frontend) with a single command from the project root:

```bash
docker compose up --build -d
```

Services exposed:
* **Frontend SPA**: `http://localhost` (Port 80)
* **Backend REST API**: `http://localhost:9090`
* **PostgreSQL Database**: `localhost:5432`

To stop all services:
```bash
docker compose down
```

---

## 6. Production Deployment Guide

This project is configured and validated for modern cloud deployment.

### Strategy 1: One-Click Render Blueprint (Recommended)
This repository includes a [`render.yaml`](./render.yaml) file configuring:
1. **Managed PostgreSQL Database** (`shortify-db`)
2. **Spring Boot Backend Web Service** (`shortify-backend`) with health checks on `/health` and JVM container optimization
3. **React Static Site** (`shortify-frontend`) with SPA rewrites

**Steps:**
1. Push your repository to GitHub.
2. Log in to [Render](https://render.com) and go to **Blueprints**.
3. Click **New Blueprint Instance** and select your GitHub repository.
4. Render will read `render.yaml` and provision all 3 services automatically with secure environment variable linking.

---

### Strategy 2: Hybrid Cloud (Render Backend + Vercel / Netlify Frontend)

#### Step 1: Deploy Database (PostgreSQL)
1. Create a free PostgreSQL instance on [Render](https://render.com), [Neon](https://neon.tech), or [Supabase](https://supabase.com).
2. Copy the JDBC connection URL or parameters:
   - Host, Database Name, Username, Password, Port (5432).

#### Step 2: Deploy Spring Boot Backend (Render / Railway)
1. In Render, select **New > Web Service** and connect your GitHub repo.
2. **Root Directory**: `Url-Shortner-sb`
3. **Runtime**: `Docker` (uses [`Url-Shortner-sb/Dockerfile`](./Url-Shortner-sb/Dockerfile))
4. **Environment Variables**:
   * `PORT`: `9090` (Render will route public traffic to this port)
   * `SPRING_DATASOURCE_URL`: `jdbc:postgresql://<host>:5432/<dbname>?sslmode=require`
   * `SPRING_DATASOURCE_USERNAME`: `<db_username>`
   * `SPRING_DATASOURCE_PASSWORD`: `<db_password>`
   * `JWT_SECRET`: Generate a secure 64-character random string
   * `JWT_EXPIRATION`: `172800000` (48 hours)
   * `FRONTEND_URL`: `https://your-frontend.vercel.app` (supports comma-separated origins)
5. **Health Check Path**: `/health`
6. Deploy the web service and copy the backend URL (e.g. `https://shortify-api.onrender.com`).

#### Step 3: Deploy React Frontend (Vercel / Netlify)
1. Go to [Vercel](https://vercel.com) or [Netlify](https://netlify.com) and import the repository.
2. **Root Directory**: `Url-Shortner-Frontend`
3. **Framework Preset**: `Vite`
4. **Build Command**: `npm run build`
5. **Output Directory**: `dist`
6. **Environment Variables**:
   * `VITE_BACKEND_URL`: `https://shortify-api.onrender.com` (your backend URL from Step 2)
   * `VITE_REACT_FRONT_END_URL`: `https://your-frontend.vercel.app` (your frontend public domain)
   * `VITE_REACT_SUBDOMAIN`: `https://your-frontend.vercel.app`
7. Click **Deploy**.
   *(Note: SPA routing is pre-configured via `vercel.json` for Vercel and `public/_redirects` for Netlify)*

---

### Strategy 3: Self-Hosted VPS / Cloud Server (Docker & Nginx)
1. SSH into your VPS (Ubuntu/Debian, EC2, DigitalOcean Droplet, Linode).
2. Install Docker & Docker Compose:
   ```bash
   sudo apt update && sudo apt install docker.io docker-compose-v2 -y
   ```
3. Clone repository and set up environment:
   ```bash
   git clone https://github.com/srisaisrinivashpanda/UrlShortner.git
   cd UrlShortner
   ```
4. Configure production environment variables in `.env` or in `docker-compose.yaml`:
   ```bash
   cp Url-Shortner-sb/.env.example Url-Shortner-sb/.env
   cp Url-Shortner-Frontend/.env.example Url-Shortner-Frontend/.env
   ```
5. Launch the containers in detached mode:
   ```bash
   docker compose up -d --build
   ```
6. (Optional) Point your domain's DNS `A` records to your VPS IP and set up Certbot SSL with Let's Encrypt.

---

## Environment Variables

For local development, sensitive configuration should be provided through environment variables rather than committed to the repository.

Example:

```env
DB_URL=jdbc:postgresql://localhost:5432/urlshortener_db
DB_USERNAME=your_username
DB_PASSWORD=your_password

JWT_SECRET=your_secret_key
```

> Never commit production credentials, private keys, JWT secrets, or database passwords to the repository.

---

## API Overview

The backend exposes RESTful APIs for authentication, link management, redirection, analytics, and monitoring.

### 1. Public Authentication Endpoints
No authentication required.

| Method | Endpoint | Description | Request Body |
|---|---|---|---|
| `POST` | `/api/auth/public/register` | Register a new user | `{ "username": "...", "email": "...", "password": "..." }` |
| `POST` | `/api/auth/public/login` | Authenticate user & receive JWT | `{ "username": "...", "password": "..." }` |

### 2. URL Management & Analytics Endpoints
Requires Header: `Authorization: Bearer <JWT_TOKEN>`.

| Method | Endpoint | Description | Query / Body |
|---|---|---|---|
| `POST` | `/api/urls/shorten` | Generate unique 8-character short URL | Body: `{ "originalUrl": "https://..." }` |
| `GET` | `/api/urls/myurls` | Fetch all shortened URLs for the logged-in user | None |
| `PUT` | `/api/urls/{shortUrl}` | Update target original URL while retaining short code | Body: `{ "originalUrl": "https://..." }` |
| `DELETE` | `/api/urls/{shortUrl}` | Delete shortened URL and cascade delete click events | Path: `shortUrl` code |
| `GET` | `/api/urls/analytics/{shortUrl}` | Get click counts grouped by date for a specific link | Params: `startDate` (`ISO_LOCAL_DATE_TIME`), `endDate` |
| `GET` | `/api/urls/totalClicks` | Get total daily click aggregate across all user links | Params: `startDate` (`ISO_LOCAL_DATE`), `endDate` |

### 3. Redirection & Health
Public endpoints.

| Method | Endpoint | Description | Response |
|---|---|---|---|
| `GET` | `/{shortUrl}` | Redirects to original destination URL and logs click | `HTTP 302` Found (Location header) or `404` |
| `GET` | `/health` | Application health check status | Returns `"OK"` |
| `GET` | `/actuator/prometheus` | Prometheus formatted application metrics | Metric stream |

### Postman Collection
A pre-configured Postman test collection with sample requests and environments is provided at:
```text
Url-Shortner-sb/Shortify.postman_collection.json
```

---

## Security

Security is an important part of the application.

Implemented security mechanisms include:

* JWT-based authentication
* Spring Security
* Role/resource-based authorization
* Protected API endpoints
* Secure password handling
* Stateless authentication
* Input validation
* Environment-based secret management

Security configuration should be reviewed and hardened further before production deployment.

---

## Scalability & Reliability

The project is structured to support future scaling through:

* Stateless JWT authentication
* RESTful API architecture
* Containerization
* Database-backed persistence
* Kubernetes-based orchestration
* CI/CD automation
* Application monitoring
* Infrastructure as Code

Potential future improvements include:

* Redis-based caching
* Distributed rate limiting
* Message queues for analytics processing
* Database indexing optimization
* Horizontal API scaling
* Centralized logging
* Automated integration testing
* Production-grade observability

---

## Monitoring

The planned monitoring stack includes:

```text
Application
     │
     ▼
Prometheus
     │
     ▼
   Metrics
     │
     ▼
 Grafana
     │
     ▼
Dashboards
```

This architecture can be used to monitor:

* Application health
* API performance
* Request rates
* Error rates
* Resource utilization
* Infrastructure metrics

---

## CI/CD

The project can be integrated with Jenkins to automate:

```text
Git Push
   │
   ▼
Build
   │
   ▼
Run Tests
   │
   ▼
Build Docker Image
   │
   ▼
Deploy
```

Infrastructure automation can be managed using **Terraform and Ansible**, while Kubernetes can be used for container orchestration.

---

## Project Status Matrix

| Component / Feature | Status | Notes |
|---|---|---|
| **JWT Authentication & Registration** | **COMPLETE** | BCrypt password encryption, stateless JWT filter chain |
| **URL Shortening & Collision Handling** | **COMPLETE** | 8-character alphanumeric random code with uniqueness validation |
| **HTTP 302 Redirection & Click Logging** | **COMPLETE** | Fast redirection with timestamped `ClickEvent` generation |
| **Interactive Analytics Dashboard** | **COMPLETE** | Chart.js bar graph for total clicks and link-level trends |
| **Link Management (Edit & Delete)** | **COMPLETE** | In-place URL update, cascade deletion of click events |
| **Responsive React SPA Frontend** | **COMPLETE** | React 18, Vite 6, Tailwind CSS, Material UI, Vanta effects |
| **Docker & Docker Compose Setup** | **COMPLETE** | Multi-stage Dockerfiles + MySQL 8 / Spring Boot Compose |
| **Actuator & Prometheus Metric Export** | **COMPLETE** | Micrometer Prometheus starter integrated |
| **Postman API Collection** | **COMPLETE** | Included in repository (`Shortify.postman_collection.json`) |
| **Redis Caching Layer** | **PLANNED** | High-speed cache for redirection lookups |
| **Message Queue (RabbitMQ / Kafka)** | **PLANNED** | Asynchronous decoupling for high-throughput click event logging |
| **Rate Limiting & Abuse Prevention** | **PLANNED** | IP-level and token-bucket request throttling |
| **Kubernetes Helm Charts & Manifests** | **PLANNED** | Production cluster deployment configurations |
| **Automated CI/CD Pipeline** | **COMPLETE** | GitHub Actions build, test, and container packaging workflow |
