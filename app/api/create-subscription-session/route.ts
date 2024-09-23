import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

// Initialize Stripe and Supabase clients using environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' });
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export async function POST(request: Request) {
  // Parse the request to get the email
  const { email } = await request.json();

  // Validate that an email is provided
  if (!email) {
    return NextResponse.json({ error: 'Missing email' }, { status: 400 });
  }

  try {
    // Step 1: Create a Stripe Checkout session for a subscription
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      customer_email: email, // Use the provided email for the customer
      line_items: [
        {
          price: process.env.STRIPE_SUBSCRIPTION_PRICE_ID!, // Stripe subscription price ID
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXTAUTH_URL}/subscription-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/subscription-cancel`,
    });

    // Step 2: Upsert (insert/update) user details in Supabase with 'inactive' subscription status
    const { error: supabaseError } = await supabase
      .from('users')
      .upsert(
        { email, subscription_status: 'inactive' }, // Insert with default 'inactive' status
        { onConflict: 'email' } // Update if the email already exists
      );

    // Handle any Supabase errors
    if (supabaseError) {
      throw new Error(`Supabase error: ${supabaseError.message}`);
    }

    // Step 3: Return the Stripe session ID in the response
    return NextResponse.json({ id: session.id });
  } catch (error: any) {
    // Log any errors encountered during the process
    console.error('Error creating subscription session or updating Supabase:', error.message);
    
    // Return a 500 error response with the error message
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
