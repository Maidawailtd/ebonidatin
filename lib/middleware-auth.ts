import { supabase } from './auth';
import { NextApiRequest, NextApiResponse } from 'next';

export const withSupabaseAuth = (handler: (req: NextApiRequest, res: NextApiResponse) => void) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    return handler(req, res);
  };
};
