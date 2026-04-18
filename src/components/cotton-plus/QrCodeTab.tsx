import { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download } from "lucide-react";

export function QrCodeTab() {
  const ref = useRef<HTMLDivElement>(null);
  const url = "https://ezzyerp.in/cotton-plus";

  function download() {
    const canvas = ref.current?.querySelector("canvas") as HTMLCanvasElement | null;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "cotton-plus-qr.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  return (
    <Card className="rounded-2xl max-w-xl mx-auto">
      <CardContent className="p-8 text-center space-y-4">
        <h3 className="text-lg font-semibold">Customer Capture QR Code</h3>
        <div ref={ref} className="inline-block bg-white p-4 rounded-xl border">
          <QRCodeCanvas value={url} size={300} level="H" includeMargin />
        </div>
        <p className="text-sm text-muted-foreground break-all">{url}</p>
        <p className="text-sm text-muted-foreground">
          Print this QR code and display it at your billing counter. Customers scan → fill details → leave review.
        </p>
        <Button onClick={download} className="rounded-xl h-11">
          <Download className="h-4 w-4 mr-2" /> Download QR
        </Button>
      </CardContent>
    </Card>
  );
}
