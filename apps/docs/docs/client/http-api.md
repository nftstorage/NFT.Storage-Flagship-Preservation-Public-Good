---
title: HTTP API
sidebar_position: 2
---

## Creating Collections

### Endpoint

- **Method:** POST
- **URL:** /api/v1/collection/create_collection
- **Auth:** API_KEY
- **Body Param:**

  - `collectionName`: Name of the collection
  - `contractAddress`: Address of the collection. This parameter is required for non-Solana collections. For Solana collections, provide a verified collection address, if available.
  - `chainID`: Blockchain ID
  - `network` : Blockchain network

- **Note:**
  - `contractAddress` is mandatory for all non-Solana collections. For Solana collections, this parameter is optional and can be provided if a verified collection address is available.
  - For Solana collections where a collection address is not added, use an empty string `""` or `"undefined"` as the `contractAddress`.
  - The rest of the parameters are optional.
- **Response:** "Collection Created"

#### Example Request

```
curl --location 'https://preserve.nft.storage/api/v1/collection/create_collection' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer YOUR_API_KEY' \
--data '{
    "contractAddress": "CONTRACT_ADDRESS_OR_UNDEFINED_FOR_SOLANA",
    "collectionName": "COLLECTION_NAME",
    "chainID": "CHAIN_ID",
    "network": "NETWORK"
}'
```

## NFT.Storage Upload API

### Endpoint

- **Method:** POST
- **URL:** /api/v1/collection/add_tokens
- **Auth:** API_KEY
- **Body Param:**
- `collectionID`: ID of the collection
- `file`: CSV or JSON file containing tokenID and cid as per format (For Solana, the file should contain `tokenAddress` and `cid`)
- **Note:**
  - For Solana collections, ensure the CSV/JSON file has fields `tokenAddress` and `cid`.
  - If the file contains `duplicate` cids then data cap usage will be calculated separately for each instance.
  - You can specify the token numbers as a range(like: Qm....,1-999) in such cases.
- **Response**: "Tokens added"

#### Example Request

```
curl --location 'https://preserve.nft.storage/api/v1/collection/add_tokens' \
--header 'Authorization: Bearer YOUR_API_KEY' \
--form 'collectionID="COLLECTION_ID"' \
--form 'file=@"ABSOLUTE_FILE_PATH";type=application/json'
```

## Viewing Collections

### Endpoint

- **Method:** GET
- **URL:** /api/v1/collection/list_collections
- **Auth:** API_KEY
- **Response:** List of collections with their details

#### Example Request

```
curl --location 'https://preserve.nft.storage/api/v1/collection/list_collections' \
--header 'Authorization: Bearer YOUR_API_KEY'

```

## Viewing Tokens

### Endpoint

- **Method:** GET
- **URL:** /api/v1/collection/list_tokens?collectionID=YourCollectionID&lastKey=CollectionLastKey
- **Auth:** API_KEY
- **Query Param:**
- `lastKey`: ID of the last fetched token
- `collectionID`: ID of the collection
- **Note:**
  - The API wil return only 500 tokens of the collection at a time
  - Use lastKey as undefined while fetching the first page, and use lastKey as the id of the last fetched token in subsequent queries to get further tokens.
- **Response:** List of tokens of a collection

#### Example Request

```
curl --location 'https://preserve.nft.storage/api/v1/collection/list_tokens?collectionID=YourCollectionID&lastKey=CollectionLastKey' \
--header 'Authorization: Bearer YOUR_API_KEY'

```

## List API keys

### Endpoint

- **Method:** GET
- **URL:** /api/v1/auth/list_api_keys
- **Auth:** API_KEY
- **Response:** List of API keys

#### Example Request

```
curl --location 'https://preserve.nft.storage/api/v1/auth/list_api_keys' \
--header 'Authorization: Bearer YOUR_API_KEY'

```

## Deleting API key

### Endpoint

- **Method:** DELETE
- **URL:** /api/v1/auth/remove_api_key
- **Auth:** API_KEY
- **Response:** API key removed

#### Example Request

```
curl --location --request DELETE 'https://preserve.nft.storage/api/v1/auth/remove_api_key?keyID=b4afc16a-301a-4c45-b369-13053779889b' \
--header 'Authorization: Bearer YOUR_API_KEY'

```

## Get User Balance

### Endpoint

- **Method:** GET
- **URL:** /api/v1/user/get_balance
- **Auth:** API_KEY
- **Response:** User's balance

#### Example Request

```
curl --location 'https://preserve.nft.storage/api/v1/user/get_balance' \
--header 'Authorization: Bearer YOUR_API_KEY'

```

## Get Deal Status

### Endpoint

- **Method:** GET
- **URL:** /api/v1/collection/deal_status?cid=YOUR_CID
- **Query Param:**
- `cid`: The CID (Content Identifier) of the token
- **Response:** Deal status for the specified CID

#### Example Request

```
curl --location 'https://preserve.nft.storage/api/v1/collection/deal_status?cid=YOUR_CID'
```

## Create Public API Key

### Endpoint

- **Method:** GET
- **URL:** /api/v1/auth/create_api_key
- **Auth:** Private API Key required
- **Query Parameters:**
  - `keyName`: Name for the public API key
  - `role`: Must be set to "public"
- **Response:** Returns the newly created public API key

#### Example Request

```bash
curl --location 'https://preserve.nft.storage/api/v1/auth/create_api_key?keyName=my-public-key-1&role=public' \
--header 'Authorization: Bearer YOUR_PRIVATE_API_KEY'
```

#### Example Response

```json
{
  "ok": true,
  "value": {
    "apiKey": "eyJhbGciOiJIUzI1..."
  }
}
```

#### Important Notes
- This endpoint requires authentication with a private API key
- The generated public API key will only have access to the preservation status checker endpoint
- Public API keys are rate-limited to 1,000 requests per day
- The API key is only shown once in the response and cannot be retrieved later
- Public API keys are safe to share and can be used in client-side code

## Check Preservation Status

### Endpoint

- **Method:** GET
- **URL:** /api/v1/preservation/check
- **Auth:** Public API Key only
- **Query Parameters:**
  - `cid` (required): The IPFS CID of the NFT data
  - `chain_id` (optional): The blockchain network identifier
  - `collection_address` (optional): The NFT collection contract address
  - `token_id` (optional): The specific token ID within the collection
- **Rate Limit:** 1,000 requests per day per public API key

#### Example Request

```bash
curl --location 'https://preserve.nft.storage/api/v1/preservation/check?cid=bafybeige...&chain_id=ethereum&collection_address=0x123...&token_id=42' \
--header 'Authorization: Bearer YOUR_PUBLIC_API_KEY'
```

#### Example Success Response

```json
{
  "ok": true,
  "value": {
    "chain_id": "ethereum",
    "available": true,
    "token_id": "42",
    "collection_address": "0x123...",
    "url": "ipfs://bafybeige...",
    "timestamp": "2024-01-08T12:00:00.000Z"
  }
}
```

#### Example Error Response (CID Not Found)

```json
{
  "ok": true,
  "value": {
    "chain_id": null,
    "available": false,
    "token_id": null,
    "collection_address": null,
    "url": "ipfs://bafybeige...",
    "timestamp": "2024-01-08T12:00:00.000Z"
  }
}
```

#### Example Error Response (Invalid API Key Type)

```json
{
  "ok": false,
  "error": {
    "code": 403,
    "message": "This endpoint can only be accessed with a public API key."
  }
}
```

#### Important Notes
- This endpoint can ONLY be accessed with public API keys
- Private API keys will receive a 403 error response
- Each public API key is rate-limited to 1,000 requests per day
- The `available` field indicates whether the NFT data is preserved
- The `timestamp` field indicates when the preservation status was last checked
- All optional parameters help in providing more context about the NFT being checked
