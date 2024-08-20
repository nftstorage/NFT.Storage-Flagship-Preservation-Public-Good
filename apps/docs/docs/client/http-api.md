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
  - Use lastKey as undefined while fetching the first page, and use lastKey as the id of the last fetched token in subsequent queries to get further tokens.
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
