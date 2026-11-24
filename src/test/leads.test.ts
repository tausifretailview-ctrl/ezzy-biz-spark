import { describe, it, expect, vi, afterEach } from "vitest";
import { clipLead, settleWithin, whatsAppChatUrl, whatsAppPlatform } from "@/pages/leads";

const ANDROID = "Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Mobile Safari/537.36";
const IPHONE = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1";
const IPAD = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15";
const WINDOWS = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";

describe("whatsAppPlatform", () => {
  it("tells Android, other phones and tablets, and computers apart", () => {
    expect(whatsAppPlatform(ANDROID)).toBe("android");
    expect(whatsAppPlatform(IPHONE)).toBe("mobile");
    expect(whatsAppPlatform(IPAD, 5)).toBe("mobile"); // iPadOS reports itself as a Mac
    expect(whatsAppPlatform(IPAD, 0)).toBe("desktop"); // a real Mac
    expect(whatsAppPlatform(WINDOWS)).toBe("desktop");
  });
});

describe("whatsAppChatUrl", () => {
  const text = "Hi Ezzy ERP\nName: Asha & Co";

  it("opens the WhatsApp app on Android, with wa.me as the fallback", () => {
    const url = whatsAppChatUrl("android", text);
    expect(url.startsWith("intent://send?phone=918424034844&text=Hi%20Ezzy%20ERP%0AName%3A%20Asha%20%26%20Co#Intent;scheme=whatsapp;")).toBe(true);
    expect(url).toContain(`S.browser_fallback_url=${encodeURIComponent("https://wa.me/918424034844?text=")}`);
    expect(url.endsWith(";end")).toBe(true);
  });

  it("uses wa.me on iPhone and WhatsApp Web's chat on computers", () => {
    expect(whatsAppChatUrl("mobile", text)).toBe(`https://wa.me/918424034844?text=${encodeURIComponent(text)}`);
    expect(whatsAppChatUrl("desktop", text)).toBe(`https://web.whatsapp.com/send?phone=918424034844&text=${encodeURIComponent(text)}`);
  });
});

describe("settleWithin", () => {
  afterEach(() => vi.useRealTimers());

  it("returns the result when it comes in time, and null when it does not", async () => {
    await expect(settleWithin(Promise.resolve(true), 50)).resolves.toBe(true);
    vi.useFakeTimers();
    const slow = settleWithin(new Promise<boolean>(() => {}), 2500);
    vi.advanceTimersByTime(2500);
    await expect(slow).resolves.toBeNull();
  });
});

describe("clipLead", () => {
  it("cuts each field to the length the database accepts, and leaves short ones alone", () => {
    const lead = { name: "A".repeat(300), phone: "9000000000", shop: null, city: "Pune", trade: "Mobile app", note: "x".repeat(5000) };
    const clipped = clipLead(lead);
    expect(clipped.name).toHaveLength(120);
    expect(clipped.note).toHaveLength(1500);
    expect(clipped).toMatchObject({ phone: "9000000000", shop: null, city: "Pune", trade: "Mobile app" });
  });
});
