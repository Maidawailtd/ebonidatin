import { drizzle } from 'drizzle-orm/d1';
import { InferModel, sql, eq } from 'drizzle-orm';
import * as schema from '@/schema';

export const getDb = (d1: D1Database) => {
  if (!d1) {
    throw new Error(
      'Cloudflare D1 binding is not available. Please check your wrangler.toml'
    );
  }
  return drizzle(d1, { schema });
};

export const getMessages = async (db: D1Database, userId1: string, userId2: string) => {
  const d1 = getDb(db);
  return await d1.query.chat_messages.findMany({
    where: sql`
      (sender_id = ${userId1} AND receiver_id = ${userId2}) OR
      (sender_id = ${userId2} AND receiver_id = ${userId1})
    `,
    orderBy: (messages, { asc }) => [asc(messages.created_at)],
  });
};

export const insertContactSubmission = async (db: D1Database, submission: InferModel<typeof schema.contact_submissions, 'insert'>) => {
  const d1 = getDb(db);
  return await d1.insert(schema.contact_submissions).values(submission);
};

export const updateUserProfile = async (db: D1Database, userId: string, profileData: Partial<InferModel<typeof schema.profiles>>) => {
  const d1 = getDb(db);
  await d1.update(schema.profiles).set(profileData).where(eq(schema.profiles.id, userId));
};
