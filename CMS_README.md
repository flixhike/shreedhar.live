# Portfolio CMS - Admin Panel Documentation

## 🎉 Complete CMS System with Admin Panel

Your portfolio now includes a full-featured Content Management System (CMS) with an admin panel to manage all content without touching code!

---

## 🚀 Quick Start Guide

### 1. Install Backend Dependencies

```bash
cd server
npm install
```

### 2. Start the Backend Server

```bash
cd server
npm start
```

The API server will run on: **http://localhost:5000**

### 3. Start the Frontend (if not already running)

```bash
cd ..
npm run dev
```

The portfolio will run on: **http://localhost:5173**

---

## 🔐 Admin Access

### Access the Admin Panel

Visit: **http://localhost:5173/admin**

You'll be redirected to the login page: **http://localhost:5173/admin/login**

### First Time Setup - Create Admin Account

**Important:** Before logging in, you need to create an admin account.

Use this API endpoint (one-time setup):

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "your-secure-password",
    "email": "admin@example.com"
  }'
```

Or use Postman/Insomnia:
- **URL:** `http://localhost:5000/api/auth/register`
- **Method:** POST
- **Body (JSON):**
```json
{
  "username": "admin",
  "password": "your-secure-password",
  "email": "admin@example.com"
}
```

**Default Credentials (example):**
- Username: `admin`
- Password: `admin123` (change this!)

---

## 📊 Admin Panel Features

### Dashboard
- **Access:** http://localhost:5173/admin/dashboard
- Quick overview of all content sections
- Quick actions for managing content
- System status monitoring

### Profile Editor
- **Access:** http://localhost:5173/admin/profile
- Edit basic information (name, location, title, experience)
- Manage skills (comma-separated list)
- Manage tools (comma-separated list)
- Manage languages
- Update contact information (phone, email)
- Update social media links (LinkedIn, Behance)

### Work Experience Manager
- **Access:** http://localhost:5173/admin/experience
- View all work experiences
- Add new work experience
- Edit existing entries
- Delete entries

### Portfolio Manager
- **Access:** http://localhost:5173/admin/portfolio
- View all portfolio items
- Add new portfolio projects
- Edit existing projects
- Delete projects

---

## 🔧 Backend API Endpoints

### Authentication
- **POST** `/api/auth/register` - Register new admin user (one-time)
- **POST** `/api/auth/login` - Login and get JWT token
- **GET** `/api/auth/verify` - Verify token (protected)

### Profile
- **GET** `/api/profile` - Get profile data
- **PUT** `/api/profile` - Update profile (protected)

### Experience
- **GET** `/api/experience` - Get all experiences
- **POST** `/api/experience` - Add new experience (protected)
- **PUT** `/api/experience/:id` - Update experience (protected)
- **DELETE** `/api/experience/:id` - Delete experience (protected)

### Portfolio
- **GET** `/api/portfolio` - Get all portfolio items
- **POST** `/api/portfolio` - Add new item (protected)
- **PUT** `/api/portfolio/:id` - Update item (protected)
- **DELETE** `/api/portfolio/:id` - Delete item (protected)

---

## 💾 Data Storage

All data is stored in JSON files at:
- `server/data/profile.json` - Profile information
- `server/data/experience.json` - Work experiences
- `server/data/portfolio.json` - Portfolio items
- `server/data/users.json` - Admin users (passwords hashed)

**Note:** These files are automatically created when the server starts.

---

## 🔒 Security Features

✅ **JWT Authentication** - Secure token-based auth  
✅ **Password Hashing** - Using bcryptjs  
✅ **Protected Routes** - API endpoints secured  
✅ **Token Verification** - Auto-verify on page load  
✅ **Session Management** - 24-hour token expiry  

---

## 🎨 Admin Panel Pages

### 1. Login Page
- **Path:** `/admin/login`
- Beautiful gradient design
- Form validation
- Error handling
- Automatic redirect if already logged in

### 2. Dashboard
- **Path:** `/admin/dashboard`
- Quick stats cards
- Navigation to all sections
- Quick action buttons
- System status

### 3. Profile Editor
- **Path:** `/admin/profile`
- Comprehensive form for all profile data
- Auto-save functionality
- Success/error messages
- Array inputs for skills, tools, languages

### 4. Experience Manager
- **Path:** `/admin/experience`
- List all work experiences
- Add/Edit/Delete functionality
- Modal-based editing (to be implemented)

### 5. Portfolio Manager
- **Path:** `/admin/portfolio`
- Grid view of portfolio items
- Add/Edit/Delete functionality
- Image upload support (to be implemented)

---

## 📁 File Structure

```
sridhar-portfolio/
├── server/
│   ├── data/               # JSON data files
│   ├── routes/             # API routes
│   │   ├── auth.js
│   │   ├── profile.js
│   │   ├── experience.js
│   │   └── portfolio.js
│   ├── config.js           # Configuration
│   ├── server.js           # Main server file
│   └── package.json
├── src/
│   ├── admin/              # Admin panel
│   │   ├── components/     # Admin components
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── AdminLayout.jsx
│   │   │   ├── ProfileEditor.jsx
│   │   │   ├── ExperienceManager.jsx
│   │   │   └── PortfolioManager.jsx
│   │   ├── AdminPanel.jsx
│   │   └── AdminPanel.css
│   ├── components/         # Frontend components
│   ├── pages/              # Frontend pages
│   └── App.jsx
└── README.md
```

---

## 🛠️ Development Scripts

### Backend
```bash
cd server
npm start           # Start server
npm run dev         # Start with nodemon (auto-reload)
```

### Frontend
```bash
npm run dev         # Start Vite dev server
npm run build       # Build for production
```

---

## 🚀 Production Deployment

### 1. Environment Variables
Create `.env` file in `server/` directory:

```env
PORT=5000
JWT_SECRET=your-very-secure-secret-key-here
NODE_ENV=production
```

### 2. Build Frontend
```bash
npm run build
```

### 3. Deploy Backend
- Deploy the `server/` directory to your Node.js hosting
- Ensure `data/` directory is writable
- Set environment variables
- Start with `npm start`

### 4. Deploy Frontend
- Upload the `dist/` folder to your static hosting
- Update API URLs in admin components to point to your backend

---

## 🎯 Features Implemented

✅ Backend API with Express  
✅ JWT Authentication  
✅ Password hashing (bcryptjs)  
✅ JSON file-based storage  
✅ Admin login page  
✅ Protected admin routes  
✅ Dashboard with stats  
✅ Profile editor  
✅ Experience manager  
✅ Portfolio manager  
✅ Responsive admin UI  
✅ Modern gradient design  
✅ Token auto-verification  
✅ Logout functionality  
✅ Form validation  
✅ Error handling  
✅ Success messages  
✅ Mobile-responsive admin panel  

---

## 🔮 Future Enhancements (Optional)

- Image upload functionality
- Rich text editor for descriptions
- Drag & drop reordering
- Database integration (MongoDB/PostgreSQL)
- Email notifications
- Activity logs
- Multiple admin roles
- 2FA authentication
- Bulk import/export
- Preview before publishing

---

## 📞 Support

For issues or questions:
1. Check the console for error messages
2. Verify backend server is running
3. Check browser console for frontend errors
4. Ensure all dependencies are installed

---

## 🎉 Success!

Your portfolio now has a complete CMS system!

**Admin Panel:** http://localhost:5173/admin  
**API Server:** http://localhost:5000  
**Main Site:** http://localhost:5173  

Manage your entire portfolio content without touching code! 🚀✨

