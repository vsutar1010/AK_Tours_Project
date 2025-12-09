# AK Tours & Travels - Complete Feedback System Setup Guide

## Overview
Your feedback system is now connected to MongoDB Atlas! Here's how everything works:

1. **Users** submit feedback on the **Feedback page** (Profile.jsx)
2. Feedback is stored in MongoDB with `approved: false`
3. **Admin** logs in and reviews pending feedback on **Admin Dashboard**
4. Admin can **Approve** or **Reject** feedback
5. Only **Approved** feedback is visible to other users on **Reviews page** (Feedback.jsx)

---

## Step 1: MongoDB Atlas Setup

### Create MongoDB Atlas Account & Database

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for free account
3. Create a new project
4. Create a new cluster (M0 Free Tier is enough for development)
5. Wait for cluster to be created (2-3 minutes)

### Get Connection String

1. Click "Connect" button on your cluster
2. Choose "Connect your application"
3. Copy the connection string that looks like:
   ```
   mongodb+srv://<username>:<password>@cluster0.mongodb.net/myproject?retryWrites=true&w=majority
   ```

### IP Whitelist

1. In MongoDB Atlas, go to "Network Access"
2. Add IP Address → "Allow Access from Anywhere" (0.0.0.0/0)
   - **Note:** For production, restrict to specific IPs

---

## Step 2: Backend Setup

### Install Dependencies

Open terminal in `backend/` folder:

```bash
npm install
```

This installs:
- `express` - Web framework
- `mongoose` - MongoDB connection
- `cors` - Cross-Origin Resource Sharing
- `dotenv` - Environment variables

### Configure Environment Variables

Create/update `.env` file in backend folder:

```
MONGODB_URI=mongodb+srv://your_username:your_password@cluster0.mongodb.net/aktours?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
ADMIN_USERNAME=aktourstravels3693@gmail.com
ADMIN_PASSWORD=aktour@3693
JWT_SECRET=your_jwt_secret_key_here
```

**Replace:**
- `your_username` - Your MongoDB Atlas username
- `your_password` - Your MongoDB Atlas password

### Start Backend Server

```bash
npm run dev
```

You should see:
```
MongoDB connected successfully
Server running on http://localhost:5000
```

---

## Step 3: Frontend Configuration

### Set Backend API URL

The frontend automatically uses `http://localhost:5000/api` by default.

To change it, update the API_BASE_URL in:
- `src/pages/Profile.jsx`
- `src/pages/Feedback.jsx`
- `src/pages/AdminLogin.jsx`
- `src/pages/AdminDashboard.jsx`

Or create `.env` in frontend:
```
VITE_API_URL=http://localhost:5000/api
```

### Start Frontend Server

```bash
npm run dev
```

---

## Step 4: How to Use

### For Users (Feedback Submission)

1. Go to **"Feedback"** link in navigation (previously "Profile")
2. Enter your name
3. Add optional photo or video
4. Select rating (1-5 stars)
5. Write your feedback message
6. Click **"Send Feedback"**
7. Your feedback is now pending admin approval

### For Admin (Approval)

1. Click on footer copyright text: **"© 2025 AK Tours & Travels..."** 
2. Enter credentials:
   - Username: `aktourstravels3693@gmail.com`
   - Password: `aktour@3693`
3. On **Admin Dashboard**, see all pending feedbacks
4. For each feedback:
   - Click **✓ Approve** to publish it
   - Click **✕ Reject** to delete it
5. Approved feedbacks appear on **"Reviews"** page for public view

### For Users (View Reviews)

1. Go to **"Reviews"** link in navigation (previously "Feedback")
2. See all approved customer feedback with ratings and photos/videos
3. View average rating and total review count

---

## API Endpoints

### Feedback Routes

```
POST   /api/feedback/submit
GET    /api/feedback/approved
GET    /api/feedback/pending
PUT    /api/feedback/approve/:id
DELETE /api/feedback/reject/:id
```

### Admin Routes

```
POST   /api/admin/login
```

---

## Database Schema

### Feedback Collection

```javascript
{
  _id: ObjectId,
  name: String,
  rating: Number (1-5),
  message: String,
  tags: [String],
  media: String (base64),
  mediaType: String ("image" or "video"),
  approved: Boolean,
  approvedBy: String,
  approvedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

---

## Troubleshooting

### Backend won't start

**Error:** `MongooseError: Cannot connect to MongoDB`

**Solution:**
1. Check `.env` file has correct `MONGODB_URI`
2. Verify MongoDB Atlas IP whitelist includes your IP
3. Check username/password are correct
4. Ensure cluster is running in MongoDB Atlas

### Frontend can't connect to backend

**Error:** `Failed to fetch` or `ERR_CONNECTION_REFUSED`

**Solution:**
1. Ensure backend server is running on `http://localhost:5000`
2. Check `API_BASE_URL` in frontend files
3. Ensure CORS is enabled (already configured in backend)
4. Check no firewall is blocking port 5000

### No data appears

**Solution:**
1. Verify MongoDB connection is working
2. Submit new feedback to create test data
3. Check MongoDB Atlas to see if data is being stored
4. Clear browser cache and reload

---

## Production Deployment

When deploying to production:

1. **MongoDB Atlas**: Keep it as-is (already cloud-hosted)

2. **Backend Deployment** (e.g., Heroku, Render, Railway):
   - Set environment variables on platform
   - Update frontend `API_BASE_URL` to production backend URL
   - Update CORS to allow only your frontend domain

3. **Frontend Deployment** (e.g., Vercel, Netlify):
   - Update `.env` with production backend URL
   - Deploy as usual

---

## File Structure

```
backend/
├── config/
│   └── db.js              # MongoDB connection
├── models/
│   └── Feedback.js        # Feedback schema
├── routes/
│   ├── feedback.js        # Feedback API
│   └── admin.js           # Admin API
├── server.js              # Main server
├── package.json           # Dependencies
├── .env                   # Environment variables
└── README.md              # Setup guide

frontend/ak-tours-and-travels/
├── src/pages/
│   ├── Profile.jsx        # Feedback submission (renamed from old Profile)
│   ├── Feedback.jsx       # Approved feedback submission form (renamed from old Feedback)
│   ├── AdminLogin.jsx     # Admin authentication
│   └── AdminDashboard.jsx # Admin feedback approval
```

---

## Next Steps

1. ✅ Backend server is running
2. ✅ Frontend connected to backend
3. **Test with sample feedback:**
   - Submit feedback as regular user
   - Check Admin Dashboard
   - Approve feedback
   - Verify it appears on Reviews page

4. **Customize** (optional):
   - Change admin credentials in backend `.env`
   - Add more validations
   - Add email notifications
   - Add feedback search/filtering

---

## Support

For issues or questions:
- Check browser console for frontend errors
- Check terminal for backend errors
- Verify MongoDB Atlas connection
- Review `.env` configuration

Happy coding! 🚀
