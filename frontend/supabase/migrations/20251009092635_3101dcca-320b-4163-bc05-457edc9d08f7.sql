-- Add patient_name column to patient_sessions table
ALTER TABLE public.patient_sessions 
ADD COLUMN patient_name TEXT NOT NULL DEFAULT 'Anonymous Patient';

-- Update the default for future inserts to require a name
ALTER TABLE public.patient_sessions 
ALTER COLUMN patient_name DROP DEFAULT;