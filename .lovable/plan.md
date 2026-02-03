
# Add Contact Number to Promotional Gallery

## Current State
The Promotional Gallery section currently only displays:
- A heading ("Promotional Gallery")
- A subtitle ("Check out our latest offers and features")
- 6 poster images in a grid with lightbox functionality

There is **no phone number** in this section currently.

## What I'll Add
Add a call-to-action with the phone number **91-7385432144** below the subtitle to encourage users to contact for inquiries about promotions.

## Changes

### File: `src/components/landing/Gallery.tsx`

**Add below the subtitle (line 43):**
- A clickable phone number link styled to match the brand
- Text: "Call: 91-7385432144" with a phone icon
- Styled as a subtle but visible CTA

**Updated subtitle section will include:**
```
Check out our latest offers and features
📞 Call: 91-7385432144 for inquiries
```

## Technical Details
- Import `Phone` icon from lucide-react
- Add an anchor tag with `href="tel:+917385432144"`
- Style with primary color and hover effect to match other CTAs
- Keep it mobile-friendly with appropriate text size
