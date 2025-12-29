# 🔧 Dashboard Troubleshooting Guide

## Issue: Dashboard Shows Nothing After Refresh

### Quick Fix

**The problem:** The frontend might not have the correct API URL configured in Vercel.

### Solution 1: Set Environment Variable in Vercel (Recommended)

1. **Go to Vercel Dashboard:**
   - https://vercel.com/omsinghbais-projects/scrummate-ai-2t6u/settings/environment-variables

2. **Add Environment Variable:**
   - Key: `NEXT_PUBLIC_API_URL`
   - Value: `https://scrummate-ai-21yl.onrender.com`
   - Environments: Select **Production**, **Preview**, and **Development**

3. **Redeploy:**
   - Go to Deployments tab
   - Click "Redeploy" on the latest deployment
   - Or push a new commit to trigger redeploy

### Solution 2: Check Browser Console

1. **Open Browser Developer Tools:**
   - Press `F12` or `Cmd + Option + I` (Mac) / `Ctrl + Shift + I` (Windows)
   - Go to "Console" tab

2. **Look for Errors:**
   - Check for red error messages
   - Common errors:
     - `Failed to fetch` - API URL issue
     - `Network Error` - CORS or connection issue
     - `404 Not Found` - Wrong endpoint URL

3. **Check Network Tab:**
   - Go to "Network" tab
   - Refresh the page
   - Look for failed requests (red)
   - Check what URL it's trying to connect to

### Solution 3: Test API Connection

**Test if backend is accessible:**
```bash
curl https://scrummate-ai-21yl.onrender.com/sprint/health
```

**Test if frontend can reach backend:**
Open browser console and run:
```javascript
fetch('https://scrummate-ai-21yl.onrender.com/sprint/health')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error)
```

## Common Issues

### Issue 1: Blank Page / Nothing Shows

**Possible Causes:**
- Environment variable not set in Vercel
- Backend is down
- CORS error
- JavaScript error

**Fix:**
1. Check browser console for errors
2. Verify `NEXT_PUBLIC_API_URL` is set in Vercel
3. Test backend endpoint directly
4. Check Vercel deployment logs

### Issue 2: "Failed to load dashboard data"

**Possible Causes:**
- Backend URL incorrect
- Backend is down
- Network timeout

**Fix:**
1. Verify backend is running: `curl https://scrummate-ai-21yl.onrender.com/sprint/health`
2. Check `NEXT_PUBLIC_API_URL` in Vercel
3. Check Render backend logs

### Issue 3: CORS Error

**Error Message:** `Access to fetch at '...' from origin '...' has been blocked by CORS policy`

**Fix:**
- Backend CORS is already configured
- Verify backend `main.ts` includes Vercel domain
- Check backend is running latest code

### Issue 4: Chart Not Showing

**Possible Causes:**
- No historical data yet (normal on first load)
- History endpoint failing
- Chart component error

**Fix:**
1. Check browser console for errors
2. Test history endpoint: `curl https://scrummate-ai-21yl.onrender.com/sprint/history`
3. Refresh page a few times to generate data

## Debugging Steps

### Step 1: Check Environment Variables

**In Vercel:**
1. Go to Project → Settings → Environment Variables
2. Verify `NEXT_PUBLIC_API_URL` exists
3. Value should be: `https://scrummate-ai-21yl.onrender.com`

**In Browser:**
Open console and check:
```javascript
console.log('API URL:', process.env.NEXT_PUBLIC_API_URL)
// Should show: https://scrummate-ai-21yl.onrender.com
```

### Step 2: Check Backend Status

```bash
# Test backend health
curl https://scrummate-ai-21yl.onrender.com/sprint/health

# Test history
curl https://scrummate-ai-21yl.onrender.com/sprint/history
```

### Step 3: Check Frontend Logs

**In Vercel:**
1. Go to Deployments
2. Click on latest deployment
3. Check "Build Logs" and "Runtime Logs"
4. Look for errors

**In Browser:**
1. Open Developer Tools (F12)
2. Check Console tab for errors
3. Check Network tab for failed requests

### Step 4: Verify API Connection

**In Browser Console:**
```javascript
// Test connection
fetch('https://scrummate-ai-21yl.onrender.com/sprint/health')
  .then(response => {
    console.log('Status:', response.status);
    return response.json();
  })
  .then(data => {
    console.log('Data:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

## Quick Checklist

- [ ] `NEXT_PUBLIC_API_URL` is set in Vercel
- [ ] Value is `https://scrummate-ai-21yl.onrender.com`
- [ ] Frontend is redeployed after setting variable
- [ ] Backend is running (test with curl)
- [ ] No CORS errors in browser console
- [ ] No JavaScript errors in browser console
- [ ] Network requests are successful (check Network tab)

## Still Not Working?

1. **Check Vercel Deployment Logs:**
   - Look for build errors
   - Check runtime errors

2. **Check Render Backend Logs:**
   - Look for connection errors
   - Check database connection

3. **Test Direct API Calls:**
   ```bash
   # Health endpoint
   curl https://scrummate-ai-21yl.onrender.com/sprint/health
   
   # History endpoint
   curl https://scrummate-ai-21yl.onrender.com/sprint/history
   ```

4. **Clear Browser Cache:**
   - Hard refresh: `Cmd + Shift + R` (Mac) / `Ctrl + Shift + R` (Windows)
   - Or clear cache and reload

5. **Try Incognito/Private Mode:**
   - Rules out browser extension issues

## Getting Help

If still not working, provide:
1. Browser console errors (screenshot)
2. Network tab errors (screenshot)
3. Vercel deployment logs
4. Backend test results (curl output)

---

**Most Common Fix:** Set `NEXT_PUBLIC_API_URL=https://scrummate-ai-21yl.onrender.com` in Vercel and redeploy!

