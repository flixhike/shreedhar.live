# 🎯 Live Content Editing Guide

## ✅ Your CMS is Now Connected to Live Website!

You can now edit content in the admin panel and see changes **immediately** on your live portfolio website!

---

## 🔄 How It Works

### **Admin Panel → API → Live Website**

```
1. Edit content in Admin Panel (http://localhost:5173/admin)
   ↓
2. Data saved to API (http://localhost:5001/api)
   ↓
3. Live website fetches updated data
   ↓
4. Changes appear immediately!
```

---

## 📝 What You Can Edit (Live Content)

### **1. Profile Information** ✅
**Edit in:** `/admin/profile`  
**Appears on:** Left sidebar (desktop) & Mobile header

| Field | Where It Appears | How to Edit |
|-------|------------------|-------------|
| **Profile Avatar** | Sidebar top | Upload new image |
| **Name** | Sidebar | Text field |
| **Location** | Under name | Text field |
| **Title** | Below location | Text field |
| **Years of Experience** | Below title | Text field |
| **Skills** | Skills section | Comma-separated list |
| **Tools** | Tools section | Comma-separated list |
| **Languages** | Languages section | Comma-separated list |
| **Phone** | Contact section | Text field |
| **Email** | Contact section | Text field |
| **LinkedIn URL** | Social links | URL field |
| **Behance URL** | Social links | URL field |
| **Primary Color** | Entire site | Color picker |
| **Secondary Color** | Entire site | Color picker |

### **2. Work Experience** ✅
**Edit in:** `/admin/experience`  
**Appears on:** `/experience` page

| Field | Where It Appears | How to Edit |
|-------|------------------|-------------|
| **Company Logo** | Left side of experience | Upload image |
| **Company Name** | Above title | Text field |
| **Job Title** | Main heading | Text field |
| **Period** | Below title | Text field (e.g., "Jan 2020 - Present") |
| **Location** | Can add | Text field |
| **Description** | Main content | Large text area |
| **Projects** | Bottom tags | Comma-separated list |

### **3. Portfolio Items** (Coming Soon)
**Edit in:** `/admin/portfolio`  
**Appears on:** `/portfolio` page

---

## 🚀 Quick Tutorial: Edit & See Live Changes

### **Example 1: Change Your Job Title**

1. **Go to Admin Panel:**
   - Open: http://localhost:5173/admin/profile
   - Login if needed

2. **Edit Your Title:**
   - Find the "Title" field
   - Change "UI/UX Designer II" to "Senior UI/UX Designer"
   - Click "Save Changes"

3. **See It Live:**
   - Open main site in another tab: http://localhost:5173
   - Check the sidebar → Title is updated!
   - Check mobile view → Header is updated!

**That's it!** ✨ Changes are immediate!

---

### **Example 2: Add New Work Experience**

1. **Go to Experience Manager:**
   - Open: http://localhost:5173/admin/experience

2. **Click "+ Add New Experience":**
   - Modal opens

3. **Fill in the Form:**
   - Upload company logo (optional)
   - Enter company name: "New Company Inc."
   - Enter job title: "UI/UX Lead"
   - Enter period: "Jan 2024 - Present"
   - Enter description
   - Add projects: "Project A, Project B"
   - Click "Add Experience"

4. **See It Live:**
   - Go to: http://localhost:5173/experience
   - Your new experience appears at the top!

---

### **Example 3: Update Profile Picture**

1. **Go to Profile Editor:**
   - Open: http://localhost:5173/admin/profile

2. **Upload New Avatar:**
   - Click "Upload Avatar"
   - Select your photo
   - Wait for upload
   - Click "Save Changes"

3. **See It Live:**
   - Go to: http://localhost:5173
   - Sidebar shows your new photo!
   - Mobile header shows your new photo!

---

### **Example 4: Edit Existing Work Experience**

1. **Go to Experience Manager:**
   - Open: http://localhost:5173/admin/experience

2. **Click "Edit" on Any Experience:**
   - Modal opens with current data

3. **Make Changes:**
   - Update description
   - Add more projects
   - Change period
   - Click "Update Experience"

4. **See It Live:**
   - Go to: http://localhost:5173/experience
   - Changes appear immediately!

---

### **Example 5: Delete Work Experience**

1. **Go to Experience Manager:**
   - Open: http://localhost:5173/admin/experience

2. **Click "Delete":**
   - Confirm deletion

3. **See It Live:**
   - Go to: http://localhost:5173/experience
   - Experience is removed!

---

## 🎨 Customize Brand Colors (Live)

### **Change Primary Color (Pink):**

1. Go to: `/admin/profile`
2. Scroll to "Branding Colors"
3. Click primary color picker
4. Choose new color (e.g., #FF5722 - Orange)
5. Click "Save Changes"

**Result:** All pink elements change to your new color!
- Navigation active state
- Job title
- Links
- Badges
- Hover effects

### **Change Secondary Color (Blue):**

1. Same as above
2. Click secondary color picker
3. Choose new color (e.g., #4CAF50 - Green)
4. Click "Save Changes"

**Result:** All blue elements change!
- Project tags
- Secondary highlights
- Icons

---

## 📊 Current Data Structure

### **Profile Data** (`/api/profile`)
```json
{
  "name": "Sridhar",
  "location": "Bangalore",
  "title": "UI/UX Designer II",
  "experience": "14 years of experience",
  "avatar": "/images/profile-avatar.svg",
  "skills": ["UX Research", "UI Design", ...],
  "tools": ["Figma", "Miro", ...],
  "languages": ["English", "Hindi", ...],
  "phone": "9986256789",
  "email": "ssri46@gmail.com",
  "linkedin": "https://...",
  "behance": "https://...",
  "primaryColor": "#FE275C",
  "secondaryColor": "#0387C3"
}
```

### **Experience Data** (`/api/experience`)
```json
[
  {
    "id": "1",
    "logo": "/images/company-logo.png",
    "company": "Company Name",
    "title": "Job Title",
    "period": "Jan 2020 - Present",
    "location": "City, Country",
    "description": "Job description...",
    "projects": ["Project 1", "Project 2"]
  }
]
```

---

## ⚡ Real-Time Updates

### **How Fast Are Changes?**

| Action | Time to See Live |
|--------|------------------|
| Save Profile Changes | **Instant** (on page reload) |
| Add Work Experience | **Instant** (on page reload) |
| Edit Work Experience | **Instant** (on page reload) |
| Delete Work Experience | **Instant** (on page reload) |
| Upload Images | **Instant** (after save) |
| Change Colors | **Instant** (on page reload) |

**Tip:** Refresh the main site page (F5) to see changes immediately!

---

## 🔄 Data Flow Diagram

```
┌─────────────────────────────────────────────────┐
│           ADMIN PANEL                           │
│  http://localhost:5173/admin                    │
│                                                 │
│  ┌────────────┐  ┌────────────┐  ┌───────────┐ │
│  │  Profile   │  │Experience  │  │ Portfolio │ │
│  │  Editor    │  │  Manager   │  │  Manager  │ │
│  └─────┬──────┘  └─────┬──────┘  └─────┬─────┘ │
│        │                │                │       │
└────────┼────────────────┼────────────────┼───────┘
         │                │                │
         ↓                ↓                ↓
    ┌────────────────────────────────────────────┐
    │         API SERVER (Port 5001)             │
    │                                            │
    │  PUT /api/profile                          │
    │  GET /api/experience                       │
    │  POST /api/experience                      │
    │  PUT /api/experience/:id                   │
    │  DELETE /api/experience/:id                │
    │  POST /api/upload/single                   │
    └────────┬───────────────────────────────────┘
             │
             ↓
    ┌────────────────────────────────────────────┐
    │      DATA FILES (JSON)                     │
    │                                            │
    │  server/data/profile.json                  │
    │  server/data/experience.json               │
    │  server/data/portfolio.json                │
    │  public/uploads/ (images)                  │
    └────────┬───────────────────────────────────┘
             │
             ↓
    ┌────────────────────────────────────────────┐
    │       LIVE WEBSITE (Port 5173)             │
    │                                            │
    │  ┌──────────┐  ┌──────────┐  ┌──────────┐ │
    │  │  Sidebar │  │Experience│  │Portfolio │ │
    │  │(Profile) │  │   Page   │  │   Page   │ │
    │  └────┬─────┘  └─────┬────┘  └────┬─────┘ │
    │       │              │              │       │
    │   GET /api/profile                         │
    │                  GET /api/experience        │
    │                               GET /api/portfolio
    └────────────────────────────────────────────┘
```

---

## 🎯 Testing Your Live Editing

### **Step-by-Step Test:**

1. **Open Two Browser Windows:**
   - Window 1: Admin Panel (http://localhost:5173/admin)
   - Window 2: Live Website (http://localhost:5173)

2. **Make a Change in Admin:**
   - Edit your name in Profile Editor
   - Click "Save Changes"

3. **Refresh Live Website:**
   - Press F5 in Window 2
   - See your name updated!

4. **Try Adding Experience:**
   - Add new work experience in admin
   - Go to /experience page in Window 2
   - See it appear!

5. **Try Uploading Image:**
   - Upload new avatar in admin
   - Refresh sidebar
   - See new avatar!

---

## 📁 Where Is Data Stored?

### **JSON Files:**
```
server/data/
├── profile.json       ← Your profile information
├── experience.json    ← All work experiences
├── portfolio.json     ← All portfolio items
└── users.json         ← Admin users
```

### **Uploaded Images:**
```
public/uploads/
├── image-123456.jpg   ← Uploaded avatars
├── logo-789012.png    ← Company logos
└── project-345678.jpg ← Project images
```

---

## 🔒 Data Backup

**To backup your content:**

```bash
# Backup data files
cp -r server/data /path/to/backup/data-$(date +%Y%m%d)

# Backup uploaded images
cp -r public/uploads /path/to/backup/uploads-$(date +%Y%m%d)
```

---

## ✅ What's Connected (Live)

✅ **Profile sidebar** → Fetches from `/api/profile`  
✅ **Work Experience page** → Fetches from `/api/experience`  
✅ **Mobile header** → Uses profile data  
⏳ **Portfolio page** → Will be connected next  
⏳ **About Me page** → Will be connected next  

---

## 🚀 Start Editing Your Live Content!

1. **Login to Admin:** http://localhost:5173/admin
2. **Edit Profile:** Change name, title, skills
3. **Manage Experience:** Add, edit, delete jobs
4. **Upload Images:** Add avatars, logos
5. **Customize Colors:** Change brand colors
6. **See Changes:** Refresh main site

**Your content, your control - all live!** ✨

---

## 📞 Troubleshooting

### **Changes Not Appearing?**

1. **Check backend server is running:**
   ```bash
   # Should see: "CMS Server running on port 5001"
   ```

2. **Refresh the page:**
   - Press F5 or Ctrl+R (Cmd+R on Mac)

3. **Check browser console:**
   - Press F12
   - Look for any errors
   - Check Network tab for API calls

4. **Verify data was saved:**
   - Look at `server/data/profile.json`
   - Check if your changes are there

### **Images Not Loading?**

1. Check `public/uploads/` folder exists
2. Verify image was uploaded successfully
3. Check console for 404 errors
4. Make sure backend server is serving static files

---

**Happy Live Editing!** 🎉

Your portfolio is now fully manageable through the admin panel! ✨

