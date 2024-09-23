import { buffer } from 'micro';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' });
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export const config = {
  api: {
    bodyParser: false, // Stripe requires the raw body to validate the webhook
  },
};

export default async function handler(req: any, res: any) {
  const sig = req.headers['stripe-signature'];
  const buf = await buffer(req);

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig!, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    const email = session.customer_email; // Ensure email is captured
    if (email) {
      // Update the user's subscription status in Supabase to 'active'
      const { error } = await supabase
        .from('users')
        .update({ subscription_status: 'active' })
        .eq('email', email);

      if (error) {
        console.error('Error updating subscription status:', error.message);
        return res.status(500).json({ error: 'Failed to update subscription status' });
      }

      console.log(`Subscription status updated to active for ${email}`);
    }
  }

  // Return a response to acknowledge receipt of the event
  return NextResponse.json({ received: true });
}
