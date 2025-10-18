import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Upload, Copy, CheckCircle, ArrowLeft, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const PatientUpload = () => {
  const navigate = useNavigate();
  const [patientName, setPatientName] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [patientCode, setPatientCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleUpload = async () => {
    if (!patientName.trim()) {
      toast.error("Please enter patient name");
      return;
    }
    
    if (files.length === 0) {
      toast.error("Please select at least one file");
      return;
    }

    setUploading(true);
    try {
      // Generate unique patient code
      const { data: codeData, error: codeError } = await supabase.rpc(
        "generate_patient_code"
      );

      if (codeError) throw codeError;

      // Create patient session
      const { data: session, error: sessionError } = await supabase
        .from("patient_sessions")
        .insert({ code: codeData, patient_name: patientName })
        .select()
        .single();

      if (sessionError) throw sessionError;

      // Upload files
      for (const file of files) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${session.id}/${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("medical-documents")
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        // Save document record
        await supabase.from("medical_documents").insert({
          session_id: session.id,
          file_name: file.name,
          file_path: fileName,
          file_size: file.size,
          file_type: file.type,
        });
      }

      setPatientCode(codeData);
      toast.success("Documents uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload documents. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleCopyCode = () => {
    if (patientCode) {
      navigator.clipboard.writeText(patientCode);
      setCopied(true);
      toast.success("Code copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (patientCode) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
        <header className="border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
                <Shield className="h-6 w-6 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">Trust Scan</h1>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-16">
          <Card className="mx-auto max-w-2xl p-8 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent/10">
              <CheckCircle className="h-10 w-10 text-accent" />
            </div>
            <h2 className="mb-4 text-3xl font-bold text-foreground">
              Upload Successful!
            </h2>
            <p className="mb-8 text-muted-foreground">
              Your documents have been securely uploaded. Share this code with your doctor:
            </p>
            <div className="mb-6 rounded-lg bg-secondary p-6">
              <p className="mb-2 text-sm font-medium text-muted-foreground">
                Your Patient Code
              </p>
              <p className="mb-4 text-4xl font-bold tracking-wider text-primary">
                {patientCode}
              </p>
              <Button
                onClick={handleCopyCode}
                variant="outline"
                className="gap-2"
              >
                {copied ? (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy Code
                  </>
                )}
              </Button>
            </div>
            <div className="space-y-4 rounded-lg bg-accent/5 p-6 text-left">
              <h3 className="font-semibold text-foreground">Important:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Keep this code safe - anyone with it can access your documents</li>
                <li>• Only share it with authorized healthcare providers</li>
                <li>• The code is case-sensitive</li>
              </ul>
            </div>
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              className="mt-6 gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-6 w-6" />
            </button>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Trust Scan</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        <Card className="mx-auto max-w-2xl p-8">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            <h2 className="mb-2 text-3xl font-bold text-foreground">
              Upload Medical Documents
            </h2>
            <p className="text-muted-foreground">
              Select your medical files to generate a secure access code
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="patientName" className="text-base font-medium">
                Patient Name
              </Label>
              <Input
                id="patientName"
                type="text"
                placeholder="Enter patient name"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="documents" className="text-base font-medium">
                Select Documents
              </Label>
              <div className="rounded-lg border-2 border-dashed border-border p-8 text-center transition-colors hover:border-primary">
                <Input
                  id="documents"
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="documents"
                  className="flex cursor-pointer flex-col items-center gap-2"
                >
                  <FileText className="h-10 w-10 text-muted-foreground" />
                  <span className="font-medium text-foreground">
                    Choose files or drag and drop
                  </span>
                  <span className="text-sm text-muted-foreground">
                    PDF, JPG, PNG, DOC, DOCX (Max 50MB each)
                  </span>
                </label>
              </div>
            </div>

            {files.length > 0 && (
              <div className="space-y-2">
                <Label className="text-base font-medium">Selected Files</Label>
                <div className="space-y-2 rounded-lg bg-secondary p-4">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded bg-card p-2"
                    >
                      <span className="text-sm text-foreground">{file.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Button
              onClick={handleUpload}
              disabled={files.length === 0 || uploading}
              className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
              size="lg"
            >
              {uploading ? "Uploading..." : "Upload & Generate Code"}
            </Button>

            <div className="rounded-lg bg-accent/5 p-4">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Privacy Notice:</strong> Your documents are encrypted and stored securely. Only individuals with your unique code can access them.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PatientUpload;
