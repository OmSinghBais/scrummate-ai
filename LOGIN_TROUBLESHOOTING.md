# 🔍 Login Troubleshooting Guide

## Problem: "Invalid email or password" after signup

If you successfully signed up but can't log in, follow these steps:

## Step 1: Verify Environment Variable is Set

**Critical:** `NEXT_PUBLIC_API_URL` must be set in Vercel for login to work.

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Verify `NEXT_PUBLIC_API_URL` exists and is set to: `https://scrummate-ai-21yl.onrender.com`
3. Make sure it's enabled for **Production**, **Preview**, and **Development**

## Step 2: Check Backend is Running

Test if your backend is accessible:

```bash
# Test backend health
curl https://scrummate-ai-21yl.onrender.com/auth/login

# Or visit in browser:
# https://scrummate-ai-21yl.onrender.com
```

You should get a response (even an error means the server is up).

## Step 3: Test Registration Endpoint

Verify registration is working:

```bash
curl -X POST https://scrummate-ai-21yl.onrender.com/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123",
    "name": "Test User"
  }'
```

## Step 4: Test Login Endpoint Directly

Test login with the same credentials:

```bash
curl -X POST https://scrummate-ai-21yl.onrender.com/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123"
  }'
```

You should get back:
```json
{
  "access_token": "...",
  "user": {
    "id": 1,
    "email": "test@example.com",
    "name": "Test User",
    "teams": []
  }
}
```

## Step 5: Check Vercel Logs

1. Go to Vercel Dashboard → Your Project → Deployments
2. Click on the latest deployment
3. Go to **Functions** tab
4. Look for `/api/auth/[...nextauth]` function
5. Check the logs for errors

Look for:
- "Login attempt:" logs showing the API URL
- Any axios errors
- Network errors

## Step 6: Check Browser Console

1. Open your deployed site
2. Open Browser DevTools (F12)
3. Go to Console tab
4. Try to log in
5. Look for:
   - "Login attempt:" logs (these appear in server logs, not browser)
   - Any network errors in Network tab
   - Check if the request goes to the right URL

## Step 7: Verify Password Hashing

The issue might be password hashing. Check:

1. **Backend logs** - Check if password validation is failing
2. **Database** - Verify the user was created with a hashed password
3. **Password comparison** - Make sure bcrypt is working correctly

## Common Issues & Fixes

### Issue 1: Environment Variable Not Set
**Symptom:** Login fails, logs show `apiUrl: "http://localhost:3001"`

**Fix:**
1. Set `NEXT_PUBLIC_API_URL` in Vercel
2. **Redeploy** (environment variables are embedded at build time)

### Issue 2: Backend Not Accessible
**Symptom:** Network errors, timeout errors

**Fix:**
1. Check if Render backend is running
2. Verify CORS settings allow Vercel domains
3. Check backend logs in Render dashboard

### Issue 3: Password Mismatch
**Symptom:** Login fails with "Invalid credentials" but user exists

**Fix:**
1. Try resetting password (if you have that feature)
2. Or create a new account with a different email
3. Check backend logs for password validation errors

### Issue 4: Database Issues
**Symptom:** User not found in database

**Fix:**
1. Check if user was actually created during signup
2. Verify database connection in Render
3. Check backend logs for database errors

## Quick Test Script

Create a test file to verify everything:

```javascript
// test-auth.js
const axios = require('axios');

const API_URL = 'https://scrummate-ai-21yl.onrender.com';
const testEmail = 'test@example.com';
const testPassword = 'test123';

async function testAuth() {
  try {
    // Test registration
    console.log('1. Testing registration...');
    const registerRes = await axios.post(`${API_URL}/auth/register`, {
      email: testEmail,
      password: testPassword,
      name: 'Test User'
    });
    console.log('✅ Registration successful:', registerRes.data);

    // Test login
    console.log('2. Testing login...');
    const loginRes = await axios.post(`${API_URL}/auth/login`, {
      email: testEmail,
      password: testPassword
    });
    console.log('✅ Login successful:', loginRes.data);
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

testAuth();
```

Run it:
```bash
node test-auth.js
```

## Still Not Working?

If none of the above works:

1. **Check Vercel Function Logs:**
   - Go to Vercel Dashboard → Your Project → Functions
   - Find `/api/auth/[...nextauth]`
   - Check runtime logs for detailed errors

2. **Check Render Backend Logs:**
   - Go to Render Dashboard → Your Backend Service
   - Check logs for login attempts
   - Look for errors or exceptions

3. **Verify Database:**
   - Check if users table exists
   - Verify user was created with correct email
   - Check password hash format

4. **Test with Postman/curl:**
   - Test backend endpoints directly
   - Bypass frontend to isolate the issue

## Expected Behavior

✅ **Working Flow:**
1. Sign up → User created in database
2. Redirect to login with `?registered=true`
3. Login → NextAuth calls backend `/auth/login`
4. Backend validates credentials
5. Backend returns JWT token
6. NextAuth creates session
7. Redirect to dashboard

❌ **Broken Flow:**
1. Sign up → User created
2. Login → NextAuth can't reach backend (wrong URL)
3. OR: Backend rejects credentials (password mismatch)
4. OR: Backend not running (network error)

---

**Most Common Fix:** Set `NEXT_PUBLIC_API_URL` in Vercel and redeploy! 🚀

