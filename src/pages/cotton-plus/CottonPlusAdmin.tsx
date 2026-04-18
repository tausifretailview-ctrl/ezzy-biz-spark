/*
  SETUP CHECKLIST:
  1. Cloud → Users → Add User → create admin email/password
  2. Visit /cotton-plus/admin and log in
  3. Settings tab → upload logo, paste Google Review + Instagram URLs, set store location
  4. QR Code tab → download QR, print A5 poster, place at billing counter
  5. Test by filling /cotton-plus form from your phone
*/
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ProtectedAdmin } from "@/components/cotton-plus/ProtectedAdmin";
import { CustomerTable } from "@/components/cotton-plus/CustomerTable";
import { SettingsForm } from "@/components/cotton-plus/SettingsForm";
import { QrCodeTab } from "@/components/cotton-plus/QrCodeTab";

export default function CottonPlusAdmin() {
  return (
    <ProtectedAdmin>
      {(session) => (
        <div className="min-h-screen bg-slate-50">
          <header className="bg-white border-b sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
              <div>
                <h1 className="text-lg font-bold">Cotton Plus Admin</h1>
                <p className="text-xs text-muted-foreground">{session.user.email}</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => supabase.auth.signOut()}>
                <LogOut className="h-4 w-4 mr-2" /> Logout
              </Button>
            </div>
          </header>

          <main className="max-w-7xl mx-auto p-4">
            <Tabs defaultValue="customers">
              <TabsList className="mb-4">
                <TabsTrigger value="customers">Customers</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
                <TabsTrigger value="qr">QR Code</TabsTrigger>
              </TabsList>
              <TabsContent value="customers"><CustomerTable /></TabsContent>
              <TabsContent value="settings"><SettingsForm /></TabsContent>
              <TabsContent value="qr"><QrCodeTab /></TabsContent>
            </Tabs>
          </main>
        </div>
      )}
    </ProtectedAdmin>
  );
}
