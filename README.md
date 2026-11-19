# seo-test-site

A deliberately broken **SEO test site** for testing SEO crawlers and site audit tools. It is a small, realistic candle shop (Harbour Lights, fictional) with **54 planted SEO problems**, each one listed in [ISSUES.md](ISSUES.md) with the URL, what is wrong and what a crawler should report. Point any crawler at it and score what it finds.

**Test URL:** https://crawlcove.github.io/seo-test-site/

```sh
# any crawler, any settings: start here and follow links + sitemap.xml
https://crawlcove.github.io/seo-test-site/
https://crawlcove.github.io/seo-test-site/sitemap.xml

# machine-readable ground truth, for scoring a crawler in CI
curl -s https://raw.githubusercontent.com/CrawlCove/seo-test-site/main/issues.json
```

## What is planted

| Area | Problems | Examples |
|---|---|---|
| Titles and meta descriptions | 7 | duplicate titles, missing title, 140-character title, two `<title>` tags, duplicate and missing descriptions |
| Headings | 4 | missing H1, two H1s, the same H1 on two pages, H1 straight to H4 |
| Indexing and canonicals | 7 | noindex page in the sitemap, canonical to a 404, to a noindex page, to a redirect, over http, two canonical tags |
| Broken resources | 4 | internal 404 link, broken image, broken stylesheet, broken external link |
| Images | 5 | no alt, `alt="image"`, no dimensions, lazy-loaded first image, an 800 KB PNG |
| Links | 6 | "click here" anchors, nofollowed internal link, icon link with no name, malformed href, misspelt scheme that 404s, link to a redirect |
| Site structure and URLs | 8 | orphan page, page missing from the sitemap, 404 in the sitemap, robots-blocked URL in the sitemap, 5 clicks deep, dead end, parameter URLs, `Gift_Set_LARGE.html` |
| Content | 3 | thin page, near-duplicate pair, body copy written by JavaScript |
| Mobile, language, international | 5 | missing viewport, zoom blocked, no `lang`, hreflang without a return link, `hreflang="en-UK"` |
| Structured data, social, local, redirects, security | 5 | invalid JSON-LD, Product with no name, no Open Graph, address with no LocalBusiness, meta refresh, mixed content |

Five **control pages** carry no planted problem, so a finding on them is a false positive. The full list, with one row per problem, is in [ISSUES.md](ISSUES.md).

## How to use it

1. Crawl `https://crawlcove.github.io/seo-test-site/` with the tool you are testing.
2. Go down [ISSUES.md](ISSUES.md) and mark each row found or missed.
3. Check the control pages for false positives.

It is useful for comparing crawlers, for regression-testing your own crawler or audit script, for teaching technical SEO with a site you are allowed to crawl, and for demos and screenshots that do not expose a client's site. Crawl it as often as you like: it is static HTML on GitHub Pages.

## Works with Crawl Cove

Every problem here maps to a check in [Crawl Cove](https://crawlcove.com/?utm_source=github&utm_medium=seo-test-site), the desktop SEO crawler, and the check id is in the last column of ISSUES.md.

## Build it yourself

The pages, `sitemap.xml`, ISSUES.md and `issues.json` are all generated from one file, [`build/pages.mjs`](build/pages.mjs), so the list of problems cannot drift from the pages. Node 18+, no dependencies:

```sh
node build/build.mjs     # writes docs/ (the Pages site), ISSUES.md, issues.json
npx serve docs           # or any static server; links are rooted at /seo-test-site/
```

GitHub Pages cannot plant server redirects, 5xx errors, robots.txt rules or soft 404s; ISSUES.md explains why. Ideas for problems a static site *can* carry are welcome as issues or pull requests.

## Related tools

| Repo | What it does |
|---|---|
| [seo-crawler-cli](https://github.com/CrawlCove/seo-crawler-cli) | Headless whole-site SEO crawl for scripts and CI |
| [seo-audit-action](https://github.com/CrawlCove/seo-audit-action) | The same crawl as a GitHub Action on every pull request |
| [seo-mcp-server](https://github.com/CrawlCove/seo-mcp-server) | Crawl data for Claude, Cursor and other AI assistants |
| [claude-seo-plugin](https://github.com/CrawlCove/claude-seo-plugin) | Seven SEO skills for Claude backed by a real crawl |
| [seo-chrome-extension](https://github.com/CrawlCove/seo-chrome-extension) | On-page SEO checker for the current tab |
| [xml-sitemap-validator](https://github.com/CrawlCove/xml-sitemap-validator) | Validate a sitemap or sitemap index |
| [robots-txt-tester](https://github.com/CrawlCove/robots-txt-tester) | Lint robots.txt and test which URLs each bot may fetch |
| [redirect-chain-checker](https://github.com/CrawlCove/redirect-chain-checker) | Follow every redirect hop; flags chains, loops and meta refreshes |
| [hreflang-checker](https://github.com/CrawlCove/hreflang-checker) | Check hreflang codes, return tags and x-default |
| [schema-markup-validator](https://github.com/CrawlCove/schema-markup-validator) | Validate JSON-LD against rich result requirements |
| [screaming-frog-export-converter](https://github.com/CrawlCove/screaming-frog-export-converter) | Convert a Screaming Frog export to an open format |
| [seo-audit-google-sheets](https://github.com/CrawlCove/seo-audit-google-sheets) | Turn a crawl export into a Google Sheets audit |
| [seo-crawl-export-spec](https://github.com/CrawlCove/seo-crawl-export-spec) | Open JSON Schema for SEO crawl exports |
| [seo-crawl-export-js](https://github.com/CrawlCove/seo-crawl-export-js) | Load, query and convert crawl exports in JS/TS |
| [wordpress-seo-connector](https://github.com/CrawlCove/wordpress-seo-connector) | Apply crawl fixes to WordPress in bulk |

## License

Code: MIT. Page text and images: CC BY 4.0. See [LICENSE](LICENSE).
