-- ১. প্রোফাইল টেবিল (Profiles Table)
-- ইউজার প্রোফাইল ডেটা রাখার জন্য। auth.users ডিলিট হলে এটিও ডিলিট হবে।
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT DEFAULT 'Member',
  avatar TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ২. প্রজেক্ট টেবিল (Projects Table)
-- ইউজার এর তৈরি করা প্রজেক্টগুলো।
CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY, -- ফ্রন্টএন্ড থেকে জেনারেট করা UUID
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  color TEXT DEFAULT '#1D61E7',
  icon TEXT,
  progress INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ৩. টাস্ক টেবিল (Tasks Table)
-- এখানে Task, Quick Note এবং Big Note সব জমা থাকবে।
-- type: 'task' অথবা 'note'
-- isBigNote: TRUE (Big Note এর জন্য), FALSE (Quick Note এর জন্য)
CREATE TABLE IF NOT EXISTS public.tasks (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT, -- Big Note এর বিস্তারিত লেখা এখানে থাকবে
  details TEXT,     -- টাস্ক এর ছোট Context/Hint এখানে থাকবে
  time TEXT DEFAULT '10:00',
  date TEXT,        -- Unplanned হলে এটি NULL থাকে
  completed BOOLEAN DEFAULT FALSE,
  "projectId" TEXT REFERENCES public.projects(id) ON DELETE SET NULL,
  tags TEXT[] DEFAULT '{}',
  "createdAt" BIGINT DEFAULT (extract(epoch from now()) * 1000)::BIGINT,
  type TEXT CHECK (type IN ('task', 'note')) DEFAULT 'task',
  "isBigNote" BOOLEAN DEFAULT FALSE,
  "reminderMinutes" INTEGER
);

-- ৪. সেটিংস টেবিল (Settings Table)
-- App Lock বা অন্যান্য পার্সোনালাইজেশন সেটিংস।
CREATE TABLE IF NOT EXISTS public.settings (
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  key TEXT NOT NULL,
  value JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (user_id, key)
);

-- ৫. Row Level Security (RLS) এনাবল করা (সিকিউরিটির জন্য)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- ৬. সিকিউরিটি পলিসি (যাতে এক ইউজার অন্য ইউজারের ডেটা দেখতে না পারে)
CREATE POLICY "Manage own profile" ON public.profiles FOR ALL USING (auth.uid() = id);
CREATE POLICY "Manage own projects" ON public.projects FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Manage own tasks" ON public.tasks FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Manage own settings" ON public.settings FOR ALL USING (auth.uid() = user_id);

-- ৭. প্রোফাইল অটো-ক্রিয়েশন ট্রিগার
-- নতুন ইউজার সাইন-আপ করার সাথে সাথে প্রোফাইল টেবিল এ এন্ট্রি হবে।
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name)
  VALUES (
    new.id, 
    new.email, 
    COALESCE(new.raw_user_meta_data->>'name', 'Member')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ৮. অ্যাকাউন্ট ডিলিট করার ফাংশন (RPC)
-- এই ফাংশনটি ইউজারকে Authentication এবং DB উভয় জায়গা থেকে পার্মানেন্টলি ডিলিট করবে।
-- ON DELETE CASCADE এর কারণে সব ডেটা অটোমেটিক ডিলিট হয়ে যাবে।
CREATE OR REPLACE FUNCTION delete_user(user_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER -- এটি ডিলিট করার জন্য প্রয়োজনীয় প্রিভিলেজ নিশ্চিত করে
AS $$
BEGIN
  -- নিশ্চিত করা হচ্ছে যে ইউজার শুধুমাত্র নিজের অ্যাকাউন্টই ডিলিট করছে
  IF auth.uid() = user_id THEN
    DELETE FROM auth.users WHERE id = user_id;
  ELSE
    RAISE EXCEPTION 'You can only delete your own account.';
  END IF;
END;
$$;