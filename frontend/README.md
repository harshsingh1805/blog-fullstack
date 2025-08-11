# Frontend

This is the frontend for the blog application built with React, TypeScript, and Tailwind CSS.

## Features

- User authentication (signup/signin)
- Blog creation and publishing
- AI-powered description generation using Gemini API
- Responsive design

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
   - Copy `env.example` to `.env.local`
   - Get your free Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Add your API key to `.env.local`:
   ```
   VITE_GEMINI_API_KEY=your_actual_api_key_here
   ```

3. Run the development server:
```bash
npm run dev
```

## Environment Variables

- `VITE_GEMINI_API_KEY`: Your Gemini API key for AI description generation
- `VITE_BACKEND_URL`: Backend API URL (configured in config.ts)

## AI Description Generation

The publish page includes an AI-powered description generator that:
- Takes the blog title as input
- Uses Google's Gemini API to generate engaging descriptions
- Automatically fills the description textarea
- Falls back to template-based generation if AI fails

## Security Notes

- Never commit `.env.local` files to version control
- The `.gitignore` file ensures environment files are excluded
- API keys are only loaded from environment variables
