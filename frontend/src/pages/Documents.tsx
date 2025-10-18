import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, ArrowLeft, Download, FileText, Calendar } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Document {
  id: string;
  file_name: string;
  file_path: string;
  file_size: number;
  file_type: string;
  uploaded_at: string;
}

const Documents = () => {
  const navigate = useNavigate();
  const { code } = useParams<{ code: string }>();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [patientName, setPatientName] = useState<string>("");

  useEffect(() => {
    if (code) {
      loadDocuments();
    }
  }, [code]);

  const loadDocuments = async () => {
    try {
      // Get session by code
      const { data: session, error: sessionError } = await supabase
        .from("patient_sessions")
        .select("id, patient_name")
        .eq("code", code?.toUpperCase())
        .single();

      if (sessionError || !session) {
        toast.error("Invalid patient code");
        navigate("/doctor-access");
        return;
      }

      setSessionId(session.id);
      setPatientName(session.patient_name || "");

      // Get documents
      const { data: docs, error: docsError } = await supabase
        .from("medical_documents")
        .select("*")
        .eq("session_id", session.id)
        .order("uploaded_at", { ascending: false });

      if (docsError) throw docsError;

      setDocuments(docs || []);
    } catch (error) {
      console.error("Load documents error:", error);
      toast.error("Failed to load documents");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (doc: Document) => {
    try {
      const { data, error } = await supabase.storage
        .from("medical-documents")
        .download(doc.file_path);

      if (error) throw error;

      const url = URL.createObjectURL(data);
      const a = document.createElement("a");
      a.href = url;
      a.download = doc.file_name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success("Document downloaded");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download document");
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading documents...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/doctor-access")}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-foreground">Trust Scan</h1>
              <p className="text-sm text-muted-foreground">
                Patient Code: <span className="font-mono font-semibold text-primary">{code}</span>
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground">
            {patientName && <span className="text-primary">{patientName}'s </span>}
            Medical Documents
          </h2>
          <p className="text-muted-foreground">
            {documents.length} {documents.length === 1 ? "document" : "documents"} available
          </p>
        </div>

        {documents.length === 0 ? (
          <Card className="p-12 text-center">
            <FileText className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
            <h3 className="mb-2 text-xl font-semibold text-foreground">No documents found</h3>
            <p className="text-muted-foreground">
              This patient hasn't uploaded any documents yet.
            </p>
          </Card>
        ) : (
          <div className="grid gap-4">
            {documents.map((doc) => (
              <Card key={doc.id} className="p-6 transition-shadow hover:shadow-lg">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-1 font-semibold text-foreground">{doc.file_name}</h3>
                      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDate(doc.uploaded_at)}
                        </span>
                        <span>•</span>
                        <span>{formatFileSize(doc.file_size)}</span>
                        {doc.file_type && (
                          <>
                            <span>•</span>
                            <span className="uppercase">{doc.file_type.split("/")[1]}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleDownload(doc)}
                    variant="outline"
                    className="gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Documents;
