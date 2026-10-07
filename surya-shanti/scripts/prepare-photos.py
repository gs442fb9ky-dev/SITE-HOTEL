"""Prepare only visually reviewed official photographs as local WebP assets."""
import json
from pathlib import Path
from PIL import Image, ImageOps

project = Path(__file__).resolve().parents[1]
research = project.parent.parent / 'research/surya-shanti'
records = json.loads((research / 'downloaded-photographs.json').read_text())
excluded = {14, 15, 16, 23, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46,
            48, 49, 50, 52, 62, 77, 78, 79, 89, 93, 94}
descriptions = {
    0: 'Surya Shanti’s pools and thatched roofs, with Mount Agung beyond',
    1: 'A canopy bed and sitting area in Suite Agung View',
    2: 'The covered terrace of the Agung Pool View suite',
    3: 'The Deluxe room terrace overlooking the Sidemen Valley',
    4: 'The upper floor of the Mezzanine Family Villa, open to the valley',
    5: 'The wooden Joglo villa and its canopy bed',
    6: 'Guests and a Balinese chef with a platter from a cooking class',
    7: 'A group practising yoga in Surya Shanti’s open wooden pavilion',
    8: 'Walking through the rice fields of Sidemen',
    9: 'An infinity pool surrounded by tropical greenery',
    10: 'A Surya Shanti chef presenting a platter of Balinese dishes',
    11: 'Balinese dishes arranged on banana leaves at Surya Shanti',
    12: 'An aerial view of paths, thatched roofs and the grounds',
    13: 'The curved infinity pool and tropical gardens',
    17: 'Members of the Surya Shanti team in traditional dress',
    18: 'The open wooden lounge and its welcoming sitting area',
    19: 'Smiling members of the hotel team',
    20: 'A garden path framed by tropical planting, with the valley beyond',
    21: 'Guests sharing breakfast at a table overlooking the gardens',
    22: 'The curved pool and garden lights at dusk',
    24: 'Flower arrangements beside the infinity pool',
    25: 'The open lounge looking towards Mount Agung',
    26: 'A carved stone statue in the hotel gardens',
    27: 'Guests exploring the rice fields with a local guide',
    28: 'A quiet moment beside the infinity pool',
    29: 'The infinity pool, palms and tropical landscape',
    30: 'Restaurant tables and a Balinese platter, open to the garden views',
    31: 'A shaded terrace beside the infinity pool',
    32: 'Rice terraces and the infinity pool overlooking the valley',
    33: 'The pool overlooking the valley at sunset',
    34: 'A generous platter of Balinese dishes prepared at the hotel',
    35: 'A basket of cakes with a banana leaf and frangipani flower',
    47: 'A therapist giving a back massage in the wooden spa pavilion',
    51: 'An aromatic-oil back massage in the spa',
    53: 'The restaurant team smiling in traditional dress',
    54: 'Three members of the hotel’s kitchen team',
    55: 'Members of the housekeeping team',
    56: 'Stone walls, carved details and basins in the spa courtyard',
    57: 'Spa therapists welcoming guests with a Balinese greeting',
    58: 'The spa’s wooden pavilion and treatment beds, open to greenery',
    59: 'Two guests receiving massages in the open wooden spa pavilion',
    60: 'A therapist attending to a guest in the spa pavilion',
    61: 'Guests relaxing with cups in the spa pavilion',
    63: 'Four members of the team greeting visitors beside the pool and garden',
    64: 'A quiet pause with tea in the wooden spa pavilion',
    65: 'A massage session in the wooden spa pavilion',
    66: 'A Balinese ceremony pictured on the hotel’s experience page',
    67: 'A peaceful view across the valley from an open pavilion',
    68: 'Balinese dancers pictured on Surya Shanti’s experience page',
    69: 'A practitioner seated on a yoga mat in a wooden pavilion',
    70: 'A temple prayer with members of the Balinese community',
    71: 'A group practising postures with an instructor',
    72: 'Cooking ingredients and utensils in the Balinese kitchen',
    73: 'A walk through the green rice fields of Sidemen',
    74: 'Young dancers photographed for the Pasraman section',
    75: 'Children reading together at Pasraman Vidya Giri',
    76: 'Temple steps and tropical gardens looking over the valley',
    80: 'The pools and thatched buildings of Surya Shanti in the Sidemen Valley',
    81: 'A farmer and cattle working in Sidemen’s rice fields',
    82: 'A group photograph from Surya Shanti’s story page',
    83: 'Three women in traditional dress, pictured in the story of Sidemen',
    84: 'Mount Agung above the green Sidemen Valley',
    85: 'Three women in traditional dress, from the hotel’s friendship story',
    86: 'An aerial photograph of Surya Shanti’s thatched roofs and pools',
    87: 'The hotel team gathered in traditional dress',
    88: 'A group praying with joined hands and bowls of flowers at a building entrance',
    90: 'Joël and Sylvie, pictured together in the hotel gardens',
    91: 'The Surya Shanti team gathered in a wooden pavilion',
    92: 'A group celebrating together in Surya Shanti’s story photographs',
    95: 'Mount Agung viewed across the Sidemen Valley',
    96: 'The Agung View suite’s bathroom and freestanding bathtub',
    97: 'The Agung View suite opening to its covered terrace',
    98: 'The Agung View suite’s canopy bed and seating area',
    99: 'The Agung View suite terrace framed by tropical trees',
    100: 'The Agung Pool View suite and its shaded sitting area',
    101: 'The Agung Pool View suite’s canopy bed',
    102: 'The Agung Pool View suite’s bathroom and bathtub',
    103: 'A sitting area opening onto the terrace in the Agung Pool View suite',
    104: 'The Agung Pool View suite’s bedroom and terrace doors',
    105: 'The Deluxe room’s canopy bed and bright sitting area',
    106: 'The Deluxe room’s canopy bed and woven details',
    107: 'The Deluxe room’s bathroom, basins and bathtub',
    108: 'The Mezzanine Family Villa’s upper-level sitting area overlooking the valley',
    109: 'The lower bedroom of the Mezzanine Family Villa',
    110: 'The Mezzanine Family Villa’s bathroom',
    111: 'The Mezzanine Family Villa’s canopy bed beneath its thatched roof',
    112: 'The wooden Joglo Saraswati villa and its covered veranda',
    113: 'The Joglo Saraswati villa’s canopy bed',
    114: 'The Joglo Saraswati villa’s wooden veranda at dusk',
    115: 'The Joglo Saraswati villa’s stone bathroom and freestanding tub',
}


def categories(id):
    result = []
    if id in {0, 9, 12, 13, 20, 22, 24, 25, 26, 28, 29, 31, 32, 33, 76, 80, 86}:
        result += ['HOTEL', 'ARCHITECTURE']
    if id in {0, 9, 13, 22, 24, 28, 29, 31, 32, 33, 80, 86}:
        result += ['POOL']
    if id in {1, 2, 3, 4, 5} or id >= 96:
        result += ['ROOMS', 'ARCHITECTURE']
    if id in {8, 20, 27, 32, 67, 73, 76, 81, 83, 84, 95}:
        result += ['SIDEMEN']
    if id in {10, 11, 18, 21, 30, 34, 35, 53, 54, 72}:
        result += ['RESTAURANT']
    if id in {6, 10, 11, 21, 30, 34, 35, 72}:
        result += ['FOOD']
    if id in {47, 51, 56, 57, 58, 59, 60, 61, 63, 64, 65}:
        result += ['SPA']
    if id in {7, 69, 71}:
        result += ['YOGA']
    if id in {6, 7, 8, 27, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76}:
        result += ['EXPERIENCES']
    if id in {17, 19, 53, 54, 55, 75, 80, 81, 82, 83, 84, 85, 86, 87, 88, 90, 91, 92}:
        result += ['OUR STORY']
    if id == 85:
        result += ['FOUNDERS']
    if id in {11, 24, 26, 35, 56, 96, 102, 107, 110, 115}:
        result += ['DETAILS']
    return list(dict.fromkeys(result))


destination = project / 'public/images'
destination.mkdir(parents=True, exist_ok=True)
prepared = []
for record in records:
    id = record['id']
    if id in excluded:
        continue
    image = ImageOps.exif_transpose(Image.open(record['local'])).convert('RGB')
    variants = []
    for width in sorted({min(size, image.width) for size in (640, 1280, 1920)}):
        filename = f'photo-{id:03d}-{width}.webp'
        variant_path = destination / filename
        if variant_path.exists():
            # Metadata-only runs preserve the previously encoded photographs.
            with Image.open(variant_path) as cached:
                variant_width, variant_height = cached.size
        else:
            resized = image.copy()
            resized.thumbnail((width, int(image.height * width / image.width)))
            resized.save(variant_path, 'WEBP', quality=85, method=6)
            variant_width, variant_height = resized.size
        variants.append({'file': filename, 'width': variant_width, 'height': variant_height})
    prepared.append({'id': id, 'alt': descriptions[id], 'categories': categories(id),
                     'width': image.width, 'height': image.height,
                     'variants': variants, 'original': record['url'],
                     'sources': record['sources'], 'sha256': record['sha256']})
(destination / 'sources.json').write_text(json.dumps(prepared, ensure_ascii=False, indent=2))
(project / 'src/photos.js').write_text('export const photos = ' + json.dumps(prepared, ensure_ascii=False) + ';\n')
print(f'Prepared {len(prepared)} reviewed photographs, with responsive sizes and source provenance.')
