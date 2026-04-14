import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWorkReportAuth } from "./WorkReportContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { LogIn, User, Lock } from "lucide-react";

const WRLogin = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useWorkReportAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId.trim() || !password.trim()) {
      toast.error("Please enter User ID and Password");
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("work-report-auth", {
        body: { action: "login", user_id: userId.trim(), password },
      });
      if (error) throw error;
      if (data?.error) {
        toast.error(data.error);
        return;
      }
      login(data.user);
      toast.success(`Welcome, ${data.user.name}!`);
    } catch {
      toast.error("Invalid User ID or Password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "#0b1120" }}>
      <Card className="w-full max-w-md border-[#1f2f47]" style={{ background: "#111827" }}>
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-2" style={{ background: "#1a2336" }}>
            <User className="w-8 h-8" style={{ color: "#22d3ee" }} />
          </div>
          <CardTitle className="text-2xl font-bold text-white">Work Report Login</CardTitle>
          <p className="text-sm" style={{ color: "#64748b" }}>Enter your credentials to access the system</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">User ID</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#64748b" }} />
                <Input
                  placeholder="e.g. EMP001"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="pl-10 border-[#1f2f47] text-white placeholder:text-[#64748b]"
                  style={{ background: "#1a2336" }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#64748b" }} />
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 border-[#1f2f47] text-white placeholder:text-[#64748b]"
                  style={{ background: "#1a2336" }}
                />
              </div>
            </div>
            <Button type="submit" disabled={loading} className="w-full text-white font-semibold" style={{ background: "#22d3ee", color: "#0b1120" }}>
              <LogIn className="w-4 h-4 mr-2" />
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default WRLogin;
