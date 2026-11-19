// Every page of the test site and every problem planted in it. build.mjs renders
// the HTML, sitemap.xml, ISSUES.md and issues.json from this one file, so the list
// of planted problems cannot drift from the pages that carry them.

export const BASE = 'https://crawlcove.github.io/seo-test-site/'
export const ROOT = '/seo-test-site/'

/** Root-relative href for a site path ('shop/index.html' -> '/seo-test-site/shop/'). */
export const href = (p) => ROOT + p.replace(/(^|\/)index\.html$/, '$1')
/** Absolute URL for a site path. */
export const abs = (p) => BASE + p.replace(/(^|\/)index\.html$/, '$1')
const a = (p, text, attrs = '') => `<a href="${href(p)}"${attrs}>${text}</a>`
const ul = (items) => `<ul>\n${items.map((i) => `  <li>${i}</li>`).join('\n')}\n</ul>`
const p = (...paras) => paras.map((t) => `<p>${t}</p>`).join('\n')

// ---------------------------------------------------------------- pages
// Fields: path, title (string | null = no <title> | array = several <title>s),
// desc (null = none), h1 (string | array | null), body (html), sitemap (default true),
// canonical (default self; string or array), robots, lang (null = none),
// viewport (null = none, or a custom content string), og (default true),
// hreflang [[code, path]], head (extra raw head html), thin (word floor exempt).

export const pages = [
  {
    path: 'index.html',
    title: 'Hand-poured Soy Candles from Bristol | Harbour Lights',
    desc: 'Harbour Lights pours small-batch soy candles in Bristol. Browse the shop, read the candle care journal, or visit the studio.',
    h1: 'Small-batch candles, poured by the harbour',
    control: true,
    body:
      p(
        'Harbour Lights is a two-person candle studio on the edge of Bristol harbour. We pour every candle by hand in batches of forty, using rapeseed and soy wax, cotton wicks and fragrance oils blended in the studio. Each tin and jar carries the batch number and the date it was poured, so you always know how fresh it is.',
        'The shop holds our year-round scents, from the salt and cedar of Tide Pool to the warm smoke of Storm Lantern, along with gift boxes, tea lights and refills for the jars you already own. When a batch sells out we pour the next one, usually within a fortnight.',
        'The journal is where we write down what we learn: how to choose a wick, why soy wax tunnels in a cold room, and how long a candle should burn the first time you light it. If you are new to container candles, start with the wick guide; it saves most of the problems people write to us about.',
      ) +
      '\n<h2>Where to go next</h2>\n' +
      ul([
        a('shop/index.html', 'Shop all candles'),
        a('blog/index.html', 'Read the candle care journal'),
        a('about/index.html', 'About the studio'),
        a('contact/index.html', 'Visit or contact us'),
        a('archive/index.html', 'Past seasonal collections'),
        a('intl/en/index.html', 'International shipping (English)'),
      ]),
  },

  // ------------------------------------------------------------ shop hub
  {
    path: 'shop/index.html',
    title: 'Shop Soy Candles and Gift Boxes | Harbour Lights',
    desc: 'Every Harbour Lights candle in one place: jar candles, tins, tea lights, gift boxes and wax refills, each poured to order in Bristol.',
    h1: 'Shop all candles',
    body:
      p(
        'Every scent below is poured in the studio in small batches. Jar candles burn for around fifty hours, tins for about twenty-five, and tea lights for four. Prices include UK delivery on orders over thirty pounds; smaller orders pay a flat three pounds fifty.',
        'If you are buying a present, the gift box holds three tins of your choice with a printed card. Refill pouches let you top up an empty jar at home with a fresh wick and wax pellets, which keeps the glass out of the recycling bin for another year.',
        'Sort the range by price or by name, or filter by colour family, using the links under the list.',
      ) +
      '\n<h2>Candles</h2>\n' +
      ul([
        a('products/tide-pool.html', 'Tide Pool jar candle'),
        a('products/sea-glass.html', 'Sea Glass tin'),
        a('products/sea-glass-large.html', 'Sea Glass large jar'),
        a('products/storm-lantern.html', 'Storm Lantern jar candle'),
        a('products/fog-bell.html', 'Fog Bell jar candle'),
        a('products/salt-marsh.html', 'Salt Marsh tin'),
        a('products/driftwood-and-amber.html', 'Driftwood and Amber jar candle'),
        a('products/lighthouse-keeper.html', 'Lighthouse Keeper jar candle'),
        a('products/gift-box.html', 'Gift box of three tins'),
        a('products/tea-lights.html', 'Tea lights, pack of twelve'),
        a('products/pillar-candles.html', 'Pillar candles'),
        a('products/new-arrival.html', 'New: Harbour Fog'),
        a('products/Gift_Set_LARGE.html', 'Large gift set'),
        a('products/archive-sale.html', 'Archive sale'),
        a('products/ember.html', 'Ember wax melts'),
      ]) +
      '\n<h2>Sort and filter</h2>\n' +
      ul([
        `<a href="${ROOT}shop/?sort=price">Sort by price</a>`,
        `<a href="${ROOT}shop/?sort=name">Sort by name</a>`,
        `<a href="${ROOT}shop/?sort=newest">Sort by newest</a>`,
        `<a href="${ROOT}shop/?colour=blue">Blue candles</a>`,
        `<a href="${ROOT}shop/?colour=amber">Amber candles</a>`,
        `<a href="${ROOT}shop/?colour=blue&amp;sort=price">Blue candles by price</a>`,
      ]) +
      '\n<h2>Filter by colour and size</h2>\n' +
      ['blue', 'amber', 'green', 'grey']
        .map((c) => `<p>${c[0].toUpperCase() + c.slice(1)}: ` + ['tin', 'small-jar', 'jar', 'large-jar', 'three-wick'].map((z) => `<a href="${ROOT}shop/?colour=${c}&amp;size=${z}">${z.replace('-', ' ')}</a>`).join(', ') + '</p>')
        .join('\n'),
  },

  {
    path: 'products/tide-pool.html',
    title: 'Tide Pool Soy Jar Candle, Salt and Cedar | Harbour Lights',
    desc: 'Tide Pool is a salt, cedar and bergamot soy candle in a reusable amber jar. Fifty hours of burn time, poured by hand in Bristol.',
    h1: 'Tide Pool jar candle',
    control: true,
    img: { src: 'img/tide-pool.png', alt: 'Tide Pool candle in an amber glass jar', w: 400, h: 300 },
    jsonld: [
      {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'Tide Pool jar candle',
        image: BASE + 'img/tide-pool.png',
        description: 'Salt, cedar and bergamot soy candle in a reusable amber jar.',
        sku: 'HL-TP-200',
        brand: { '@type': 'Brand', name: 'Harbour Lights' },
        offers: { '@type': 'Offer', price: '24.00', priceCurrency: 'GBP', availability: 'https://schema.org/InStock', url: BASE + 'products/tide-pool.html' },
      },
    ],
    body: p(
      'Tide Pool smells like the rocks at low tide on a bright morning: sea salt first, then cedar and a lift of bergamot that keeps it from feeling heavy. It is the scent we pour most often and the one most people reorder.',
      'The candle holds two hundred grams of rapeseed and soy wax in an amber glass jar with a cork lid. Two cotton wicks give an even melt pool across the full width of the jar, so it burns down flat rather than tunnelling. Expect around fifty hours of burn time if you trim the wicks to five millimetres before each lighting.',
      'For the first burn, leave it lit until the melted wax reaches the edge of the jar, usually two to three hours. That first pool sets the memory for every burn after it. Never burn it for more than four hours at a time, keep it away from draughts, and stop when there is a centimetre of wax left in the bottom.',
      'When it is finished, pour boiling water into the jar, let the wax float to the top, lift it out once it sets and wash the glass. The jar is good for pens, cotton buds or a refill pouch from the shop. Price: twenty-four pounds.',
    ),
  },

  // duplicate titles
  {
    path: 'products/sea-glass.html',
    title: 'Sea Glass Candle | Harbour Lights',
    desc: 'Sea Glass in a travel tin: green fig, sea air and white musk, about twenty-five hours of burn time.',
    h1: 'Sea Glass tin',
    body: p(
      'Sea Glass is our greenest scent. Fig leaf and cucumber open it, sea air sits in the middle, and a little white musk keeps it close to the skin of the room instead of filling the whole house. It suits a bathroom or a small study better than a big living room.',
      'This is the travel tin: one hundred grams of wax, one wick, a screw lid that seals it for a suitcase, and roughly twenty-five hours of burning. The tin gets warm near the end of a session, so stand it on a coaster or a saucer rather than straight on painted wood.',
      'Tins melt fully across in about an hour, which makes them the easiest candles to look after. Trim the wick, light it, and blow it out once the pool reaches the rim. If the flame starts to flicker or smoke, the wick is too long; snuff it, let it cool and trim it again before relighting.',
      'Twelve pounds. Pairs well with Tide Pool if you want something fresh for a hallway.',
    ),
  },
  {
    path: 'products/sea-glass-large.html',
    title: 'Sea Glass Candle | Harbour Lights',
    desc: 'The large Sea Glass jar: three wicks, four hundred grams of wax and around ninety hours of fig and sea air.',
    h1: 'Sea Glass large jar',
    body: p(
      'The large jar is the same fig, sea air and musk blend as the tin, scaled up for a kitchen or an open plan room. Three wicks melt a wide pool quickly, so the scent fills a bigger space within half an hour of lighting.',
      'It holds four hundred grams of wax in clear ribbed glass and burns for around ninety hours. Because it has three flames, it needs a little more care: keep all three wicks trimmed to the same length, otherwise one side melts faster and the pool tilts.',
      'Do not move the jar while it is lit or while the wax is still liquid. Hot wax holds its heat longer than people expect, and a wide jar of it spills easily. Let it sit for twenty minutes after you blow it out.',
      'Thirty-eight pounds, and the jar takes our large refill pouch when it is empty.',
    ),
  },

  // duplicate meta descriptions
  {
    path: 'products/storm-lantern.html',
    title: 'Storm Lantern Smoky Soy Candle | Harbour Lights',
    desc: 'A hand-poured soy candle from our Bristol studio. Free UK delivery over thirty pounds.',
    h1: 'Storm Lantern jar candle',
    body: p(
      'Storm Lantern is the candle for a wet November night. Birch tar and black tea give it a dry smoke, vetiver adds an earthy base, and a touch of orange peel stops it from turning into a bonfire. It is the darkest scent in the range and divides people, which we like.',
      'It comes in a smoked grey jar with a wooden lid, two hundred grams of wax and two wicks. Burn time is about fifty hours. Smoky blends are strong, so one candle is plenty for a living room; in a small bedroom, burn it for an hour and then put the lid back on.',
      'People ask why the wax looks slightly brown. That is the birch tar, a natural material that tints the wax. It does not affect the burn and it is not a fault.',
      'Twenty-six pounds.',
    ),
  },
  {
    path: 'products/fog-bell.html',
    title: 'Fog Bell Lavender and Rain Candle | Harbour Lights',
    desc: 'A hand-poured soy candle from our Bristol studio. Free UK delivery over thirty pounds.',
    h1: 'Fog Bell jar candle',
    body: p(
      'Fog Bell is lavender without the soap. We pair it with petrichor, the mineral smell of rain on warm stone, and a soft base of tonka so it feels like a grey morning rather than a linen cupboard.',
      'Its pale blue jar holds two hundred grams of wax with two cotton wicks and burns for about fifty hours. Lavender is one of the gentler oils we use, which makes Fog Bell a good first candle for anyone who finds most scented candles too much.',
      'Customers tell us they burn it in the hour before bed. If you do the same, remember to blow it out before you fall asleep; a candle should never be left burning in an empty room.',
      'Twenty-four pounds.',
    ),
  },

  // missing title
  {
    path: 'products/salt-marsh.html',
    title: null,
    desc: 'Salt Marsh in a travel tin: samphire, sea lavender and driftwood smoke, around twenty-five hours of burn time.',
    h1: 'Salt Marsh tin',
    body: p(
      'Salt Marsh is the estuary at the mouth of the Severn on a still afternoon. Samphire and sea lavender keep it green and briny; a thread of driftwood smoke underneath gives it some weight. It is our most requested scent from people who grew up on the coast.',
      'One hundred grams of wax in a brushed tin with a screw lid, one wick, about twenty-five hours. The tin is light enough to take camping, although we would ask you to keep it inside a tent porch and never inside the tent itself.',
      'Like all the tins, it melts across in about an hour. If you see a ring of solid wax around the edge after the first burn, the session was too short; next time leave it until the pool touches the metal.',
      'Twelve pounds.',
    ),
  },

  // title too long
  {
    path: 'products/driftwood-and-amber.html',
    title: 'Driftwood and Amber Hand-poured Soy Wax Jar Candle with Cotton Wicks, Fifty Hours, Gift Wrapped Free | Harbour Lights Candle Company Bristol',
    desc: 'Driftwood and Amber: warm resin, sandalwood and sea salt in a two-wick soy jar candle. Fifty hours of burn time.',
    h1: 'Driftwood and Amber jar candle',
    body: p(
      'Driftwood and Amber is the warmest candle we make. Labdanum and benzoin give it the sweetness of amber resin, sandalwood brings a creamy wood, and a pinch of sea salt keeps it tied to the harbour. It is the one we light in the studio on the first cold day of autumn.',
      'Two hundred grams of wax, two cotton wicks, a honey coloured jar and roughly fifty hours of burning. Resin notes are heavy, so this scent throws strongly once the pool is fully melted; give it forty minutes before you judge it.',
      'Every jar is wrapped in recycled tissue and tied with cotton string at no extra cost. If it is a present, add a note at the checkout and we will handwrite it on a card.',
      'Twenty-six pounds.',
    ),
  },

  // missing meta description
  {
    path: 'products/lighthouse-keeper.html',
    title: 'Lighthouse Keeper Leather Candle | Harbour Lights',
    desc: null,
    h1: 'Lighthouse Keeper jar candle',
    body: p(
      'Lighthouse Keeper is named after the long nights in the lamp room: pipe tobacco, worn leather, a cup of black coffee and paraffin lamp oil, rounded off with vanilla. It is a cosy, slightly old fashioned scent that suits a study or a reading chair.',
      'The jar is dark green glass with a brass coloured lid. Inside are two hundred grams of wax and two wicks, good for about fifty hours. Tobacco and leather accords are dense, so the candle fills a room without needing to burn for long.',
      'We get asked whether it contains real tobacco. It does not; the note is built from tonka, hay absolute and a little smoke, and every material in it is listed on the safety sheet we send with each order.',
      'Twenty-six pounds.',
    ),
  },

  // no H1
  {
    path: 'products/gift-box.html',
    title: 'Candle Gift Box, Choose Three Tins | Harbour Lights',
    desc: 'Pick any three Harbour Lights travel tins and we pack them in a printed gift box with a handwritten card.',
    h1: null,
    preH1: '<h2>Gift box of three tins</h2>',
    body: p(
      'The gift box is the easiest present we sell. Choose any three tins from the range, tell us who it is for, and we pack them in a printed box with tissue and a handwritten card. Most people mix one fresh scent, one floral and one smoky so the recipient can find a favourite.',
      'The box is made from recycled board and printed with vegetable inks in a small print shop in Bedminster. There is no plastic in the packaging at all; the tins are wrapped in paper and the box is closed with a paper seal.',
      'Each tin burns for about twenty-five hours, so the box gives around seventy-five hours of candle in total. If you want it to arrive on a particular day, order at least three working days ahead and add the date in the order notes.',
      'Thirty-two pounds, including the card.',
    ),
  },

  // two canonical tags
  {
    path: 'products/tea-lights.html',
    title: 'Scented Soy Tea Lights, Pack of Twelve | Harbour Lights',
    desc: 'Twelve scented soy tea lights in aluminium-free cups, four hours each, in any scent from the range.',
    h1: 'Tea lights, pack of twelve',
    canonical: ['products/tea-lights.html', 'shop/index.html'],
    body: p(
      'Our tea lights come in compostable plant fibre cups instead of aluminium, which means they can go in the food waste bin once they are finished. Each one burns for about four hours and is poured in the same wax and scents as the jar candles.',
      'A pack holds twelve of a single scent. They are made for oil burners and lanterns as much as for the table, so the wicks are a touch shorter than usual to keep the flame low inside a burner.',
      'Never put a tea light directly on a surface that can scorch. The cup gets hot by the end, so a saucer or holder is worth using even with the plant fibre cups. Keep them out of reach of children and pets.',
      'Nine pounds for twelve.',
    ),
  },

  // two title tags
  {
    path: 'products/pillar-candles.html',
    title: ['Unscented Pillar Candles | Harbour Lights', 'Pillar Candles for Weddings and Events'],
    desc: 'Plain rapeseed wax pillar candles in three heights, unscented, made for weddings, tables and church events.',
    h1: 'Pillar candles',
    body: p(
      'Pillar candles are the only unscented candles we make. They are poured in rapeseed wax with a harder blend for the outside, so they keep their shape and drip very little. Weddings, dinner tables and church events are what most of them are bought for.',
      'There are three heights: ten, fifteen and twenty centimetres, all seven centimetres wide. The smallest burns for about thirty hours and the tallest for around seventy. They are ivory as standard; we can tint batches of fifty or more to match a colour scheme if you send us a swatch.',
      'Pillars need a flat, heatproof plate underneath. Trim the wick to five millimetres before every lighting and keep them out of draughts, which is where almost all dripping comes from.',
      'From eight pounds each, with a discount for orders of twenty or more.',
    ),
  },

  // linked but not listed in sitemap.xml
  {
    path: 'products/new-arrival.html',
    title: 'Harbour Fog, New Winter Candle | Harbour Lights',
    desc: 'Harbour Fog is our new winter scent: wet rope, juniper and cold air, poured in a frosted jar.',
    h1: 'New: Harbour Fog',
    sitemap: false,
    body: p(
      'Harbour Fog is new this winter. We wanted the smell of the quayside on a freezing morning when the water is hidden under a layer of mist: wet hemp rope, juniper berries, a cold mineral air and a little pine resin for warmth.',
      'It is poured in a frosted glass jar with two wicks and two hundred grams of wax. Burn time is about fifty hours. Juniper is bright and slightly sharp at first; it softens as the pool widens, so the scent changes over the first hour.',
      'The first batch was forty jars. If it has sold out by the time you read this, the next pour is planned for the second week of December and the shop will take back orders until then.',
      'Twenty-six pounds.',
    ),
  },

  // inconsistent URL: capitals and underscores
  {
    path: 'products/Gift_Set_LARGE.html',
    title: 'Large Candle Gift Set, Two Jars | Harbour Lights',
    desc: 'Two jar candles of your choice, a box of long safety matches and a wick trimmer in one large gift set.',
    h1: 'Large gift set',
    body: p(
      'The large gift set is two full jar candles with the tools to look after them: a box of long safety matches and a stainless steel wick trimmer. It is the present we suggest for a housewarming.',
      'Choose any two scents from the jar range. We pack them upright in a rigid box with paper padding so the glass travels safely, and the trimmer comes in its own cotton pouch.',
      'A wick trimmer is the single best thing you can do for a candle. Trimmed wicks burn cleaner, smoke less and leave less soot on the glass, and the angled blade reaches down into a tall jar where scissors cannot.',
      'Sixty pounds.',
    ),
  },

  // noindex page, linked and listed in the sitemap
  {
    path: 'products/archive-sale.html',
    title: 'Archive Sale, Last Few Jars | Harbour Lights',
    desc: 'The last jars of retired scents at half price while they last.',
    h1: 'Archive sale',
    robots: 'noindex, follow',
    body: p(
      'When we retire a scent we sell the last few jars here at half price. Nothing in the archive sale is faulty; these are full candles from the final batch of a blend we are not pouring again.',
      'At the moment the archive holds a handful of Orchard Bonfire and Winter Harbour jars from last year. Each one has been stored in the dark in its sealed box, so the fragrance is as strong as the day it was poured.',
      'Because the stock is so small, archive orders ship within two working days and cannot be returned unless they arrive damaged. Once a scent is gone from this page, it is gone for good.',
      'Twelve or thirteen pounds a jar while stocks last.',
    ),
  },

  // structured data with a syntax error and a Product with no name
  {
    path: 'products/ember.html',
    title: 'Ember Soy Wax Melts, Smoked Vanilla | Harbour Lights',
    desc: 'Ember wax melts: smoked vanilla and clove in six snap-off cubes for an oil burner, about eight hours each.',
    h1: 'Ember wax melts',
    jsonldRaw: [
      '{\n  "@context": "https://schema.org",\n  "@type": "Product",\n  "description": "Smoked vanilla and clove soy wax melts",\n  "offers": { "@type": "Offer", "price": "7.50", "priceCurrency": "GBP" },\n}',
      '{\n  "@context": "https://schema.org",\n  "@type": "Product",\n  "image": "' + BASE + 'img/ember.png",\n  "description": "Smoked vanilla and clove soy wax melts in six cubes",\n  "offers": { "@type": "Offer", "price": "7.50", "priceCurrency": "GBP", "availability": "https://schema.org/InStock" }\n}',
    ],
    body: p(
      'Ember is a wax melt rather than a candle: six cubes of soy wax that snap off a tray and sit in the dish of an oil burner or electric warmer. Smoked vanilla, clove and a little black pepper make it smell like a kitchen on bonfire night.',
      'One cube scents a room for about eight hours of warming. When the scent fades, tip the soft wax out onto kitchen roll while it is still warm, wipe the dish and add a fresh cube. Do not pour melted wax down a sink; it sets in the pipes.',
      'Melts have no wick, which makes them a good choice in homes where an open flame is not welcome, provided you use an electric warmer instead of a tea light burner.',
      'Seven pounds fifty for six cubes.',
    ),
  },

  // ------------------------------------------------------------ journal hub
  {
    path: 'blog/index.html',
    title: 'Candle Care Journal: Wicks and Wax | Harbour Lights',
    desc: 'Practical candle care from the Harbour Lights studio: choosing wicks, the first burn, tunnelling, soot and how to store candles.',
    h1: 'The candle care journal',
    control: true,
    body:
      p(
        'Most problems with a candle come down to three things: the wick, the first burn and where the candle stands. This journal is where we write up what we have learned from pouring several thousand candles and answering the questions customers send us.',
        'The posts are short and practical. Start with choosing a wick if you make candles yourself, or with the first burn if you have just bought one. Everything here applies to container candles in jars and tins; pillar candles have their own care notes on the product page.',
      ) +
      '\n<h2>Posts</h2>\n' +
      ul([
        a('blog/choosing-a-wick.html', 'How to choose a candle wick'),
        a('blog/two-headlines.html', 'Why candles tunnel'),
        a('blog/wax-blends.html', 'Wax blends we tested'),
        a('blog/soy-vs-paraffin.html', 'Soy or paraffin wax'),
        a('blog/heading-skip.html', 'Storing candles over summer'),
        a('blog/old-guide.html', 'The old first-burn guide'),
        a('blog/winter-guide.html', 'Winter candle guide'),
        a('blog/care-tips.html', 'Ten candle care tips'),
        a('blog/http-canonical.html', 'Cleaning soot off a jar'),
        a('blog/broken-links.html', 'Our suppliers'),
        a('blog/image-problems.html', 'Inside the studio, in pictures'),
        a('blog/mixed-content.html', 'Photographing candles'),
        a('blog/link-problems.html', 'Candle safety links'),
        a('blog/thin-note.html', 'Studio closed for a week'),
        a('blog/rainy-day-candles.html', 'Candles for a rainy day'),
        a('blog/rainy-day-candles-2.html', 'More candles for a rainy day'),
        a('blog/no-social.html', 'How we name a scent'),
        a('blog/moved.html', 'Wick guide (moved)'),
        a('blog/nofollow-page.html', 'Customer photos'),
        a('blog/js-only.html', 'Burn time calculator'),
        a('blog/title-same-as-h1.html', 'Candle making workshops'),
      ]),
  },

  {
    path: 'blog/choosing-a-wick.html',
    title: 'How to Choose a Candle Wick for Soy Wax | Harbour Lights',
    desc: 'How to size a cotton wick to the jar width and wax blend, with the test burn we use before every new scent.',
    h1: 'How to choose a candle wick',
    control: true,
    img: { src: 'img/wick-test.png', alt: 'Three test candles with different wick sizes burning side by side', w: 400, h: 300 },
    jsonld: [
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'How to choose a candle wick',
        datePublished: '2026-10-02',
        dateModified: '2026-11-12',
        author: { '@type': 'Person', name: 'Mara Penhallow', url: BASE + 'about/team.html' },
        publisher: { '@type': 'Organization', name: 'Harbour Lights' },
        image: BASE + 'img/wick-test.png',
      },
    ],
    body: p(
      'A wick that is too small drowns in its own wax and leaves a tunnel down the middle of the jar. One that is too big throws a tall, smoky flame, blackens the glass and can overheat the container. Getting it right matters more than the wax, the scent or the jar.',
      'Start from the diameter of the container. Wick makers publish charts that match each size to a range of widths, but those charts assume paraffin. Soy and rapeseed wax are denser and need a wick one or two sizes larger than the chart suggests, and heavy fragrance loads push it up again.',
      'We never trust a chart on its own. For every new scent we pour three test candles with neighbouring wick sizes and burn them side by side for four hours. The right wick reaches a full melt pool in three hours, holds a flame about two centimetres tall, and leaves a pool around one centimetre deep.',
      'Write the result down. Wax batches vary, and the notes from last spring are the fastest way to check a new delivery. Then repeat the test burn on the final quarter of the candle, because a wick that behaves at the top can flood or flare once the jar walls start to hold the heat.',
    ),
  },

  // two H1s
  {
    path: 'blog/two-headlines.html',
    title: 'Why Candles Tunnel and How to Fix It | Harbour Lights',
    desc: 'Tunnelling is almost always a short first burn. How to rescue a tunnelled candle with foil, and how to stop it happening.',
    h1: ['Why candles tunnel', 'How to fix a tunnelled candle'],
    body: p(
      'A tunnel is the narrow hole a candle burns down its middle while a thick wall of wax stays solid around the edge. It wastes most of the candle and the wick eventually drowns in the pool at the bottom of the tunnel.',
      'Nine times out of ten the cause is the first burn. Wax has a memory: the width of the pool the first time you light it is the width it will melt to every time after. Blow it out after twenty minutes on day one and you have set a tunnel.',
    ) +
      '\n<h1>How to fix a tunnelled candle</h1>\n' +
      p(
        'Wrap a band of kitchen foil around the top of the jar so it overhangs the edge and leaves a hole in the centre for the flame. The foil reflects heat back onto the stubborn wall of wax. Within an hour or two the edge melts down level with the rest of the pool.',
        'Remove the foil with tongs once the surface is flat, let the candle burn for another half hour, then blow it out. From then on, give every session long enough to melt right across, usually one hour for every two and a half centimetres of jar width.',
      ),
  },

  // two pages share one H1
  {
    path: 'blog/wax-blends.html',
    title: 'Five Candle Wax Blends, Tested | Harbour Lights',
    desc: 'We poured the same scent in five wax blends and compared scent throw, frosting and burn time over a month.',
    h1: 'Choosing a candle wax',
    body: p(
      'Last winter we poured Tide Pool in five different waxes: straight soy, straight rapeseed, a soy and coconut blend, a rapeseed and coconut blend, and the soy and rapeseed mix we use now. Each candle burned for four hours a day for a month.',
      'Coconut blends had the strongest scent throw in the first week but softened in a warm room and sweated oil onto the surface. Straight rapeseed frosted badly, leaving white crystals on the glass that customers read as a fault. Straight soy was fine but tunnelled more easily in a cold kitchen.',
      'The soy and rapeseed mix gave the most even pool, the least frosting and a burn time within five per cent of the best result. It is also grown in Europe, which shortened our supply chain. That is why it is the only wax we use now.',
      'If you make candles at home, run your own test. A month of evenings tells you more than any supplier sheet.',
    ),
  },
  {
    path: 'blog/soy-vs-paraffin.html',
    title: 'Soy vs Paraffin Candles Compared | Harbour Lights',
    desc: 'Soy and paraffin compared honestly: soot, scent throw, price and where each wax comes from.',
    h1: 'Choosing a candle wax',
    body: p(
      'Paraffin is refined from crude oil. Soy wax is hydrogenated soybean oil. Both burn cleanly when the wick is the right size, and both soot when it is not, so most of the soot claims made about paraffin are really claims about badly wicked candles.',
      'The differences that are real are smaller and more practical. Paraffin holds fragrance oil readily and throws scent hard from a cold candle; soy needs to melt a full pool before it smells strong. Paraffin is cheaper. Soy is softer, which is why it suits jars and tins but not free-standing pillars.',
      'We use a plant wax blend because we prefer a renewable material and the softer, slower scent of a melted pool. It is a preference, not a health claim, and we would rather say so than sell candles on fear.',
      'Whichever wax you buy, look after the wick. It decides more about how a candle burns than the wax ever will.',
    ),
  },

  // heading levels skip
  {
    path: 'blog/heading-skip.html',
    title: 'How to Store Candles Over a Hot Summer | Harbour Lights',
    desc: 'Heat, sunlight and dust are what spoil a stored candle. Where to keep candles between seasons, and how long they last.',
    h1: 'Storing candles over summer',
    body:
      p(
        'A candle is a block of fragrance oil held in wax, and three things spoil it in storage: heat, light and air. A sunny windowsill in July does all three at once.',
      ) +
      '\n<h4>Keep them cool</h4>\n' +
      p(
        'Above about twenty-five degrees soy wax starts to soften and sweat its oil to the surface. Store candles in a cupboard on an inside wall, never in a loft or a car, and keep them away from radiators and ovens.',
      ) +
      '\n<h4>Keep them dark and covered</h4>\n' +
      p(
        'Daylight fades coloured wax and breaks down some fragrance materials, citrus most of all. Put the lid back on every jar once the wax has set, or wrap tins in paper. A lid also stops dust settling on the wick, which is what makes a stored candle spit when you relight it.',
        'Stored like this, a soy candle keeps its scent for about eighteen months. Write the date on the base when you buy it so you know which to burn first. If a stored candle has frosted white on the surface, it is still fine to burn; frosting is a cosmetic change in the wax crystals.',
      ),
  },

  // canonical points at a URL that answers 404
  {
    path: 'blog/old-guide.html',
    title: 'Why the First Candle Burn Matters | Harbour Lights',
    desc: 'The first burn sets the melt pool for the life of the candle. How long to leave it lit, by jar size.',
    h1: 'The first burn',
    canonical: 'blog/first-burn-guide.html',
    body: p(
      'The first time you light a new candle, leave it burning until the melted wax reaches the edge of the container. For a tin that is about an hour; for a standard jar, two to three hours; for a wide three-wick jar, as long as three and a half.',
      'The reason is wax memory. A candle tends to melt to the width of its first pool every time after, so a short first burn leaves a ring of hard wax around the edge that never melts and slowly turns into a tunnel.',
      'Plan the first burn for an evening when you are at home and in the room. Trim the wick to five millimetres, keep doors and windows closed so the flame does not lean, and resist the urge to blow it out early.',
      'If you cannot give it the full time, wait for another evening. One properly long first burn is worth more than any number of short ones.',
    ),
  },

  // canonical points at a noindex page
  {
    path: 'blog/winter-guide.html',
    title: 'Winter Candle Guide: Cold Rooms | Harbour Lights',
    desc: 'Cold rooms slow a melt pool and draughts make flames lean. How to burn candles well in winter.',
    h1: 'Winter candle guide',
    canonical: 'products/archive-sale.html',
    body: p(
      'Candles burn differently in a cold house. The jar loses heat through the glass, so the pool widens more slowly and the edge of the wax stays firm for longer. Give winter burns an extra half hour before you judge whether a candle is tunnelling.',
      'Draughts are the bigger problem. A flame leaning in a draught melts one side of the jar faster, blackens the glass on that side and can throw soot onto the wall behind it. Old sash windows, open fireplaces and the gap under a door are the usual culprits.',
      'Move the candle until the flame stands straight. If it still flickers, it is probably the wick: trim it, and if the jar is nearly finished, stop. The last centimetre of a jar runs hot in any season.',
      'Finally, never stand a candle on a cold stone windowsill. The sudden difference in temperature between a hot pool and a freezing base is how glass cracks.',
    ),
  },

  // canonical points at a URL that redirects (the trailing-slash 301)
  {
    path: 'blog/care-tips.html',
    title: 'Ten Candle Care Tips From the Studio | Harbour Lights',
    desc: 'Ten habits that make a candle last longer, burn cleaner and smell stronger, from trimming wicks to the last centimetre.',
    h1: 'Ten candle care tips',
    canonicalUrl: BASE.replace(/\/$/, '') + '/blog',
    body:
      '<ol>\n' +
      [
        'Trim the wick to five millimetres before every lighting.',
        'Let the first burn melt right across the jar.',
        'Burn for no more than four hours at a time.',
        'Keep candles out of draughts so the flame stands straight.',
        'Put the lid back on once the wax has set.',
        'Never leave a lit candle in an empty room.',
        'Stop when a centimetre of wax is left.',
        'Snuff the flame instead of blowing, to keep smoke down.',
        'Stand jars on a coaster; glass gets hot.',
        'Store spare candles somewhere cool and dark.',
      ]
        .map((t) => `  <li>${t}</li>`)
        .join('\n') +
      '\n</ol>\n' +
      p(
        'None of these are complicated, and most of them take seconds. Of the ten, trimming the wick makes the biggest single difference: a long wick smokes, mushrooms at the tip and burns the candle down faster than its rated time. A cheap trimmer pays for itself within one jar.',
        'If a candle is still misbehaving after all ten, write to us with a photo of the flame and the melt pool. We read every message, and the answer is usually a wick that needs a closer trim or a draught you have not noticed.',
        'The two habits people skip most are the long first burn and stopping at the last centimetre. Both feel wasteful, and both are what keep the glass from cracking and the pool from tunnelling over the life of the jar.',
      ),
  },

  // canonical over plain http
  {
    path: 'blog/http-canonical.html',
    title: 'How to Clean Soot off a Candle Jar | Harbour Lights',
    desc: 'Black soot on the glass means the wick is too long. How to clean the jar safely and stop it coming back.',
    h1: 'Cleaning soot off a jar',
    canonicalUrl: 'http://crawlcove.github.io/seo-test-site/blog/http-canonical.html',
    body: p(
      'Soot on the inside of a jar is a symptom, not a fault in the candle. It means the flame has been too big, almost always because the wick was not trimmed, or because the candle stood in a draught that made it flicker.',
      'To clean it, let the candle cool completely and set. Wipe the glass above the wax with a dry paper towel first; most of the soot comes off. For the stubborn ring, use a cotton pad with a few drops of washing up liquid, then dry the glass carefully so no water reaches the wick.',
      'Never clean a jar while the wax is liquid. Water and hot wax spit, and a wet wick will not light properly.',
      'To stop it coming back, trim the wick to five millimetres before every lighting and check the flame after ten minutes. A steady flame about two centimetres tall leaves the glass clear for the whole life of the candle.',
    ),
  },

  // broken internal link, broken image, broken stylesheet, broken external link
  {
    path: 'blog/broken-links.html',
    title: 'Where Our Wax, Wicks and Jars Come From | Harbour Lights',
    desc: 'The suppliers behind every Harbour Lights candle: European rapeseed wax, cotton wicks and recycled glass.',
    h1: 'Our suppliers',
    head: `<link rel="stylesheet" href="${ROOT}css/old-theme.css">`,
    img: { src: 'img/supplier-map.png', alt: 'Map of where our wax, wicks and jars are made', w: 400, h: 300 },
    body: p(
      'Customers ask where our materials come from, so here is the full list. Our wax is a blend of rapeseed grown in the United Kingdom and France with soy from a certified European refiner. Every batch arrives with a certificate that lists its origin and melt point.',
      'Wicks are braided cotton with a paper core, made in Germany. We stopped using wicks with a zinc core in 2024; the cotton and paper ones burn just as steadily and leave nothing behind but ash.',
      `Jars are recycled glass from a works in the Midlands, and tins come from a family firm in Wales. The old tin supplier still has a page about our ${a('products/discontinued-tins.html', 'discontinued round tins')}, and the industry body that audits our glass is listed on <a href="https://crawlcove.com/seo-test-site-supplier-directory">the supplier directory</a>.`,
      'Fragrance oils come from two perfume houses in Grasse and Kent. Both publish full safety data for every blend, and we keep those sheets on file for anyone who asks to see them.',
    ),
  },

  // image problems: no alt, generic alt, no dimensions, lazy first image, oversized file
  {
    path: 'blog/image-problems.html',
    title: 'Inside the Candle Studio, in Pictures | Harbour Lights',
    desc: 'A photo walk through the studio: the melting pots, the pouring bench, the curing shelves and the packing table.',
    h1: 'Inside the studio, in pictures',
    body:
      `<img src="${ROOT}img/studio-bench.png" alt="The pouring bench with forty jars ready to fill" width="400" height="300" loading="lazy">\n` +
      p(
        'The studio is a single room above a boatyard. On the left of the door is the pouring bench, where forty jars sit in rows on a heatproof board with their wicks held straight by wooden clips.',
      ) +
      `<img src="${ROOT}img/melting-pots.png" width="400" height="300">\n` +
      p(
        'Wax melts in two jacketed pots that hold ten kilos each. We heat it to eighty degrees, let it cool to sixty-five, and only then add the fragrance oil, stirring for two full minutes so the oil binds evenly.',
      ) +
      `<img src="${ROOT}img/curing-shelves.png" alt="image" width="400" height="300">\n` +
      p(
        'After pouring, the candles cure on these shelves for two weeks. Curing lets the fragrance settle into the wax; a candle burned the day after it is poured smells of almost nothing.',
      ) +
      `<img src="${ROOT}img/packing-table.png" alt="The packing table with boxes, tissue and string">\n` +
      p(
        'The packing table is where every order is wrapped. Tissue, string, a handwritten note and a paper seal: nothing plastic leaves the building.',
      ) +
      `<img src="${ROOT}img/harbour-panorama.png" alt="Panorama of the harbour from the studio window" width="900" height="300">\n` +
      p(
        'And this is the view from the window, which is why we called the studio Harbour Lights. On a winter evening the cranes are lit up along the quay and the reflections run all the way across the water.',
        'We open the studio to visitors on the first Saturday of every month. Come and watch a pour, smell the scents in development and take a tin home from the seconds shelf.',
      ),
  },

  // mixed content
  {
    path: 'blog/mixed-content.html',
    title: 'How We Photograph Candles | Harbour Lights',
    desc: 'Our product photos are lit by one north-facing window and a white card. The setup, the camera settings and the edit.',
    h1: 'Photographing candles',
    body:
      p(
        'Every photo in the shop is taken at the same table by the same north-facing window. North light is soft and even through the whole day, which means the colour of the wax looks the same in every picture whichever hour we shoot it.',
        'Opposite the window stands a sheet of white foam board that bounces light back into the shadows. That is the whole lighting kit. A lit candle is far dimmer than daylight, so for flame shots we wait until late afternoon and shoot at a slower shutter speed on a tripod.',
      ) +
      `<img src="http://crawlcove.github.io/seo-test-site/img/photo-setup.png" alt="The photo table by the window with a white bounce card" width="400" height="300">\n` +
      p(
        'We shoot every candle unlit from the front, from forty-five degrees and from above, then lit from the front. The edit is minimal: straighten, crop square and match the white balance to a grey card photographed at the start of the session.',
        'If you photograph your own candles for a shop, the grey card is the one thing worth buying. It turns a whole afternoon of colour correction into one click and keeps a scent from looking blue on one page and yellow on another.',
      ),
  },

  // link problems
  {
    path: 'blog/link-problems.html',
    title: 'Candle Safety Rules and Links | Harbour Lights',
    desc: 'The candle safety rules we print on every label, with links to the fire service guidance behind them.',
    h1: 'Candle safety links',
    body:
      p(
        'Every Harbour Lights label carries the same safety rules, and they come from fire service guidance. Never leave a burning candle unattended. Keep it away from curtains, shelves and anything that can catch. Keep children and pets away from the flame.',
        `Read our full safety notes <a href="${href('blog/choosing-a-wick.html')}">click here</a>, and for the first burn ${a('blog/old-guide.html', 'read more')}.`,
        `For everyday care see ${a('blog/care-tips.html', 'our ten care tips', ' rel="nofollow"')}. Back to the ${`<a href="${ROOT}blog">journal</a>`}.`,
        `Share this page: <a href="${href('index.html')}" class="icon-home"><svg width="16" height="16" aria-hidden="true"><circle cx="8" cy="8" r="7"/></svg></a>. The fire service guidance is on <a href="htps//www.gov.uk/fire-safety">the fire safety page</a>, and the national campaign is at <a href="https://www gov.uk/firekills">Fire Kills</a>.`,
        'A candle should stand on a heatproof surface with at least ten centimetres between it and the next candle. Burn it for no more than four hours at a time, and stop when there is a centimetre of wax left in the bottom: below that, the glass can get hot enough to crack.',
        'Put a candle out with a snuffer or by dipping the wick into the pool and lifting it out again. Blowing it out works but scatters hot wax and smoke. Never use water; it makes the wax spit.',
      ),
  },

  // thin content
  {
    path: 'blog/thin-note.html',
    title: 'Studio Closed 23 to 30 December | Harbour Lights',
    desc: 'The studio is closed between Christmas and New Year. Orders placed then ship on 2 January.',
    h1: 'Studio closed for a week',
    thin: true,
    body: p('The studio closes from 23 to 30 December. Orders placed in that week ship on 2 January. The shop stays open, and the gift cards still send instantly by email. Happy holidays from both of us.'),
  },

  // near-duplicate pair
  {
    path: 'blog/rainy-day-candles.html',
    title: 'Five Candles for a Rainy Day | Harbour Lights',
    desc: 'Five scents we light when it rains: petrichor, smoke, tea, wool and a little citrus to lift a grey afternoon.',
    h1: 'Candles for a rainy day',
    body: RAINY('Five candles we light when it rains'),
  },
  {
    path: 'blog/rainy-day-candles-2.html',
    title: 'Our Favourite Candles for Wet Weather | Harbour Lights',
    desc: 'The scents we reach for in wet weather, from lavender and rain to a smoky black tea.',
    h1: 'More candles for a rainy day',
    body: RAINY('Our favourite candles for wet weather'),
  },

  // no Open Graph or Twitter tags
  {
    path: 'blog/no-social.html',
    title: 'How We Name a New Candle Scent | Harbour Lights',
    desc: 'Every Harbour Lights scent is named after a place or thing on the harbour. How a blend gets its name.',
    h1: 'How we name a scent',
    og: false,
    body: p(
      'Every scent we make is named after something you can see, hear or smell from the studio window. Tide Pool, Fog Bell, Storm Lantern and Lighthouse Keeper all started as notes in the margin of a pouring log.',
      'A blend gets its name last. We develop it first, sometimes over twenty or thirty test pours, and only once it is finished do we stand at the window and ask what it smells like. The answer is usually obvious once we stop thinking about perfume and start thinking about the harbour.',
      'There are two rules. The name has to be a real thing, not a mood, so nothing called Serenity or Calm. And it has to work said out loud over the phone, because a surprising number of orders still come in that way.',
      'Some names never make it. Bilge Water was a perfectly nice vetiver blend, and it was never going to sell.',
    ),
  },

  // meta refresh redirect
  {
    path: 'blog/moved.html',
    title: 'Wick Guide Has Moved | Harbour Lights',
    desc: 'Our guide to choosing a candle wick has moved to a new address in the candle care journal.',
    h1: 'This page has moved',
    thin: true,
    head: `<meta http-equiv="refresh" content="0; url=${abs('blog/choosing-a-wick.html')}">`,
    body: p(`The wick guide now lives at ${a('blog/choosing-a-wick.html', 'How to choose a candle wick')}.`),
  },

  // robots meta nofollow
  {
    path: 'blog/nofollow-page.html',
    title: 'Customer Photos of Harbour Lights Candles | Harbour Lights',
    desc: 'Photos customers have sent us of their candles at home, with the scent and the room they burn it in.',
    h1: 'Customer photos',
    robots: 'index, nofollow',
    body:
      p(
        'Customers send us photos of their candles at home, and with permission we share a few here each month. This month: Tide Pool in a Clifton bathroom, a row of tea lights along a canal boat window, and Storm Lantern beside a wood burner in the Brecon Beacons.',
        'What we notice in almost every photo is the melt pool. The candles that look best, even in pictures, are the ones burned long enough to melt right across, with a flat surface and clean glass. A good pool photographs well and burns well.',
        'If you would like your photo on this page, send it to the studio with the scent and the room it is in. We never use names, only first initials and a town, and we ask before we post anything.',
      ) +
      ul([a('products/tide-pool.html', 'Tide Pool'), a('products/storm-lantern.html', 'Storm Lantern'), a('products/tea-lights.html', 'Tea lights')]),
  },

  // content only appears after JavaScript runs
  {
    path: 'blog/js-only.html',
    title: 'Candle Burn Time Calculator | Harbour Lights',
    desc: 'Work out how many evenings a candle will last from its wax weight and how long you burn it each time.',
    h1: 'Burn time calculator',
    thin: true,
    body:
      '<div id="calculator"></div>\n' +
      `<script>
document.getElementById('calculator').innerHTML = [
  '<p>A container candle burns roughly seven to eight grams of soy wax an hour, a little less in a cold room and a little more with two wicks. Divide the wax weight on the label by seven and a half and you have its rated burn time in hours.</p>',
  '<p>From there, divide by the length of a typical evening. A two hundred gram jar gives about twenty-six hours, which is thirteen evenings of two hours or seven of four. A one hundred gram tin gives about thirteen hours, or six or seven evenings.</p>',
  '<p>Real candles fall short of the rating when the wick is not trimmed, when they burn in a draught, or when they are blown out with a centimetre of wax still unmelted around the edge. Trim before every lighting and let each session melt across, and you will get within a few hours of the figure.</p>',
  '<p>Enter the wax weight and your usual evening below to see the estimate for your own candle. The calculator assumes one wick per seventy millimetres of jar width and a room between seventeen and twenty-one degrees, which covers most living rooms in a British winter.</p>',
  '<p>Tea lights are the exception: at around fourteen grams each they burn for four hours, so a pack of twelve gives a little under fifty hours in total.</p>'
].join('');
</script>`,
  },

  // title identical to the H1
  {
    path: 'blog/title-same-as-h1.html',
    title: 'Candle Making Workshops in Bristol',
    desc: 'A three-hour candle making workshop in the Bristol studio: pour two jars and a tin, and take them home.',
    h1: 'Candle Making Workshops in Bristol',
    body: p(
      'Once a month we run a three-hour workshop in the studio for up to six people. You will choose a wick, blend a fragrance from twelve oils, pour two jar candles and a travel tin, and take them home in a box at the end of the afternoon.',
      'No experience is needed. We cover wax temperatures, fragrance loads, wick sizes and the safety rules, and you will see why a candle needs two weeks to cure before it smells of anything. Tea, coffee and cake are included.',
      'The workshop runs on the last Sunday of each month from two until five. Places cost sixty-five pounds and usually sell out a few weeks ahead, so book early if you want a particular date.',
      'We can also run private workshops for birthdays, hen parties and team days for groups of four to six, on weekday evenings or at weekends by arrangement.',
    ),
  },

  // ------------------------------------------------------------ about
  {
    path: 'about/index.html',
    title: 'About Our Bristol Candle Studio | Harbour Lights',
    desc: 'Harbour Lights is a two-person candle studio above a boatyard in Bristol, pouring small batches since 2019.',
    h1: 'About the studio',
    control: true,
    body:
      p(
        'Harbour Lights started in 2019 on a kitchen table in Totterdown, with a camping stove, a saucepan of wax and a lot of ruined jars. By the second winter there were enough orders to rent the room above the boatyard where we still pour every candle today.',
        'There are two of us. Mara develops the scents and runs the test burns; Dev pours, packs and answers most of the email. We make around four hundred candles a month, more in the run up to Christmas, and every one passes through both pairs of hands.',
        'We have kept the business small on purpose. Small batches mean we can change a wick size the day a test burn goes wrong, pour a scent again when people ask for it, and still know most of our regular customers by name.',
      ) +
      ul([a('about/team.html', 'Meet the team'), a('about/history.html', 'Our history'), a('contact/index.html', 'Visit the studio')]),
  },

  // no lang attribute, no viewport
  {
    path: 'about/team.html',
    title: 'Meet the Two People Behind Harbour Lights | Harbour Lights',
    desc: 'Mara develops every scent and Dev pours every candle. A short introduction to the team.',
    h1: 'Meet the team',
    lang: null,
    viewport: null,
    body: p(
      'Mara trained as a chemist and spent ten years making flavours for a food company before she started blending fragrance at home. She develops every Harbour Lights scent, keeps the pouring logs and runs every test burn. She is the reason the studio smells of something different every week.',
      'Dev was a carpenter. He built the pouring bench, the curing shelves and the packing table, and he pours most of the candles, packs every order and replies to nearly all the email. If you have written to us, it was probably Dev who answered.',
      'Between them they make around four hundred candles a month. In December that roughly doubles, and Mara\'s sister comes in to help with packing for the last two weeks before Christmas.',
      'Neither of them likes having their photo taken, which is why this page has none.',
    ),
  },

  // viewport blocks zoom
  {
    path: 'about/history.html',
    title: 'Our History, Kitchen Table to Studio | Harbour Lights',
    desc: 'How Harbour Lights went from a camping stove in a Totterdown kitchen to a studio above a Bristol boatyard.',
    h1: 'Our history',
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
    body: p(
      'The first Harbour Lights candles were poured in 2019 for a Christmas market stall in Bedminster. There were sixty of them, in mismatched jars from charity shops, and they sold out by lunchtime on the first day.',
      'The next year the market was cancelled and the orders came by email instead. By spring there were too many to pour on a kitchen table, so we rented a small room above a boatyard on the harbour. The view from its window gave the business its name.',
      'In 2022 we switched every candle to a rapeseed and soy blend grown in Europe, and in 2024 we dropped plastic from our packaging entirely. In 2025 we started running workshops, which are now booked months ahead.',
      'We still pour in batches of forty, by hand, in the same room. The stove has been replaced, but the first saucepan hangs on the wall.',
    ),
  },

  // ------------------------------------------------------------ contact
  {
    path: 'contact/index.html',
    title: 'Contact and Visit the Studio | Harbour Lights',
    desc: 'Find the studio on the Bristol harbourside, see opening hours, or call or email the team.',
    h1: 'Visit or contact us',
    body: p(
      'The studio is open to visitors on the first Saturday of every month from ten until four, and by appointment on weekdays. It is up one flight of stairs above the boatyard, so please call ahead if you need step-free access and we will bring candles down to you.',
      'Harbour Lights Candle Co., Unit 4, Wapping Wharf Boatyard, Bristol BS1 6WW. Telephone 0117 496 0123.',
      'Email reaches us fastest. We answer within one working day, usually sooner, and we are happy to help with wick problems, gift orders, wholesale enquiries and workshop bookings.',
      'Parking is limited on the harbourside. The nearest car park is a five minute walk away, and the ferry stops at the quay outside the boatyard every twenty minutes in summer and every forty in winter.',
      `Wholesale accounts are open to independent shops in the UK. Send us the name of your shop and a link to your website, and we will post a set of samples. Existing stockists can see the ${a('wholesale/price-list.html', 'wholesale price list')}.`,
    ),
  },

  // ------------------------------------------------------------ crawl depth chain + dead end
  {
    path: 'archive/index.html',
    title: 'Past Seasonal Candle Collections | Harbour Lights',
    desc: 'Every seasonal Harbour Lights collection since 2019, by year, with the scents in each.',
    h1: 'Past seasonal collections',
    body:
      p(
        'Each season we pour a short run of scents that do not stay in the range. This archive keeps a record of every seasonal collection we have made since 2019: what was in it, how it was received, and whether any of it came back.',
        'The collections are listed by year. A few scents have graduated from the archive to the permanent range; Storm Lantern began as a one-off for the autumn of 2021 and has been poured every month since.',
        'If there is a retired scent you miss, tell us. Enough requests and we will pour a batch, and any remaining jars of retired blends turn up in the archive sale from time to time.',
        'Most collections ran to two or three batches of forty, so a scent from the archive was only ever made a hundred or so times. That is part of the fun of the seasonal runs: we can try a blend that might not sell all year round and see who it finds.',
      ) +
      ul([a('archive/2025/index.html', 'Collections from 2025')]),
  },
  {
    path: 'archive/2025/index.html',
    title: 'Seasonal Candle Collections, 2025 | Harbour Lights',
    desc: 'The spring, summer, autumn and winter Harbour Lights collections from 2025.',
    h1: 'Collections from 2025',
    body:
      p(
        'In 2025 we made four seasonal collections. Spring was a set of three green scents built around wild garlic, nettle and elderflower. Summer was the brightest we have done: grapefruit, sea fennel and a coconut wax that we will not use again because it softened in the July heat.',
        'Autumn was the largest collection we have poured, with six scents built around woodsmoke, apples and wet leaves, and it ran into a second and third batch. Winter was a single scent, Frost Fair, made for the Christmas market and sold out in nine days.',
        'Each collection has its own page with the full list of scents, the notes from the test burns and what customers told us about them. The autumn notes are the most detailed because it was the collection that taught us the most about wicking smoky blends.',
        'We keep these records partly for customers and partly for ourselves. When a scent is requested again, the pouring logs on these pages are how we rebuild it exactly.',
      ) +
      ul([a('archive/2025/autumn/index.html', 'Autumn 2025')]),
  },
  {
    path: 'archive/2025/autumn/index.html',
    title: 'Autumn 2025 Candle Collection | Harbour Lights',
    desc: 'Six autumn scents from 2025: woodsmoke, apples, wet leaves and a toffee apple candle that sold out twice.',
    h1: 'Autumn 2025',
    body:
      p(
        'Autumn 2025 was six scents poured over twelve weeks. Orchard Bonfire paired apple and woodsmoke. Leaf Fall was wet oak leaves and moss. Toffee Apple sold out twice and is the one we are asked about most often.',
        'Because the collection ran for so long, we kept weekly notes: which scents sold, which ones needed a wick change once the weather turned cold, and what the test burns showed. The notes are grouped by week below.',
        'Two lessons from the season changed how we work. Smoky blends need a wick one size larger than fruity ones at the same jar width, and anything with a high vanilla content discolours within a month, so we now warn customers on the label.',
        'The rest of the autumn scents are still in the archive sale in small numbers, and Orchard Bonfire is on the shortlist to return as a permanent scent next year.',
      ) +
      ul([a('archive/2025/autumn/week-40/index.html', 'Week 40 notes')]),
  },
  {
    path: 'archive/2025/autumn/week-40/index.html',
    title: 'Autumn 2025, Week 40 Pouring Notes | Harbour Lights',
    desc: 'Pouring notes from week 40 of autumn 2025: a cold snap, a wick change and the first Maple and Smoke batch.',
    h1: 'Week 40 notes',
    body:
      p(
        'Week 40 was the first cold week of the season. The studio dropped to fourteen degrees overnight and two batches of Leaf Fall set with sink holes beside the wicks, which we had to fill with a second pour the next morning.',
        'It was also the week we poured the first batch of a new blend, Maple and Smoke, as a test for the following year. Forty jars went on the curing shelf and twelve went home with friends of the studio for a fortnight of test burns.',
        'The wick change came on the Thursday. Orchard Bonfire had been leaving a ring of unmelted wax in the cold, so we went up one wick size for the rest of the run, and the complaints stopped.',
        'The full test notes for Maple and Smoke are on their own page, linked below, including the burn times our testers recorded at home and what they said about the scent.',
      ) +
      ul([a('archive/2025/autumn/week-40/maple-and-smoke.html', 'Maple and Smoke test notes')]),
  },
  {
    path: 'archive/2025/autumn/week-40/maple-and-smoke.html',
    title: 'Maple and Smoke Test Burn Notes | Harbour Lights',
    desc: 'Twelve testers burned Maple and Smoke for two weeks. Their burn times, the wick result and what changed.',
    h1: 'Maple and Smoke test notes',
    deadEnd: true,
    body: p(
      'Twelve testers burned a Maple and Smoke jar at home for two weeks and logged every session. The average burn time came to forty-six hours, four short of our fifty hour rating, and three testers reported a flame that grew too tall in the last quarter of the jar.',
      'That pointed to the wick. We dropped one size for the second batch and the late flame problem went away, while the full melt pool still formed in under three hours.',
      'On the scent, nine of the twelve liked it, two found the maple too sweet and one said it smelled like a pancake breakfast on a bonfire, which we took as a compliment. We reduced the maple by ten per cent for the second batch.',
      'Maple and Smoke is planned for the 2026 autumn collection. These notes stay here as the record of how it was developed.',
      'For anyone pouring a similar blend at home: maple accords are heavy and sweet, and they sink in the wax as it cools. Stir for a full two minutes after adding the oil, pour at a slightly higher temperature than usual, and let the jars cool slowly away from cold air so the surface sets smooth. We lost six jars of the first batch to cracked tops before we learned that.',
    ),
  },

  // ------------------------------------------------------------ hreflang
  {
    path: 'intl/en/index.html',
    title: 'International Shipping and Prices | Harbour Lights',
    desc: 'We ship Harbour Lights candles to the EU, the US and Canada. Delivery times, prices and customs.',
    h1: 'International shipping',
    lang: 'en',
    hreflang: [
      ['en', 'intl/en/index.html'],
      ['fr', 'intl/fr/index.html'],
      ['de', 'intl/de/index.html'],
    ],
    body:
      p(
        'We ship to every country in the European Union, to the United States and to Canada. Orders leave the studio within two working days and travel by tracked post.',
        'European deliveries take three to six working days and cost nine pounds. North American deliveries take five to ten working days and cost fourteen pounds. Orders to the EU are sent with duties paid, so there is nothing extra to pay at the door.',
        'Candles are classed as dangerous goods by some couriers because of their fragrance oils, so we cannot send them by express air. Tracked post is slower but reliable, and every parcel is insured for its full value.',
        'Glass jars travel in recycled card with paper padding. If anything arrives broken, send us a photo within seven days and we will send a replacement.',
      ) +
      ul([a('intl/fr/index.html', 'Livraison internationale (français)'), a('intl/de/index.html', 'Internationaler Versand (Deutsch)')]),
  },
  {
    path: 'intl/fr/index.html',
    title: 'Livraison internationale et tarifs | Harbour Lights',
    desc: 'Nous livrons les bougies Harbour Lights dans l’Union européenne, aux États-Unis et au Canada.',
    h1: 'Livraison internationale',
    lang: 'fr',
    hreflang: [['fr', 'intl/fr/index.html']],
    body: p(
      'Nous livrons dans tous les pays de l’Union européenne, aux États-Unis et au Canada. Les commandes quittent l’atelier sous deux jours ouvrés et voyagent en envoi suivi.',
      'Les livraisons en Europe prennent de trois à six jours ouvrés et coûtent neuf livres. Les droits de douane sont payés d’avance, il n’y a donc rien à régler à la livraison.',
      'Certains transporteurs classent les bougies parmi les marchandises dangereuses à cause des huiles parfumées, nous ne pouvons donc pas les expédier par avion express. L’envoi suivi est plus lent mais fiable, et chaque colis est assuré pour sa valeur totale.',
      'Les pots en verre voyagent dans du carton recyclé avec un calage en papier. Si un article arrive cassé, envoyez-nous une photo dans les sept jours et nous vous en enverrons un autre.',
      'Pour toute question sur une commande, écrivez-nous en français ou en anglais. Nous répondons sous un jour ouvré, et nous pouvons joindre une carte manuscrite en français pour un cadeau.',
    ),
  },
  {
    path: 'intl/de/index.html',
    title: 'Internationaler Versand und Preise | Harbour Lights',
    desc: 'Wir versenden Harbour Lights Kerzen in die EU, in die USA und nach Kanada.',
    h1: 'Internationaler Versand',
    lang: 'de',
    hreflang: [
      ['de', 'intl/de/index.html'],
      ['en-UK', 'intl/en/index.html'],
      ['fr', 'intl/fr/index.html'],
    ],
    body: p(
      'Wir versenden in alle Länder der Europäischen Union, in die Vereinigten Staaten und nach Kanada. Bestellungen verlassen die Werkstatt innerhalb von zwei Werktagen und reisen als Sendung mit Sendungsverfolgung.',
      'Lieferungen innerhalb Europas dauern drei bis sechs Werktage und kosten neun Pfund. Zölle werden im Voraus bezahlt, an der Tür fällt also nichts mehr an.',
      'Manche Paketdienste stufen Kerzen wegen der Duftöle als Gefahrgut ein, deshalb können wir sie nicht per Luftexpress verschicken. Der Versand mit Sendungsverfolgung ist langsamer, aber zuverlässig, und jedes Paket ist zum vollen Wert versichert.',
      'Glasgefäße reisen in recyceltem Karton mit Papierpolsterung. Kommt etwas zerbrochen an, schicken Sie uns innerhalb von sieben Tagen ein Foto, und wir senden Ersatz.',
      'Fragen zu einer Bestellung beantworten wir gern auf Englisch oder Deutsch, in der Regel innerhalb eines Werktages. Für Geschenke legen wir auf Wunsch eine handgeschriebene Karte bei, und größere Bestellungen für Geschäfte in Deutschland, Österreich und der Schweiz versenden wir zu einem eigenen Tarif.',
    ),
  },

  // ------------------------------------------------------------ robots.txt blocks it, sitemap lists it
  {
    path: 'wholesale/price-list.html',
    title: 'Wholesale Price List for Stockists | Harbour Lights',
    desc: 'Trade prices, minimum order quantities and delivery terms for shops that stock Harbour Lights candles.',
    h1: 'Wholesale price list',
    body: p(
      'This price list is for shops that already stock Harbour Lights. Trade prices are half the retail price before VAT, with a minimum first order of one hundred and fifty pounds and repeat orders from seventy-five pounds.',
      'Jar candles are packed in cases of six of one scent, tins in cases of twelve, and tea lights in cases of ten packs. Mixed cases are possible for a first order so you can see which scents sell in your shop before you commit.',
      'Orders ship within five working days by pallet or courier depending on size. Delivery is free over three hundred pounds; below that we charge cost. Payment terms are thirty days from invoice for accounts that have traded with us for six months, and payment with order before that.',
      'Display stands, testers and printed scent cards are free with any order over two hundred pounds. Ask about seasonal collections in August, because the autumn and winter runs sell out to stockists before they reach the website.',
    ),
  },

  // ------------------------------------------------------------ orphan: in the sitemap, linked from nowhere
  {
    path: 'products/hidden-reserve.html',
    title: 'Hidden Reserve, Oud and Sea Salt Candle | Harbour Lights',
    desc: 'Hidden Reserve is a limited oud and sea salt candle in a black ceramic vessel, poured twice a year.',
    h1: 'Hidden Reserve',
    orphan: true,
    body: p(
      'Hidden Reserve is the most expensive candle we pour and the one we make least often. Oud, sea salt and a dark rose sit in a hand-thrown black ceramic vessel made by a potter in Stokes Croft. There are two batches a year, each of twenty.',
      'The vessel holds three hundred grams of wax and two wicks and burns for around seventy hours. Ceramic holds heat longer than glass, so the pool stays liquid for a while after you blow it out; let it set before you move it.',
      'Once the candle is finished, the vessel makes a good plant pot or a pen pot, and the potter will refill it with a fresh pour if you bring it back to the studio.',
      'Fifty-five pounds.',
    ),
  },
]

// The near-duplicate pair shares every sentence but its opening line.
function RAINY(opening) {
  return p(
    `${opening}. Rain changes how a room smells: damp wool coats by the door, wet earth through the window, the kettle on more often than usual. These five candles work with that instead of fighting it.`,
    'Fog Bell is lavender and petrichor, the smell of rain on warm stone. It is the obvious choice and the one we light first. Storm Lantern brings dry smoke and black tea for a dark afternoon when the lamps go on at three o’clock.',
    'Lighthouse Keeper adds leather and tobacco, which makes a wet evening feel deliberate rather than gloomy. Tide Pool is the fresh one, salt and cedar, for when the damp has been in the house for a week and you want to clear it.',
    'The fifth is the odd one out: Sea Glass, with its green fig and cucumber, a reminder that the rain is what keeps everything outside so green. Light it in the kitchen while something cooks.',
    'Whichever you choose, rainy days are good days for a long burn. Stay in, let the pool melt right across, and the candle will thank you for it every time you light it after.',
  )
}

// ---------------------------------------------------------------- planted problems
// Every id here is listed in ISSUES.md and issues.json. `check` is the Crawl Cove
// check id that should report it; `alsoExpected` lists findings a page triggers
// as a side effect, so a crawler is not marked wrong for reporting them.

export const issues = [
  { id: 'TS-01', area: 'Titles', pages: ['products/sea-glass.html', 'products/sea-glass-large.html'], planted: 'Two different products share the title "Sea Glass Candle | Harbour Lights".', expect: 'Duplicate title on both URLs.', check: 'duplicate-title' },
  { id: 'TS-02', area: 'Titles', pages: ['products/salt-marsh.html'], planted: 'No <title> element at all.', expect: 'Missing title.', check: 'title' },
  { id: 'TS-03', area: 'Titles', pages: ['products/driftwood-and-amber.html'], planted: 'A 140-character title.', expect: 'Title too long (truncated in results).', check: 'title-length' },
  { id: 'TS-04', area: 'Titles', pages: ['products/pillar-candles.html'], planted: 'Two <title> elements with different text.', expect: 'Multiple title tags.', check: 'multiple-title-tags' },
  { id: 'TS-05', area: 'Titles', pages: ['blog/title-same-as-h1.html'], planted: 'The title and the H1 are the same string, with no brand or qualifier.', expect: 'Title identical to H1.', check: 'title-equals-h1' },
  { id: 'TS-06', area: 'Meta descriptions', pages: ['products/storm-lantern.html', 'products/fog-bell.html'], planted: 'Two products share one boilerplate meta description.', expect: 'Duplicate meta description on both URLs.', check: 'duplicate-meta-description' },
  { id: 'TS-07', area: 'Meta descriptions', pages: ['products/lighthouse-keeper.html'], planted: 'No meta description.', expect: 'Missing meta description.', check: 'meta-description', alsoExpected: ['social-meta (og:description is empty too)'] },
  { id: 'TS-08', area: 'Headings', pages: ['products/gift-box.html'], planted: 'No H1; the product name is an H2.', expect: 'Missing H1.', check: 'heading-h1' },
  { id: 'TS-09', area: 'Headings', pages: ['blog/two-headlines.html'], planted: 'Two H1 elements.', expect: 'More than one H1.', check: 'heading-h1' },
  { id: 'TS-10', area: 'Headings', pages: ['blog/wax-blends.html', 'blog/soy-vs-paraffin.html'], planted: 'Two different articles share the H1 "Choosing a candle wax".', expect: 'Duplicate H1 on both URLs.', check: 'duplicate-h1' },
  { id: 'TS-11', area: 'Headings', pages: ['blog/heading-skip.html'], planted: 'H1 is followed directly by H4s (no H2 or H3).', expect: 'Skipped heading level.', check: 'heading-order' },
  { id: 'TS-12', area: 'Indexing', pages: ['products/archive-sale.html'], planted: 'meta robots noindex on a page that is linked from the shop and listed in sitemap.xml.', expect: 'Noindex page; noindex URL in the sitemap.', check: 'robots-noindex, sitemap-non-indexable-url' },
  { id: 'TS-13', area: 'Indexing', pages: ['blog/nofollow-page.html'], planted: 'meta robots "index, nofollow".', expect: 'Page tells crawlers not to follow its links.', check: 'robots-nofollow' },
  { id: 'TS-14', area: 'Canonicals', pages: ['blog/old-guide.html'], planted: 'Canonical points to blog/first-burn-guide.html, which answers 404.', expect: 'Canonical target is broken (4xx).', check: 'canonical' , alsoExpected: ['sitemap-non-indexable-url (the sitemap lists a page whose canonical names another URL)'] },
  { id: 'TS-15', area: 'Canonicals', pages: ['blog/winter-guide.html'], planted: 'Canonical points to products/archive-sale.html, which is noindex.', expect: 'Canonical points at a noindex page.', check: 'canonical-to-noindex' , alsoExpected: ['sitemap-non-indexable-url (the sitemap lists a page whose canonical names another URL)'] },
  { id: 'TS-16', area: 'Canonicals', pages: ['blog/care-tips.html'], planted: 'Canonical is .../seo-test-site/blog with no trailing slash, which GitHub Pages answers with a 301 to /blog/.', expect: 'Canonical points at a redirect.', check: 'canonical-to-redirect' , alsoExpected: ['sitemap-non-indexable-url (the sitemap lists a page whose canonical names another URL)'] },
  { id: 'TS-17', area: 'Canonicals', pages: ['blog/http-canonical.html'], planted: 'Canonical uses http:// on an https site.', expect: 'Insecure (http) canonical.', check: 'insecure-canonical' },
  { id: 'TS-18', area: 'Canonicals', pages: ['products/tea-lights.html'], planted: 'Two canonical tags pointing to different URLs.', expect: 'Multiple canonical tags.', check: 'multiple-canonical-tags' },
  { id: 'TS-19', area: 'Broken resources', pages: ['blog/broken-links.html', 'products/discontinued-tins.html'], planted: 'Link to products/discontinued-tins.html, which does not exist.', expect: 'Broken internal link: the target answers 404.', check: 'status-code-404' },
  { id: 'TS-20', area: 'Broken resources', pages: ['blog/broken-links.html'], planted: 'Image img/supplier-map.png does not exist.', expect: 'Broken image (404).', check: 'broken-image' },
  { id: 'TS-21', area: 'Broken resources', pages: ['blog/broken-links.html'], planted: 'Stylesheet css/old-theme.css does not exist.', expect: 'Broken stylesheet (404). Crawlers that do not render or fetch CSS will not see it.', check: 'broken-script-or-stylesheet' },
  { id: 'TS-22', area: 'Broken resources', pages: ['blog/broken-links.html'], planted: 'External link to https://crawlcove.com/seo-test-site-supplier-directory, which answers 404.', expect: 'Broken external link.', check: 'broken-external-link' },
  { id: 'TS-23', area: 'Images', pages: ['blog/image-problems.html'], planted: 'img/melting-pots.png has no alt attribute.', expect: 'Image missing alt text.', check: 'image-alt' },
  { id: 'TS-24', area: 'Images', pages: ['blog/image-problems.html'], planted: 'img/curing-shelves.png has alt="image".', expect: 'Generic, meaningless alt text.', check: 'image-alt-generic' },
  { id: 'TS-25', area: 'Images', pages: ['blog/image-problems.html'], planted: 'img/packing-table.png has no width or height.', expect: 'Image without dimensions (layout shift).', check: 'image-missing-dimensions' },
  { id: 'TS-26', area: 'Images', pages: ['blog/image-problems.html'], planted: 'The first image on the page (likely the LCP image) has loading="lazy".', expect: 'Lazy-loaded first image.', check: 'lazy-loaded-first-image' },
  { id: 'TS-27', area: 'Images', pages: ['blog/image-problems.html'], planted: 'img/harbour-panorama.png is an uncompressed PNG over 500 KB shown at 900x300.', expect: 'Oversized image file.', check: 'image-oversized' },
  { id: 'TS-28', area: 'Security', pages: ['blog/mixed-content.html'], planted: 'An image loaded over http:// on an https page.', expect: 'Mixed content.', check: 'mixed-content' },
  { id: 'TS-29', area: 'Links', pages: ['blog/link-problems.html'], planted: 'Anchor text "click here" and "read more".', expect: 'Non-descriptive anchor text.', check: 'non-descriptive-anchor-text' },
  { id: 'TS-30', area: 'Links', pages: ['blog/link-problems.html'], planted: 'rel="nofollow" on the only link from this page to blog/care-tips.html.', expect: 'Nofollowed internal link.', check: 'nofollow-internal-link' },
  { id: 'TS-31', area: 'Links', pages: ['blog/link-problems.html'], planted: 'An icon-only link (an svg with aria-hidden) with no text or label.', expect: 'Link with no accessible name.', check: 'link-no-name' },
  { id: 'TS-32', area: 'Links', pages: ['blog/link-problems.html'], planted: 'href="https://www gov.uk/firekills" (a space in the host name, so it is not a URL at all).', expect: 'Malformed link.', check: 'malformed-links' },
  { id: 'TS-53', area: 'Links', pages: ['blog/link-problems.html', 'blog/htps//www.gov.uk/fire-safety'], planted: 'href="htps//www.gov.uk/fire-safety": the misspelt scheme makes it a RELATIVE link, so it resolves to blog/htps//www.gov.uk/fire-safety on this site.', expect: 'Broken link: that URL answers 404.', check: 'status-code-404' },
  { id: 'TS-33', area: 'Links', pages: ['blog/link-problems.html'], planted: 'Internal link to /seo-test-site/blog without the trailing slash, which 301s.', expect: 'Internal link to a redirect.', check: 'internal-link-to-redirect' },
  { id: 'TS-34', area: 'Site structure', pages: ['products/hidden-reserve.html'], planted: 'Listed in sitemap.xml, linked from no page.', expect: 'Orphan page.', check: 'orphan-page' },
  { id: 'TS-35', area: 'Site structure', pages: ['products/new-arrival.html'], planted: 'Linked from the shop but missing from sitemap.xml.', expect: 'Indexable page not in the sitemap.', check: 'page-missing-from-sitemap' },
  { id: 'TS-36', area: 'Site structure', pages: ['products/sold-out.html'], planted: 'sitemap.xml lists a URL that answers 404.', expect: 'Sitemap lists a broken URL.', check: 'sitemap-non-indexable-url' },
  { id: 'TS-54', area: 'Site structure', pages: ['wholesale/price-list.html'], planted: 'robots.txt (at the host root, crawlcove.github.io/robots.txt) disallows /seo-test-site/wholesale/, and sitemap.xml lists this page.', expect: 'Sitemap lists a URL robots.txt blocks.', check: 'sitemap-non-indexable-url' },
  { id: 'TS-37', area: 'Site structure', pages: ['archive/2025/autumn/week-40/maple-and-smoke.html'], planted: 'Five clicks from the home page (home, archive, 2025, autumn, week 40, page).', expect: 'Excessive crawl depth.', check: 'excessive-crawl-depth' },
  { id: 'TS-38', area: 'Site structure', pages: ['archive/2025/autumn/week-40/maple-and-smoke.html'], planted: 'No links out of the page at all, no navigation either.', expect: 'Dead-end page.', check: 'dead-end-page' },
  { id: 'TS-39', area: 'Site structure', pages: ['shop/index.html'], planted: 'Sort links and a colour by size filter grid create 26 query-string variants of the shop page (each canonicalises back to /shop/).', expect: 'One path explodes into 25 or more parameter URLs.', check: 'parameter-url-explosion' },
  { id: 'TS-40', area: 'URLs', pages: ['products/Gift_Set_LARGE.html'], planted: 'Capital letters and underscores in the URL.', expect: 'Inconsistent URL format.', check: 'url-consistency' },
  { id: 'TS-41', area: 'Content', pages: ['blog/thin-note.html'], planted: 'About 40 words of body copy.', expect: 'Thin content.', check: 'thin-content' },
  { id: 'TS-42', area: 'Content', pages: ['blog/rainy-day-candles.html', 'blog/rainy-day-candles-2.html'], planted: 'Two articles whose body differs only in the first sentence.', expect: 'Near-duplicate content on both URLs.', check: 'near-duplicate-content' },
  { id: 'TS-43', area: 'Content', pages: ['blog/js-only.html'], planted: 'All body copy is written into the page by JavaScript; the HTML has none.', expect: 'Content depends on JavaScript (needs a rendering crawl to see it).', check: 'content-depends-on-js', alsoExpected: ['thin-content (a crawler that does not render sees an almost empty page)'] },
  { id: 'TS-44', area: 'Redirects', pages: ['blog/moved.html'], planted: '<meta http-equiv="refresh" content="0; url=..."> to the wick guide.', expect: 'Meta refresh redirect.', check: null, alsoExpected: ['thin-content (the holding page is a single line)'] },
  { id: 'TS-45', area: 'Mobile', pages: ['about/team.html'], planted: 'No viewport meta tag.', expect: 'Missing viewport.', check: 'viewport-missing' },
  { id: 'TS-46', area: 'Mobile', pages: ['about/history.html'], planted: 'Viewport sets maximum-scale=1, user-scalable=no.', expect: 'Viewport blocks zoom.', check: 'viewport-blocks-zoom' },
  { id: 'TS-47', area: 'Language', pages: ['about/team.html'], planted: '<html> has no lang attribute.', expect: 'Missing html lang.', check: 'html-lang' },
  { id: 'TS-48', area: 'International', pages: ['intl/en/index.html', 'intl/fr/index.html'], planted: 'The English page lists the French one as an alternate; the French page does not link back.', expect: 'hreflang missing return link.', check: 'hreflang' },
  { id: 'TS-49', area: 'International', pages: ['intl/de/index.html'], planted: 'hreflang="en-UK" (the region code for the United Kingdom is GB).', expect: 'Invalid hreflang code.', check: 'hreflang' },
  { id: 'TS-50', area: 'Structured data', pages: ['products/ember.html'], planted: 'One JSON-LD block has a trailing comma (invalid JSON); a second Product block has no name.', expect: 'Unparseable JSON-LD; Product missing a required property.', check: 'schema-validity' },
  { id: 'TS-51', area: 'Social', pages: ['blog/no-social.html'], planted: 'No Open Graph or Twitter Card tags.', expect: 'Missing social meta.', check: 'social-meta' },
  { id: 'TS-52', area: 'Local', pages: ['contact/index.html'], planted: 'A street address with a UK postcode and phone number in the main content; no LocalBusiness markup anywhere.', expect: 'Local business markup missing.', check: 'local-business-markup-missing' },
]

export const extraSitemapUrls = ['products/sold-out.html']
