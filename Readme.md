# This is starting of project

# student-attendance-management/

```
│── backend/  # Node.js + Express (Backend)
│   ├── public           # File 
│   ├── src 
│   │   ├── models/         # Database Schemas (User, Attendance, Course, etc.)
│   │   ├── routes/         # API Routes (Admin, Teacher, Student)
│   │   ├── controllers/    # Business Logic for Routes
│   │   ├── middleware/     # Authentication & Authorization (JWT)
│   │   ├── db/         # Database Connection
│   │   ├── utils/          # Utility functions (Helper methods)
│   │   ├── app.js       # Main Express Server File
│   ├── .env            # Environment Variables (DB Connection, JWT Secret)
│   ├── package.json    # Node.js Dependencies
│
│── frontend/  # Frontend (HTML, CSS, JS, Tailwind)
│   ├── pages/          # HTML Pages
│   │   ├── index.html       # Login Page
│   │   ├── admin.html       # Admin Dashboard (Manage teachers, students, schedules)
│   │   ├── teacher.html     # Teacher Dashboard (Mark attendance, assignments, notices)
│   │   ├── student.html     # Student Dashboard (View attendance, schedule, notices)
│   ├── components/     # Reusable UI Components (Navbar, Sidebar, Cards)
│   ├── assets/         # Images, Styles, Icons
│   ├── styles/         # Tailwind CSS & Custom Styles
│   ├── js/             # JavaScript Files (API calls, UI interactions)
│

``` 