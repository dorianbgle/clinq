// pages/thank-you.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';

const ThankYou = () => {
  const router = useRouter();
  const { session_id } = router.query;

  useEffect(() => {
    const updateSubscriptionStatus = async () => {
      if (!session_id) return;

      // Fetch Stripe session details
      const res = await fetch('/api/get-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: session_id }),
      });

      const session = await res.json();

      // Update Supabase user profile
      await supabase
        .from('users')
        .update({ is_subscribed: true })
        .eq('stripe_customer_id', session.customer);
    };

    updateSubscriptionStatus();
  }, [session_id]);

  return <h1>Thank you for subscribing!</h1>;
};

export default ThankYou;
