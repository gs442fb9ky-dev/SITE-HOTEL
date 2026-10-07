"""Create an eight-page English design proposal with current website previews."""
from pathlib import Path
from xml.sax.saxutils import escape

from fontTools.ttLib import TTFont as FontToolsFont
from reportlab.lib.colors import HexColor
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.utils import ImageReader
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

W, H, TOTAL = 1080, 810, 8
CREAM, GREEN, MUTED, LINE = [HexColor(v) for v in ['#f3f0e7','#233e35','#667268','#cec8b9']]
c = canvas.Canvas(str(OUT / 'Surya-Shanti-summary-template.pdf'), pagesize=(W,H))
c.setTitle('Surya Shanti Villa — Website Redesign Proposal')
c.setAuthor('')
c.setSubject('Eight-page visual proposal for an unofficial website design concept')


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


def picture(name,x,y,width,height,fit='contain'):
    reader=ImageReader(str(ASSETS/(name+'.jpg')))
    iw,ih=reader.getSize()
    scale=max(width/iw,height/ih) if fit=='top' else min(width/iw,height/ih)
    dw,dh=iw*scale,ih*scale
    c.saveState()
    if fit=='top':
        clip=c.beginPath();clip.rect(x,y,width,height);c.clipPath(clip,stroke=0,fill=0)
    c.drawImage(reader,x+(width-dw)/2,y+height-dh if fit=='top' else y+(height-dh)/2,width=dw,height=dh,mask='auto')
    c.restoreState()


def page(number,kicker,title,subtitle):
    c.setFillColor(CREAM);c.rect(0,0,W,H,fill=1,stroke=0)
    text(48,768,kicker,size=9)
    text(48,716,title,font='Display',size=44)
    text(48,680,subtitle,size=12)
    c.setStrokeColor(LINE);c.line(48,42,W-48,42)
    text(48,22,'UNOFFICIAL WEBSITE CONCEPT · PHOTOGRAPHY: SURYA SHANTI’S OFFICIAL WEBSITE',size=8,color=MUTED)
    text(750,22,'CONCEPT & DESIGN BY',size=8,color=MUTED)
    field('credit-page-'+str(number),850,13,123,20,9)
    text(990,22,f'{number:02d}/{TOTAL:02d}',size=8,color=MUTED)


page(1,'A PERSONAL WEBSITE REDESIGN PROPOSAL · SURYA SHANTI VILLA','Your place. Your people. Your story.',
    'A new digital welcome, inspired by Sidemen and the character of your hotel.')
picture('home',48,130,984,533)
text(48,108,'WEBSITE CONCEPT AND DESIGN BY',size=8)
field('proposer-cover',48,65,465,34,23)
text(580,108,'LET’S DISCUSS YOUR WEBSITE',size=8)
field('phone-cover',580,65,420,34,19)
c.showPage()

def feature(number,kicker,title,subtitle,main,detail,heading,copy,takeaway,fit='contain'):
    page(number,kicker,title,subtitle)
    picture(main,48,158,676,476,fit)
    bottom=block(774,632,heading,258,size=32,leading=35,font='Display',color=GREEN)
    bottom=block(774,bottom-21,copy,258,size=12.5,leading=21)
    if bottom<319:raise ValueError('Sidebar overlaps its detail preview: '+title)
    text(774,300,'A CLOSER LOOK AT THE CONCEPT',size=8)
    picture(detail,774,91,258,187)
    text(48,138,'THE OPPORTUNITY FOR SURYA SHANTI',size=8)
    block(48,118,takeaway,676,size=12,leading=20)
    c.showPage()


feature(2,'01 / THE ROOMS & VILLAS','Your own corner of Sidemen.',
    'Let guests picture the room, the terrace and the view before they arrive.',
    'rooms-wide','rooms-details','From the room\nto the view.',
    'Canopy beds, open terraces and views towards the valley or Mount Agung give each accommodation its own character. Generous photography and carefully placed details help guests picture their stay. The redesign makes the differences between your rooms and villas easier to understand, supporting a more informed choice before visitors enquire or check availability.',
    'A room overview and five dedicated accommodation pages make it easier to explore what makes each category different.')

feature(3,'02 / THE SPA','Make room for stillness.',
    'Give your spa a calm presence that visitors can feel through the screen.',
    'spa-detail','spa-wide','Wellness with\na real presence.',
    'Large photographs, soft spacing and quiet typography give the spa a calm, distinctive presence. Aromatic-oil massage and the traditional Lulur scrub are introduced through your real imagery and descriptions. For Surya Shanti, this creates a clearer invitation to discover its treatments, understand the experience and contact the team about a moment of care.',
    'A dedicated page brings your treatment selection, real photographs and a clear enquiry into one unhurried experience.',fit='top')

feature(4,'03 / YOGA IN SIDEMEN','Find your rhythm in Sidemen.',
    'Make yoga a visible part of the stay, rooted in the valley and your own practice.',
    'yoga-wide','yoga-detail','Space to breathe.\nTime to pause.',
    'The valley’s greenery and your own yoga photography create an immersive setting for this experience. The page introduces sun salutations, asanas and pranayama — breathwork — with Wayan and his team. Giving yoga space to unfold helps guests understand its place within a stay at Surya Shanti and explore classes through the hotel.',
    'Real photographs and a clear introduction give this experience its own identity, with a direct way to enquire about a class.')

feature(5,'04 / DINING AT SURYA SHANTI','Stay for the view. Remember the table.',
    'Let the kitchen become part of the reason guests remember your hotel.',
    'dining-flavours','dining-wide','A Balinese heart.\nA French touch.',
    'The restaurant, its views and the dishes become a story of their own. Local ingredients meet French know-how; homemade bread, marmalades and garden-fruit ice cream express the kitchen’s personal touch. This visual journey helps guests discover the care behind your food and recognise dining as a distinctive part of the Surya Shanti experience.',
    'The restaurant, Balinese dishes, breakfast and personal touches are presented as a complete experience, with your own photography.')

page(6,'05 / OUR STORY','Three women. A place with a heart.',
    'A personal story deserves more than a short About paragraph.')
picture('story-wide',48,158,676,476)
bottom=block(774,632,'Ibu Ati.\nPauline.\nSylvie.',258,size=32,leading=35,font='Display',color=GREEN)
bottom=block(774,bottom-18,'Portraits and photographs follow the friendship of Ibu Ati from Bali, Pauline from the Philippines and Sylvie from France. Their shared dream, the 2010 inauguration and the connection to Sidemen unfold through a human narrative. This gives guests a meaningful introduction to the origins, values and people behind your welcome.',258,size=12.5,leading=21)
for y,year,label in [(252,'2000','From friendship'),(192,'2010','Hotel inauguration'),(132,'2012','Pasraman Vidya Giri')]:
    text(774,y,year,font='Display',size=26)
    text(841,y+4,label,size=9,color=MUTED)
text(48,138,'THE OPPORTUNITY FOR SURYA SHANTI',size=8)
block(48,118,'Human stories and real portraits express the character of Surya Shanti and help guests connect with the people behind the place.',676,size=12,leading=20)
c.showPage()

page(7,'06 / THE GUEST JOURNEY','An easy journey, wherever guests are.',
    'Fourteen dedicated pages, with a visual identity that stays coherent on desktop and mobile.')
picture('mobile',48,98,238,515.06)
picture('gallery-mobile',317,98,238,515.06)
text(48,78,'THE FIRST IMPRESSION',size=8,color=MUTED)
text(317,78,'EXPLORE THE PHOTOGRAPHS',size=8,color=MUTED)
bottom=block(607,632,'From discovery\nto planning a stay.',425,size=33,leading=37,font='Display',color=GREEN)
bottom=block(607,bottom-24,'Photography remains at the heart of the experience on a smaller screen, with readable text and clear navigation. The gallery invites visitors to look closer, while visible contact options and links to your existing reservation service keep the next step within reach.',425,size=14,leading=25)
text(607,346,'A CLEAR NEXT STEP',size=9)
block(607,323,'Explore the rooms. Discover the experiences. Contact the team or check availability with your existing reservation service.',425,size=21,leading=29,font='Display',color=GREEN)
text(607,210,'A WEBSITE BUILT AROUND YOUR HOTEL',size=9)
block(607,186,'Home · Rooms and five room pages · Spa · Yoga · Dining · Our Story · Experiences · Gallery · Contact',425,size=12,leading=22)
c.showPage()

page(8,'LET’S SHAPE THE NEXT CHAPTER','Built around your priorities.',
    'A personal proposal for Surya Shanti’s next website.')
picture('pool-evening',48,91,410,541)
bottom=block(508,632,'I created this concept specifically for Surya Shanti.',524,size=28,leading=34,font='Display',color=GREEN)
bottom=block(508,bottom-20,'My aim is to give your website a visual identity that reflects the warmth of the hotel, while helping guests explore its rooms, experiences and people.',524,size=14,leading=24)
bottom=block(508,bottom-16,'We can refine the design, content and page structure around your priorities, then agree together on the scope of the project.',524,size=14,leading=24)
block(508,354,'I’d love to hear what matters most to you. Would you be open to a short call to explore the idea together?',524,size=25,leading=31,font='Display',color=GREEN)
text(508,241,'WEBSITE CONCEPT AND DESIGN BY',size=9)
field('proposer-end',508,193,524,35,25)
text(508,166,'CONTACT',size=9)
field('phone-end',508,123,524,33,20)
block(508,105,'Concept and design shared for evaluation only. No reuse without prior written permission. Hotel photographs remain credited to Surya Shanti.',524,size=9,leading=14)
c.showPage();c.save()
print('Eight-page visual proposal created without personal contact details.')
