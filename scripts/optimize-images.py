"""Writes the WebP copies of the landing images that the pages serve to browsers.

The original JPGs in public/landing stay as they are: the share image, schema and sitemap
point at them, and they are the fallback src. For each screenshot this writes NAME-800.webp
and NAME-1366.webp, for each phone screen NAME-280.webp and NAME-560.webp, and a WebP of the logo.
Run after replacing or adding an image:  pip install pillow && python3 scripts/optimize-images.py
"""
import pathlib

from PIL import Image

LANDING = pathlib.Path(__file__).resolve().parent.parent / "public" / "landing"
WIDTHS = {"shot-": (800, 1366), "pos-hero": (800, 1366), "app-": (280, 560)}


def save(im: Image.Image, width: int, out: pathlib.Path) -> None:
    if im.width > width:
        im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    im.save(out, "WEBP", quality=82, method=6)
    print(f"{out.name}: {out.stat().st_size // 1024} KB")


for jpg in sorted(LANDING.glob("*.jpg")):
    widths = next((w for prefix, w in WIDTHS.items() if jpg.name.startswith(prefix)), None)
    with Image.open(jpg) as im:
        im = im.convert("RGB")
        if jpg.name == "ezzy-logo-tight.jpg":
            save(im, im.width, jpg.with_suffix(".webp"))
        for width in widths or ():
            save(im, width, jpg.with_name(f"{jpg.stem}-{width}.webp"))
