# Quick Start Guide - 5 Minutes

## Prerequisites
- Node.js installed
- MongoDB Atlas account
- MongoDB connection string

## 1. MongoDB Atlas Connection String

Get it from: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Connect → Connect your application
- Copy the connection string

---

## 2. Backend Setup (2 minutes)

### Terminal 1 - Backend

```bash
cd backend
npm install
```

### Create `.env` file in backend folder:

```
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/aktours?retryWrites=true&w=majority
PORT=5000
ADMIN_USERNAME=aktourstravels3693@gmail.com
ADMIN_PASSWORD=aktour@3693
```

### Start backend:

```bash
npm run dev
```

**Expected output:**
```
MongoDB connected successfully
Server running on http://localhost:5000
```

---

## 3. Frontend Setup (2 minutes)

### Terminal 2 - Frontend

```bash
cd frontend/ak-tours-and-travels
npm run dev
```

**Open:** http://localhost:5173

---

## 4. Test the System (1 minute)

### Submit Feedback:
1. Click "**Feedback**" in navigation (was "Profile")
2. Enter name
3. Choose rating
4. Write message
5. Click "Send Feedback"
6. You see: "Feedback submitted successfully!"

### Approve Feedback (Admin):
1. Click footer copyright: **"© 2025 AK Tours & Travels..."**
2. Username: `aktourstravels3693@gmail.com`
3. Password: `aktour@3693`
4. Click "Sign In"
5. See pending feedbacks
6. Click "✓ Approve"
7. See "Feedback approved successfully!"

### View Reviews:
1. Click "**Reviews**" in navigation (was "Feedback")
2. See approved feedbacks with ratings

---

## API Test Commands

### Submit Feedback (POST)
```bash
curl -X POST http://localhost:5000/api/feedback/submit \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "rating": 5,
    "message": "Great service!",
    "tags": ["verified"],
    "media": null,
    "mediaType": null
  }'
```

### Get Approved Feedbacks (GET)
```bash
curl http://localhost:5000/api/feedback/approved
```

### Get Pending Feedbacks (GET)
```bash
curl http://localhost:5000/api/feedback/pending
```

### Approve Feedback (PUT)
```bash
curl -X PUT http://localhost:5000/api/feedback/approve/FEEDBACK_ID \
  -H "Content-Type: application/json" \
  -d '{"feedbackId": "FEEDBACK_ID"}'
```

Replace `FEEDBACK_ID` with actual MongoDB ObjectId from pending feedbacks.

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| MongoDB connection error | Check `.env` credentials and IP whitelist |
| Port 5000 already in use | Change PORT in `.env` to 5001 |
| Frontend can't reach backend | Ensure backend is running on http://localhost:5000 |
| No data saves | Check MongoDB Atlas console to verify data |

---

## Navigation Changes

**Old Structure** → **New Structure**
- Profile page (editing) → **Removed** (no edits now)
- Profile nav link → **Feedback** (feedback form)
- Feedback nav link → **Reviews** (view approved feedback)
- Feedback page → **Reviews page**

---

## Files Modified/Created

### Backend (New)
- `backend/.env` - Environment configuration
- `backend/server.js` - Main server
- `backend/config/db.js` - MongoDB connection
- `backend/models/Feedback.js` - Feedback schema
- `backend/routes/feedback.js` - Feedback API routes
- `backend/routes/admin.js` - Admin authentication

### Frontend (Updated)
- `src/pages/Profile.jsx` - Now submits to backend API
- `src/pages/Feedback.jsx` - Now fetches from backend API
- `src/pages/AdminLogin.jsx` - Now authenticates via backend
- `src/pages/AdminDashboard.jsx` - Now shows pending feedbacks from DB

---

## Database Collections

After first feedback:
```
aktours database/
└── feedbacks collection
    ├── name: "John Doe"
    ├── rating: 5
    ├── message: "Great service!"
    ├── approved: false (pending)
    ├── createdAt: "2025-12-03..."
```

After admin approval:
```
    ├── approved: true ✓
    ├── approvedBy: "admin"
    └── approvedAt: "2025-12-03..."
```

---

## Common Issues Checklist

- [ ] MongoDB Atlas cluster running?
- [ ] `.env` file created with correct credentials?
- [ ] `npm install` run in backend?
- [ ] Backend server showing "MongoDB connected"?
- [ ] Frontend showing "Feedback" and "Reviews" nav links?
- [ ] Can submit feedback without errors?
- [ ] Can see feedback in admin dashboard?
- [ ] Can approve feedback?
- [ ] Does approved feedback appear in Reviews?

---

## Next Steps

1. ✅ System is working
2. **In production**, update:
   - Admin credentials
   - Frontend API URL
   - MongoDB IP whitelist
   - CORS settings

3. **Add features** (optional):
   - Email notifications
   - Feedback search
   - Star rating filter
   - Admin analytics

---

Need help? Check `FEEDBACK_SYSTEM_SETUP.md` for detailed guide!
