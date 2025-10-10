import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Upload, FileCheck, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      {/* Header */}
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

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="mx-auto max-w-3xl space-y-6">
          <h2 className="text-4xl font-bold leading-tight text-foreground sm:text-5xl">
            Secure Medical Document Sharing
          </h2>
          <p className="text-lg text-muted-foreground">
            Share your medical records safely with healthcare providers using unique access codes.
            No accounts needed, complete privacy guaranteed.
          </p>
        </div>

        {/* Action Cards */}
        <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
          {/* Patient Card */}
          <Card className="group cursor-pointer border-2 transition-all hover:border-primary hover:shadow-lg">
            <button
              onClick={() => navigate("/patient-upload")}
              className="w-full p-8 text-left"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                <Upload className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-2xl font-bold text-foreground">I'm a Patient</h3>
              <p className="text-muted-foreground">
                Upload your medical documents and get a unique code to share with your doctor
              </p>
              <div className="mt-6">
                <Button className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90">
                  Upload Documents
                </Button>
              </div>
            </button>
          </Card>

          {/* Doctor Card */}
          <Card className="group cursor-pointer border-2 transition-all hover:border-accent hover:shadow-lg">
            <button
              onClick={() => navigate("/doctor-access")}
              className="w-full p-8 text-left"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 transition-colors group-hover:bg-accent/20">
                <FileCheck className="h-8 w-8 text-accent" />
              </div>
              <h3 className="mb-2 text-2xl font-bold text-foreground">I'm a Doctor</h3>
              <p className="text-muted-foreground">
                Enter a patient's unique code to securely access their medical documents
              </p>
              <div className="mt-6">
                <Button variant="outline" className="w-full border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                  Access Documents
                </Button>
              </div>
            </button>
          </Card>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border bg-card/30 py-16">
        <div className="container mx-auto px-4">
          <h3 className="mb-12 text-center text-3xl font-bold text-foreground">
            Why Trust Scan?
          </h3>
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <Lock className="h-7 w-7 text-primary" />
              </div>
              <h4 className="mb-2 font-semibold text-foreground">Secure & Private</h4>
              <p className="text-sm text-muted-foreground">
                Your documents are encrypted and only accessible with your unique code
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
                <Shield className="h-7 w-7 text-accent" />
              </div>
              <h4 className="mb-2 font-semibold text-foreground">No Account Required</h4>
              <p className="text-sm text-muted-foreground">
                Start sharing instantly without sign-ups or personal information
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <FileCheck className="h-7 w-7 text-primary" />
              </div>
              <h4 className="mb-2 font-semibold text-foreground">Easy to Use</h4>
              <p className="text-sm text-muted-foreground">
                Simple upload and access process for both patients and doctors
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 Trust Scan. Secure medical document sharing.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
