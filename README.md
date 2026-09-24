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

| Technology          | Purpose                                    |
| ------------------- | ------------------------------------------ |
| **Java 17+**        | Primary backend programming language       |
| **Spring Boot**     | REST API and application framework         |
| **Spring Security** | Authentication and authorization           |
| **JWT**             | Stateless authentication                   |
| **Spring Data JPA** | Database interaction and persistence       |
| **Maven**           | Dependency management and build automation |

### Database

| Technology             | Purpose                     |
| ---------------------- | --------------------------- |
| **PostgreSQL / MySQL** | Relational data persistence |
| **JPA / Hibernate**    | Object-relational mapping   |

The database stores information related to:

* Users
* Short URLs
* Original URLs
* Link ownership
* Click analytics
* User interactions

### Frontend

| Technology       | Purpose                |
| ---------------- | ---------------------- |
| **ReactJS**      | Frontend application   |
| **React Router** | Client-side routing    |
| **Axios**        | REST API communication |

### DevOps & Infrastructure

| Technology         | Purpose                                 |
| ------------------ | --------------------------------------- |
| **Docker**         | Application containerization            |
| **Docker Compose** | Multi-container local environments      |
| **Kubernetes**     | Container orchestration                 |
| **Jenkins**        | CI/CD automation                        |
| **Terraform**      | Infrastructure as Code                  |
| **Ansible**        | Configuration and deployment automation |
| **Prometheus**     | Metrics collection                      |
| **Grafana**        | Monitoring and visualization            |
| **GCP**            | Cloud infrastructure                    |

> **Note:** Some infrastructure and cloud components are part of the project's deployment architecture and may require additional configuration before production deployment.

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
UrlShortner/
│
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   └── resources/
│   │   └── test/
│   ├── pom.xml
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── Dockerfile
│
├── docker-compose.yml
└── README.md
```

---

## Getting Started

### Prerequisites

Make sure the following are installed:

* **JDK 17 or newer**
* **Node.js**
* **npm**
* **Maven**
* **PostgreSQL or MySQL**
* **Docker** *(optional for containerized setup)*

---

## 1. Clone the Repository

```bash
git clone https://github.com/srisaisrinivashpanda/UrlShortner.git

cd UrlShortner
```

---

## 2. Database Configuration

Create a PostgreSQL or MySQL database.

Configure the backend database connection in:

```text
backend/src/main/resources/application.properties
```

Example PostgreSQL configuration:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/urlshortener_db
spring.datasource.username=your_username
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
```

Do not commit real database credentials or secrets to GitHub.

---

## 3. Run the Backend

Navigate to the backend:

```bash
cd backend
```

Build the application:

```bash
mvn clean install
```

Run the application:

```bash
mvn spring-boot:run
```

The backend will be available at:

```text
http://localhost:9090
```

---

## 4. Run the Frontend

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will typically be available at:

```text
http://localhost:5173
```

---

## 5. Docker Setup

Build and start the application using Docker Compose:

```bash
docker compose up --build
```

To stop the containers:

```bash
docker compose down
```

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

The backend exposes RESTful APIs for authentication, URL management, and analytics.

Example endpoint structure:

```text
/api/auth/*
/api/users/*
/api/urls/*
/api/analytics/*
```

### Example Operations

```http
POST   /api/auth/register
POST   /api/auth/login

POST   /api/urls
GET    /api/urls
GET    /api/urls/{id}
DELETE /api/urls/{id}

GET    /api/analytics/{id}
```

> Exact endpoints may vary depending on the current implementation.

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

## Future Improvements

* [ ] Redis caching
* [ ] Advanced click analytics
* [ ] QR code generation
* [ ] Custom domains
* [ ] Link expiration automation
* [ ] Distributed rate limiting
* [ ] Message queue for asynchronous analytics
* [ ] Automated CI/CD pipeline
* [ ] Kubernetes production deployment
* [ ] Enhanced observability
* [ ] Comprehensive automated testing

---
