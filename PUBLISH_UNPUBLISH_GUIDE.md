# 📢 Publish & Unpublish Content Guide

## ✅ Complete CMS with Draft & Publish Workflow

Your CMS now supports **full draft and publish workflow** for all content! You can create drafts, publish them when ready, and unpublish anytime!

---

## 🎯 **What's New - Publish/Unpublish Features**

### ✅ **Draft Mode**
- Create content as drafts (not visible on live site)
- Edit and perfect before publishing
- Save work in progress

### ✅ **Publish/Unpublish**
- Publish drafts to make them live
- Unpublish live content to make it draft
- One-click toggle between states

### ✅ **Visual Indicators**
- Draft badge on unpublished items
- Highlighted unpublished items
- Clear publish status

### ✅ **Works on All Content**
- Work Experience
- Portfolio Items
- Future: Profile sections

---

## 📊 **How It Works**

### **Content States:**

| State | Visible on Website | Visible in Admin | Can Edit |
|-------|-------------------|------------------|----------|
| **Published** ✅ | ✅ Yes | ✅ Yes | ✅ Yes |
| **Draft** 📝 | ❌ No | ✅ Yes | ✅ Yes |

---

## 🚀 **Usage Guide**

### **1. Create Content as Draft**

#### **Work Experience:**
1. Go to: `/admin/experience`
2. Click "+ Add New Experience"
3. Fill in all details
4. **Uncheck** "Publish immediately" checkbox
5. Click "Add Experience"
6. ✅ Saved as DRAFT (not visible on website)

#### **Portfolio Item:**
1. Go to: `/admin/portfolio`
2. Click "+ Add New Item"
3. Fill in all details
4. **Uncheck** "Publish immediately" checkbox
5. Click "Add Project"
6. ✅ Saved as DRAFT (not visible on website)

---

### **2. Create and Publish Immediately**

1. Go to any manager page
2. Click "+ Add New" button
3. Fill in all details
4. **Keep checked** "Publish immediately" checkbox (default)
5. Click "Add" button
6. ✅ Published immediately (visible on website)

---

### **3. Publish a Draft**

1. Go to manager page
2. Find item with **DRAFT** badge
3. Click **"📢 Publish"** button
4. ✅ Item becomes live on website
5. Badge changes to published state
6. Button changes to "👁️ Unpublish"

---

### **4. Unpublish Live Content**

1. Go to manager page
2. Find published item (no DRAFT badge)
3. Click **"👁️ Unpublish"** button
4. ✅ Item removed from live website
5. **DRAFT** badge appears
6. Button changes to "📢 Publish"

---

### **5. Edit Draft Content**

1. Go to manager page
2. Find item with DRAFT badge
3. Click "Edit" button
4. Make changes
5. Option to publish or keep as draft
6. Save changes

---

### **6. Edit Published Content**

1. Go to manager page
2. Find published item
3. Click "Edit" button
4. Make changes
5. Changes saved immediately
6. Visible on website after save

---

## 📋 **Complete Workflow Examples**

### **Example 1: Write Experience Draft, Publish Later**

**Step 1: Create Draft**
```
1. /admin/experience
2. Click "+ Add New Experience"
3. Enter: Company "New Corp", Title "Senior Designer"
4. UNCHECK "Publish immediately"
5. Click "Add Experience"
```

**Result:** 
- ✅ Saved in CMS
- ❌ NOT on live site
- 🏷️ Shows DRAFT badge

**Step 2: Publish When Ready**
```
1. Review the draft entry
2. Click "📢 Publish" button
3. Confirm
```

**Result:**
- ✅ Now visible on /experience page
- ✅ Badge removed
- ✅ Live for everyone

---

### **Example 2: Temporarily Hide Portfolio Item**

**Scenario:** Client requested changes, need to hide item temporarily

```
1. /admin/portfolio
2. Find the portfolio item
3. Click "👁️ Unpublish" button
```

**Result:**
- ❌ Removed from /portfolio page
- ✅ Still in CMS (you can see it)
- 🏷️ Shows DRAFT badge
- ✅ Easy to republish later

**When Ready:**
```
1. Make edits if needed (click Edit)
2. Click "📢 Publish" button
3. Back live!
```

---

### **Example 3: Batch Content Preparation**

**Scenario:** Prepare 5 new portfolio items, publish all at once

```
For each item:
1. /admin/portfolio
2. "+ Add New Item"
3. Fill details
4. UNCHECK "Publish immediately"
5. Save

Result: All 5 items in draft mode

When ready to launch:
1. Click "📢 Publish" on each item
2. All go live together!
```

---

## 🎨 **Visual Indicators**

### **In Admin Panel:**

#### **Published Item:**
```
┌──────────────────────────────────────┐
│ 📸 Mobile App Design                 │
│ UI Design • 2023                     │
│                                      │
│ [👁️ Unpublish] [Edit] [Delete]     │
└──────────────────────────────────────┘
```

#### **Draft Item:**
```
┌──────────────────────────────────────┐
│ 📸 New Project Design  🏷️ DRAFT     │
│ UI Design • 2024                     │
│ (slightly faded/highlighted)         │
│ [📢 Publish] [Edit] [Delete]        │
└──────────────────────────────────────┘
```

---

## 🔄 **Live Website Behavior**

### **Public View (http://localhost:5173)**

**Shows:**
- ✅ All published content
- ✅ Only published experiences
- ✅ Only published portfolio items

**Hides:**
- ❌ Draft experiences
- ❌ Draft portfolio items
- ❌ Anything unpublished

### **Admin View (http://localhost:5173/admin)**

**Shows:**
- ✅ ALL content (published + drafts)
- ✅ Draft badges on unpublished
- ✅ Publish/unpublish controls

---

## 📊 **API Endpoints**

### **Public Endpoints** (Only Published Content)
```
GET /api/experience          → Published experiences only
GET /api/portfolio          → Published portfolio only
```

### **Admin Endpoints** (All Content)
```
GET /api/experience/all     → All experiences (requires auth)
GET /api/portfolio/all      → All portfolio (requires auth)
```

### **Publish/Unpublish**
```
PATCH /api/experience/:id/publish   → Toggle publish status
PATCH /api/portfolio/:id/publish    → Toggle publish status
```

---

## ⚙️ **Technical Details**

### **Data Structure:**

Each item has a `published` field:

```json
{
  "id": "123",
  "title": "My Project",
  "published": true,    ← Controls visibility
  "createdAt": "2024-01-01",
  "updatedAt": "2024-01-02"
}
```

### **Publish States:**
- `published: true` → Visible on live site
- `published: false` → Draft (hidden from public)
- `published: undefined` → Treated as true (default)

---

## 🎯 **Best Practices**

### **When to Use Drafts:**

✅ **Use Drafts When:**
- Content is incomplete
- Waiting for client approval
- Preparing bulk launch
- Need to review before publishing
- Work in progress
- Testing content layout

✅ **Publish Immediately When:**
- Content is complete and approved
- Ready for public viewing
- Adding old/existing work
- Urgent updates needed

---

## 🔐 **Security**

### **Published Content:**
- ✅ Anyone can view
- ✅ Publicly accessible
- ✅ Shows on website

### **Draft Content:**
- ✅ Only visible in admin panel
- ✅ Requires admin login
- ❌ Hidden from public API
- ❌ Not on live website

---

## 📱 **Complete Feature List**

### **Work Experience Manager** ✅
- ✅ Create as draft or published
- ✅ Publish/unpublish toggle
- ✅ Visual draft indicators
- ✅ Edit while draft or published
- ✅ Delete anytime

### **Portfolio Manager** ✅
- ✅ Create as draft or published
- ✅ Publish/unpublish toggle
- ✅ Visual draft indicators
- ✅ Edit while draft or published
- ✅ Delete anytime

### **Admin Panel Controls** ✅
- ✅ "Publish immediately" checkbox
- ✅ "📢 Publish" button (for drafts)
- ✅ "👁️ Unpublish" button (for published)
- ✅ DRAFT badge display
- ✅ Visual highlighting

### **Live Website** ✅
- ✅ Shows only published content
- ✅ Hides all drafts
- ✅ Real-time updates
- ✅ No draft leakage

---

## 🚀 **Quick Reference**

| Action | Button | Result |
|--------|--------|--------|
| **Create Draft** | Uncheck "Publish immediately" | Saved as draft |
| **Create Published** | Check "Publish immediately" (default) | Live immediately |
| **Publish Draft** | Click "📢 Publish" | Becomes live |
| **Unpublish Item** | Click "👁️ Unpublish" | Becomes draft |
| **Edit Draft** | Click "Edit" | Keep as draft |
| **Edit Published** | Click "Edit" | Stays published |

---

## 🎉 **Summary**

You now have complete control over your content:

✅ **Draft Mode** - Work on content privately  
✅ **Publish** - Make content live when ready  
✅ **Unpublish** - Hide content temporarily  
✅ **Edit Anytime** - In draft or published state  
✅ **Visual Feedback** - Clear status indicators  
✅ **Secure** - Drafts never leak to public  
✅ **Flexible** - Publish workflow that fits your needs  

---

## 📞 **Quick Actions**

### **Test Publish/Unpublish Now:**

1. **Login:** http://localhost:5173/admin
2. **Go to Experience:** http://localhost:5173/admin/experience
3. **Find any item**
4. **Click "👁️ Unpublish"**
5. **Check live site:** http://localhost:5173/experience
6. **Item is gone!** ✨
7. **Go back to admin**
8. **Click "📢 Publish"**
9. **Check live site again**
10. **Item is back!** 🎉

---

**Your content, your control - Draft, Edit, Publish!** ✨

Manage everything with complete flexibility! 🚀

