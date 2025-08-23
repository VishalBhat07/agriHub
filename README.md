# AgriHub

**Team: Snack Overflow**

AgriHub is a **full-stack web application** designed to connect farmers directly with buyers.  
It eliminates middlemen, enables transparent transactions, provides predictive analytics, and delivers government resources for farmers.

This project was developed as part of **CodeFury 8.0 Hackathon**.
---

## 🚀 Tech Stack

- **Frontend:** React.js, TailwindCSS , Recharts/Chart.js, Google Maps API
- **Backend:** Node.js (Express.js)
- **Database:** MongoDB (MongoDB Atlas)
- **Authentication:** Clerk
- **Hosting:** Frontend (Netlify/Vercel), Backend (Render/Heroku/AWS), Database (Atlas)

---

## 📌 Features

### 1. Marketplace

- Farmers can **list crops** with:
  - Crop name
  - Price
  - Location
  - Weight/quantity
  - Variety
- Buyers can **browse, search, and filter** crops.

### 2. Contact Farmer

- Each farmer profile includes **contact details**.
- Buyers can directly reach farmers via **email integration**.

### 3. Orders

- Buyers can **place orders** and track their status.
- Farmers can **view and manage** incoming orders.
- Status updates: _pending → confirmed → completed_.

### 4. Price Analytics

- **Machine learning model** trained on **200k+ crop price records**.
- Predicts **future crop prices**.
- Farmers can decide the **best time to sell crops**.

### 5. Google Maps Integration

- Buyers can view **farmers’ crop locations** on an interactive map.
- Uses Google Maps API for real-time display.

### 6. Time Series Graph

- Price fluctuations of crops visualized using **time series graphs**.
- Supports **1 year of historical data** per crop.
- Powered by Recharts/Chart.js.

### 7. Government Schemes & Learning Modules

- Access to **real-time government schemes**.
- Peer-reviewed learning modules with tutorials and discussions.

### 8. Equipment Certification

- Farmers can apply for **equipment certification**.
- Buyers gain **trust in verified equipment**.

### 9. Authentication

- **Clerk integration** for secure sign-up/sign-in.
- Features:
  - Email/social login
  - Role-based access (farmer vs buyer)

---

## 🗄️ Database Schema (MongoDB)

- **Users** (farmer/buyer)
- **Crops** (name, price, location, weight, variety)
- **Orders** (buyer, farmer, crop, status)
- **Schemes** (title, description, link)
- **Certifications** (equipment, status, farmerId)

---

## 📡 API Endpoints (Sample)

| Method | Endpoint                 | Description                     |
| ------ | ------------------------ | ------------------------------- |
| POST   | `/api/farmers/addCrop`   | Add crop details                |
| GET    | `/api/crops`             | Fetch all crops                 |
| GET    | `/api/crops/:id`         | Fetch single crop               |
| POST   | `/api/orders/create`     | Create a new order              |
| PUT    | `/api/orders/:id/status` | Update order status             |
| GET    | `/api/analytics/predict` | Get crop price prediction       |
| GET    | `/api/schemes`           | Fetch government schemes        |
| POST   | `/api/equipment/certify` | Request equipment certification |

---

## 🔒 Security

- Authentication handled by **Clerk** with JWT tokens.
- Role-based access for **farmers vs buyers**.
- MongoDB Atlas secured with environment variables.

---

## 🛠️ Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/VishalBhat07/agriHub.git
cd agriHub
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
PORT=8080
MONGO_URI=your_mongo_connection_string
CLERK_API_KEY=your_clerk_key
```

Start server:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file:

```env
REACT_APP_API_URL=http://localhost:8080
REACT_APP_CLERK_FRONTEND_API=your_clerk_frontend_api
```

Start React app:

```bash
npm start
```

---

## 📊 Future Enhancements

- Real-time chat between farmers & buyers.
- AI-powered disease detection from crop images.
- Integration with **payment gateways**.
- Advanced analytics dashboards for farmers.

---

## 🤝 Contribution

1. Fork the repository
2. Create a feature branch (`git checkout -b feature-name`)
3. Commit changes (`git commit -m "Added feature"`)
4. Push to branch (`git push origin feature-name`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.
