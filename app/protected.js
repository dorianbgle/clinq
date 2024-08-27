// pages/protected.js
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const ProtectedPage = () => {
  const [loading, setLoading] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const checkSubscription = async () => {
      const user = supabase.auth.user();

      const { data: userProfile } = await supabase
        .from('users')
        .select('is_subscribed')
        .eq('id', user.id)
        .single();

      setIsSubscribed(userProfile.is_subscribed);
      setLoading(false);
    };

    checkSubscription();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!isSubscribed) {
    return <div>You need a subscription to view this page.</div>;
  }

  return <div>Welcome to the protected page!</div>;
};

export default ProtectedPage;
