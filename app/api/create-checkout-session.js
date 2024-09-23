// pages/api/create-checkout-session.js
import Stripe from 'stripe';
import { supabase } from '../../lib/supabaseClient';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    // Create a new Stripe customer
    const customer = await stripe.customers.create({ email });

    // Save the customer ID in Supabase user profile (optional)
    const { error: supabaseError } = await supabase
      .from('users')
      .update({ stripe_customer_id: customer.id })
      .eq('email', email);
    
    if (supabaseError) {
      return res.status(500).json({ error: supabaseError.message });
    }

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer: customer.id,
      line_items: [
        {
          price: 'price_1PHx2uLMgLErvdlXXvVOq9ig', // Replace with your actual Price ID
          quantity: 1,
        },
      ],
      success_url: `${req.headers.origin}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/register`,
    });

    res.status(200).json({ sessionId: session.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
