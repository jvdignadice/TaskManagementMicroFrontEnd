# Task Management Frontend

This is the **frontend application** for the Task Management project. It provides a responsive web interface for managing tasks, including creating, viewing, updating, deleting, filtering, and sorting tasks.

## Table of Contents

* [Features](#features)
* [Tech Stack](#tech-stack)
* [Prerequisites](#prerequisites)
* [Local Setup](#local-setup)
* [Running the Application](#running-the-application)
* [Folder Structure](#folder-structure)
* [Configuration](#configuration)
* [Notes](#notes)

---

## Features

* List tasks with pagination
* Create, update, and delete tasks
* Mark tasks as complete/incomplete
* Filter tasks by status and priority
* Sort tasks by due date, created date, or priority
* Search tasks by title or description
* Responsive design for desktop and mobile

---

## Tech Stack

* **Frontend Framework:** React.js
* **Styling:** Plain Css
* **HTTP Client:** Axios for API calls
* **State Management:** React `useState` and `useEffect`
* **Form Validation:** Built-in validation & simple checks

---

## Prerequisites

* **Node.js** (v18 or higher recommended)
* **npm** or **yarn**
* **Backend API** running locally or accessible remotely

> Make sure the backend API is running and accessible at the configured `API_BASE` URL in your API utility file (e.g., `src/api/tasksApi.js`).

---

## Local Setup

1. **Clone the repository**

```bash
git clone <your-frontend-repo-url>
cd <your-frontend-repo-folder>
```

2. **Install dependencies**

Using npm:

```bash
npm install
```

Or using yarn:

```bash
yarn install
```

3. **Configure API endpoint (if needed)**

* Open `src/api/tasksApi.js`
* Ensure the `API_BASE` matches your backend API URL. Example:

```js
const API_BASE = "http://localhost:7043/task-management";
```

---

## Running the Application

1. **Start the development server**

```powershell
npm run dev
```

or

```bash
yarn start
```

2. **Open in Browser**

* Navigate to `http://localhost:5175`
* The app will automatically reload on code changes

---

## Folder Structure

```
src/
├── api/             # API request utilities
├── components/      # Reusable components (TaskList, TaskForm, Filters)
├── App.css/         # Styles
├── App.jsx          # Main app entry
├── index.css        # Main css style
├── main.jsx/        # React DOM rendering
```

---

## Configuration

* **Environment Variables**
  If using `.env`, you can define the backend URL:

```env
VITE_API_BASE=https://localhost:7043/task-management
```

* **Tailwind Configuration**
  If using Tailwind, make sure `tailwind.config.js` is set up for your project structure.

---

## Notes

* The frontend assumes the backend API is running and supports the endpoints.
* Validation is built-in for task forms, but the backend also performs validation.
* Loading and error states are implemented to improve user experience.
* Pagination and filtering are handled client-side for simplicity.

---
