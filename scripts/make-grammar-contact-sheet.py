"""Assemble verification stills without altering their artwork. Requires Pillow."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

root = Path(__file__).resolve().parents[1]
output = root / "out" / "grammar"
font_path = root / "public/brands/dr-health/fonts/Manrope-Variable.ttf"
font = ImageFont.truetype(str(font_path), 18)
small = ImageFont.truetype(str(font_path), 13)
title = ImageFont.truetype(str(font_path), 30)
families = ["editorial-health", "minimal-clinical", "technology-health"]
canvas = Image.new("RGB", (1260, 1010), "white")
draw = ImageDraw.Draw(canvas)
draw.text((30, 22), "DrHealth / Composition families", font=title, fill="#003F4B")
draw.text((30, 66), "Same content and original logos. White canvas. Premium motion at frame 90.", font=font, fill="#47666B")
for row, layout in enumerate(["split", "portrait-first"]):
    for col, family in enumerate(families):
        source = output / f"Grammar-{family}-{layout}-premium-Square.png"
        image = Image.open(source).convert("RGB")
        assert image.getpixel((0, 0)) == (255, 255, 255), source
        image.thumbnail((390, 390), Image.Resampling.LANCZOS)
        x, y = 30 + col * 410, 125 + row * 440
        canvas.paste(image, (x, y))
        draw.rectangle((x, y, x + 390, y + 390), outline="#C2DDDE")
        draw.text((x, y + 400), family.replace("-", " ").title(), font=font, fill="#003F4B")
        draw.text((x, y + 426), layout, font=small, fill="#47666B")
canvas.save(output / "families-contact-sheet.png")

samples = [("Copy first", "Grammar-editorial-health-split-premium-Square"), ("Portrait first", "Grammar-editorial-health-portrait-first-premium-Square"), ("Centered stack", "stacked-Grammar-editorial-health-split-premium-Square"), ("More expressive", "axis-expressive-1"), ("Subtle entrance / frame 18", "motion-subtle-18"), ("Premium entrance / frame 18", "motion-premium-18")]
canvas = Image.new("RGB", (1260, 1010), "white")
draw = ImageDraw.Draw(canvas)
draw.text((30, 22), "One family / Controlled variations", font=title, fill="#003F4B")
draw.text((30, 66), "Editorial health: layout, design axes and motion remain independent.", font=font, fill="#47666B")
for index, (label, filename) in enumerate(samples):
    image = Image.open(output / (filename + ".png")).convert("RGB")
    image.thumbnail((390, 390), Image.Resampling.LANCZOS)
    x, y = 30 + index % 3 * 410, 125 + index // 3 * 440
    canvas.paste(image, (x, y))
    draw.rectangle((x, y, x + 390, y + 390), outline="#C2DDDE")
    draw.text((x, y + 404), label, font=font, fill="#003F4B")
canvas.save(output / "variations-contact-sheet.png")
print("Created families-contact-sheet.png and variations-contact-sheet.png")
