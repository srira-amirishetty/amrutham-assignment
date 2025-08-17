<div align="left">

## <a name="introduction">🤖 Introduction</a>

Created Doctor Appointment Booking Platform

## <a name="tech-stack">⚙️ Tech Stack</a>

- **[Shadcn](https://ui.shadcn.com/)** shadcn/ui is a collection of beautifully designed, accessible, and customizable UI components built with Radix UI and Tailwind CSS. It’s not a packaged library but a system where you copy components into your codebase for full control.

- **[React](https://react.dev/)** is a declarative JavaScript library for building interactive UIs. It provides the component structure for modular development, allowing smooth integration of GSAP animations, reusable logic for scroll behavior, and support for responsive layout and state-driven UI features like carousels and video sections.

- **[Tailwind CSS](https://tailwindcss.com/)** is a utility-first CSS framework that allows developers to design custom user interfaces by applying low-level utility classes directly in HTML, streamlining the design process.

- **[Vite](https://vitejs.dev/)** is a lightning-fast build tool and development server that powers this project’s workflow. It enables instant hot module replacement, fast startup, and optimized production builds—ideal for an animation-heavy React site with smooth, real-time development feedback and minimal config.


## <a name="features">🔋 Features</a>

👉 **Register&Login**: User can register as user or Doctor, JWT authentication and authorization implemented.

👉 **Appointment Calendar**: Appointment can be booked by selecting date in calendar and time slot then OTP verification through email.

👉 **Appointment Cancellation**: Appointment can be cancelled if the gap between today and appointment day and time should be more than 24 hour.

👉 **View Appointments**: Users and Doctors can View their List of Appointments.

👉 **Doctors Filter**: User can filter the doctor by name and specialization.

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**
```bash
git clone https://github.com/srira-amirishetty/amrutham-assignment.git
```

**Frontend Setup**
```bash
cd frontend
npm install
npm run dev
```
**Backend Setup**
```bash
cd backend
npm install
nodemon index.js
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the project.
