import { supabase } from './auth';

export async function queryDb<T>(query: string, params?: any[]): Promise<T[]> {
  const { data, error } = await supabase.rpc(query, params);
  if (error) {
    console.error('Error querying database:', error);
    throw error;
  }
  return data as T[];
}

export async function runDb(query: string, params?: any[]): Promise<any> {
  const { data, error } = await supabase.rpc(query, params);
  if (error) {
    console.error('Error running database query:', error);
    throw error;
  }
  return data;
}

export async function getOne<T>(tableName: string, column: string, value: any): Promise<T | null> {
  const { data, error } = await supabase
    .from(tableName)
    .select('*')
    .eq(column, value)
    .limit(1);

  if (error) {
    console.error('Error getting record:', error);
    return null;
  }

  return data && data.length > 0 ? (data[0] as T) : null;
}

export async function getUserById(userId: string) {
  return getOne('users', 'id', userId);
}

export async function getUserByEmail(email: string) {
  return getOne('users', 'email', email);
}

export async function getUserProfile(userId: string) {
  return getOne('user_profiles', 'user_id', userId);
}

export async function getUserPhotos(userId: string) {
    const { data, error } = await supabase
    .from('profile_photos')
    .select('*')
    .eq('user_id', userId)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error getting user photos:', error);
    return [];
  }

  return data;

}
