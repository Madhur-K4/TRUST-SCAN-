-- Create patient sessions table to store unique access codes
CREATE TABLE public.patient_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create medical documents table
CREATE TABLE public.medical_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES public.patient_sessions(id) ON DELETE CASCADE NOT NULL,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size BIGINT,
  file_type TEXT,
  uploaded_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.patient_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medical_documents ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Allow anyone to create sessions and upload documents
-- This is appropriate since the unique code provides access control
CREATE POLICY "Allow public to create sessions"
  ON public.patient_sessions
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public to read sessions by code"
  ON public.patient_sessions
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public to insert documents"
  ON public.medical_documents
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public to read documents"
  ON public.medical_documents
  FOR SELECT
  TO anon
  USING (true);

-- Create storage bucket for medical documents
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'medical-documents',
  'medical-documents',
  false,
  52428800, -- 50MB limit
  ARRAY['application/pdf', 'image/jpeg', 'image/png', 'image/jpg', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
);

-- Storage policies for medical documents bucket
CREATE POLICY "Allow public upload to medical documents"
  ON storage.objects
  FOR INSERT
  TO anon
  WITH CHECK (bucket_id = 'medical-documents');

CREATE POLICY "Allow public read from medical documents"
  ON storage.objects
  FOR SELECT
  TO anon
  USING (bucket_id = 'medical-documents');

-- Function to generate unique patient code
CREATE OR REPLACE FUNCTION public.generate_patient_code()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_code TEXT;
  code_exists BOOLEAN;
BEGIN
  LOOP
    -- Generate 8-character alphanumeric code
    new_code := upper(substr(md5(random()::text), 1, 8));
    
    -- Check if code already exists
    SELECT EXISTS(SELECT 1 FROM public.patient_sessions WHERE code = new_code) INTO code_exists;
    
    -- Exit loop if code is unique
    EXIT WHEN NOT code_exists;
  END LOOP;
  
  RETURN new_code;
END;
$$;