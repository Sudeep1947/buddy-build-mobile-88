-- Create enum types for various entities
CREATE TYPE public.faculty_designation AS ENUM ('professor', 'associate_professor', 'assistant_professor', 'lecturer', 'guest_faculty');
CREATE TYPE public.course_type AS ENUM ('theory', 'practical', 'lab', 'seminar', 'workshop');
CREATE TYPE public.resource_type AS ENUM ('classroom', 'laboratory', 'auditorium', 'seminar_hall', 'library');
CREATE TYPE public.semester AS ENUM ('spring', 'fall', 'summer', 'winter');

-- Faculty table
CREATE TABLE public.faculty (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  designation public.faculty_designation NOT NULL,
  department TEXT NOT NULL,
  max_weekly_hours INTEGER DEFAULT 20,
  contact_number TEXT,
  specialization TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Programs table
CREATE TABLE public.programs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT UNIQUE NOT NULL,
  duration_years INTEGER NOT NULL,
  total_credits INTEGER NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Courses table
CREATE TABLE public.courses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  program_id UUID REFERENCES public.programs(id) ON DELETE CASCADE,
  credits INTEGER NOT NULL,
  course_type public.course_type NOT NULL,
  semester INTEGER,
  weekly_hours INTEGER NOT NULL,
  max_students INTEGER,
  prerequisites TEXT[],
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Resources (Rooms) table
CREATE TABLE public.resources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT UNIQUE NOT NULL,
  resource_type public.resource_type NOT NULL,
  capacity INTEGER NOT NULL,
  building TEXT,
  floor INTEGER,
  equipment TEXT[],
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.faculty ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Allow authenticated users to read all data
CREATE POLICY "Allow authenticated users to view faculty"
ON public.faculty FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Allow authenticated users to view programs"
ON public.programs FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Allow authenticated users to view courses"
ON public.courses FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Allow authenticated users to view resources"
ON public.resources FOR SELECT
TO authenticated
USING (true);

-- RLS Policies - Allow authenticated users to manage data (for now, will add role-based later)
CREATE POLICY "Allow authenticated users to insert faculty"
ON public.faculty FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update faculty"
ON public.faculty FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Allow authenticated users to delete faculty"
ON public.faculty FOR DELETE
TO authenticated
USING (true);

CREATE POLICY "Allow authenticated users to insert programs"
ON public.programs FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update programs"
ON public.programs FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Allow authenticated users to delete programs"
ON public.programs FOR DELETE
TO authenticated
USING (true);

CREATE POLICY "Allow authenticated users to insert courses"
ON public.courses FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update courses"
ON public.courses FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Allow authenticated users to delete courses"
ON public.courses FOR DELETE
TO authenticated
USING (true);

CREATE POLICY "Allow authenticated users to insert resources"
ON public.resources FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update resources"
ON public.resources FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Allow authenticated users to delete resources"
ON public.resources FOR DELETE
TO authenticated
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_faculty_updated_at
BEFORE UPDATE ON public.faculty
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_programs_updated_at
BEFORE UPDATE ON public.programs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_courses_updated_at
BEFORE UPDATE ON public.courses
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_resources_updated_at
BEFORE UPDATE ON public.resources
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_faculty_department ON public.faculty(department);
CREATE INDEX idx_faculty_email ON public.faculty(email);
CREATE INDEX idx_courses_program ON public.courses(program_id);
CREATE INDEX idx_courses_code ON public.courses(code);
CREATE INDEX idx_resources_type ON public.resources(resource_type);
CREATE INDEX idx_resources_available ON public.resources(is_available);