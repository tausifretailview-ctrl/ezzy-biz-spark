import { useState } from "react";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useWRMasters, useAddMaster } from "@/hooks/useWRMasters";
import { toast } from "sonner";

interface Props {
  value: string;
  onChange: (v: string) => void;
  createdBy?: string;
}

const CustomerCombobox = ({ value, onChange, createdBy }: Props) => {
  const { data: customers = [], isLoading } = useWRMasters("customer");
  const add = useAddMaster();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const exists = customers.some((c) => c.label.toLowerCase() === search.trim().toLowerCase());

  const handleAddNew = async () => {
    const label = search.trim();
    if (!label) return;
    try {
      await add.mutateAsync({ master_type: "customer", label, created_by: createdBy });
      onChange(label);
      setSearch("");
      setOpen(false);
      toast.success(`Added "${label}" to customers`);
    } catch {
      toast.error("Failed to add customer");
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between border-[#1f2f47] text-white font-normal"
          style={{ background: "#1a2336" }}
        >
          <span className={cn("truncate", !value && "text-[#64748b]")}>
            {value || "Search or type customer name…"}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0 border-[#1f2f47]" style={{ background: "#111827" }}>
        <Command className="bg-transparent">
          <CommandInput
            placeholder="Search or type new..."
            value={search}
            onValueChange={setSearch}
            className="text-white"
          />
          <CommandList>
            {isLoading ? (
              <div className="py-3 text-xs text-center" style={{ color: "#64748b" }}>Loading...</div>
            ) : (
              <>
                <CommandEmpty className="py-2">
                  {search.trim() ? (
                    <button
                      onClick={handleAddNew}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-[#1a2336] text-left"
                      style={{ color: "#22d3ee" }}
                    >
                      <Plus className="w-4 h-4" />
                      Add "{search.trim()}" to customers
                    </button>
                  ) : (
                    <span className="text-xs" style={{ color: "#64748b" }}>No customers yet.</span>
                  )}
                </CommandEmpty>
                <CommandGroup>
                  {customers.map((c) => (
                    <CommandItem
                      key={c.id}
                      value={c.label}
                      onSelect={() => {
                        onChange(c.label);
                        setOpen(false);
                        setSearch("");
                      }}
                      className="text-white aria-selected:bg-[#1a2336]"
                    >
                      <Check className={cn("mr-2 h-4 w-4", value === c.label ? "opacity-100" : "opacity-0")} />
                      {c.label}
                    </CommandItem>
                  ))}
                  {search.trim() && !exists && (
                    <CommandItem onSelect={handleAddNew} className="aria-selected:bg-[#1a2336]" style={{ color: "#22d3ee" }}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add "{search.trim()}" to customers
                    </CommandItem>
                  )}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CustomerCombobox;
