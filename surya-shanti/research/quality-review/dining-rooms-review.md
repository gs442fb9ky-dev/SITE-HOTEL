# Second review — Dining and Rooms

Checked against the assembled application at `http://127.0.0.1:5174` with Chromium (`/usr/bin/chromium`) on 7 October 2026.

## Visual review

Desktop: 1440 × 1000. Mobile: 390 × 844.

Dining, the rooms overview and all five room details were opened directly, photographed as complete pages and inspected using `view_image`. Dining component screenshots supplement the complete-page captures; their fixed navigation chrome is hidden only for the component screenshots, not in the application. Actual opening screenshots retain the navigation.

The integrated Cormorant Garamond and DM Sans fonts render correctly. Large property photographs, warm ivory/sand sections and the forest-green bar section form a consistent composition. The actual breakfast photograph shows both guests and their table after the mobile crop adjustment. Room names, photographs and features correspond to the five verified official categories. No room is presented as a four-bedroom Deluxe villa; guest capacities and prices remain absent.

Changes made in the permitted Dining stylesheet:

- Strengthened the hero gradient to improve white text over the bright restaurant photograph.
- Changed the mobile breakfast photograph to 360 pixels high with a 60% horizontal focal point, preserving both guests and the breakfast table.

The initial review detected empty arrow glyphs and a white logo emblem on ivory headers. Both shared issues were reported to the parent, which corrected them globally using SVG arrows and the proper logo colour. The refreshed Dining opening screenshot confirms the arrow correction. The final-row composition of four-photo room galleries was reported to the parent for its shared layout adjustment.

## Fact and photograph check

Dining uses genuine audited property images: restaurant 30, chef 10, Balinese platter 34, actual breakfast 21, cakes 35, lounge 18, kitchen team 54 and cooking kitchen 72. No stock/menu illustration from IDs 36–46 is used. Text distinguishes the two listed breakfasts without claiming inclusion, times or a buffet. Signature smoked duck is described using verified text and is not assigned an unrelated photograph. Cuisine, house-made bread/marmalades/ice cream, garden fruit, Buddha Bar and cooking-class details remain faithful to the official website.

The five room hero IDs are 98, 101, 105, 111 and 112, with galleries from their correct official categories. The photograph of Mount Agung (95) is not used as a bedroom card. The ambiguous official Deluxe “4 Bed rooms” counter is not reproduced. Features such as air conditioning, bed alternatives, bathrooms, terraces and pool access were compared with the earlier source audit.

## Automated validation

`surya-shanti/tests/pages.spec.js` imports the actual route registry from `src/routes.js`. It independently validates all 14 routes at both viewport widths, resulting in 28 tests.

Checks: direct URL response; one main h1; no not-found content; all main photographs loaded after scrolling for lazy loading; no JavaScript errors; no failed image requests; no horizontal page overflow; and the five official room names on both overview and detail pages.

Command, from `surya-shanti`:

```
node ../node_modules/@playwright/test/cli.js test --config playwright.config.js tests/pages.spec.js
```

Result: **28 passed in 21.2 seconds**. The final targeted Dining capture also reports eight loaded photographs and no JavaScript error or overflow at either width. Metrics are saved in `dining-rooms-metrics.json` and `dining-final-metrics.json` beside this note.

No publication performed.
