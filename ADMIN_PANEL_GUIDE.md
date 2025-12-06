# Admin Panel Complete Guide 🎨

## ✅ Full CMS with Image Upload, Color Customization & Content Management

Your admin panel now has **complete functionality** to manage all content, upload images, customize colors, and edit everything without touching code!

---

## 🚀 **What's New - All Features**

### ✅ **Image Upload System**
- Upload profile avatars
- Upload company logos for work experience
- Upload project images for portfolio
- Automatic file handling and storage
- 5MB file size limit
- Image preview before saving

### ✅ **Color Customization**
- Visual color pickers for primary color (pink)
- Visual color pickers for secondary color (blue)
- Live hex code editing
- Custom branding colors

### ✅ **Full Content Management**
- **Profile:** Complete profile editing with avatar, colors, contact info
- **Experience:** Add/edit/delete work experience with logos
- **Portfolio:** Add/edit/delete projects with images and categories

---

## 📊 **Admin Panel Features Overview**

| Feature | Functionality |
|---------|---------------|
| **Profile Editor** | Avatar upload, colors, skills, tools, contact info |
| **Experience Manager** | Add/edit/delete jobs with company logos |
| **Portfolio Manager** | Add/edit/delete projects with images |
| **Image Upload** | Upload and manage all images |
| **Color Picker** | Customize brand colors visually |
| **Authentication** | Secure login with JWT tokens |

---

## 🎯 **How to Use**

### **1. Profile Editor** (`/admin/profile`)

#### Upload Profile Avatar:
1. Click "Upload Avatar" button
2. Select an image file (JPG, PNG, GIF)
3. Image uploads automatically
4. Preview appears instantly

#### Customize Colors:
1. Click on the color picker box
2. Choose your color visually
3. Or enter hex code directly (e.g., `#FE275C`)
4. Colors apply to entire site

#### Edit Profile Info:
- **Basic Info:** Name, location, title, years of experience
- **Skills:** Enter comma-separated list (e.g., "UX Research, UI Design")
- **Tools:** Enter comma-separated list (e.g., "Figma, Adobe XD")
- **Languages:** Enter comma-separated list (e.g., "English, Hindi")
- **Contact:** Phone, email
- **Social Links:** LinkedIn, Behance URLs

#### Save Changes:
- Click **"Save Changes"** button at bottom
- Success message appears
- Changes reflect immediately on main site

---

### **2. Experience Manager** (`/admin/experience`)

#### Add New Experience:
1. Click **"+ Add New Experience"** button
2. Modal popup appears with form

#### Fill Experience Form:
- **Company Logo:** Click "Upload Logo" to add company image
- **Company Name:** Enter company name (required)
- **Job Title:** Enter your position (required)
- **Period:** E.g., "Jan 2020 - Present"
- **Location:** E.g., "Bangalore, India"
- **Description:** Describe your role and responsibilities
- **Projects:** Comma-separated project names

#### Save:
- Click **"Add Experience"** or **"Update Experience"**
- Modal closes automatically
- New entry appears in list

#### Edit Existing Experience:
1. Click **"Edit"** button on any experience card
2. Modal opens with pre-filled data
3. Make changes
4. Click "Update Experience"

#### Delete Experience:
1. Click **"Delete"** button
2. Confirm deletion
3. Item removed instantly

---

### **3. Portfolio Manager** (`/admin/portfolio`)

#### Add New Portfolio Item:
1. Click **"+ Add New Item"** button
2. Modal popup appears

#### Fill Portfolio Form:
- **Project Image:** Click "Upload Image" to add project screenshot
- **Project Title:** Enter project name (required)
- **Category:** Select from dropdown:
  - Design System
  - Case Study
  - Prototype
  - UI Design
  - Animation
  - Poster
- **Year:** Project year (e.g., "2023")
- **Project Link:** URL to live project or case study
- **Description:** Detailed project description
- **Tags:** Comma-separated tags (e.g., "UI, UX, Mobile")

#### Save:
- Click **"Add Project"** or **"Update Project"**
- Modal closes
- New project appears in list with thumbnail

#### Edit Portfolio Item:
1. Click **"Edit"** button on any project card
2. Modal opens with existing data
3. Upload new image or keep existing
4. Update fields
5. Click "Update Project"

#### Delete Portfolio Item:
1. Click **"Delete"** button
2. Confirm deletion
3. Item removed from portfolio

---

## 📸 **Image Upload Details**

### **Supported Formats:**
- JPG / JPEG
- PNG
- GIF
- WebP

### **File Size Limit:**
- Maximum: **5MB per image**

### **Upload Process:**
1. Click upload button
2. Select image from your computer
3. Image uploads to server
4. Preview appears automatically
5. Image URL saved in database

### **Image Storage:**
- Images stored in: `/public/uploads/`
- Accessible via: `/uploads/filename.jpg`
- Backed up with your data

---

## 🎨 **Color Customization**

### **Primary Color** (Default: #FE275C - Pink)
Used for:
- Active navigation
- Titles and highlights
- Buttons and links
- Profile badge
- Skill tag hover

### **Secondary Color** (Default: #0387C3 - Blue)
Used for:
- Project tags
- Links
- Secondary highlights
- Icons

### **How to Change:**
1. Go to Profile Editor
2. Find "Branding Colors" section
3. Click color box to open picker
4. Choose new color visually
5. Or type hex code directly
6. Click "Save Changes"
7. Colors update across entire site!

---

## 🔐 **Data Management**

### **Data Storage:**
All content stored in JSON files:
- `server/data/profile.json` - Profile information
- `server/data/experience.json` - Work experiences
- `server/data/portfolio.json` - Portfolio projects
- `server/data/users.json` - Admin users

### **Image Storage:**
- Location: `public/uploads/`
- Naming: `image-timestamp-random.ext`
- Auto-organized by upload date

### **Backup:**
To backup your data:
```bash
# Copy entire data folder
cp -r server/data /path/to/backup/

# Copy uploads folder
cp -r public/uploads /path/to/backup/
```

---

## 🛠️ **Technical Details**

### **API Endpoints:**

#### Upload:
```
POST /api/upload/single - Upload single image
POST /api/upload/multiple - Upload multiple images
DELETE /api/upload/:filename - Delete image
```

#### Profile:
```
GET /api/profile - Get profile data
PUT /api/profile - Update profile
```

#### Experience:
```
GET /api/experience - List all
POST /api/experience - Add new
PUT /api/experience/:id - Update
DELETE /api/experience/:id - Delete
```

#### Portfolio:
```
GET /api/portfolio - List all
POST /api/portfolio - Add new
PUT /api/portfolio/:id - Update
DELETE /api/portfolio/:id - Delete
```

---

## 📋 **Admin Panel URLs**

| Page | URL | Purpose |
|------|-----|---------|
| **Login** | `/admin/login` | Admin authentication |
| **Dashboard** | `/admin/dashboard` | Overview & quick actions |
| **Profile** | `/admin/profile` | Edit profile, avatar, colors |
| **Experience** | `/admin/experience` | Manage work history |
| **Portfolio** | `/admin/portfolio` | Manage projects |

---

## 🎯 **Quick Workflow Examples**

### **Example 1: Update Profile Avatar**
1. Login to admin panel
2. Go to Profile (`/admin/profile`)
3. Click "Upload Avatar"
4. Select your photo
5. Wait for upload (shows preview)
6. Click "Save Changes"
7. Done! ✅

### **Example 2: Add Work Experience**
1. Go to Experience Manager
2. Click "+ Add New Experience"
3. Upload company logo
4. Fill in company name, title, period
5. Add description
6. List projects (comma-separated)
7. Click "Add Experience"
8. Done! ✅

### **Example 3: Add Portfolio Project**
1. Go to Portfolio Manager
2. Click "+ Add New Item"
3. Upload project screenshot
4. Enter project title
5. Select category from dropdown
6. Add year and description
7. Add tags
8. Click "Add Project"
9. Done! ✅

### **Example 4: Change Brand Colors**
1. Go to Profile Editor
2. Scroll to "Branding Colors"
3. Click primary color picker
4. Choose new pink shade
5. Click secondary color picker
6. Choose new blue shade
7. Click "Save Changes"
8. Entire site updates! ✅

---

## ✨ **Tips & Best Practices**

### **Images:**
- Use high-quality images (at least 800px wide)
- Compress images before upload for faster loading
- Use consistent aspect ratios for portfolio items
- Keep file sizes under 1MB when possible

### **Content:**
- Write clear, concise descriptions
- Use consistent formatting
- Keep project titles under 50 characters
- Use comma-separated lists properly

### **Colors:**
- Test colors for readability
- Maintain good contrast
- Use brand-consistent colors
- Preview changes on main site

---

## 🚀 **Start Managing Now!**

**Access the admin panel:** http://localhost:5173/admin

**Login credentials:**
- Username: `admin`
- Password: `admin123`

**Backend server:** http://localhost:5001

---

## 🎉 **You Can Now:**

✅ Upload profile avatars  
✅ Upload company logos  
✅ Upload project images  
✅ Customize brand colors  
✅ Add/edit/delete work experience  
✅ Add/edit/delete portfolio projects  
✅ Manage all profile information  
✅ See live previews  
✅ Save everything instantly  
✅ No code editing needed!  

**Everything managed visually from the admin panel!** 🎨✨

---

## 📞 **Need Help?**

- Check console for errors (F12)
- Verify backend server is running
- Check image file size (under 5MB)
- Ensure valid file formats
- Verify login token hasn't expired

---

**Happy Content Managing!** 🚀

Your portfolio, your way - managed beautifully! ✨

