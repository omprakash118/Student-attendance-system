# This is starting of project

# student-attendance-management/

```
│── backend/  # Node.js + Express (Backend)
│   ├── models/         # Database Schemas (User, Attendance, Course, etc.)
│   ├── routes/         # API Routes (Admin, Teacher, Student)
│   ├── controllers/    # Business Logic for Routes
│   ├── middleware/     # Authentication & Authorization (JWT)
│   ├── config/         # Database Connection
│   ├── utils/          # Utility functions (Helper methods)
│   ├── server.js       # Main Express Server File
│   ├── .env            # Environment Variables (DB Connection, JWT Secret)
│   ├── package.json    # Node.js Dependencies
│
│── frontend/  # Frontend (HTML, CSS, JS, Tailwind)
│   ├── pages/          # HTML Pages
│   │   ├── index.html       # Login Page
│   │   ├── admin.html       # Admin Dashboard (Manage teachers, students, schedules)
│   │   ├── teacher.html     # Teacher Dashboard (Mark attendance, assignments, notices)
│   │   ├── student.html     # Student Dashboard (View attendance, schedule, notices)
│   │   ├── attendance.html  # Attendance Management Page
│   │   ├── assignments.html # Assignment Submission Page
│   │   ├── notices.html     # Notices & Announcements Page
│   │   ├── schedule.html    # Class Schedule Page
│   │   ├── profile.html     # User Profile & Settings Page
│   │   ├── reports.html     # Attendance Reports Page
│   ├── components/     # Reusable UI Components (Navbar, Sidebar, Cards)
│   ├── assets/         # Images, Styles, Icons
│   ├── styles/         # Tailwind CSS & Custom Styles
│   ├── js/             # JavaScript Files (API calls, UI interactions)
│   ├── index.html      # Entry Point
│   ├── app.js          # Main Frontend Script
│

``` 