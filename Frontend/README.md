# Marketing CMS

A full-stack marketing website with admin content management capabilities built with React and Django.

## Features

- Modern marketing site with customizable sections
- Secure admin authentication system
- Content management dashboard for editing website content
- RESTful API connecting React frontend with Django backend
- Responsive design that works across all devices

## Tech Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS, Framer Motion, Lucide Icons
- **Backend**: Django, Django REST Framework, JWT Authentication
- **Database**: SQLite (default Django database)

## Project Structure

- `/src`: React frontend code
- `/backend`: Django backend code

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Python (v3.9 or higher)

### Installation

1. Clone the repository
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Set up the backend:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

### Development

1. Start the frontend and backend simultaneously:
   ```bash
   npm start
   ```

   This will run both the React frontend and Django backend in development mode.

2. Access the application:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000/api/
   - Django Admin: http://localhost:8000/admin/

### Admin Login

Demo credentials:
- Username: admin
- Password: admin123

## License

MIT