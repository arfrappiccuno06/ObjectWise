# 🔍 Setting Up Real Object Recognition

Currently, ObjectWise runs in **demo mode** with simulated object recognition. To enable real computer vision, follow these steps:

## 🚀 Quick Setup (Google Vision API)

### Step 1: Get Google Vision API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the **Vision API**:
   - Go to APIs & Services → Library
   - Search for "Vision API" 
   - Click "Enable"
4. Create credentials:
   - Go to APIs & Services → Credentials
   - Click "Create Credentials" → "API Key"
   - Copy your API key

### Step 2: Configure ObjectWise
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Add your API key to `.env`:
   ```
   REACT_APP_GOOGLE_VISION_API_KEY=your_actual_api_key_here
   ```

3. Restart the development server:
   ```bash
   npm start
   ```

### Step 3: Test Real Recognition
- The app will now use Google Vision API
- Higher accuracy object detection
- Confidence scores based on actual analysis
- Supports thousands of object types

## 🔧 Alternative APIs

### AWS Rekognition
```env
REACT_APP_AWS_ACCESS_KEY_ID=your_aws_access_key
REACT_APP_AWS_SECRET_ACCESS_KEY=your_aws_secret_key
REACT_APP_AWS_REGION=us-east-1
```

### Azure Computer Vision
```env
REACT_APP_AZURE_VISION_KEY=your_azure_key
REACT_APP_AZURE_VISION_ENDPOINT=your_azure_endpoint
```

## 📊 Current Demo Mode Behavior

Without API keys, ObjectWise runs in demo mode:
- ✅ 30% recognition success rate (simulated)
- ✅ Basic image size analysis
- ✅ Random object selection for demo
- ✅ All UI and safety features work
- ❌ No real computer vision

## 🛡️ Security Notes

- Never commit API keys to version control
- Use environment variables only
- Consider API rate limits and costs
- Google Vision API: ~$1.50 per 1000 requests

## 🎯 Extending Recognition

To add more object types:
1. Update `src/data/objectDatabase.js`
2. Add comprehensive safety information
3. Include proper instruction steps
4. Update category mappings

The `matchToDatabase()` function will automatically match new objects when detected by the vision API.

## 🚀 Production Deployment

For production, consider:
- Server-side API calls to hide keys
- Caching frequent detections
- Offline object database updates
- Progressive image loading

---

**Note**: ObjectWise prioritizes safety first - all recognized objects include comprehensive safety warnings and age-appropriate usage guidelines.