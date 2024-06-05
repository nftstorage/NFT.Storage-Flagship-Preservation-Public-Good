const env = process.env.NEXT_PUBLIC_ENVIRONMENT;
export const config = {
  docsURL:
    env == "dev"
      ? process.env.NEXT_PUBLIC_DEV_DOCS_URL
      : process.env.NEXT_PUBLIC_PRODUCTION_DOCS_URL,
  environment: process.env.NEXT_PUBLIC_ENVIRONMENT,
  server:
    env == "dev"
      ? process.env.NEXT_PUBLIC_DEVELOPMENT_SERVER
      : process.env.NEXT_PUBLIC_PRODUCTION_SERVER,
  githubClientID:
    env == "dev"
      ? process.env.NEXT_PUBLIC_DEV_GITHUB_CLIENT_ID
      : process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
  productionServer: process.env.NEXT_PUBLIC_PRODUCTION_SERVER,
  prodGithubClientID: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
  developmentServer: process.env.NEXT_PUBLIC_DEVELOPMENT_SERVER,
  devGithubClientId: process.env.NEXT_PUBLIC_DEV_GITHUB_CLIENT_ID,
};
