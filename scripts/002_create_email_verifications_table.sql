
-- Create a table for email verifications
create table email_verifications (
  id uuid references auth.users not null primary key,
  token text not null unique,
  created_at timestamp with time zone default now()
);

alter table email_verifications enable row level security;

create policy "Users can insert their own email verification." on email_verifications
  for insert with check (auth.uid() = id);

create policy "Users can update their own email verification." on email_verifications
  for update using (auth.uid() = id);
