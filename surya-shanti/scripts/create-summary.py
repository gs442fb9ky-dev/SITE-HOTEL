"""Create a three-page English proposal, personalised in the reader's browser."""
from pathlib import Path
from xml.sax.saxutils import escape

from fontTools.ttLib import TTFont as FontToolsFont
from reportlab.lib.colors import HexColor
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT.parent / 'previsualisation'
ASSETS = OUT / 'surya-summary-assets'
OUT.mkdir(exist_ok=True)
for name, package, filename in [
    ('Display', 'cormorant-garamond', 'cormorant-garamond-latin-400-normal'),
    ('Italic', 'cormorant-garamond', 'cormorant-garamond-latin-400-italic'),
    ('Body', 'dm-sans', 'dm-sans-latin-400-normal'),
]:
    source = ROOT / 'node_modules/@fontsource' / package / 'files' / (filename + '.woff')
    font = FontToolsFont(source)
    font.flavor = None
    target = ASSETS / (filename + '.ttf')
    font.save(target)
    pdfmetrics.registerFont(TTFont(name, str(target)))

W, H = 1080, 810
CREAM, GREEN, MUTED, LINE = [HexColor(v) for v in ['#f3f0e7','#233e35','#667268','#cec8b9']]
c = canvas.Canvas(str(OUT / 'Surya-Shanti-summary-template.pdf'), pagesize=(W,H))
c.setTitle('Surya Shanti Villa — Website Redesign Proposal')
c.setAuthor('')
c.setSubject('Three-page summary of an unofficial website design concept')


def text(x,y,value,font='Body',size=12,color=GREEN):
    if pdfmetrics.stringWidth(value,font,size)>W-x-42:
        raise ValueError('Text exceeds page width: '+value)
    c.setFillColor(color)
    c.setFont(font,size)
    c.drawString(x,y,value)


def block(x,top,value,width,size=13,leading=22,font='Body',color=MUTED):
    style=ParagraphStyle('copy',fontName=font,fontSize=size,leading=leading,textColor=color)
    p=Paragraph(escape(value).replace('\n','<br/>'),style)
    _,height=p.wrap(width,H)
    if top-height<75:
        raise ValueError('Copy overlaps footer: '+value)
    p.drawOn(c,x,top-height)
    return top-height


def field(name,x,y,width,height,size):
    c.acroForm.textfield(name=name,x=x,y=y,width=width,height=height,
        fontName='Helvetica',fontSize=size,textColor=GREEN,fillColor=CREAM,borderWidth=0,value='')


def picture(name,x,y,width,height):
    c.drawImage(str(ASSETS/(name+'.jpg')),x,y,width=width,height=height,mask='auto')


def page(number,kicker,title,subtitle):
    c.setFillColor(CREAM);c.rect(0,0,W,H,fill=1,stroke=0)
    text(48,768,kicker,size=9)
    text(48,716,title,font='Display',size=44)
    text(48,680,subtitle,size=12)
    c.setStrokeColor(LINE);c.line(48,42,W-48,42)
    text(48,22,'UNOFFICIAL WEBSITE CONCEPT · PHOTOGRAPHY: SURYA SHANTI’S OFFICIAL WEBSITE',size=8,color=MUTED)
    text(750,22,'CONCEPT & DESIGN BY',size=8,color=MUTED)
    field('credit-page-'+str(number),850,13,123,20,9)
    text(990,22,f'{number:02d}/03',size=8,color=MUTED)


page(1,'SURYA SHANTI VILLA · SIDEMEN, BALI','Your place. Your people. Your story.',
    'A website redesign concept that reflects the beauty of Sidemen and the character of your hotel.')
picture('home',48,130,984,533)
text(48,108,'WEBSITE CONCEPT AND DESIGN BY',size=8)
field('proposer-cover',48,65,465,34,23)
text(580,108,'LET’S DISCUSS YOUR WEBSITE',size=8)
field('phone-cover',580,65,420,34,19)
c.showPage()

page(2,'A CLEARER JOURNEY THROUGH SURYA SHANTI','Fourteen pages. One coherent experience.',
    'Give the rooms, experiences and human story of Surya Shanti the space they deserve.')
cards=[
    ('room','Find your place to stay.','A room overview and five dedicated accommodation pages, with real photographs and clear descriptions.'),
    ('spa','Discover the experience.','Distinct Spa, Yoga, Dining, Experiences and Gallery pages bring the different parts of a stay together.'),
    ('story','Meet the people.','Our Story follows Ibu Ati, Pauline and Sylvie, the birth of Surya Shanti and its connection to Sidemen.'),
]
for i,(photo,title,copy) in enumerate(cards):
    x=48+i*334
    picture(photo,x,455,315,177.1875)
    text(x,427,f'0{i+1} / THE GUEST JOURNEY',size=8,color=MUTED)
    bottom=block(x,406,title,315,size=29,leading=32,font='Display',color=GREEN)
    block(x,bottom-15,copy,307,size=13,leading=23)
c.setStrokeColor(LINE);c.line(48,239,1032,239)
text(48,209,'YOUR CONTENT. A MORE PERSONAL PRESENTATION.',size=9)
block(48,189,'The concept uses your existing photography and verified hotel information. A warm visual identity, generous images and clear navigation keep Surya Shanti at the centre of the experience.',970,size=13,leading=22)
text(48,115,'DESKTOP & MOBILE',size=9)
text(48,90,'Clear contact options and visible links to your existing reservation service.',size=13,color=MUTED)
c.showPage()

page(3,'LET’S SHAPE THE NEXT CHAPTER','Built around your priorities.',
    'A starting point for a conversation about Surya Shanti’s next website.')
picture('mobile',48,92,249,538.77)
block(352,630,'I created this concept specifically for Surya Shanti.',670,size=29,leading=34,font='Display',color=GREEN)
block(352,574,'It shows how your website could reflect your identity and make your hotel easier to explore — from the first impression to the rooms, wellness, cuisine and people behind the welcome.',658,size=14,leading=24)
block(352,472,'We can refine the design, content and page structure together, then agree on the scope of the project.',658,size=14,leading=24)
block(352,387,'Would you be open to a short conversation about your website?',658,size=29,leading=34,font='Display',color=GREEN)
text(352,283,'WEBSITE CONCEPT AND DESIGN BY',size=9)
field('proposer-end',352,235,670,35,25)
text(352,207,'CONTACT',size=9)
field('phone-end',352,161,670,33,20)
block(352,133,'Concept and design shared for evaluation only. No reuse without prior written permission. Hotel photographs remain credited to Surya Shanti.',658,size=9,leading=15)
c.showPage();c.save()
print('Three-page summary template created without personal contact details.')
