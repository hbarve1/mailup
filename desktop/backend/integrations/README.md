# Gmail Integration Setup

This directory contains the Gmail API integration for MailUp. To use Gmail features, you need to set up Google API credentials.

## Setup Instructions

### 1. Create a Google Cloud Project
<!-- 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 -->

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Gmail API for your project

### 2. Create OAuth 2.0 Credentials

1. In the Google Cloud Console, go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. Choose "Desktop application" as the application type
4. Give it a name (e.g., "MailUp Desktop Client")
5. Download the JSON credentials file

### 3. Configure Credentials

1. Rename the downloaded file to `credentials.json`
2. Place it in this directory (`desktop/backend/integrations/`)
3. The file should have this structure:

```json
{
  "installed": {
    "client_id": "YOUR_CLIENT_ID.apps.googleusercontent.com",
    "project_id": "your-project-id",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_secret": "YOUR_CLIENT_SECRET",
    "redirect_uris": ["http://localhost"]
  }
}
```

### 4. Required Gmail API Scopes

The integration uses these Gmail API scopes:
- `https://www.googleapis.com/auth/gmail.readonly` - Read emails
- `https://www.googleapis.com/auth/gmail.send` - Send emails
- `https://www.googleapis.com/auth/gmail.modify` - Modify email labels

### 5. Security Notes

- Never commit `credentials.json` to version control
- Keep your client secret secure
- The credentials file is already in `.gitignore`

### 6. Testing the Integration

After setting up credentials:

1. Start the application
2. Go to Settings > Mail Integrations
3. Click "Connect" next to Gmail
4. Follow the OAuth flow to authenticate

## Troubleshooting

### "Gmail credentials not found" Error
- Make sure `credentials.json` is in the correct directory
- Verify the file has the correct JSON structure
- Check that the file is readable

### Authentication Errors
- Ensure the Gmail API is enabled in your Google Cloud project
- Verify the OAuth consent screen is configured
- Check that the redirect URI matches your setup

### Rate Limiting
- The integration includes delays to avoid hitting Gmail API rate limits
- If you encounter rate limiting, the app will automatically retry with exponential backoff

## File Structure

```
integrations/
├── gmail.js              # Main Gmail integration logic
├── credentials.json      # Your Gmail API credentials (not in git)
├── README.md            # This file
└── index.js             # Integration entry point
```
