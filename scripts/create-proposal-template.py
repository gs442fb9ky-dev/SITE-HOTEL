"""Build an unsigned, eight-page proposal for browser-side personalisation."""
from io import BytesIO
from pathlib import Path
from xml.sax.saxutils import escape

from PIL import Image, ImageOps
from reportlab.lib.colors import HexColor
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph

root = Path(__file__).resolve().parents[1]
out = root.parent / 'previsualisation'
assets = out / 'proposal-assets'
assets.mkdir(exist_ok=True)
for name, path in [
    ('Body', '/usr/share/fonts/truetype/open-sans/OpenSans-Regular.ttf'),
    ('Light', '/usr/share/fonts/truetype/open-sans/OpenSans-Light.ttf'),
    ('Display', '/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf'),
]:
    pdfmetrics.registerFont(TTFont(name, path))

W, H, TOTAL = 1080, 810, 8
cream = HexColor('#f6f2e9')
green = HexColor('#253e32')
muted = HexColor('#6b715f')
line = HexColor('#cfc7b7')
sand = HexColor('#e9e4d8')
c = canvas.Canvas(str(out / 'Bajalo-modele-proposition.pdf'), pagesize=(W, H))
c.setTitle('Bajalo Cottage Canggu — Website Redesign Proposal')
c.setAuthor('')
c.setSubject('Unofficial website concept and design proposal — for evaluation only')


def text(x, y, value, font='Body', size=12, color=green):
    c.setFillColor(color)
    c.setFont(font, size)
    c.drawString(x, y, value)


def block(x, top, value, width, size=13, leading=22, font='Body', color=green):
    style = ParagraphStyle('copy', fontName=font, fontSize=size, leading=leading,
                           textColor=color, spaceAfter=0)
    paragraph = Paragraph(escape(value).replace('\n', '<br/>'), style)
    _, height = paragraph.wrap(width, H)
    if top - height < 72:
        raise ValueError(f'Paragraph overlaps the footer: {value}')
    paragraph.drawOn(c, x, top - height)
    return top - height


def field(name, x, y, width, height, size):
    c.acroForm.textfield(name=name, x=x, y=y, width=width, height=height,
                        fontName='Helvetica', fontSize=size, textColor=green,
                        fillColor=cream, borderWidth=0, value='')


def page(number, kicker, title, subtitle):
    c.setFillColor(cream)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    text(48, H - 42, kicker, size=9)
    if pdfmetrics.stringWidth(title, 'Display', 34) > W - 96:
        raise ValueError(f'Title exceeds page width: {title}')
    text(48, H - 101, title, 'Display', 34)
    text(48, H - 133, subtitle, 'Light', 12)
    c.setStrokeColor(line)
    c.line(48, 38, W - 48, 38)
    text(48, 53, 'Website concept and design by', size=8)
    field(f'credit-page-{number}', 173, 47, 180, 18, 9)
    text(400, 53, 'Shared for evaluation only. No reuse without prior written permission.', size=8)
    text(48, 22, 'BAJALO COTTAGE CANGGU · UNOFFICIAL REDESIGN PROPOSAL', size=8, color=muted)
    text(626, 22, 'Photography: Bajalo’s existing website', size=8, color=muted)
    text(W - 100, 22, f'{number:02d} / {TOTAL:02d}', size=8, color=muted)


def picture(file, x, y, width, height, fit='contain', position=(.5, .5)):
    image = Image.open(file).convert('RGB')
    if fit == 'cover':
        image = ImageOps.fit(image, (int(width * 1.5), int(height * 1.5)), centering=position)
        draw_width, draw_height = width, height
    else:
        image.thumbnail((int(width * 1.5), int(height * 1.5)))
        scale = min(width / image.width, height / image.height)
        draw_width, draw_height = image.width * scale, image.height * scale
    buffer = BytesIO()
    image.save(buffer, 'JPEG', quality=85)
    buffer.seek(0)
    c.drawImage(ImageReader(buffer), x + (width - draw_width) / 2,
                y + (height - draw_height) / 2, width=draw_width,
                height=draw_height, mask='auto')


page(1, 'A WEBSITE CONCEPT FOR BAJALO', 'A new digital welcome.',
     'A personalised redesign proposal for Bajalo Cottage Canggu.')
picture(root / 'public/images/pool-aerial-1920.webp', 48, 170, 984, 450, 'cover')
text(48, 133, 'WEBSITE CONCEPT AND DESIGN BY', size=9)
text(580, 133, 'CONTACT', size=9)
field('proposer-cover', 48, 86, 460, 35, 24)
field('phone-cover', 580, 86, 390, 35, 20)
c.showPage()

page(2, '01 / THE FIRST IMPRESSION', 'Let guests discover Bajalo.',
     'Your pool, cottages and tropical setting take centre stage, with clear navigation from the first screen.')
picture(assets / 'home-wide.png', 48, 93, 984, 561)
text(48, 77, 'THE HOME PAGE · REAL BAJALO PHOTOGRAPHY · A VISIBLE DIRECT BOOKING LINK', size=8, color=muted)
c.showPage()

page(3, '02 / DESIGNED AROUND YOUR GUESTS', 'A clearer path to your hotel.',
     'Three practical ways this concept can support the experience of guests exploring Bajalo online.')
benefits = [
    ('bedroom', 'Help guests picture their stay.',
     'Show the cottages, pool and tropical setting through your own photography and clear descriptions.'),
    ('garden-path', 'Make information easier to find.',
     'Give accommodation, photographs and contact details their own pages, with consistent navigation.'),
    ('pool-evening', 'Keep direct booking within reach.',
     'Use visible booking links to guide visitors to your existing reservation service.'),
]
for index, (photo, title, copy) in enumerate(benefits):
    x = 48 + index * 334
    picture(root / f'public/images/{photo}-1280.webp', x, 405, 315, 215, 'cover')
    text(x, 376, f'0{index + 1} / THE OPPORTUNITY', size=9, color=muted)
    bottom = block(x, 351, title, 315, size=21, leading=29, font='Display')
    block(x, bottom - 22, copy, 305, size=13, leading=22, color=muted)
text(48, 121, 'SIX DEDICATED PAGES', size=9)
text(48, 94, 'HOME  ·  COTTAGES  ·  GALLERY  ·  ABOUT  ·  EXPERIENCE  ·  CONTACT', size=12, color=muted)
c.showPage()

page(4, '03 / THE COTTAGES PAGE', 'Help guests imagine their stay.',
     'A dedicated accommodation page brings the cottage photographs and confirmed room details together.')
picture(assets / 'cottages-focus.png', 48, 100, 686, 540)
block(778, 610, 'Room to explore the details.', 250, size=24, leading=32, font='Display')
block(778, 507, 'The bedroom, terrace and open-air bathroom have a clear place in the guest’s journey.',
      246, size=13, leading=23, color=muted)
text(778, 375, 'CLEAR ROOM INFORMATION', size=9)
block(778, 347, 'Features and descriptions are based on information from Bajalo’s existing website.',
      246, size=13, leading=23, color=muted)
picture(root / 'public/images/outdoor-bath-1280.webp', 778, 111, 250, 137, 'cover')
text(48, 80, 'DESKTOP PREVIEW · THE COTTAGES', size=8, color=muted)
c.showPage()

page(5, '04 / THE GALLERY PAGE', 'Let the property tell its story.',
     'A dedicated gallery gives visitors space to explore Bajalo’s setting and atmosphere.')
picture(assets / 'gallery-focus.png', 48, 107, 704, 531)
block(791, 612, 'More than a first glance.', 240, size=24, leading=32, font='Display')
block(791, 515, 'Guests can browse photo categories and open individual images in a larger view.',
      237, size=13, leading=23, color=muted)
text(791, 381, 'PHOTO CATEGORIES', size=9)
for index, label in enumerate(['All photographs', 'The cottages', 'Pool & gardens', 'The details']):
    text(791, 349 - index * 34, label, size=13)
block(791, 171, 'Photographs sourced from Bajalo’s existing website.', 237,
      size=10, leading=18, color=muted)
text(48, 80, 'DESKTOP PREVIEW · THE GALLERY', size=8, color=muted)
c.showPage()

page(6, '05 / THE MOBILE EXPERIENCE', 'Designed for guests on the go.',
     'Readable text, easy navigation and photography adapted to smaller screens.')
for index, name in enumerate(['home', 'gallery']):
    image = Image.open(out / f'Bajalo-{name}-telephone.png').convert('RGB')
    image.crop((0, 0, 390, 844)).save(assets / f'mobile-{name}.jpg', quality=90)
    picture(assets / f'mobile-{name}.jpg', 48 + index * 300, 91, 255, 552)
block(667, 606, 'Easy to explore, wherever guests are.', 345,
      size=25, leading=34, font='Display')
mobile_copy = [
    ('EXPLORE', 'A clear mobile menu and distinct pages make it easier to find information.'),
    ('CONTACT', 'Contact details have their own page, with a clear way to reach the property.'),
    ('BOOK DIRECT', 'Booking links guide visitors to Bajalo’s existing reservation service.'),
]
for index, (label, copy) in enumerate(mobile_copy):
    top = 452 - index * 116
    text(667, top, label, size=9)
    block(667, top - 23, copy, 339, size=13, leading=22, color=muted)
c.showPage()

page(7, '06 / A PROPOSAL FOR YOUR HOTEL', 'Shaped around your priorities.',
     'A starting point for a conversation about Bajalo’s next website.')
picture(out / 'Apercu-about.png', 48, 232, 493, 370)
block(48, 190, 'A visual identity inspired by the character of Bajalo.',
      493, size=21, leading=29, font='Display')
block(595, 608, 'I created this concept to show how Bajalo’s website could better reflect the character of your hotel.',
      431, size=16, leading=27)
block(595, 467, 'I would be pleased to discuss a redesign shaped around your priorities, visual identity and booking process.',
      431, size=14, leading=25, color=muted)
block(595, 336, 'The content, page structure and design can be refined together before agreeing on the scope of the project.',
      431, size=14, leading=25, color=muted)
text(595, 185, '01 / UNDERSTAND YOUR PRIORITIES', size=10)
text(595, 152, '02 / REFINE THE DESIGN AND CONTENT', size=10)
text(595, 119, '03 / AGREE ON THE SCOPE TOGETHER', size=10)
c.showPage()

page(8, '07 / LET’S TALK', 'Let’s discuss your website.',
     'A website concept and design proposal, ready to be shaped around Bajalo’s needs.')
picture(root / 'public/images/garden-path-1280.webp', 48, 132, 420, 505, 'cover')
block(515, 616, 'Would you be open to a short call to discuss this concept and your priorities?',
      510, size=25, leading=35, font='Display')
text(515, 462, 'WEBSITE CONCEPT AND DESIGN BY', size=9)
field('proposer-end', 515, 409, 510, 40, 28)
text(515, 380, 'CONTACT', size=9)
field('phone-end', 515, 335, 410, 32, 21)
c.setFillColor(sand)
c.rect(515, 140, 510, 135, fill=1, stroke=0)
block(537, 254, 'Shared for evaluation only.', 466, size=15, leading=24)
block(537, 216, 'No reuse without prior written permission.', 466, size=13, leading=22)
block(537, 182, 'Photographs sourced from Bajalo’s existing website.', 466,
      size=10, leading=18, color=muted)
c.showPage()
c.save()
print('Unsigned proposal template created: eight pages, with attribution and evaluation-only notice.')
