"use strict";
(self.webpackChunkdocumentation = self.webpackChunkdocumentation || []).push([
  [505],
  {
    4951: (e, n, i) => {
      i.r(n),
        i.d(n, {
          assets: () => c,
          contentTitle: () => t,
          default: () => a,
          frontMatter: () => r,
          metadata: () => d,
          toc: () => o,
        });
      var s = i(4848),
        l = i(8453);
      const r = { title: "HTTP API", sidebar_position: 2 },
        t = void 0,
        d = {
          id: "client/http-api",
          title: "HTTP API",
          description: "Creating Collections",
          source: "@site/docs/client/http-api.md",
          sourceDirName: "client",
          slug: "/client/http-api",
          permalink: "/v1/docs/client/http-api",
          draft: !1,
          unlisted: !1,
          tags: [],
          version: "current",
          sidebarPosition: 2,
          frontMatter: { title: "HTTP API", sidebar_position: 2 },
          sidebar: "tutorialSidebar",
          previous: {
            title: "Client libraries",
            permalink: "/v1/docs/category/client-libraries",
          },
          next: {
            title: "Supported Networks",
            permalink: "/v1/docs/supported-network",
          },
        },
        c = {},
        o = [
          {
            value: "Creating Collections",
            id: "creating-collections",
            level: 2,
          },
          { value: "Endpoint", id: "endpoint", level: 3 },
          { value: "Example Request", id: "example-request", level: 4 },
          {
            value: "NFT.Storage Upload API",
            id: "nftstorage-upload-api",
            level: 2,
          },
          { value: "Endpoint", id: "endpoint-1", level: 3 },
          { value: "CSV Requirements", id: "csv-requirements", level: 3 },
          { value: "Example Request", id: "example-request-1", level: 4 },
          { value: "Viewing Collections", id: "viewing-collections", level: 2 },
          { value: "Endpoint", id: "endpoint-2", level: 3 },
          { value: "Example Request", id: "example-request-2", level: 4 },
          { value: "Viewing Tokens", id: "viewing-tokens", level: 2 },
          { value: "Endpoint", id: "endpoint-3", level: 3 },
          { value: "Example Request", id: "example-request-3", level: 4 },
          { value: "List API keys", id: "list-api-keys", level: 2 },
          { value: "Endpoint", id: "endpoint-4", level: 3 },
          { value: "Example Request", id: "example-request-4", level: 4 },
          { value: "Deleting API key", id: "deleting-api-key", level: 2 },
          { value: "Endpoint", id: "endpoint-5", level: 3 },
          { value: "Example Request", id: "example-request-5", level: 4 },
          { value: "Get User Balance", id: "get-user-balance", level: 2 },
          { value: "Endpoint", id: "endpoint-6", level: 3 },
          { value: "Example Request", id: "example-request-6", level: 4 },
          { value: "Get Deal Status", id: "get-deal-status", level: 2 },
          { value: "Endpoint", id: "endpoint-7", level: 3 },
          { value: "Example Request", id: "example-request-7", level: 4 },
          {
            value: "Retry Failed Pinning API",
            id: "retry-failed-pinning-api",
            level: 2,
          },
          { value: "Endpoint", id: "endpoint-8", level: 3 },
          { value: "Example Request", id: "example-request-8", level: 4 },
          {
            value: "Delete Failed Pinning API",
            id: "delete-failed-pinning-api",
            level: 2,
          },
          { value: "Endpoint", id: "endpoint-9", level: 3 },
          { value: "Example Request", id: "example-request-9", level: 4 },
        ];
      function h(e) {
        const n = {
          code: "code",
          h2: "h2",
          h3: "h3",
          h4: "h4",
          li: "li",
          ol: "ol",
          p: "p",
          pre: "pre",
          strong: "strong",
          table: "table",
          tbody: "tbody",
          td: "td",
          th: "th",
          thead: "thead",
          tr: "tr",
          ul: "ul",
          ...(0, l.R)(),
          ...e.components,
        };
        return (0, s.jsxs)(s.Fragment, {
          children: [
            (0, s.jsx)(n.h2, {
              id: "creating-collections",
              children: "Creating Collections",
            }),
            "\n",
            (0, s.jsx)(n.h3, { id: "endpoint", children: "Endpoint" }),
            "\n",
            (0, s.jsxs)(n.ul, {
              children: [
                "\n",
                (0, s.jsxs)(n.li, {
                  children: [
                    "\n",
                    (0, s.jsxs)(n.p, {
                      children: [
                        (0, s.jsx)(n.strong, { children: "Method:" }),
                        " POST",
                      ],
                    }),
                    "\n",
                  ],
                }),
                "\n",
                (0, s.jsxs)(n.li, {
                  children: [
                    "\n",
                    (0, s.jsxs)(n.p, {
                      children: [
                        (0, s.jsx)(n.strong, { children: "URL:" }),
                        " /api/v1/collection/create_collection",
                      ],
                    }),
                    "\n",
                  ],
                }),
                "\n",
                (0, s.jsxs)(n.li, {
                  children: [
                    "\n",
                    (0, s.jsxs)(n.p, {
                      children: [
                        (0, s.jsx)(n.strong, { children: "Auth:" }),
                        " API_KEY",
                      ],
                    }),
                    "\n",
                  ],
                }),
                "\n",
                (0, s.jsxs)(n.li, {
                  children: [
                    "\n",
                    (0, s.jsx)(n.p, {
                      children: (0, s.jsx)(n.strong, {
                        children: "Body Param:",
                      }),
                    }),
                    "\n",
                  ],
                }),
                "\n",
                (0, s.jsxs)(n.li, {
                  children: [
                    "\n",
                    (0, s.jsxs)(n.p, {
                      children: [
                        (0, s.jsx)(n.code, { children: "collectionName" }),
                        ": Name of the collection.",
                      ],
                    }),
                    "\n",
                  ],
                }),
                "\n",
                (0, s.jsxs)(n.li, {
                  children: [
                    "\n",
                    (0, s.jsxs)(n.p, {
                      children: [
                        (0, s.jsx)(n.code, { children: "contractAddress" }),
                        ": Address of the collection. The requirements vary by blockchain network:",
                      ],
                    }),
                    "\n",
                    (0, s.jsxs)(n.ul, {
                      children: [
                        "\n",
                        (0, s.jsxs)(n.li, {
                          children: [
                            "For EVM: ",
                            (0, s.jsx)(n.code, { children: "contractAddress" }),
                            " is mandatory.",
                          ],
                        }),
                        "\n",
                        (0, s.jsxs)(n.li, {
                          children: [
                            "For Multiversx, Sui, Solana, and Cardano: If no ",
                            (0, s.jsx)(n.code, { children: "contractAddress" }),
                            " is provided, pass a unique string.",
                          ],
                        }),
                        "\n",
                        (0, s.jsxs)(n.li, {
                          children: [
                            "For Counterparty: Use the asset name as ",
                            (0, s.jsx)(n.code, { children: "contractAddress" }),
                            ".",
                          ],
                        }),
                        "\n",
                        (0, s.jsxs)(n.li, {
                          children: [
                            "For XRPL: Use the issuer address as ",
                            (0, s.jsx)(n.code, { children: "contractAddress" }),
                            ".",
                          ],
                        }),
                        "\n",
                        (0, s.jsxs)(n.li, {
                          children: [
                            "For Xahau: Use the hooks address as ",
                            (0, s.jsx)(n.code, { children: "contractAddress" }),
                            ".",
                          ],
                        }),
                        "\n",
                      ],
                    }),
                    "\n",
                  ],
                }),
                "\n",
                (0, s.jsxs)(n.li, {
                  children: [
                    "\n",
                    (0, s.jsxs)(n.p, {
                      children: [
                        (0, s.jsx)(n.code, { children: "chainID" }),
                        ": Blockchain ID.",
                      ],
                    }),
                    "\n",
                  ],
                }),
                "\n",
                (0, s.jsxs)(n.li, {
                  children: [
                    "\n",
                    (0, s.jsxs)(n.p, {
                      children: [
                        (0, s.jsx)(n.code, { children: "network" }),
                        ": Blockchain network (e.g., Ethereum, Solana, etc.).",
                      ],
                    }),
                    "\n",
                  ],
                }),
                "\n",
                (0, s.jsxs)(n.li, {
                  children: [
                    "\n",
                    (0, s.jsxs)(n.p, {
                      children: [
                        (0, s.jsx)(n.strong, { children: "Response:" }),
                        ' "Collection Created"',
                      ],
                    }),
                    "\n",
                  ],
                }),
                "\n",
              ],
            }),
            "\n",
            (0, s.jsx)(n.h4, {
              id: "example-request",
              children: "Example Request",
            }),
            "\n",
            (0, s.jsx)(n.pre, {
              children: (0, s.jsx)(n.code, {
                children:
                  'curl --location \'https://preserve.nft.storage/api/v1/collection/create_collection\' \\\r\n--header \'Content-Type: application/json\' \\\r\n--header \'Authorization: Bearer YOUR_API_KEY\' \\\r\n--data \'{\r\n    "contractAddress": "CONTRACT_ADDRESS_OR_RESPECTIVE_STRING",\r\n    "collectionName": "COLLECTION_NAME",\r\n    "chainID": "CHAIN_ID",\r\n    "network": "NETWORK"\r\n}\'\n',
              }),
            }),
            "\n",
            (0, s.jsx)(n.h2, {
              id: "nftstorage-upload-api",
              children: "NFT.Storage Upload API",
            }),
            "\n",
            (0, s.jsx)(n.h3, { id: "endpoint-1", children: "Endpoint" }),
            "\n",
            (0, s.jsxs)(n.ul, {
              children: [
                "\n",
                (0, s.jsxs)(n.li, {
                  children: [
                    (0, s.jsx)(n.strong, { children: "Method:" }),
                    " POST",
                  ],
                }),
                "\n",
                (0, s.jsxs)(n.li, {
                  children: [
                    (0, s.jsx)(n.strong, { children: "URL:" }),
                    " /api/v1/collection/add_tokens",
                  ],
                }),
                "\n",
                (0, s.jsxs)(n.li, {
                  children: [
                    (0, s.jsx)(n.strong, { children: "Auth:" }),
                    " API_KEY",
                  ],
                }),
                "\n",
                (0, s.jsx)(n.li, {
                  children: (0, s.jsx)(n.strong, { children: "Body Param:" }),
                }),
                "\n",
                (0, s.jsxs)(n.li, {
                  children: [
                    (0, s.jsx)(n.code, { children: "collectionID" }),
                    ": ID of the collection",
                  ],
                }),
                "\n",
                (0, s.jsxs)(n.li, {
                  children: [
                    (0, s.jsx)(n.code, { children: "tokens" }),
                    ": The list of tokens to be added. This parameter is passed as a CSV file.",
                  ],
                }),
                "\n",
              ],
            }),
            "\n",
            (0, s.jsx)(n.h3, {
              id: "csv-requirements",
              children: "CSV Requirements",
            }),
            "\n",
            (0, s.jsx)(n.p, {
              children:
                "The accepted structure of the CSV file depends on the blockchain network:",
            }),
            "\n",
            (0, s.jsxs)(n.table, {
              children: [
                (0, s.jsx)(n.thead, {
                  children: (0, s.jsxs)(n.tr, {
                    children: [
                      (0, s.jsx)(n.th, {
                        children: (0, s.jsx)(n.strong, { children: "Network" }),
                      }),
                      (0, s.jsx)(n.th, {
                        children: (0, s.jsx)(n.strong, {
                          children: "CSV Header",
                        }),
                      }),
                      (0, s.jsx)(n.th, {
                        children: (0, s.jsx)(n.strong, { children: "Details" }),
                      }),
                    ],
                  }),
                }),
                (0, s.jsxs)(n.tbody, {
                  children: [
                    (0, s.jsxs)(n.tr, {
                      children: [
                        (0, s.jsx)(n.td, {
                          children: (0, s.jsx)(n.strong, {
                            children: "Solana",
                          }),
                        }),
                        (0, s.jsx)(n.td, {
                          children: (0, s.jsx)(n.code, {
                            children: "tokenAddress, cid",
                          }),
                        }),
                        (0, s.jsxs)(n.td, {
                          children: [
                            "Each row must include a ",
                            (0, s.jsx)(n.code, { children: "tokenAddress" }),
                            " and ",
                            (0, s.jsx)(n.code, { children: "cid" }),
                            " match in separate columns. Only CSV files are accepted.",
                          ],
                        }),
                      ],
                    }),
                    (0, s.jsxs)(n.tr, {
                      children: [
                        (0, s.jsx)(n.td, {
                          children: (0, s.jsx)(n.strong, { children: "Sui" }),
                        }),
                        (0, s.jsx)(n.td, {
                          children: (0, s.jsx)(n.code, {
                            children: "objectID, cid",
                          }),
                        }),
                        (0, s.jsxs)(n.td, {
                          children: [
                            "Each row must include an ",
                            (0, s.jsx)(n.code, { children: "objectID" }),
                            " and ",
                            (0, s.jsx)(n.code, { children: "cid" }),
                            " match in separate columns. Only CSV files are accepted.",
                          ],
                        }),
                      ],
                    }),
                    (0, s.jsxs)(n.tr, {
                      children: [
                        (0, s.jsx)(n.td, {
                          children: (0, s.jsx)(n.strong, {
                            children: "Other Networks",
                          }),
                        }),
                        (0, s.jsx)(n.td, {
                          children: (0, s.jsx)(n.code, {
                            children: "tokenID, cid",
                          }),
                        }),
                        (0, s.jsxs)(n.td, {
                          children: [
                            "Each row must include a ",
                            (0, s.jsx)(n.code, { children: "tokenID" }),
                            " and ",
                            (0, s.jsx)(n.code, { children: "cid" }),
                            " match in separate columns. Only CSV files are accepted.",
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            "\n",
            (0, s.jsxs)(n.ul, {
              children: [
                "\n",
                (0, s.jsx)(n.li, {
                  children: (0, s.jsx)(n.strong, { children: "Note:" }),
                }),
                "\n",
              ],
            }),
            "\n",
            (0, s.jsxs)(n.ol, {
              children: [
                "\n",
                (0, s.jsxs)(n.li, {
                  children: [
                    (0, s.jsx)(n.strong, { children: "Duplicate Tokens" }),
                    ": If a token being added is already backed up by the system, it will not be sent for deal-making again. Instead, it will be marked as a duplicate.",
                  ],
                }),
                "\n",
                (0, s.jsxs)(n.li, {
                  children: [
                    (0, s.jsx)(n.strong, { children: "CSV Format" }),
                    ":",
                    "\n",
                    (0, s.jsxs)(n.ul, {
                      children: [
                        "\n",
                        (0, s.jsx)(n.li, {
                          children:
                            "Ensure the first row in the CSV contains the header values as specified above.",
                        }),
                        "\n",
                        (0, s.jsx)(n.li, {
                          children:
                            "Each subsequent row should adhere to the format corresponding to the network.",
                        }),
                        "\n",
                      ],
                    }),
                    "\n",
                  ],
                }),
                "\n",
              ],
            }),
            "\n",
            (0, s.jsxs)(n.ul, {
              children: [
                "\n",
                (0, s.jsxs)(n.li, {
                  children: [
                    (0, s.jsx)(n.strong, { children: "Response" }),
                    ': "Tokens added"',
                  ],
                }),
                "\n",
              ],
            }),
            "\n",
            (0, s.jsx)(n.h4, {
              id: "example-request-1",
              children: "Example Request",
            }),
            "\n",
            (0, s.jsx)(n.pre, {
              children: (0, s.jsx)(n.code, {
                children:
                  "curl --location 'https://preserve.nft.storage/api/v1/collection/add_tokens' \\\r\n--header 'Authorization: Bearer YOUR_API_KEY' \\\r\n--form 'collectionID=\"COLLECTION_ID\"' \\\r\n--form 'file=@\"ABSOLUTE_FILE_PATH\";type=application/json'\n",
              }),
            }),
            "\n",
            (0, s.jsx)(n.h2, {
              id: "viewing-collections",
              children: "Viewing Collections",
            }),
            "\n",
            (0, s.jsx)(n.h3, { id: "endpoint-2", children: "Endpoint" }),
            "\n",
            (0, s.jsxs)(n.ul, {
              children: [
                "\n",
                (0, s.jsxs)(n.li, {
                  children: [
                    (0, s.jsx)(n.strong, { children: "Method:" }),
                    " GET",
                  ],
                }),
                "\n",
                (0, s.jsxs)(n.li, {
                  children: [
                    (0, s.jsx)(n.strong, { children: "URL:" }),
                    " /api/v1/collection/list_collections",
                  ],
                }),
                "\n",
                (0, s.jsxs)(n.li, {
                  children: [
                    (0, s.jsx)(n.strong, { children: "Auth:" }),
                    " API_KEY",
                  ],
                }),
                "\n",
                (0, s.jsxs)(n.li, {
                  children: [
                    (0, s.jsx)(n.strong, { children: "Response:" }),
                    " List of collections with their details",
                  ],
                }),
                "\n",
              ],
            }),
            "\n",
            (0, s.jsx)(n.h4, {
              id: "example-request-2",
              children: "Example Request",
            }),
            "\n",
            (0, s.jsx)(n.pre, {
              children: (0, s.jsx)(n.code, {
                children:
                  "curl --location 'https://preserve.nft.storage/api/v1/collection/list_collections' \\\r\n--header 'Authorization: Bearer YOUR_API_KEY'\r\n\n",
              }),
            }),
            "\n",
            (0, s.jsx)(n.h2, {
              id: "viewing-tokens",
              children: "Viewing Tokens",
            }),
            "\n",
            (0, s.jsx)(n.h3, { id: "endpoint-3", children: "Endpoint" }),
            "\n",
            (0, s.jsxs)(n.ul, {
              children: [
                "\n",
                (0, s.jsxs)(n.li, {
                  children: [
                    (0, s.jsx)(n.strong, { children: "Method:" }),
                    " GET",
                  ],
                }),
                "\n",
                (0, s.jsxs)(n.li, {
                  children: [
                    (0, s.jsx)(n.strong, { children: "URL:" }),
                    " /api/v1/collection/list_tokens?collectionID=YourCollectionID&lastKey=CollectionLastKey",
                  ],
                }),
                "\n",
                (0, s.jsxs)(n.li, {
                  children: [
                    (0, s.jsx)(n.strong, { children: "Auth:" }),
                    " API_KEY",
                  ],
                }),
                "\n",
                (0, s.jsx)(n.li, {
                  children: (0, s.jsx)(n.strong, { children: "Query Param:" }),
                }),
                "\n",
                (0, s.jsxs)(n.li, {
                  children: [
                    (0, s.jsx)(n.code, { children: "lastKey" }),
                    ": ID of the last fetched token",
                  ],
                }),
                "\n",
                (0, s.jsxs)(n.li, {
                  children: [
                    (0, s.jsx)(n.code, { children: "collectionID" }),
                    ": ID of the collection",
                  ],
                }),
                "\n",
                (0, s.jsxs)(n.li, {
                  children: [
                    (0, s.jsx)(n.strong, { children: "Note:" }),
                    "\n",
                    (0, s.jsxs)(n.ul, {
                      children: [
                        "\n",
                        (0, s.jsx)(n.li, {
                          children:
                            "The API wil return only 500 tokens of the collection at a time",
                        }),
                        "\n",
                        (0, s.jsx)(n.li, {
                          children:
                            "Use lastKey as undefined while fetching\xa0the first page, and use lastKey as the id of the last fetched token in subsequent queries to get further tokens.",
                        }),
                        "\n",
                      ],
                    }),
                    "\n",
                  ],
                }),
                "\n",
                (0, s.jsxs)(n.li, {
                  children: [
                    (0, s.jsx)(n.strong, { children: "Response:" }),
                    " List of tokens of a collection",
                  ],
                }),
                "\n",
              ],
            }),
            "\n",
            (0, s.jsx)(n.h4, {
              id: "example-request-3",
              children: "Example Request",
            }),
            "\n",
            (0, s.jsx)(n.pre, {
              children: (0, s.jsx)(n.code, {
                children:
                  "curl --location 'https://preserve.nft.storage/api/v1/collection/list_tokens?collectionID=YourCollectionID&lastKey=CollectionLastKey' \\\r\n--header 'Authorization: Bearer YOUR_API_KEY'\r\n\n",
              }),
            }),
            "\n",
            (0, s.jsx)(n.h2, {
              id: "list-api-keys",
              children: "List API keys",
            }),
            "\n",
            (0, s.jsx)(n.h3, { id: "endpoint-4", children: "Endpoint" }),
            "\n",
            (0, s.jsxs)(n.ul, {
              children: [
                "\n",
                (0, s.jsxs)(n.li, {
                  children: [
                    (0, s.jsx)(n.strong, { children: "Method:" }),
                    " GET",
                  ],
                }),
                "\n",
                (0, s.jsxs)(n.li, {
                  children: [
                    (0, s.jsx)(n.strong, { children: "URL:" }),
                    " /api/v1/auth/list_api_keys",
                  ],
                }),
                "\n",
                (0, s.jsxs)(n.li, {
                  children: [
                    (0, s.jsx)(n.strong, { children: "Auth:" }),
                    " API_KEY",
                  ],
                }),
                "\n",
                (0, s.jsxs)(n.li, {
                  children: [
                    (0, s.jsx)(n.strong, { children: "Response:" }),
                    " List of API keys",
                  ],
                }),
                "\n",
              ],
            }),
            "\n",
            (0, s.jsx)(n.h4, {
              id: "example-request-4",
              children: "Example Request",
            }),
            "\n",
            (0, s.jsx)(n.pre, {
              children: (0, s.jsx)(n.code, {
                children:
                  "curl --location 'https://preserve.nft.storage/api/v1/auth/list_api_keys' \\\r\n--header 'Authorization: Bearer YOUR_API_KEY'\r\n\n",
              }),
            }),
            "\n",
            (0, s.jsx)(n.h2, {
              id: "deleting-api-key",
              children: "Deleting API key",
            }),
            "\n",
            (0, s.jsx)(n.h3, { id: "endpoint-5", children: "Endpoint" }),
            "\n",
            (0, s.jsxs)(n.ul, {
              children: [
                "\n",
                (0, s.jsxs)(n.li, {
                  children: [
                    (0, s.jsx)(n.strong, { children: "Method:" }),
                    " DELETE",
                  ],
                }),
                "\n",
                (0, s.jsxs)(n.li, {
                  children: [
                    (0, s.jsx)(n.strong, { children: "URL:" }),
                    " /api/v1/auth/remove_api_key",
                  ],
                }),
                "\n",
                (0, s.jsxs)(n.li, {
                  children: [
                    (0, s.jsx)(n.strong, { children: "Auth:" }),
                    " API_KEY",
                  ],
                }),
                "\n",
                (0, s.jsxs)(n.li, {
                  children: [
                    (0, s.jsx)(n.strong, { children: "Response:" }),
                    " API key removed",
                  ],
                }),
                "\n",
              ],
            }),
            "\n",
            (0, s.jsx)(n.h4, {
              id: "example-request-5",
              children: "Example Request",
            }),
            "\n",
            (0, s.jsx)(n.pre, {
              children: (0, s.jsx)(n.code, {
                children:
                  "curl --location --request DELETE 'https://preserve.nft.storage/api/v1/auth/remove_api_key?keyID=b4afc16a-301a-4c45-b369-13053779889b' \\\r\n--header 'Authorization: Bearer YOUR_API_KEY'\r\n\n",
              }),
            }),
            "\n",
            (0, s.jsx)(n.h2, {
              id: "get-user-balance",
              children: "Get User Balance",
            }),
            "\n",
            (0, s.jsx)(n.h3, { id: "endpoint-6", children: "Endpoint" }),
            "\n",
            (0, s.jsxs)(n.ul, {
              children: [
                "\n",
                (0, s.jsxs)(n.li, {
                  children: [
                    (0, s.jsx)(n.strong, { children: "Method:" }),
                    " GET",
                  ],
                }),
                "\n",
                (0, s.jsxs)(n.li, {
                  children: [
                    (0, s.jsx)(n.strong, { children: "URL:" }),
                    " /api/v1/user/get_balance",
                  ],
                }),
                "\n",
                (0, s.jsxs)(n.li, {
                  children: [
                    (0, s.jsx)(n.strong, { children: "Auth:" }),
                    " API_KEY",
                  ],
                }),
                "\n",
                (0, s.jsxs)(n.li, {
                  children: [
                    (0, s.jsx)(n.strong, { children: "Response:" }),
                    " User's balance",
                  ],
                }),
                "\n",
              ],
            }),
            "\n",
            (0, s.jsx)(n.h4, {
              id: "example-request-6",
              children: "Example Request",
            }),
            "\n",
            (0, s.jsx)(n.pre, {
              children: (0, s.jsx)(n.code, {
                children:
                  "curl --location 'https://preserve.nft.storage/api/v1/user/get_balance' \\\r\n--header 'Authorization: Bearer YOUR_API_KEY'\r\n\n",
              }),
            }),
            "\n",
            (0, s.jsx)(n.h2, {
              id: "get-deal-status",
              children: "Get Deal Status",
            }),
            "\n",
            (0, s.jsx)(n.h3, { id: "endpoint-7", children: "Endpoint" }),
            "\n",
            (0, s.jsxs)(n.ul, {
              children: [
                "\n",
                (0, s.jsxs)(n.li, {
                  children: [
                    (0, s.jsx)(n.strong, { children: "Method:" }),
                    " GET",
                  ],
                }),
                "\n",
                (0, s.jsxs)(n.li, {
                  children: [
                    (0, s.jsx)(n.strong, { children: "URL:" }),
                    " /api/v1/collection/deal_status?cid=YOUR_CID",
                  ],
                }),
                "\n",
                (0, s.jsx)(n.li, {
                  children: (0, s.jsx)(n.strong, { children: "Query Param:" }),
                }),
                "\n",
                (0, s.jsxs)(n.li, {
                  children: [
                    (0, s.jsx)(n.code, { children: "cid" }),
                    ": The CID (Content Identifier) of the token",
                  ],
                }),
                "\n",
                (0, s.jsxs)(n.li, {
                  children: [
                    (0, s.jsx)(n.strong, { children: "Response:" }),
                    " Deal status for the specified CID",
                  ],
                }),
                "\n",
              ],
            }),
            "\n",
            (0, s.jsx)(n.h4, {
              id: "example-request-7",
              children: "Example Request",
            }),
            "\n",
            (0, s.jsx)(n.pre, {
              children: (0, s.jsx)(n.code, {
                children:
                  "curl --location 'https://preserve.nft.storage/api/v1/collection/deal_status?cid=YOUR_CID'\n",
              }),
            }),
            "\n",
            (0, s.jsx)(n.h2, {
              id: "retry-failed-pinning-api",
              children: "Retry Failed Pinning API",
            }),
            "\n",
            (0, s.jsx)(n.h3, { id: "endpoint-8", children: "Endpoint" }),
            "\n",
            (0, s.jsxs)(n.ul, {
              children: [
                "\n",
                (0, s.jsxs)(n.li, {
                  children: [
                    "\n",
                    (0, s.jsxs)(n.p, {
                      children: [
                        (0, s.jsx)(n.strong, { children: "Method:" }),
                        " GET",
                      ],
                    }),
                    "\n",
                  ],
                }),
                "\n",
                (0, s.jsxs)(n.li, {
                  children: [
                    "\n",
                    (0, s.jsxs)(n.p, {
                      children: [
                        (0, s.jsx)(n.strong, { children: "URL:" }),
                        " /api/v1/collection/retry_tokens",
                      ],
                    }),
                    "\n",
                  ],
                }),
                "\n",
                (0, s.jsxs)(n.li, {
                  children: [
                    "\n",
                    (0, s.jsxs)(n.p, {
                      children: [
                        (0, s.jsx)(n.strong, { children: "Auth:" }),
                        " API_KEY",
                      ],
                    }),
                    "\n",
                  ],
                }),
                "\n",
                (0, s.jsxs)(n.li, {
                  children: [
                    "\n",
                    (0, s.jsx)(n.p, {
                      children: (0, s.jsx)(n.strong, {
                        children: "Query Param:",
                      }),
                    }),
                    "\n",
                    (0, s.jsxs)(n.ul, {
                      children: [
                        "\n",
                        (0, s.jsxs)(n.li, {
                          children: [
                            (0, s.jsx)(n.code, { children: "tokenID" }),
                            ": The CID of the failed token to retry pinning.",
                          ],
                        }),
                        "\n",
                      ],
                    }),
                    "\n",
                  ],
                }),
                "\n",
                (0, s.jsxs)(n.li, {
                  children: [
                    "\n",
                    (0, s.jsxs)(n.p, {
                      children: [
                        (0, s.jsx)(n.strong, { children: "Response:" }),
                        ' "Retry initiated for the specified token"',
                      ],
                    }),
                    "\n",
                  ],
                }),
                "\n",
              ],
            }),
            "\n",
            (0, s.jsx)(n.h4, {
              id: "example-request-8",
              children: "Example Request",
            }),
            "\n",
            (0, s.jsx)(n.pre, {
              children: (0, s.jsx)(n.code, {
                children:
                  "curl --location 'https://preserve.nft.storage/api/v1/collection/retry_tokens?tokenID=CID' \\\r\n--header 'Authorization: Bearer YOUR_API_KEY'\n",
              }),
            }),
            "\n",
            (0, s.jsx)(n.h2, {
              id: "delete-failed-pinning-api",
              children: "Delete Failed Pinning API",
            }),
            "\n",
            (0, s.jsx)(n.h3, { id: "endpoint-9", children: "Endpoint" }),
            "\n",
            (0, s.jsxs)(n.ul, {
              children: [
                "\n",
                (0, s.jsxs)(n.li, {
                  children: [
                    "\n",
                    (0, s.jsxs)(n.p, {
                      children: [
                        (0, s.jsx)(n.strong, { children: "Method:" }),
                        " DELETE",
                      ],
                    }),
                    "\n",
                  ],
                }),
                "\n",
                (0, s.jsxs)(n.li, {
                  children: [
                    "\n",
                    (0, s.jsxs)(n.p, {
                      children: [
                        (0, s.jsx)(n.strong, { children: "URL:" }),
                        " /api/v1/collection/delete_tokens",
                      ],
                    }),
                    "\n",
                  ],
                }),
                "\n",
                (0, s.jsxs)(n.li, {
                  children: [
                    "\n",
                    (0, s.jsxs)(n.p, {
                      children: [
                        (0, s.jsx)(n.strong, { children: "Auth:" }),
                        " API_KEY",
                      ],
                    }),
                    "\n",
                  ],
                }),
                "\n",
                (0, s.jsxs)(n.li, {
                  children: [
                    "\n",
                    (0, s.jsx)(n.p, {
                      children: (0, s.jsx)(n.strong, {
                        children: "Query Param:",
                      }),
                    }),
                    "\n",
                    (0, s.jsxs)(n.ul, {
                      children: [
                        "\n",
                        (0, s.jsxs)(n.li, {
                          children: [
                            (0, s.jsx)(n.code, { children: "tokenID" }),
                            ": The ID of the failed token to delete.",
                          ],
                        }),
                        "\n",
                      ],
                    }),
                    "\n",
                  ],
                }),
                "\n",
                (0, s.jsxs)(n.li, {
                  children: [
                    "\n",
                    (0, s.jsxs)(n.p, {
                      children: [
                        (0, s.jsx)(n.strong, { children: "Response:" }),
                        ' "Failed token deleted successfully"',
                      ],
                    }),
                    "\n",
                  ],
                }),
                "\n",
              ],
            }),
            "\n",
            (0, s.jsx)(n.h4, {
              id: "example-request-9",
              children: "Example Request",
            }),
            "\n",
            (0, s.jsx)(n.pre, {
              children: (0, s.jsx)(n.code, {
                children:
                  "curl --location --request DELETE 'https://preserve.nft.storage/api/v1/collection/delete_tokens?tokenID=TOKEN_ID' \\\r\n--header 'Authorization: Bearer YOUR_API_KEY'\n",
              }),
            }),
          ],
        });
      }
      function a(e = {}) {
        const { wrapper: n } = { ...(0, l.R)(), ...e.components };
        return n
          ? (0, s.jsx)(n, { ...e, children: (0, s.jsx)(h, { ...e }) })
          : h(e);
      }
    },
    8453: (e, n, i) => {
      i.d(n, { R: () => t, x: () => d });
      var s = i(6540);
      const l = {},
        r = s.createContext(l);
      function t(e) {
        const n = s.useContext(r);
        return s.useMemo(
          function () {
            return "function" == typeof e ? e(n) : { ...n, ...e };
          },
          [n, e],
        );
      }
      function d(e) {
        let n;
        return (
          (n = e.disableParentContext
            ? "function" == typeof e.components
              ? e.components(l)
              : e.components || l
            : t(e.components)),
          s.createElement(r.Provider, { value: n }, e.children)
        );
      }
    },
  },
]);
