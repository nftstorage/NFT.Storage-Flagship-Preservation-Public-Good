import Stripe from 'stripe'
import config from '../../../config/index.js'
import { pricePerGBInDollar } from '../../../config/constants.js'
const stripe = new Stripe(config.stripe_key)

export const create_session_order = async (dataCap: number, userId: string, socialID: string) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    phone_number_collection: {
      enabled: true,
    },
    invoice_creation: {
      enabled: true,
      invoice_data: {
        metadata: {
          dataCap: dataCap,
          userId: userId,
          socialID: socialID,
        },
      },
    },
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'nft.storage Plan',
            description: `You will get ${dataCap} GB storage`,
          },
          unit_amount: dataCap * Math.floor(pricePerGBInDollar * 100),
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: config.stripe_success_url,
    cancel_url: config.stripe_failure_url,
  })
  return { url: session.url }
}
