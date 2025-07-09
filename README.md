<img src="https://github.com/user-attachments/assets/a62ce45e-8915-42cd-a856-abbb4460cdd8" width="400" height="400">

# YY-shifts 🕒

YY-shifts is a lightweight backend system built with **Node.js** and **TypeScript** to help businesses—such as bars, call centers, restaurants, and more—efficiently manage employee shifts.

Each employee submits their availability per work cycle, and the system automatically assigns them to available shifts based on priority weights, worker limits, and constraints.

---

## 📌 Features

- 🔒 **JWT Authentication**
- 👥 **User & Department Management**
- 📆 **Work Cycle Management** – Define periods of shifts (e.g., weekly)
- ✍️ **Availability Submission** – Employees report when they're free to work
- ⚖️ **Shift Assignment with Weights** – Priority-based automatic shift distribution
- 🧠 **Flexible Configurations** – Customize work cycles, shift amounts, and legal limits
- 🗂️ **Shift & Work Cycle Journaling** – Track changes historically

---


## 🛠 Tech Stack

- **Node.js** 
- **TypeScript**
- **PostgreSQL**
- **Express**
- **TypeORM**
- **JWT** for authentication

---
## 📊 Database Design

<img src="https://github.com/user-attachments/assets/67f13f93-be9d-4fa5-9a5a-1ab1a9797f84" alt="YY-shifts database schema" width="80%"/>

This ERD includes the following core entities:
- `User`, `Department`
- `Shift`, `Availability`, `ShiftConfiguration`
- `WorkCycle`, `WorkCycleConfiguration`
- Journal tables to track changes

---

## 🧠 Data Model Overview

The system follows a modular and flexible design for managing shifts across multiple departments. Here's a breakdown of the core entities:

- **👤 User**  
  Represents an employee or manager. Each user belongs to a single organization (`Department`) and has a role:
  - `Manager`: Manages shifts and configurations
  - `Employee`: Submits availability and receives shift assignments

- **🏢 Department**  
  A unit or organization that users belong to. Each department can have its own work cycle rules and shift settings.

- **🕒 Shift**  
  Represents an actual, scheduled work period (with `start` and `end`). Assigned to users.

- **⚙️ Shift Configuration**  
  Template for shifts: defines start/end time, day of the week, and required number of workers.

- **📅 Availability**  
  Employees mark their preferred or available time slots based on the defined shift configurations.

- **🔄 Work Cycle**  
  A specific time range (e.g. weekly) when availability is collected and shifts are generated/published.

- **🧾 Work Cycle Configuration**  
  Department-specific rules for a cycle (e.g. number of days, off days, etc.)

- **📘 Shift Journal**  
  Logs the history of any updates or changes to shifts (e.g. reassignment, time changes).

- **📚 Work Cycle Journal**  
  Logs historical changes and publishing of work cycles.

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yarinTag/YY-shifts.git
cd yy-shifts
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory and add the following:

```env
DB_USER=your_db_user
DB_PORT=5432
DB_PASSWORD=your_db_password
DB_NAME=yy_shifts_db
PORT=3000
TOKEN_EXPIR=1d
JWT_SECRET=your_jwt_secret
PROFILE=dev
```

### 4. Run the Project

```bash
# Start in development mode
npm run dev

# Or build and run
npm run build
npm start
```

---

## 📂 Scripts

| Script      | Description                     |
|-------------|---------------------------------|
| `dev`       | Start the app using Nodemon     |
| `start`     | Run built code from `dist`      |
| `build`     | Compile TypeScript to JS        |
