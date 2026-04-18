import { useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { format, parseISO, startOfMonth, endOfMonth, getMonth } from "date-fns";
import { Pencil, Trash2, Download, Copy, Search } from "lucide-react";
import * as XLSX from "xlsx";
import { MONTHS } from "@/lib/cottonPlus";

type Customer = {
  id: string;
  name: string;
  mobile: string;
  birthday: string | null;
  anniversary: string | null;
  store_location: string | null;
  created_at: string;
};

const PAGE_SIZE = 25;

export function CustomerTable() {
  const qc = useQueryClient();
  const [search, setSearch] = useState("");
  const [bMonth, setBMonth] = useState<string>("all");
  const [aMonth, setAMonth] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState<Customer | null>(null);
  const [deleting, setDeleting] = useState<Customer | null>(null);

  const { data: customers = [], isLoading } = useQuery({
    queryKey: ["cotton-plus-customers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cotton_plus_customers")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Customer[];
    },
  });

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return customers.filter((c) => {
      if (q && !c.name.toLowerCase().includes(q) && !c.mobile.includes(q)) return false;
      if (bMonth !== "all" && (!c.birthday || getMonth(parseISO(c.birthday)) !== Number(bMonth)))
        return false;
      if (aMonth !== "all" && (!c.anniversary || getMonth(parseISO(c.anniversary)) !== Number(aMonth)))
        return false;
      return true;
    });
  }, [customers, search, bMonth, aMonth]);

  const stats = useMemo(() => {
    const now = new Date();
    const monthStart = startOfMonth(now);
    const monthEnd = endOfMonth(now);
    const m = getMonth(now);
    return {
      total: customers.length,
      thisMonth: customers.filter((c) => {
        const d = parseISO(c.created_at);
        return d >= monthStart && d <= monthEnd;
      }).length,
      birthdays: customers.filter((c) => c.birthday && getMonth(parseISO(c.birthday)) === m).length,
      anniversaries: customers.filter(
        (c) => c.anniversary && getMonth(parseISO(c.anniversary)) === m
      ).length,
    };
  }, [customers]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const updateMut = useMutation({
    mutationFn: async (c: Customer) => {
      const { error } = await supabase
        .from("cotton_plus_customers")
        .update({
          name: c.name,
          mobile: c.mobile,
          birthday: c.birthday || null,
          anniversary: c.anniversary || null,
        })
        .eq("id", c.id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cotton-plus-customers"] });
      toast.success("Customer updated");
      setEditing(null);
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const deleteMut = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("cotton_plus_customers").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cotton-plus-customers"] });
      toast.success("Customer deleted");
      setDeleting(null);
    },
  });

  function exportExcel() {
    const rows = filtered.map((c, i) => ({
      "Sr No": i + 1,
      Name: c.name,
      Mobile: c.mobile,
      Birthday: c.birthday ? format(parseISO(c.birthday), "dd-MMM-yyyy") : "",
      Anniversary: c.anniversary ? format(parseISO(c.anniversary), "dd-MMM-yyyy") : "",
      "Registered On": format(parseISO(c.created_at), "dd-MMM-yyyy"),
    }));
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Customers");
    XLSX.writeFile(wb, `cotton-plus-customers-${format(new Date(), "yyyy-MM-dd")}.xlsx`);
  }

  function copyMobiles() {
    const txt = filtered.map((c) => c.mobile).join(", ");
    navigator.clipboard.writeText(txt);
    toast.success(`Copied ${filtered.length} mobile numbers`);
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard label="Total" value={stats.total} />
        <StatCard label="This Month" value={stats.thisMonth} />
        <StatCard label="Birthdays" value={stats.birthdays} />
        <StatCard label="Anniversaries" value={stats.anniversaries} />
      </div>

      <Card className="rounded-2xl">
        <CardContent className="p-4 space-y-4">
          <div className="flex flex-col md:flex-row gap-3 md:items-end">
            <div className="flex-1">
              <Label>Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  className="pl-9 h-11 rounded-xl"
                  placeholder="Name or mobile"
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                />
              </div>
            </div>
            <div>
              <Label>Birthday Month</Label>
              <Select value={bMonth} onValueChange={(v) => { setBMonth(v); setPage(1); }}>
                <SelectTrigger className="w-40 h-11 rounded-xl"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {MONTHS.map((m, i) => (
                    <SelectItem key={i} value={String(i)}>{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Anniversary Month</Label>
              <Select value={aMonth} onValueChange={(v) => { setAMonth(v); setPage(1); }}>
                <SelectTrigger className="w-40 h-11 rounded-xl"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {MONTHS.map((m, i) => (
                    <SelectItem key={i} value={String(i)}>{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={copyMobiles} className="rounded-xl h-11">
                <Copy className="h-4 w-4 mr-2" /> Copy Mobiles
              </Button>
              <Button onClick={exportExcel} className="rounded-xl h-11">
                <Download className="h-4 w-4 mr-2" /> Excel
              </Button>
            </div>
          </div>

          <div className="rounded-xl border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">#</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Mobile</TableHead>
                  <TableHead>Birthday</TableHead>
                  <TableHead>Anniversary</TableHead>
                  <TableHead>Registered</TableHead>
                  <TableHead className="w-24">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow><TableCell colSpan={7} className="text-center py-8">Loading...</TableCell></TableRow>
                ) : paged.length === 0 ? (
                  <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No customers found</TableCell></TableRow>
                ) : (
                  paged.map((c, i) => (
                    <TableRow key={c.id}>
                      <TableCell>{(page - 1) * PAGE_SIZE + i + 1}</TableCell>
                      <TableCell className="font-medium">{c.name}</TableCell>
                      <TableCell className="font-mono text-sm">{c.mobile}</TableCell>
                      <TableCell>{c.birthday ? format(parseISO(c.birthday), "dd MMM") : "—"}</TableCell>
                      <TableCell>{c.anniversary ? format(parseISO(c.anniversary), "dd MMM") : "—"}</TableCell>
                      <TableCell>{format(parseISO(c.created_at), "dd MMM yyyy")}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="icon" variant="ghost" onClick={() => setEditing(c)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" onClick={() => setDeleting(c)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {filtered.length} customer{filtered.length === 1 ? "" : "s"} • Page {page} of {totalPages}
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>Prev</Button>
              <Button size="sm" variant="outline" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {editing && (
        <EditDialog
          customer={editing}
          onClose={() => setEditing(null)}
          onSave={(c) => updateMut.mutate(c)}
          saving={updateMut.isPending}
        />
      )}

      <AlertDialog open={!!deleting} onOpenChange={(o) => !o && setDeleting(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this customer?</AlertDialogTitle>
            <AlertDialogDescription>
              {deleting?.name} ({deleting?.mobile}) will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleting && deleteMut.mutate(deleting.id)}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <Card className="rounded-2xl">
      <CardContent className="p-4">
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="text-2xl font-bold mt-1">{value}</div>
      </CardContent>
    </Card>
  );
}

function EditDialog({
  customer, onClose, onSave, saving,
}: {
  customer: Customer;
  onClose: () => void;
  onSave: (c: Customer) => void;
  saving: boolean;
}) {
  const [c, setC] = useState(customer);
  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent>
        <DialogHeader><DialogTitle>Edit Customer</DialogTitle></DialogHeader>
        <div className="space-y-3">
          <div>
            <Label>Name</Label>
            <Input value={c.name} onChange={(e) => setC({ ...c, name: e.target.value })} />
          </div>
          <div>
            <Label>Mobile</Label>
            <Input
              value={c.mobile}
              onChange={(e) => setC({ ...c, mobile: e.target.value.replace(/\D/g, "").slice(0, 10) })}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Birthday</Label>
              <Input type="date" value={c.birthday || ""} onChange={(e) => setC({ ...c, birthday: e.target.value })} />
            </div>
            <div>
              <Label>Anniversary</Label>
              <Input type="date" value={c.anniversary || ""} onChange={(e) => setC({ ...c, anniversary: e.target.value })} />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button disabled={saving} onClick={() => onSave(c)}>
            {saving ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
