import { supabase } from './auth';
import { NextRequest } from 'next/server';
import { apiError, apiSuccess } from './api-helpers';

export async function handleSignup(req: NextRequest) {
  const { email, password, username } = await req.json();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
      },
    },
  });

  if (error) {
    return apiError(error.message);
  }

  if (data.user) {
    const { error: insertError } = await supabase.from('users').insert([{
      id: data.user.id,
      email: data.user.email,
      username: username,
      account_type: 'user',
    }]);

    if (insertError) {
      console.error("Error creating user in public table", insertError);
      return apiError(insertError.message);
    }
  }

  return apiSuccess(data);
}

export async function handleLogin(req: NextRequest) {
  const { email, password } = await req.json();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return apiError(error.message);
  }

  if (data.user) {
    const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', data.user.id)
        .single();

    if (profileError) {
        console.error("Error fetching user profile", profileError);
        return apiSuccess(data); // return basic data if profile fetch fails
    }
    
    const augmentedUser = { ...data.user, ...profile };
    const augmentedData = { ...data, user: augmentedUser };
    return apiSuccess(augmentedData);
  }

  return apiSuccess(data);
}

export async function handleLogout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    return apiError(error.message);
  }

  return apiSuccess({ message: 'Logged out' });
}

export async function handleUser(req: NextRequest) {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
        return apiError(error?.message || "User not found", 401);
    }

    const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

    if (profileError) {
        console.error("Error fetching user profile for user:", user.id, profileError);
        return apiSuccess(user);
    }

    const userData = {
        ...user,
        ...profile
    };

    return apiSuccess(userData);
}
