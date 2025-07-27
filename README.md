# 🇪🇹 የጨረታ አስተዳደር ስርዓት (Ethiopian Tender Management System)

A comprehensive, full-stack tender management system built specifically for Ethiopia, featuring Amharic language support and Ethiopian cultural elements.

## 🌟 Features

### 🔐 Authentication & Authorization
- User registration and login
- Role-based access control (Admin, Government, Contractor)
- JWT-based authentication
- Secure password hashing

### 📋 Tender Management
- Create and publish tenders
- Search and filter tenders
- Detailed tender information
- Document management
- Deadline tracking

### 📝 Application Process
- Comprehensive application forms
- File upload support
- Application status tracking
- Real-time notifications

### 🏆 Evaluation System
- Automated evaluation algorithm
- Multi-criteria scoring:
  - Price (40% weight)
  - Experience (25% weight)
  - Technical capability (20% weight)
  - Financial capacity (15% weight)
- Transparent winner selection
- Public results announcement

### 🎨 Ethiopian Cultural Design
- Full Amharic language support
- Ethiopian flag colors and patterns
- Cultural icons and imagery
- Mobile-responsive design

## 🛠️ Technology Stack

### Frontend
- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Radix UI** - Component library
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB 5+
- npm or yarn

### Installation

1. **Clone the repository**
\`\`\`bash
git clone <repository-url>
cd tender-management-system
\`\`\`

2. **Install all dependencies**
\`\`\`bash
npm run install:all
\`\`\`

3. **Set up environment variables**

Backend (.env):
\`\`\`bash
cd backend
cp .env.example .env
# Edit .env with your configuration
\`\`\`

Frontend (.env.local):
\`\`\`bash
cd frontend
echo "NEXT_PUBLIC_API_URL=http://localhost:5000/api" > .env.local
\`\`\`

4. **Start MongoDB**
\`\`\`bash
# Make sure MongoDB is running
mongod
\`\`\`

5. **Run the application**
\`\`\`bash
# From root directory - runs both frontend and backend
npm run dev

# Or run separately:
npm run dev:backend  # Backend on port 5000
npm run dev:frontend # Frontend on port 3000
\`\`\`

## 📁 Project Structure

\`\`\`
tender-management-system/
├── frontend/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/             # App router pages
│   │   ├── components/      # Reusable components
│   │   ├── lib/            # Utilities and API client
│   │   └── styles/         # Global styles
│   ├── public/             # Static assets
│   └── package.json
├── backend/                 # Express.js backend API
│   ├── src/
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   ├── config/         # Configuration files
│   │   └── server.ts       # Main server file
│   └── package.json
├── package.json            # Root package.json
└── README.md
\`\`\`

## 🔧 Available Scripts

### Root Level
\`\`\`bash
npm run dev              # Run both frontend and backend
npm run build           # Build both applications
npm run start           # Start both applications (production)
npm run install:all     # Install all dependencies
\`\`\`

### Frontend
\`\`\`bash
cd frontend
npm run dev             # Development server (port 3000)
npm run build          # Production build
npm run start          # Production server
npm run lint           # ESLint
\`\`\`

### Backend
\`\`\`bash
cd backend
npm run dev            # Development server with nodemon (port 5000)
npm run build         # TypeScript compilation
npm run start         # Production server
\`\`\`

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `POST /api/auth/logout` - User logout

### Tenders
- `GET /api/tenders` - Get all tenders (with filtering)
- `GET /api/tenders/:id` - Get single tender
- `POST /api/tenders` - Create tender (Admin/Government)
- `PUT /api/tenders/:id` - Update tender (Admin/Government)
- `DELETE /api/tenders/:id` - Delete tender (Admin)

### Applications
- `POST /api/tenders/:id/apply` - Apply to tender
- `GET /api/tenders/:id/apply` - Get tender applications (Admin)
- `GET /api/applications` - Get user applications

### Evaluation
- `POST /api/tenders/:id/evaluate` - Evaluate tender (Admin)
- `GET /api/tenders/:id/results` - Get evaluation results

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting
- CORS protection
- Helmet security headers
- Input validation and sanitization
- Role-based access control

## 🌍 Internationalization

The system is built with full Amharic language support:
- All UI text in Amharic
- Ethiopian Birr currency formatting
- Ethiopian date formats
- Cultural design elements

## 📱 Mobile Responsive

The application is fully responsive and works seamlessly on:
- Desktop computers
- Tablets
- Mobile phones

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🎯 Future Enhancements

- [ ] Email notifications
- [ ] SMS notifications
- [ ] Advanced reporting
- [ ] Document versioning
- [ ] Multi-language support
- [ ] Mobile app
- [ ] Integration with government systems
- [ ] Blockchain verification
- [ ] AI-powered evaluation
- [ ] Real-time chat support

---

**Built with ❤️ for Ethiopia 🇪🇹**
