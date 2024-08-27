'use client';  // For Next.js 13+ with RSC

import { useEffect, useState } from 'react';
import { supabase } from '../../packages/lib/supabase/client';
import { stripePromise } from '../../packages/lib/stripeClient';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');  // New state for password
  const [error, setError] = useState(null);

  const handleRegister = async () => {
    setLoading(true);
    setError(null);

    try {
      // Register the user with Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password, // Use the user-provided password
      });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      // Create Stripe Checkout Session
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const { message } = await res.json();
        setError(message || 'Failed to create checkout session.');
        setLoading(false);
        return;
      }

      const { sessionId } = await res.json();
      const stripe = await stripePromise;

      // Redirect to Stripe Checkout
      const { error: stripeError } = await stripe.redirectToCheckout({ sessionId });

      if (stripeError) {
        setError(stripeError.message);
      }
    } catch (err) {
      setError(`${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"  // Correct type for password input
        placeholder="Your Password"
        value={password}  // Use password state here
        onChange={(e) => setPassword(e.target.value)}  // Update password state
      />
      <button onClick={handleRegister} disabled={loading}>
        {loading ? 'Loading...' : 'Register and Subscribe'}
      </button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Register;
