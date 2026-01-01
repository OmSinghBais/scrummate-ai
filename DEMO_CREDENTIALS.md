# 🎭 Demo Login Credentials

## Quick Demo Account

For testing purposes, you can use these credentials:

```
📧 Email:    demo@scrummate.ai
🔑 Password: Demo123!@#
```

## How to Create Demo User

### Option 1: Use Signup Page (Recommended)
1. Go to your deployed site: `https://your-vercel-url.vercel.app/signup`
2. Create an account with any email/password
3. Use those credentials to log in

### Option 2: Run Seed Script (Local Development)

If you're running the backend locally:

```bash
cd backend
npm run seed:demo
```

This will create a demo user with:
- **Email:** `demo@scrummate.ai`
- **Password:** `Demo123!@#`

### Option 3: Create via API (After Backend is Fixed)

Once the backend is deployed and working, you can create a user via API:

```bash
curl -X POST https://scrummate-ai-21yl.onrender.com/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "demo@scrummate.ai",
    "password": "Demo123!@#",
    "name": "Demo User"
  }'
```

Then log in with:
- **Email:** `demo@scrummate.ai`
- **Password:** `Demo123!@#`

## ⚠️ Important Notes

1. **Backend Must Be Working:** The login will only work after the backend is properly deployed on Render (see `BACKEND_404_FIX.md`)

2. **For Production:** Never use demo credentials in production! Always create real user accounts.

3. **Security:** The demo password is intentionally simple for testing. Use strong passwords in production.

## 🧪 Testing Login

After creating the demo user and fixing the backend:

1. Go to: `https://your-vercel-url.vercel.app/login`
2. Enter:
   - Email: `demo@scrummate.ai`
   - Password: `Demo123!@#`
3. Click "Sign In"

You should be redirected to the dashboard!

---

**Current Status:** ⚠️ Backend needs to be redeployed on Render before login will work.

