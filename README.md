# 🩺 TRUST-SCAN

> TRUST-SCAN is a comprehensive digital healthcare platform designed to streamline the management and sharing of medical records between patients and healthcare providers. With a focus on security, privacy, and controlled access, TRUST-SCAN ensures that sensitive medical data remains protected while enabling seamless collaboration between patients and doctors.— powered by **Spring Boot**, **React**, and **MySQL**.

---

<div align="center">

![Java](https://img.shields.io/badge/Java_17-%23ED8B00.svg?style=for-the-badge\&logo=openjdk\&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-2.7.0-%236DB33F.svg?style=for-the-badge\&logo=springboot\&logoColor=white)
![React](https://img.shields.io/badge/React_18-%2361DAFB.svg?style=for-the-badge\&logo=react\&logoColor=black)
![MySQL](https://img.shields.io/badge/MySQL-8.0-%234479A1.svg?style=for-the-badge\&logo=mysql\&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-%233178C6.svg?style=for-the-badge\&logo=typescript\&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-%2306B6D4.svg?style=for-the-badge\&logo=tailwindcss\&logoColor=white)

</div>

---

## 🧭 Overview

**TRUST-SCAN** is a digital healthcare solution enabling patients and doctors to securely **upload, view, and share** medical documents.
Each patient receives a **unique code** for controlled access and secure doctor collaboration.

---

## 🚀 Features

### 👤 For Patients

* 🆔 **Unique Patient Codes:** Individual identifiers for secure access
* 📄 **Document Management:** Upload and manage reports, prescriptions, and scans
* 🔒 **Secure Sharing:** Grant or revoke doctor access to your documents
* 🧾 **Profile Management:** Update and maintain personal information safely

### 🩺 For Healthcare Providers

* 🔍 **Patient Lookup:** Find patients using their unique codes
* 📊 **Document Review:** Access uploaded reports and records
* 🧠 **Collaborative Tools:** Review patient history for better treatment decisions
* 🔐 **Restricted Access:** Role-based permissions ensure privacy

---

## 🔒 Security Highlights

| Feature                       | Description                          |
| ----------------------------- | ------------------------------------ |
| **JWT Authentication**        | Token-based security for sessions    |
| **Role-based Access Control** | Separate Patient / Doctor privileges |
| **Data Encryption**           | HTTPS and encrypted file handling    |
| **SQL Injection Prevention**  | ORM and prepared statements          |
| **File Validation**           | Secure and type-checked uploads      |

---

## 🛠️ Technology Stack

### 🧩 Backend

* **Java 17**
* **Spring Boot 2.7.0**
* **Spring Security**
* **Spring Data JPA**
* **MySQL 8.0**
* **Maven**

### 💻 Frontend

* **React 18**
* **TypeScript**
* **Tailwind CSS**
* **Axios**
* **React Router**

### 🗃️ Database

* **MySQL 8.0** – Primary data storage
* **JDBC** – Database connectivity

**Relations:**

```
Users → Patients / Doctors  
Patients → Documents  
Patient ↔ Doctor → Access Permissions  
```

---

## 📋 Prerequisites

| Requirement | Minimum Version |
| ----------- | --------------- |
| Java JDK    | 17+             |
| Maven       | 3.6+            |
| Node.js     | 16+             |
| MySQL       | 8.0+            |
| Git         | Latest          |

---

## 🔧 API Endpoints

| Method   | Endpoint                          | Description             | Access        |
| -------- | --------------------------------- | ----------------------- | ------------- |
| **POST** | `/api/auth/login`                 | User authentication     | Public        |
| **POST** | `/api/auth/register`              | User registration       | Public        |
| **GET**  | `/api/patients/{code}`            | Fetch patient by code   | Authenticated |
| **GET**  | `/api/patients/check-code/{code}` | Verify patient code     | Public        |
| **POST** | `/api/documents/upload`           | Upload medical document | Authenticated |
| **GET**  | `/api/documents/patient/{code}`   | Get patient documents   | Authenticated |
| **GET**  | `/api/documents/download/{id}`    | Download document       | Authenticated |

---

## 🗄️ Database Schema

### **Key Tables**

| Table                   | Description                                   |
| ----------------------- | --------------------------------------------- |
| `users`                 | Stores login credentials & roles              |
| `patients`              | Patient details and unique codes              |
| `doctors`               | Doctor details and identifiers                |
| `documents`             | Uploaded medical files                        |
| `patient_doctor_access` | Permission mapping between patients & doctors |

---

## 👥 Roles & Permissions

### 🧑‍⚕️ Doctor

* Search for patients using unique codes
* View authorized patient documents
* Upload medical reports
* No access to unauthorized records

### 🧑‍🦱 Patient

* View and upload personal medical files
* Manage profile data
* Grant or revoke doctor access

---

## 🔐 Security Implementation

* ✅ **JWT Authentication:** Secure, stateless session management
* 🔑 **BCrypt Password Hashing:** Encrypted credentials
* 🧱 **SQL Injection Prevention:** JPA with prepared statements
* 🌍 **CORS Configuration:** Controlled cross-origin access
* 🧾 **File Validation:** Enforced upload rules for safety
* 🧩 **Granular Role Control:** Patient/Doctor-specific permissions

---

## 📚 Future Enhancements

* 🧬 AI-based health data insights
* 🗃️ Cloud storage integration (AWS S3 / Firebase)
* 📱 Mobile-responsive dashboard
* 🧠 Smart document classification

---

## 🏥 “Trust your data, Trust-Scan your care.”
