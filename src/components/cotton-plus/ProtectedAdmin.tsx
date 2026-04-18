import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { Session } from "@supabase/supabase-js";

interface Props {
  children: (session: Session) => React.ReactNode;
}

export function ProtectedAdmin({ children }: Props) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signingIn, setSigningIn] = useState(false);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setSigningIn(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setSigningIn(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Welcome back!");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        Loading...
      </div>
    );
  }

  if (!session) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-4"
        style={{ background: "linear-gradient(135deg, #0b1120 0%, #0b1120 60%, #22d3ee22 100%)" }}
      >
        <Card className="w-full max-w-md rounded-2xl">
          <CardHeader>
            <CardTitle>Cotton Plus Admin</CardTitle>
            <p className="text-sm text-muted-foreground">Sign in to manage customers & settings</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11 rounded-xl mt-1"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11 rounded-xl mt-1"
                />
              </div>
              <Button
                type="submit"
                disabled={signingIn}
                className="w-full h-12 rounded-xl"
              >
                {signingIn ? "Signing in..." : "Sign In"}
              </Button>
              <p className="text-xs text-muted-foreground text-center pt-2">
                Admin user must be created in Cloud → Users
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children(session)}</>;
}
