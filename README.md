# Credit Risk Analytics Dashboard

A modern dashboard for analyzing customer credit risk and financial health, built with React, TypeScript, Node.js, and Ant Design.

## Features

- 📊 Interactive dashboard with financial metrics
- 📈 Visualizations using Recharts
- ⚠️ Risk assessment and scoring
- 🔄 Workflow automation for customer status management
- 📱 Responsive design

## Tech Stack

### Frontend
- React with TypeScript
- Ant Design (UI components)
- Recharts (data visualization)
- Axios (HTTP client)

### Backend
- Node.js with Express
- TypeScript
- In-memory data storage

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd credit-risk-dashboard
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

### Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
credit-risk-dashboard/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── types/
│   │   └── index.ts
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── services/
    │   ├── types/
    │   └── App.tsx
    └── package.json
```

## API Endpoints

- `GET /api/customers` - Get all customers
- `GET /api/customers/:customerId` - Get customer by ID
- `PUT /api/customers/:customerId/status` - Update customer status

## License

This project is licensed under the MIT License.
