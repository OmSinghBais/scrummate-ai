# 🔐 How to Generate NextAuth Secret and JWT Secret

## Quick Method (Recommended)

### Option 1: Using OpenSSL (macOS/Linux)
```bash
# Generate NextAuth Secret (32+ characters)
openssl rand -base64 32

# Generate JWT Secret (32+ characters)
openssl rand -base64 32
```

### Option 2: Using Node.js
```bash
# Generate NextAuth Secret
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Generate JWT Secret
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### Option 3: Online Generator (Less Secure)
Visit: https://generate-secret.vercel.app/32
- Click "Generate" to get a random 32-character secret
- Generate two separate secrets (one for NextAuth, one for JWT)

---

## Step-by-Step Setup

### 1. Generate the Secrets

Run these commands in your terminal:

```bash
# Generate NextAuth Secret
openssl rand -base64 32

# Copy the output (e.g., "xK8mP2qR5vT9wY3zA6bC1dE4fG7hJ0kL3nO6pQ8sT1uV4wX7yZ0aB2cD5eF8gH1=")

# Generate JWT Secret (different from NextAuth)
openssl rand -base64 32

# Copy this output too (e.g., "mN9pQ2rS5tU8vW1xY4zA7bC0dE3fG6hJ9kL2nO5pQ8sT1uV4wX7yZ0aB3cD6eF9gH2=")
```

### 2. Add to Frontend `.env.local`

Create or edit `frontend/.env.local`:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=xK8mP2qR5vT9wY3zA6bC1dE4fG7hJ0kL3nO6pQ8sT1uV4wX7yZ0aB2cD5eF8gH1=

# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:3001
```

**For Production (Vercel):**
```env
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your-generated-secret-here
NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com
```

### 3. Add to Backend `.env`

Create or edit `backend/.env`:

```env
# JWT Secret (must match what backend uses for signing tokens)
JWT_SECRET=mN9pQ2rS5tU8vW1xY4zA7bC0dE3fG6hJ9kL2nO5pQ8sT1uV4wX7yZ0aB3cD6eF9gH2=

# Other backend config...
DATABASE_URL=postgresql://...
ML_API_URL=http://localhost:8000
```

**For Production (Render):**
```env
JWT_SECRET=your-generated-secret-here
DATABASE_URL=your-production-database-url
ML_API_URL=https://your-ml-service.onrender.com
```

---

## Important Security Notes

### ⚠️ DO NOT:
- ❌ Commit secrets to Git
- ❌ Share secrets publicly
- ❌ Use the same secret for both NextAuth and JWT
- ❌ Use simple passwords like "secret123"
- ❌ Reuse secrets across environments

### ✅ DO:
- ✅ Generate unique secrets for each environment (dev, staging, production)
- ✅ Store secrets in environment variables only
- ✅ Use `.env.local` (frontend) and `.env` (backend) - these are gitignored
- ✅ Use at least 32 characters
- ✅ Rotate secrets periodically

---

## Verification

### Check if secrets are set:

**Frontend:**
```bash
cd frontend
node -e "console.log('NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET ? '✅ Set' : '❌ Missing')"
```

**Backend:**
```bash
cd backend
node -e "console.log('JWT_SECRET:', process.env.JWT_SECRET ? '✅ Set' : '❌ Missing')"
```

---

## Production Setup

### Vercel (Frontend)
1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add:
   - `NEXTAUTH_URL` = `https://your-app.vercel.app`
   - `NEXTAUTH_SECRET` = (your generated secret)
   - `NEXT_PUBLIC_API_URL` = (your backend URL)

### Render (Backend)
1. Go to your Render service dashboard
2. Navigate to "Environment"
3. Add:
   - `JWT_SECRET` = (your generated secret)
   - Other environment variables...

---

## Quick Copy-Paste Commands

### Generate both secrets at once:
```bash
echo "=== NextAuth Secret ==="
openssl rand -base64 32
echo ""
echo "=== JWT Secret ==="
openssl rand -base64 32
```

### Or using Node.js:
```bash
node -e "
console.log('NextAuth Secret:');
console.log(require('crypto').randomBytes(32).toString('base64'));
console.log('');
console.log('JWT Secret:');
console.log(require('crypto').randomBytes(32).toString('base64'));
"
```

---

## Troubleshooting

### Error: "NEXTAUTH_SECRET is missing"
- Make sure `.env.local` exists in `frontend/` directory
- Restart your Next.js dev server after adding the secret
- Check that the file is named exactly `.env.local` (not `.env.local.txt`)

### Error: "JWT_SECRET is missing"
- Make sure `.env` exists in `backend/` directory
- Restart your NestJS server after adding the secret
- Check that the file is named exactly `.env` (not `.env.txt`)

### Authentication not working
- Verify both secrets are set correctly
- Make sure you're using different secrets for NextAuth and JWT
- Check that `NEXTAUTH_URL` matches your actual frontend URL
- Ensure backend `JWT_SECRET` matches what's used in `user.module.ts

