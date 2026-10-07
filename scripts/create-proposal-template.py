from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from PIL import Image,ImageOps
from io import BytesIO
root=Path('/workspace/SITE-HOTEL');out=Path('/workspace/previsualisation');assets=out/'proposal-assets';assets.mkdir(exist_ok=True)
pdfmetrics.registerFont(TTFont('Body','/usr/share/fonts/truetype/open-sans/OpenSans-Regular.ttf'))
pdfmetrics.registerFont(TTFont('Light','/usr/share/fonts/truetype/open-sans/OpenSans-Light.ttf'))
pdfmetrics.registerFont(TTFont('Display','/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf'))
W,H=1080,810;cream=HexColor('#f6f2e9');green=HexColor('#253e32');muted=HexColor('#6b715f');line=HexColor('#cfc7b7')
c=canvas.Canvas(str(out/'Bajalo-modele-proposition.pdf'),pagesize=(W,H));c.setTitle('Bajalo Cottage Canggu — Website Redesign Proposal');c.setAuthor('');c.setSubject('Unofficial concept — hotel website proposal')
def text(x,y,s,font='Body',size=12,color=green):c.setFillColor(color);c.setFont(font,size);c.drawString(x,y,s)
def page(n,kicker,title,subtitle=None):
 c.setFillColor(cream);c.rect(0,0,W,H,fill=1,stroke=0);text(48,H-42,kicker,size=9);text(48,H-101,title,'Display',34)
 if subtitle:text(48,H-133,subtitle,'Light',12)
 c.setStrokeColor(line);c.line(48,37,W-48,37);text(48,22,'BAJALO COTTAGE CANGGU · UNOFFICIAL REDESIGN PROPOSAL',size=8,color=muted);text(W-100,22,f'{n:02d} / 06',size=8,color=muted)
def picture(file,x,y,w,h,fit='contain',position=(.5,.5)):
 im=Image.open(file).convert('RGB')
 if fit=='cover':im=ImageOps.fit(im,(int(w*1.8),int(h*1.8)),centering=position)
 else:im.thumbnail((int(w*1.8),int(h*1.8)))
 b=BytesIO();im.save(b,'JPEG',quality=88);b.seek(0);c.drawImage(ImageReader(b),x,y,width=w,height=h,preserveAspectRatio=fit!='cover',anchor='c',mask='auto')
def lines(x,y,items,size=13,leading=25):
 for t in items:text(x,y,t,size=size);y-=leading
page(1,'A NEW ONLINE PRESENCE FOR BAJALO','A vision for your next website.','A redesign concept that puts your hotel’s real photography at the heart of the experience.')
picture(root/'public/images/pool-aerial-1280.webp',48,160,984,450,'cover')
text(48,123,'PRESENTED BY',size=8,color=muted);text(580,123,'CONTACT',size=8,color=muted)
for name,x,width in [('proposer-cover',48,420),('phone-cover',580,280)]:c.acroForm.textfield(name=name,x=x,y=78,width=width,height=30,fontName='Helvetica',fontSize=18,textColor=green,fillColor=cream,borderWidth=0,value='')
c.showPage()
page(2,'01 / THE HOME PAGE','An immersive first impression.','A pool photograph, a distinctive identity and clear paths to explore the rest of the website.')
picture(out/'Apercu-home.png',48,84,984,570)
text(48,60,'REAL BAJALO PHOTOGRAPHY · SIX DEDICATED PAGES · DIRECT BOOKING',size=8,color=muted);c.showPage()
page(3,'02 / THE WEBSITE STRUCTURE','Six pages. One seamless journey.','Each section has its own page. The home page offers a glimpse and invites guests to discover more.')
files=['home','cottages','gallery','about','experience','contact'];labels=['HOME','COTTAGES','GALLERY','ABOUT','EXPERIENCE','CONTACT']
for i,(name,label) in enumerate(zip(files,labels)):
 x=48+(i%3)*334;y=350 if i<3 else 90;picture(out/f'Apercu-{name}.png',x,y,315,218);text(x,y+228,label,size=9)
c.showPage()
page(4,'03 / THE PHOTOGRAPHY','Let the property tell its story.','A dedicated gallery, thoughtful categories and photographs that open in a larger view.')
for i,name in enumerate(['cottage','bedroom','outdoor-bath','pool-evening','garden-path','bathroom']):
 x=48+(i%3)*334;y=350 if i<3 else 85;picture(root/f'public/images/{name}-1280.webp',x,y,315,240,'cover')
c.showPage()
page(5,'04 / THE MOBILE EXPERIENCE','Designed for guests on the go.','Easy navigation, readable text and photography that feels at home on a smaller screen.')
for i,name in enumerate(['home','gallery','contact']):
 im=Image.open(out/f'Bajalo-{name}-telephone.png').convert('RGB');im.crop((0,0,390,min(im.height,844))).save(assets/f'mobile-{name}.jpg',quality=90)
 picture(assets/f'mobile-{name}.jpg',48+i*240,90,218,472)
lines(790,495,['Clear navigation.','Dedicated pages.','An interactive gallery.','Easy contact.'],12,45)
text(790,255,'This document presents',size=11,color=muted);text(790,233,'a website redesign concept.',size=11,color=muted);c.showPage()
page(6,'05 / LET’S TALK ABOUT YOUR WEBSITE','Let’s shape your next website.','This proposal is a starting point for shaping the next chapter of Bajalo’s online presence.')
picture(root/'public/images/garden-path-1280.webp',48,167,480,431,'cover')
lines(580,555,['A warm, editorial design.','Bajalo’s own photography.','Dedicated, consistent pages.','Navigation designed for mobile.','A clear path to direct booking.'],15,44)
text(580,286,'We can refine this concept together,',size=12,color=muted);text(580,263,'around your priorities and needs.',size=12,color=muted)
text(580,201,'PROPOSAL BY',size=8,color=muted)
c.acroForm.textfield(name='proposer-end',x=580,y=157,width=410,height=30,fontName='Helvetica',fontSize=22,textColor=green,fillColor=cream,borderWidth=0,value='')
c.acroForm.textfield(name='phone-end',x=580,y=113,width=300,height=26,fontName='Helvetica',fontSize=16,textColor=green,fillColor=cream,borderWidth=0,value='')
text(48,82,'Hotel information comes from its existing website. Unverified services are not included.',size=9,color=muted)
c.showPage();c.save();print('Modèle de présentation créé : six pages.')
