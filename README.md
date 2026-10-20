# Knowledge Zone - Full-Stack E-Learning Platform

Knowledge Zone is a production-ready, full-stack web application built to streamline online learning, course discovery, student enrollment, and digital invoice generation. The application features a responsive React frontend hosted on Vercel and a robust Spring Boot backend hosted on Render.

**Live Application:** [https://knowledge-zone-an-e-learning-platef.vercel.app](https://knowledge-zone-an-e-learning-platef.vercel.app)  
**Backend API Base:** `https://knowledge-zone-an-e-learning-plateform.onrender.com`

---

## 🚀 Key Features

### For Students
* **Course Catalog:** Browse and filter available technology and skill-based courses.
* **Seamless Checkout:** Interactive checkout system with dynamically generated Order IDs.
* **Instant Invoice & Bill Generation:** Real-time generation of printable transaction receipts with unique order tracking.
* **Payment Status Search:** Retrieve and download past invoices at any time using an Order ID.

### For Administrators
* **Course Management:** Add, update, or remove courses with dynamic pricing and details.
* **Order & Transaction Tracking:** Monitor real-time enrollments and financial transaction logs.
* **Student Oversight:** Manage student profiles and enrollment statuses.

---

## 🛠️ Tech Stack

### Frontend
* **Framework:** React.js (Vite / CRA)
* **Routing:** React Router DOM
* **Form Handling:** React Hook Form
* **UI & Styling:** Modern CSS3, Flexbox/Grid, React Icons
* **Deployment:** Vercel

### Backend
* **Framework:** Java 17, Spring Boot 3
* **Security & Controllers:** RESTful APIs, Spring Web, CORS configuration
* **ORM / Database Access:** Spring Data JPA, Hibernate
* **Deployment:** Render

### Database
* **Relational Database:** MySQL / PostgreSQL

---

## 🏗️ Architecture & Workflow

```
[ React Frontend (Vercel) ] 
          │
          │  REST API Requests (JSON)
          ▼
[ Spring Boot Backend (Render) ]
          │
          │  ORM / Spring Data JPA
          ▼
[ Relational Database (MySQL/PostgreSQL) ]
```

---

## 💻 Local Development Setup

To run this project locally on your machine, follow these steps:

### Prerequisites
* **Java Development Kit (JDK 17+)**
* **Node.js (v18+)** and `npm`
* **MySQL Server** running locally on port `3306`
* **Git**

---

### Step 1: Clone the Repository
```bash
git clone https://github.com/itszaidsidd/Knowledge-Zone-an-E-Learning-Plateform.git
cd Knowledge-Zone-an-E-Learning-Plateform
```

---

### Step 2: Backend Setup (Spring Boot)

1. Open the backend directory (or root if single repo):
   ```bash
   cd backend
   ```
2. Configure your local MySQL credentials in `src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/knowledge_zone_db?createDatabaseIfNotExist=true&useSSL=false
   spring.datasource.username=root
   spring.datasource.password=your_mysql_password
   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.show-sql=true
   ```
3. Build and run the backend server:
   ```bash
   # Using Maven Wrapper (Linux/Mac)
   ./mvnw spring-boot:run

   # Using Maven Wrapper (Windows)
   mvnw.cmd spring-boot:run
   ```
   *The backend will start at `http://localhost:8080`.*

---

### Step 3: Frontend Setup (React)

1. Open a new terminal window and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install necessary packages:
   ```bash
   npm install
   ```
3. Start the Vite/React development server:
   ```bash
   npm run dev
   ```
   *The frontend will start at `http://localhost:5173`.*

---

## 🔗 Key API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/order/generate-order-id` | Generates a unique tracking order ID |
| `POST` | `/order/save` | Saves a newly completed course transaction |
| `GET` | `/order` | Fetches all completed order receipts |
| `GET` | `/student/all` | Retrieves registered student records |

---

## 🛠️ Deployment & Environment Configuration

The application utilizes dynamic environment configuration in `apiConfig.js` to automatically switch endpoints between local development and production environments:

```javascript
const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

export const API_BASE_URL = isLocal 
    ? "http://localhost:8080" 
    : "https://knowledge-zone-an-e-learning-plateform.onrender.com";
```

---

## 📝 License & Author

Developed with ❤️ for educational and demonstration purposes.  
**Author:** Mohd Zaid  
**GitHub:** [https://github.com/itszaidsidd](https://github.com/itszaidsidd)
