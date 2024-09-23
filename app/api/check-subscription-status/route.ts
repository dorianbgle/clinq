import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json({ error: 'Missing email' }, { status: 400 });
  }

  // Check the user's subscription status in Supabase
  const { data, error } = await supabase
    .from('users')
    .select('subscription_status')
    .eq('email', email)
    .single();

  if (error || !data) {
    return NextResponse.json({ isActive: false });
  }

  const isActive = data.subscription_status === 'active';
  return NextResponse.json({ isActive });
}
