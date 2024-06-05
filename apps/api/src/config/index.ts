import dotenv from 'dotenv'

dotenv.config()

const config = {
  environment: process.env.NODE_ENV ?? 'development',
  port: process.env.PORT ?? 8000,
  aws_access_key_id: process.env.AWS_ACCESS_KEY_ID ?? '',
  aws_secret_access_key: process.env.AWS_SECRET_ACCESS_KEY ?? '',
  aws_region: process.env.AWS_REGION ?? '',
  domain_name: process.env.DOMAIN_NAME,
  smtp_email_id: process.env.SMTP_EMAIL_ID,
  smtp_emai_password: process.env.SMTP_EMAIL_PASSWORD,
  smtp_email_host: process.env.SMTP_EMAIL_HOST,
  github_client_id: process.env.GITHUB_CLIENT_ID,
  github_client_secret: process.env.GITHUB_CLIENT_SECRET,
  jwt_secret: process.env.JWT_SECRET ?? '',
  redis_url: process.env.REDIS_URL ?? '',
  stripe_key: process.env.STRIPE_KEY ?? '',
  stripe_success_url: process.env.STRIPE_SUCCESS_URL,
  stripe_failure_url: process.env.STRIPE_FAILURE_URL,
  stripe_webhook: process.env.STRIPE_WEBHOOK ?? '',
  lighthouse_api_key: process.env.LIGHTHOUSE_API_KEY,
  logger_loki_host: process.env.LOGGER_LOKI_HOST ?? '',
  logger_loki_username: process.env.LOKI_USERNAME ?? '',
  logger_loki_password: process.env.LOKI_PASSWORD ?? '',
}

export default config
