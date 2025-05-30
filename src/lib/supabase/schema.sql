-- Enable RLS
alter default privileges revoke execute on functions from public;

-- Create custom types
create type content_status as enum ('draft', 'scheduled', 'published', 'failed');
create type platform_type as enum ('twitter', 'linkedin', 'instagram', 'facebook', 'tiktok');
create type business_type as enum ('retail', 'tech', 'food', 'health', 'finance', 'other');
create type content_tone as enum ('professional', 'casual', 'humorous', 'formal');
create type post_frequency as enum ('daily', '3x_week', 'weekly');

-- Create tables
create table if not exists users (
  id uuid references auth.users on delete cascade,
  email text unique not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (id)
);

create table if not exists business_profiles (
  id uuid default uuid_generate_v4() not null,
  user_id uuid references users on delete cascade not null,
  name text not null,
  type business_type not null,
  description text,
  target_audience text,
  keywords text[],
  tone content_tone not null default 'professional',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (id)
);

create table if not exists user_preferences (
  id uuid default uuid_generate_v4() not null,
  user_id uuid references users on delete cascade not null,
  post_frequency post_frequency not null default 'weekly',
  platforms platform_type[] not null default array[]::platform_type[],
  auto_schedule boolean not null default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (id)
);

create table if not exists user_credits (
  id uuid default uuid_generate_v4() not null,
  user_id uuid references users on delete cascade not null,
  available integer not null default 0,
  used integer not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (id)
);

create table if not exists social_posts (
  id uuid default uuid_generate_v4() not null,
  user_id uuid references users on delete cascade not null,
  platform platform_type not null,
  content text not null,
  status content_status not null default 'draft',
  scheduled_for timestamp with time zone,
  published_at timestamp with time zone,
  buffer_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (id)
);

create table if not exists post_analytics (
  id uuid default uuid_generate_v4() not null,
  post_id uuid references social_posts on delete cascade not null,
  likes integer not null default 0,
  comments integer not null default 0,
  shares integer not null default 0,
  impressions integer not null default 0,
  engagement_rate decimal not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (id)
);

-- Enable Row Level Security
alter table users enable row level security;
alter table business_profiles enable row level security;
alter table user_preferences enable row level security;
alter table user_credits enable row level security;
alter table social_posts enable row level security;
alter table post_analytics enable row level security;

-- Create RLS Policies
create policy "Users can view own data"
  on users for select
  using (auth.uid() = id);

create policy "Users can update own data"
  on users for update
  using (auth.uid() = id);

create policy "Users can view own business profile"
  on business_profiles for select
  using (auth.uid() = user_id);

create policy "Users can update own business profile"
  on business_profiles for update
  using (auth.uid() = user_id);

create policy "Users can view own preferences"
  on user_preferences for select
  using (auth.uid() = user_id);

create policy "Users can update own preferences"
  on user_preferences for update
  using (auth.uid() = user_id);

create policy "Users can view own credits"
  on user_credits for select
  using (auth.uid() = user_id);

create policy "Users can view own posts"
  on social_posts for select
  using (auth.uid() = user_id);

create policy "Users can update own posts"
  on social_posts for update
  using (auth.uid() = user_id);

create policy "Users can view own analytics"
  on post_analytics for select
  using (auth.uid() = (
    select user_id from social_posts where id = post_id
  ));

-- Create functions
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into users (id, email)
  values (new.id, new.email);

  insert into user_preferences (user_id)
  values (new.id);

  insert into user_credits (user_id)
  values (new.id);

  return new;
end;
$$ language plpgsql security definer;

-- Create triggers
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user(); 