import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, FileCheck, ArrowLeft, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const DoctorAccess = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAccessDocuments = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!code.trim()) {
      toast.error("Please enter a patient code");
      return;
    }

    setLoading(true);
    try {
      // Check if code exists
      const { data: session, error: sessionError } = await supabase
        .from("patient_sessions")
        .select("id")
        .eq("code", code.trim().toUpperCase())
        .single();

      if (sessionError || !session) {
        toast.error("Invalid patient code. Please check and try again.");
        setLoading(false);
        return;
      }

      // Navigate to documents page
      navigate(`/documents/${code.trim().toUpperCase()}`);
    } catch (error) {
      console.error("Access error:", error);
      toast.error("Failed to access documents. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
        <Card className="mx-auto max-w-xl p-8">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10">
              <FileCheck className="h-8 w-8 text-accent" />
            </div>
            <h2 className="mb-2 text-3xl font-bold text-foreground">
              Access Patient Documents
            </h2>
            <p className="text-muted-foreground">
              Enter the patient's unique code to view their medical documents
            </p>
          </div>

          <form onSubmit={handleAccessDocuments} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="code" className="text-base font-medium">
                Patient Code
              </Label>
              <div className="relative">
                <Input
                  id="code"
                  type="text"
                  placeholder="Enter 8-character code"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  maxLength={8}
                  className="h-14 pr-12 text-center text-2xl font-bold tracking-wider uppercase"
                />
                <Search className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground">
                Code is case-insensitive and 8 characters long
              </p>
            </div>

            <Button
              type="submit"
              disabled={loading || code.length !== 8}
              className="w-full border-2 border-accent bg-accent hover:opacity-90"
              size="lg"
            >
              {loading ? "Verifying..." : "Access Documents"}
            </Button>

            <div className="rounded-lg bg-primary/5 p-4">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Security Notice:</strong> Access to patient documents is logged and monitored. Only enter codes provided by your patients.
              </p>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default DoctorAccess;
