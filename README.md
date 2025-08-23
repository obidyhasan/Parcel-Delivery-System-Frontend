# 📦 DeliverX – Parcel Delivery System (Frontend)

## **Project Overview**

DeliverX is a modern **parcel delivery platform** that connects **senders, receivers, and admins** in one seamless system.  
The platform allows users to:

- Create and manage parcel delivery requests
- Track parcels in real-time using a unique tracking ID
- Confirm deliveries and view delivery history
- Admins can manage users, parcels, and delivery personnel

This project focuses on the **frontend**, built with **React, Redux Toolkit, and RTK Query**, with a clean and responsive UI using **Tailwind CSS**.

## **Setup Instructions**

1. **Clone the repository**

```bash
git clone https://github.com/obidyhasan/Parcel-Delivery-System-Frontend
cd Parcel-Delivery-System-Frontend
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the development server**

```bash
npm run dev
```

4. **Open in browser**  
   Visit: `http://localhost:3000` (or the port displayed in terminal)

5. **Configure Environment Variables**  
   Create a `.env` file and add:

```env
VITE_API_BASE_URL=https://parcel-delivery-system-backend.vercel.app/api/v1
```

## **Technology Stack**

**Frontend:**

- React.js
- TypeScript
- Redux Toolkit + RTK Query
- React Router
- Tailwind CSS

**Backend:**

- Node.js + Express
- MongoDB + Mongoose
- JWT + bcrypt for authentication

**Other Tools:**

- Axios (API calls)
- React Icons / Lucide React (icons)

## **Live Demo**

- Frontend: [Frontend URL](https://parcel-delivery-system-frontend.vercel.app)
- Backend: [Backend URL](https://parcel-delivery-system-backend.vercel.app)

## **Features**

- Role-based dashboards for **Sender, Receiver, and Admin**
- Parcel tracking and status updates
- Secure authentication with JWT
- Responsive design for all devices
- Loading indicators, form validation, pagination, and toast notifications

## **Credentials for Testing**

- **Admin:** adminpds@gmail.com / 12345678
- **Sender:** obidyhasan@gmail.com / Obidy@12
- **Receiver:** abid@gmail.com / Obidy@12

## **Notes**

- Ensure the backend API is running and accessible via `VITE_API_BASE_URL`
- This frontend is designed to work seamlessly with a role-based parcel delivery API
- Contributions, improvements, and bug fixes are welcome
