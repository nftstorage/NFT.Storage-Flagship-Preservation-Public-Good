---
title: Create an API Key
sidebar_position: 1
---

NFT.Storage offers two types of API keys: private and public. Each type serves different purposes and has different capabilities:

- **Private API Keys**: Full access to all API endpoints, including data upload and management features
- **Public API Keys**: Limited access, specifically for the preservation status checker API with rate limits

## Creating a Private API Key

Private API keys can be created directly from the NFT.Storage dashboard:

1. Look for the "API Key" section within the dashboard navigation.
2. Enter the name of the Key and click on Generate Key
3. Once the API key is generated, it will be displayed on the screen. Copy the API key to your clipboard.
   ![Upload Modal](../../static/img/api-key-modal.png)
4. Ensure to securely store the API key in a safe location. Treat it like a password and do not share it publicly. Your API key is not stored with us so it is irrecoverable.
5. You can now use the generated private API key to authenticate your requests when interacting with the NFT.Storage API.

## Creating a Public API Key

Public API keys are created programmatically using the API. You'll need a private API key to create public API keys.

```http
GET /api/v1/auth/create_api_key?keyName=my-public-key-1&role=public
Authorization: Bearer YOUR_PRIVATE_API_KEY
```

**Parameters:**
- `keyName`: A descriptive name for your public API key
- `role`: Must be set to "public"

**Example Response:**
```json
{
  "ok": true,
  "value": {
    "apiKey": "eyJhbGciOiJIUzI1..."
  }
}
```

**Important Notes:**
1. Public API keys can only access the preservation status checker endpoint (`/api/v1/preservation/check`)
2. Public API keys are rate-limited to 1,000 requests per day
3. Public API keys are safe to share - you can include them in client-side code
4. The API key is only shown once at creation time and cannot be retrieved later

## Using Your API Keys

When making API requests, include your API key in the Authorization header:

```http
Authorization: Bearer YOUR_API_KEY
```

Choose the appropriate type of API key based on your needs:
- Use private API keys for uploading and managing data (keep these secure and never share them)
- Use public API keys for checking preservation status (these are safe to share in client-side code)

By following these steps, you can easily create an API key for accessing the NFT.Storage API and start integrating NFT.Storage into your applications and workflows.
