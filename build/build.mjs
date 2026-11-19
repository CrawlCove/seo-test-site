// node build/build.mjs  ->  writes docs/ (the GitHub Pages site), ISSUES.md and issues.json.
// Re-run after editing build/pages.mjs; never hand-edit the output.
import { mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { BASE, ROOT, abs, href, pages, issues, extraSitemapUrls } from './pages.mjs'
import { png } from './png.mjs'

const repo = join(dirname(fileURLToPath(import.meta.url)), '..')
const out = join(repo, 'docs')
const REPO_URL = 'https://github.com/CrawlCove/seo-test-site'
const LASTMOD = '2026-11-19'

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const words = (html) => html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length

function write(rel, data) {
  const f = join(out, rel)
  mkdirSync(dirname(f), { recursive: true })
  writeFileSync(f, data)
}

const nav = `<nav aria-label="Main">
      <a href="${href('index.html')}">Home</a>
      <a href="${href('shop/index.html')}">Shop</a>
      <a href="${href('blog/index.html')}">Journal</a>
      <a href="${href('about/index.html')}">About</a>
      <a href="${href('contact/index.html')}">Contact</a>
    </nav>`

const notice = `<p class="notice">This is a deliberately broken <strong>SEO test site</strong>. Harbour Lights is fictional. Every planted problem is listed in <a href="${REPO_URL}/blob/main/ISSUES.md">ISSUES.md</a>.</p>`

function render(pg) {
  const url = abs(pg.path)
  const head = []
  head.push('<meta charset="utf-8">')
  if (pg.viewport !== null) head.push(`<meta name="viewport" content="${pg.viewport ?? 'width=device-width, initial-scale=1'}">`)
  const titles = pg.title === null ? [] : Array.isArray(pg.title) ? pg.title : [pg.title]
  for (const t of titles) head.push(`<title>${esc(t)}</title>`)
  if (pg.desc) head.push(`<meta name="description" content="${esc(pg.desc)}">`)
  if (pg.robots) head.push(`<meta name="robots" content="${pg.robots}">`)
  const canon = pg.canonicalUrl ? [pg.canonicalUrl] : (Array.isArray(pg.canonical) ? pg.canonical : [pg.canonical ?? pg.path]).map(abs)
  for (const c of canon) head.push(`<link rel="canonical" href="${c}">`)
  for (const [code, p] of pg.hreflang ?? []) head.push(`<link rel="alternate" hreflang="${code}" href="${abs(p)}">`)
  if (pg.og !== false) {
    const t = titles[0] ?? pg.h1 ?? 'Harbour Lights'
    head.push(
      `<meta property="og:type" content="website">`,
      `<meta property="og:title" content="${esc(t)}">`,
      `<meta property="og:description" content="${esc(pg.desc ?? '')}">`,
      `<meta property="og:url" content="${url}">`,
      `<meta property="og:image" content="${BASE}img/og.png">`,
      `<meta name="twitter:card" content="summary_large_image">`,
    )
  }
  head.push(`<link rel="stylesheet" href="${ROOT}css/site.css">`)
  if (pg.head) head.push(pg.head)
  for (const j of pg.jsonld ?? []) head.push(`<script type="application/ld+json">\n${JSON.stringify(j, null, 2)}\n</script>`)
  for (const j of pg.jsonldRaw ?? []) head.push(`<script type="application/ld+json">\n${j}\n</script>`)

  const h1s = pg.h1 === null ? '' : `<h1>${esc(Array.isArray(pg.h1) ? pg.h1[0] : pg.h1)}</h1>`
  const img = pg.img ? `\n<img src="${ROOT}${pg.img.src}" alt="${esc(pg.img.alt)}" width="${pg.img.w}" height="${pg.img.h}">` : ''
  const lang = pg.lang === null ? '' : ` lang="${pg.lang ?? 'en-GB'}"`
  const chrome = !pg.deadEnd
  return `<!doctype html>
<html${lang}>
<head>
${head.map((h) => '  ' + h).join('\n')}
</head>
<body>
  <header>
    ${chrome ? `<a class="brand" href="${href('index.html')}">Harbour Lights</a>\n    ${nav}` : '<span class="brand">Harbour Lights</span>'}
  </header>
  <main>
${pg.preH1 ?? ''}${h1s}${img}
${pg.body}${pg.path.startsWith('products/') ? '\n' + CARE : ''}
  </main>
  <footer>
    ${chrome ? notice : '<p class="notice">This is a deliberately broken SEO test site. Every planted problem is listed in ISSUES.md in the CrawlCove/seo-test-site repository.</p>'}
    ${chrome ? FOOTER : ''}
    <p>Harbour Lights Candle Co. is a fictional business. Test site maintained by Crawl Cove.</p>
  </footer>
</body>
</html>
`
}

const FOOTER = `<p>Free UK delivery on orders over thirty pounds. Orders placed before noon on a weekday leave the studio the same day by tracked post. Every candle is poured by hand in small batches, cured for two weeks and packed without plastic.</p>
    <p><a href="${href('shop/index.html')}">Shop</a> · <a href="${href('blog/index.html')}">Candle care journal</a> · <a href="${href('about/index.html')}">About</a> · <a href="${href('contact/index.html')}">Contact</a></p>`

const CARE = `<h2>Delivery and care</h2>
<p>Orders leave the studio within two working days by tracked post. Trim the wick to five millimetres before each lighting, let every burn melt right across the surface, and never burn for more than four hours at a time. Stop when one centimetre of wax remains. Keep candles away from draughts, children and pets, and never leave a lit candle in an empty room.</p>`

const CSS = `:root{--ink:#0b1b2b;--sea:#0e7490;--sand:#f6f1e7}
*{box-sizing:border-box}body{margin:0;font:17px/1.6 Georgia,serif;color:var(--ink);background:var(--sand)}
header,main,footer{max-width:46rem;margin:0 auto;padding:1rem 1.25rem}
header{display:flex;flex-wrap:wrap;gap:1rem;align-items:baseline;border-bottom:1px solid #d8cfbf}
.brand{font-weight:bold;font-size:1.25rem;color:var(--ink);text-decoration:none}
nav a{margin-right:.9rem;color:var(--sea)}a{color:var(--sea)}
img{max-width:100%;height:auto;display:block;margin:1rem 0;border-radius:6px}
footer{font-size:.85rem;color:#4b5563;border-top:1px solid #d8cfbf}
.notice{background:#fff7d6;border:1px solid #e9d68a;padding:.5rem .75rem;border-radius:6px}
`

function images() {
  const flat = (r, g, b, w = 400, h = 300) => png(w, h, (x, y) => {
    const s = Math.round(20 * Math.sin((x + y) / 37))
    return [Math.max(0, Math.min(255, r + s)), Math.max(0, Math.min(255, g + s)), Math.max(0, Math.min(255, b + s))]
  })
  write('img/tide-pool.png', flat(182, 120, 54))
  write('img/wick-test.png', flat(230, 196, 120))
  write('img/studio-bench.png', flat(120, 96, 72))
  write('img/melting-pots.png', flat(160, 160, 168))
  write('img/curing-shelves.png', flat(196, 170, 130))
  write('img/packing-table.png', flat(210, 190, 160))
  write('img/photo-setup.png', flat(236, 236, 230))
  write('img/ember.png', flat(150, 60, 30))
  write('img/og.png', flat(14, 116, 144, 1200, 630))
  // Deliberately heavy: deterministic noise, stored uncompressed, well over 500 KB.
  let seed = 7
  const rnd = () => ((seed = (seed * 1103515245 + 12345) & 0x7fffffff) >>> 16) & 255
  write('img/harbour-panorama.png', png(900, 300, () => [rnd(), rnd(), rnd()], 0))
}

function sitemap() {
  const urls = pages.filter((p) => p.sitemap !== false).map((p) => abs(p.path)).concat(extraSitemapUrls.map(abs))
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc><lastmod>${LASTMOD}</lastmod></url>`).join('\n')}
</urlset>
`
}

function notFound() {
  return `<!doctype html>
<html lang="en-GB">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Page not found | Harbour Lights</title><meta name="robots" content="noindex"><link rel="stylesheet" href="${ROOT}css/site.css"></head>
<body><main><h1>Page not found</h1><p>This URL does not exist on the SEO test site. GitHub Pages answers it with a real 404 status. <a href="${href('index.html')}">Back to the home page</a>.</p></main></body>
</html>
`
}

function issuesDoc() {
  const byArea = new Map()
  for (const i of issues) {
    if (!byArea.has(i.area)) byArea.set(i.area, [])
    byArea.get(i.area).push(i)
  }
  const controls = pages.filter((p) => p.control).map((p) => `- ${abs(p.path)}`)
  const sections = [...byArea].map(([area, list]) => {
    const rows = list.map((i) => `| ${i.id} | ${i.pages.map((p) => `[${p.replace(/index\.html$/, '')}](${abs(p)})`).join('<br>')} | ${esc(i.planted).replace(/\|/g, '\\|')} | ${i.expect}${i.alsoExpected ? ' Also expected: ' + i.alsoExpected.map((x) => x.replace(/^([a-z0-9-]+)/, '`$1`')).join('; ') + '.' : ''} | ${i.check ? i.check.split(', ').map((c) => '`' + c + '`').join(', ') : 'none yet'} |`)
    return `## ${area}\n\n| ID | URL | What is planted | A crawler should report | Crawl Cove check |\n|---|---|---|---|---|\n${rows.join('\n')}`
  })
  return `# ISSUES.md: every problem planted in the SEO test site

Site: ${BASE}

This file is generated from \`build/pages.mjs\` together with the pages, so it always matches what is deployed. The same list is in [\`issues.json\`](issues.json) for scripts that score a crawler automatically.

**${issues.length} planted problems** across ${pages.length} pages and ${extraSitemapUrls.length} sitemap-only URL. Each row says what is wrong, what a crawler should report, and which [Crawl Cove](https://crawlcove.com/?utm_source=github&utm_medium=seo-test-site) check reports it.

## How to score a crawler

1. Crawl ${BASE} with the tool under test, following internal links and reading [sitemap.xml](${BASE}sitemap.xml).
2. For each row below, mark it found or missed.
3. Any finding on a control page (listed at the end) is a false positive.

Some pages trigger a second, expected finding as a side effect (for example the noindex archive page is also a noindex URL in the sitemap). A crawler that reports those is not wrong.

${sections.join('\n\n')}

## Control pages (should be clean)

These pages carry no planted problem. A finding on one of them is a false positive, apart from site-wide notes such as missing security headers, which GitHub Pages does not let a site set.

${controls.join('\n')}

## What GitHub Pages cannot plant

The site is static and hosted on GitHub Pages, so some problems cannot be planted here:

- **Server redirects, redirect chains and loops.** Pages has no redirect rules. The only real 301 is its trailing-slash redirect (\`/blog\` to \`/blog/\`), used in TS-16 and TS-33.
- **5xx errors, slow responses, 429 rate limits.** Every response comes from GitHub's CDN.
- **Most robots.txt problems.** robots.txt is only read at the host root, so it lives in a separate repo, [CrawlCove/crawlcove.github.io](https://github.com/CrawlCove/crawlcove.github.io). It declares the sitemap and carries one deliberate Disallow (TS-54); a malformed robots.txt would break every other test, so none is planted.
- **Soft 404s.** Pages returns a real 404 for any unknown URL.

Suggestions for problems Pages *can* host are welcome as issues or pull requests.
`
}

rmSync(out, { recursive: true, force: true })
const problems = []
for (const pg of pages) {
  const html = render(pg)
  const n = words(html.slice(html.indexOf('<body>')))
  if (!pg.thin && n < 230) problems.push(`${pg.path}: ${n} words, short by ${230 - n} (thin-content floor is 200)`)
  write(pg.path, html)
}
write('css/site.css', CSS)
write('sitemap.xml', sitemap())
write('404.html', notFound())
write('.nojekyll', '')
images()
writeFileSync(join(repo, 'ISSUES.md'), issuesDoc())
writeFileSync(join(repo, 'issues.json'), JSON.stringify({ site: BASE, generated: LASTMOD, issues: issues.map((i) => ({ ...i, urls: i.pages.map(abs), pages: undefined })), controls: pages.filter((p) => p.control).map((p) => abs(p.path)) }, null, 2) + '\n')

const known = new Set(pages.map((p) => p.path).concat(extraSitemapUrls, ['products/discontinued-tins.html', 'blog/first-burn-guide.html']))
for (const i of issues) for (const p of i.pages) if (!known.has(p)) problems.push(`${i.id} names unknown page ${p}`)
if (problems.length) {
  console.error(problems.join('\n'))
  process.exit(1)
}
console.log(`built ${pages.length} pages, ${issues.length} issues -> docs/`)
