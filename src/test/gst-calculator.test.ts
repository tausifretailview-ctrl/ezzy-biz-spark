import { describe, it, expect } from "vitest";
import { gstOnPiece } from "@/pages/blog/GstCalculator";

describe("gstOnPiece", () => {
  it("charges 5% up to ₹2,500 and 18% above, on the price before GST", () => {
    expect(gstOnPiece(1200, 0, false)).toMatchObject({ rate: 5, gst: 60, total: 1260 });
    expect(gstOnPiece(2500, 0, false)).toMatchObject({ rate: 5, gst: 125 });
    expect(gstOnPiece(3200, 0, false)).toMatchObject({ rate: 18, gst: 576 });
  });

  it("checks the slab after the discount", () => {
    // The article's example: a ₹2,800 kurta at 20% off sells for ₹2,240 and stays at 5%.
    expect(gstOnPiece(2800, 20, false)).toMatchObject({ rate: 5, value: 2240, gst: 112 });
  });

  it("takes GST out of an MRP that includes it", () => {
    const shirt = gstOnPiece(1999, 0, true)!;
    expect(shirt.rate).toBe(5);
    expect(shirt.value).toBeCloseTo(1903.81, 2);
    expect(shirt.gst).toBeCloseTo(95.19, 2);
    expect(shirt.total).toBe(1999);
    expect(gstOnPiece(2625, 0, true)).toMatchObject({ rate: 5, oddZone: false });
  });

  it("flags MRPs just above ₹2,625, where the value at 18% is under ₹2,500", () => {
    expect(gstOnPiece(2700, 0, true)).toMatchObject({ rate: 18, oddZone: true });
    expect(gstOnPiece(3540, 0, true)).toMatchObject({ rate: 18, oddZone: false });
  });

  it("returns nothing for an empty or zero price", () => {
    expect(gstOnPiece(NaN, 0, true)).toBeNull();
    expect(gstOnPiece(0, 0, true)).toBeNull();
    expect(gstOnPiece(500, 100, true)).toBeNull();
  });
});
