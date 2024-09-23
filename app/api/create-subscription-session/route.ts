import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' });
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json({ error: 'Missing email' }, { status: 400 });
  }

  try {
    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      customer_email: email, // Add the customer's email to the session
      line_items: [
        {
          price: process.env.STRIPE_SUBSCRIPTION_PRICE_ID!, // Your Stripe price ID
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXTAUTH_URL}/subscription-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/subscription-cancel`,
    });

    // Upsert the user in the Supabase 'users' table with 'inactive' subscription status
    await supabase
      .from('users')
      .upsert({ email, subscription_status: 'inactive' }, { onConflict: 'email' });

    return NextResponse.json({ id: session.id });
  } catch (error: any) {
    console.error('Error creating subscription session:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
