# 🚀 Ethiopian Tender Management System - Setup Instructions

## 📋 Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js 18+** - [Download here](https://nodejs.org/)
- **MongoDB 5+** - [Download here](https://www.mongodb.com/try/download/community)
- **Git** - [Download here](https://git-scm.com/)

## 🛠️ Step-by-Step Setup

### 1. **Create Project Structure**

\`\`\`bash
# Create main project directory
mkdir tender-management-system
cd tender-management-system

# Create frontend and backend directories
mkdir frontend backend

# Initialize the main package.json (copy from the provided file)
\`\`\`

### 2. **Setup Root Package.json**

Create the main `package.json` file in the root directory with the provided content.

### 3. **Install Root Dependencies**

\`\`\`bash
# Install concurrently for running both servers
npm install
\`\`\`

### 4. **Setup Frontend**

\`\`\`bash
# Navigate to frontend directory
cd frontend

# Create package.json (copy from provided file)
# Install frontend dependencies
npm install

# Create necessary directories
mkdir -p src/app src/components/ui src/lib

# Copy all frontend files to their respective locations
\`\`\`

### 5. **Setup Backend**

\`\`\`bash
# Navigate to backend directory (from root)
cd backend

# Create package.json (copy from provided file)
# Install backend dependencies
npm install

# Create necessary directories
mkdir -p src/models src/routes src/middleware src/config

# Copy all backend files to their respective locations
\`\`\`

### 6. **Environment Configuration**

\`\`\`bash
# Backend environment
cd backend
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

# Frontend environment
cd ../frontend
echo "NEXT_PUBLIC_API_URL=http://localhost:5000/api" > .env.local
\`\`\`

### 7. **Start MongoDB**

\`\`\`bash
# Make sure MongoDB is running
# On Windows: Start MongoDB service
# On Mac/Linux: 
mongod
\`\`\`

### 8. **Run the Application**

\`\`\`bash
# From the root directory
npm run dev

# This will start both:
# - Backend API on http://localhost:5000
# - Frontend on http://localhost:3000
\`\`\`

## 🔧 Alternative Setup Commands

### Run Servers Separately

\`\`\`bash
# Terminal 1 - Backend
npm run dev:backend

# Terminal 2 - Frontend  
npm run dev:frontend
\`\`\`

### Production Build

\`\`\`bash
# Build both applications
npm run build

# Start production servers
npm run start
\`\`\`

## 📁 Final Directory Structure

\`\`\`
tender-management-system/
├── package.json                 # Root package.json
├── frontend/                    # Next.js frontend
│   ├── package.json
│   ├── next.config.js
│   ├── tailwind.config.ts
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   ├── dashboard/
│   │   │   └── tenders/
│   │   ├── components/ui/
│   │   └── lib/
│   └── .env.local
├── backend/                     # Express.js backend
│   ├── package.json
│   ├── tsconfig.json
│   ├── src/
│   │   ├── server.ts
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── config/
│   └── .env
└── README.md
\`\`\`

## 🎯 Testing the Setup

1. **Backend Health Check**: Visit http://localhost:5000/api/health
2. **Frontend**: Visit http://localhost:3000
3. **Registration**: Try creating a new account
4. **Login**: Test the authentication system

## 🚨 Common Issues & Solutions

### Issue: "next is not recognized"
**Solution**: Make sure you're in the frontend directory and Next.js is installed:
\`\`\`bash
cd frontend
npm install next react react-dom
\`\`\`

### Issue: "nodemon is not recognized"
**Solution**: Install nodemon in the backend:
\`\`\`bash
cd backend
npm install -D nodemon ts-node
\`\`\`

### Issue: MongoDB connection error
**Solution**: 
1. Make sure MongoDB is running
2. Check your MONGODB_URI in backend/.env
3. Default: `mongodb://localhost:27017/tender_management`

### Issue: CORS errors
**Solution**: Make sure FRONTEND_URL in backend/.env matches your frontend URL:
\`\`\`
FRONTEND_URL=http://localhost:3000
\`\`\`

## 🎉 Success!

If everything is set up correctly, you should see:
- ✅ Backend API running on port 5000
- ✅ Frontend running on port 3000
- ✅ Beautiful Ethiopian-themed interface
- ✅ Full Amharic language support

## 📞 Need Help?

If you encounter any issues:
1. Check the console logs for error messages
2. Verify all dependencies are installed
3. Ensure MongoDB is running
4. Check environment variables are set correctly

Happy coding! 🇪🇹🚀
