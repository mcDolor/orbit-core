import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { provider } = await request.json();

    if (!provider) {
      return NextResponse.json(
        { message: 'Provider is required' },
        { status: 400 }
      );
    }

    // Get the redirect URL
    const redirectUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`;

    // Create OAuth URL
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider as 'google' | 'github',
      options: {
        redirectTo: redirectUrl,
      },
    });

    if (error || !data.url) {
      return NextResponse.json(
        { message: 'Failed to create OAuth URL' },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: data.url }, { status: 200 });
  } catch (error) {
    console.error('OAuth error:', error);
    return NextResponse.json(
      { message: 'An error occurred during OAuth' },
      { status: 500 }
    );
  }
}
