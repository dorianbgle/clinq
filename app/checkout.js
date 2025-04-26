import { stripePromise } from '../lib/stripeClient';
import { supabase } from '../lib/supabaseClient';
import { useState } from 'react';

const Checkout = () => {
  const [loading, setLoading] = useState(false);

  const createCheckoutSession = async () => {
    setLoading(true);
    const user = supabase.auth.user();

    // Fetch the customer ID from Supabase
    const { data: userProfile } = await supabase
      .from('users')
      .select('stripe_customer_id')
      .eq('id', user.id)
      .single();

    const customerId = userProfile.stripe_customer_id;
    const priceId = 'price_1JQcbDSDJLFH7sls8sdf7'; // Replace with your actual Price ID

    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customerId, priceId }),
    });

    const { sessionId } = await res.json();

    const stripe = await stripePromise;
    await stripe.redirectToCheckout({ sessionId });
    setLoading(false);
  };

  return (
    <div>
      <button onClick={createCheckoutSession} disabled={loading}>
        {loading ? 'Loading...' : 'Subscribe'}
      </button>
    </div>
  );
};

export default Checkout;
