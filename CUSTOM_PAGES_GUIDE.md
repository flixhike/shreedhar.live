# 📄 Custom Pages - Complete Guide

## 🎉 **Create Custom Pages from CMS Admin!**

You can now create unlimited custom pages from the admin panel that automatically appear in your navigation menu!

---

## ✨ **What You Can Do:**

### **✅ Create Custom Pages**
- Add any page content (Contact, Services, Team, etc.)
- Use rich text editor with full formatting
- Add colors, emojis, lists, images
- Each page gets a unique URL

### **✅ Auto Navigation**
- Pages automatically appear in menu
- Control menu order (position)
- Hide from menu if needed
- Rearrange easily

### **✅ Full Management**
- Edit content anytime
- Publish/Unpublish instantly
- Delete when not needed
- Preview before publishing

---

## 🚀 **How to Create a Custom Page:**

### **Step 1: Go to Page Manager**

```
Admin Panel → Pages
or
http://localhost:5173/admin/pages
```

### **Step 2: Click "+ Add New Page"**

A modal will open with the page editor.

### **Step 3: Fill in Page Details**

```
┌─────────────────────────────────────────┐
│ Page Title *                            │
│ ┌─────────────────────────────────────┐ │
│ │ Contact Us                          │ │
│ └─────────────────────────────────────┘ │
│ URL will be: /contact-us               │ ← Auto-generated
│                                         │
│ Menu Order: 4                           │ ← Position in menu
│                                         │
│ ☑ Show in navigation menu              │
│                                         │
│ Page Content * (Rich Text Editor)      │
│ ┌─────────────────────────────────────┐ │
│ │ Get in touch with us...             │ │
│ │ Email: contact@example.com          │ │
│ │ Phone: +1 234 567 890               │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ☑ Publish immediately                  │
└─────────────────────────────────────────┘

[Cancel]  [Add Page]
```

### **Step 4: Content is Live!**

Your page appears in the navigation menu instantly!

```
Navigation:
[About Me] [Work experience] [Portfolio] [Contact Us] ← New!
                                           ↑
                                    Your custom page
```

---

## 📋 **Real-World Examples:**

### **Example 1: Contact Page**

**Page Title:** Contact Us  
**URL:** /contact-us  
**Menu Order:** 4  
**Content:**
```
# Get In Touch

📧 Email: your.email@example.com
📱 Phone: +1 (123) 456-7890
🌍 Location: Bangalore, India

## Office Hours
Monday - Friday: 9:00 AM - 6:00 PM
Saturday: 10:00 AM - 2:00 PM
```

**Result:** Professional contact page in menu!

---

### **Example 2: Services Page**

**Page Title:** Services  
**URL:** /services  
**Menu Order:** 5  
**Content:**
```
# Our Services

## UI/UX Design
Creating beautiful, user-centered interfaces

## Prototyping
Interactive prototypes in Figma

## Design Systems
Comprehensive component libraries

## Consultation
Expert design guidance
```

**Result:** Services showcase page!

---

### **Example 3: About Projects Page**

**Page Title:** Project Process  
**URL:** /project-process  
**Menu Order:** 6  
**Content:**
```
# How We Work

1. **Discovery** - Understanding your needs
2. **Research** - User and market research
3. **Design** - Creating solutions
4. **Testing** - Validating with users
5. **Delivery** - Polished final product
```

**Result:** Process explanation page!

---

### **Example 4: Testimonials**

**Page Title:** Testimonials  
**URL:** /testimonials  
**Menu Order:** 7  
**Content:**
```
# What Clients Say

> "Exceptional designer with great attention to detail!"
> — John Doe, CEO at TechCorp

> "Delivered exactly what we needed, on time!"
> — Jane Smith, Product Manager

> "Highly recommended for UI/UX projects."
> — Mike Johnson, Startup Founder
```

**Result:** Social proof page!

---

## 🎯 **Page Settings Explained:**

### **1. Page Title**
- **What it is:** Name of the page
- **Shows in:** Navigation menu
- **Example:** "Contact", "Services", "About"
- **Required:** Yes

### **2. URL (Auto-generated)**
- **What it is:** Web address for the page
- **Generated from:** Page title
- **Example:** 
  - "Contact Us" → /contact-us
  - "Our Services" → /our-services
  - "About Team" → /about-team
- **Automatic:** Yes, no need to edit

### **3. Menu Order**
- **What it is:** Position in navigation
- **Default pages:**
  - About Me: 1
  - Work experience: 2
  - Portfolio: 3
- **Your pages:** 4, 5, 6, etc.
- **Lower number:** Appears first
- **Higher number:** Appears last

### **4. Show in Navigation Menu**
- **Checked:** Page appears in menu ✅
- **Unchecked:** Page hidden from menu
- **Use case:** Landing pages, hidden pages
- **Still accessible:** Via direct URL

### **5. Page Content**
- **What it is:** The actual page content
- **Editor:** Rich text with formatting
- **Features:**
  - Bold, italic, underline
  - Headers (H1-H6)
  - Text colors
  - Font sizes
  - Lists (bullet, numbered)
  - Emojis
  - Links
  - Alignment
- **Required:** Yes

### **6. Publish Immediately**
- **Checked:** Goes live instantly ✅
- **Unchecked:** Saved as draft
- **Draft:** Not visible on website
- **Can change later:** Yes

---

## 🔄 **Managing Your Pages:**

### **View All Pages**

Go to: Admin Panel → Pages

```
┌────────────────────────────────────────┐
│ Custom Pages                           │
│ Create and manage custom pages...      │
│                           [+ Add New]  │
├────────────────────────────────────────┤
│                                        │
│ 📄 Contact Us                          │
│    /contact-us • Menu Order: 4         │
│    [📢 Publish] [Edit] [Delete]        │
│                                        │
│ 📄 Services                    DRAFT   │
│    /services • Menu Order: 5           │
│    [👁️ Unpublish] [Edit] [Delete]     │
│                                        │
│ 📄 Testimonials                        │
│    /testimonials • Menu Order: 6       │
│    [📢 Publish] [Edit] [Delete]        │
└────────────────────────────────────────┘
```

---

### **Edit a Page**

1. Click **[Edit]** on any page
2. Modal opens with current content
3. Make changes
4. Click **[Update Page]**
5. Changes go live instantly!

---

### **Publish/Unpublish**

**To Publish (make visible):**
1. Click **[📢 Publish]** button
2. Page appears on website
3. Shows in navigation menu

**To Unpublish (hide):**
1. Click **[👁️ Unpublish]** button
2. Page hidden from website
3. Removed from navigation
4. Saved as draft

**Draft Badge:**
```
📄 Services                    DRAFT
   /services • Menu Order: 5
```

---

### **Delete a Page**

1. Click **[Delete]** button
2. Confirm deletion
3. Page removed completely
4. Removed from navigation

**Warning:** Cannot be undone!

---

## 📐 **Menu Order Guide:**

### **How Menu Order Works:**

```
Menu Order 1: [About Me]
Menu Order 2: [Work experience]
Menu Order 3: [Portfolio]
Menu Order 4: [Contact Us] ← Your page
Menu Order 5: [Services] ← Your page
Menu Order 6: [Testimonials] ← Your page
```

### **Changing Order:**

Want Services before Contact?

**Before:**
```
Contact Us (Order: 4)
Services (Order: 5)
```

**Edit Services → Change Order to 4:**
```
Services (Order: 4)
Contact Us (Order: 5)
```

**Result:**
```
Navigation: [About] [Experience] [Portfolio] [Services] [Contact Us]
                                             ↑           ↑
                                         Swapped!
```

---

## 🎨 **Rich Text Editor Features:**

### **Toolbar Options:**

```
┌──────────────────────────────────────────────┐
│ [H1▾] [B] [I] [U] [S] [Size▾] [🎨▾] [☺] ... │
└──────────────────────────────────────────────┘
```

**Available:**
- **Headers:** H1, H2, H3 for titles
- **Bold:** Strong emphasis
- **Italic:** Subtle emphasis
- **Underline:** Highlight text
- **Strike:** Cross out text
- **Font Size:** Small, normal, large, huge
- **Text Color:** Any color
- **Background Color:** Highlight background
- **Lists:** Bullet points, numbered lists
- **Alignment:** Left, center, right, justify
- **Emojis:** Add emotional context
- **Links:** External or internal links
- **Clear Format:** Remove all formatting

---

### **Styling Examples:**

**Headers:**
```
# Main Title (H1)
## Subheading (H2)
### Section (H3)
```

**Text Styles:**
```
**Bold text**
*Italic text*
__Underlined text__
~~Strikethrough~~
```

**Colors:**
```
🔴 Red text for important
🟢 Green text for success
🔵 Blue text for links
```

**Lists:**
```
• Bullet point 1
• Bullet point 2
  • Nested point

1. First item
2. Second item
3. Third item
```

**Emojis:**
```
✨ Sparkles for emphasis
🎉 Celebration
📧 Email icon
📱 Phone icon
🌟 Star highlight
```

---

## 💡 **Best Practices:**

### **✅ Do:**

1. **Keep URLs short and clear**
   - Good: /contact, /services
   - Avoid: /contact-us-for-more-information

2. **Use menu order logically**
   - Important pages first (lower numbers)
   - Secondary pages last (higher numbers)

3. **Write clear content**
   - Use headers for structure
   - Break into short paragraphs
   - Add emojis for visual interest

4. **Test before publishing**
   - Create as draft first
   - Preview content
   - Then publish

5. **Use consistent styling**
   - Same header levels
   - Consistent colors
   - Similar formatting

---

### **❌ Don't:**

1. **Don't use special characters in titles**
   - Avoid: Contact & Services
   - Better: Contact and Services

2. **Don't skip menu orders**
   - Bad: 4, 5, 9, 12
   - Good: 4, 5, 6, 7

3. **Don't create duplicate pages**
   - Each page needs unique title
   - System prevents duplicate URLs

4. **Don't leave pages as drafts forever**
   - Publish or delete
   - Keep CMS clean

5. **Don't overload with pages**
   - Too many menu items = confusing
   - Aim for 5-7 total menu items

---

## 📱 **Mobile Experience:**

Custom pages work perfectly on mobile:

```
┌─────────────────┐
│  ☰  Sridhar     │ ← Mobile header
├─────────────────┤
│ [About Me]      │
│ [Experience]    │
│ [Portfolio]     │
│ [Contact] ← New │ ← Your pages!
│ [Services] ← New│
└─────────────────┘
```

- Responsive layout
- Touch-friendly
- Auto-adjusts text
- Maintains formatting

---

## 🔍 **Technical Details:**

### **How It Works:**

1. **Create in Admin:**
   - You add page via CMS
   - Saved to database

2. **Auto URL Generation:**
   - Title converted to URL
   - "Contact Us" → /contact-us
   - Special chars removed

3. **Navigation Update:**
   - API fetches pages
   - Adds to menu automatically
   - Sorts by menu order

4. **Page Rendering:**
   - User clicks menu link
   - System loads page by URL slug
   - Renders content with formatting

---

### **API Endpoints:**

**Frontend:**
- `GET /api/pages` - Get published pages
- `GET /api/pages/:slug` - Get single page

**Admin:**
- `GET /api/pages/all` - All pages (incl. drafts)
- `POST /api/pages` - Create page
- `PUT /api/pages/:id` - Update page
- `DELETE /api/pages/:id` - Delete page
- `PATCH /api/pages/:id/publish` - Toggle publish

---

## 📊 **Page Structure:**

```json
{
  "id": "1733024567890",
  "title": "Contact Us",
  "slug": "contact-us",
  "content": "<h1>Get In Touch</h1><p>Email: contact@example.com</p>",
  "menuOrder": 4,
  "showInMenu": true,
  "published": true,
  "createdAt": "2024-11-29T10:15:00.000Z",
  "updatedAt": "2024-11-29T10:20:00.000Z"
}
```

---

## 🎓 **Common Use Cases:**

### **1. Business Website**
- Services
- Contact
- Team
- Pricing
- FAQ

### **2. Portfolio Site**
- About Projects
- Case Studies
- Process
- Testimonials
- Blog

### **3. Personal Brand**
- Speaking
- Publications
- Consulting
- Downloads
- Resources

### **4. Agency Site**
- Industries
- Approach
- Clients
- Careers
- News

---

## 🆘 **Troubleshooting:**

### **Q: Page not showing in menu?**
**A:** Check:
- Is "Show in navigation menu" checked?
- Is page published (not draft)?
- Refresh website

### **Q: Wrong menu order?**
**A:** Edit page, change Menu Order number, save

### **Q: URL not working?**
**A:** 
- Check slug format (lowercase, hyphens)
- Avoid special characters in title
- Try different page title

### **Q: Content looks wrong?**
**A:** 
- Use rich text editor toolbar
- Preview before saving
- Check mobile view

### **Q: Can't delete page?**
**A:** 
- Must be logged in as admin
- Refresh page and try again

---

## ✨ **Pro Tips:**

1. **Use emojis in content**
   - Makes pages visually interesting
   - Draws attention to key points
   - Example: 📧 Email, 📱 Phone

2. **Add FAQ page**
   - Common questions
   - Quick answers
   - Reduces support requests

3. **Create process page**
   - Show your workflow
   - Build trust
   - Set expectations

4. **Testimonials page**
   - Social proof
   - Build credibility
   - Use quotes

5. **Keep content updated**
   - Review monthly
   - Update info
   - Remove outdated pages

---

## 🎊 **Summary:**

**What You Get:**

✅ **Unlimited custom pages**  
✅ **Auto navigation menu**  
✅ **Rich text editor**  
✅ **Publish/unpublish control**  
✅ **Menu order control**  
✅ **Mobile responsive**  
✅ **Auto URL generation**  
✅ **Draft mode**  
✅ **Full CRUD operations**  

---

## 🚀 **Get Started:**

```bash
1. Go to: http://localhost:5173/admin/pages

2. Click: "+ Add New Page"

3. Fill in:
   - Title: "Contact"
   - Content: Your contact information
   - Menu Order: 4

4. Check: "Publish immediately"

5. Click: "Add Page"

6. View your website: "Contact" now in menu!

7. Visitors click → See your page!
```

---

**Create unlimited pages from CMS!** 📄✨

**Build your perfect website structure!** 🚀🎨

---

**Your website just got infinitely flexible!** 🌟

