# ISSUES.md: every problem planted in the SEO test site

Site: https://crawlcove.github.io/seo-test-site/

This file is generated from `build/pages.mjs` together with the pages, so it always matches what is deployed. The same list is in [`issues.json`](issues.json) for scripts that score a crawler automatically.

**54 planted problems** across 53 pages and 1 sitemap-only URL. Each row says what is wrong, what a crawler should report, and which [Crawl Cove](https://crawlcove.com/?utm_source=github&utm_medium=seo-test-site) check reports it.

## How to score a crawler

1. Crawl https://crawlcove.github.io/seo-test-site/ with the tool under test, following internal links and reading [sitemap.xml](https://crawlcove.github.io/seo-test-site/sitemap.xml).
2. For each row below, mark it found or missed.
3. Any finding on a control page (listed at the end) is a false positive.

Some pages trigger a second, expected finding as a side effect (for example the noindex archive page is also a noindex URL in the sitemap). A crawler that reports those is not wrong.

## Titles

| ID | URL | What is planted | A crawler should report | Crawl Cove check |
|---|---|---|---|---|
| TS-01 | [products/sea-glass.html](https://crawlcove.github.io/seo-test-site/products/sea-glass.html)<br>[products/sea-glass-large.html](https://crawlcove.github.io/seo-test-site/products/sea-glass-large.html) | Two different products share the title &quot;Sea Glass Candle \| Harbour Lights&quot;. | Duplicate title on both URLs. | `duplicate-title` |
| TS-02 | [products/salt-marsh.html](https://crawlcove.github.io/seo-test-site/products/salt-marsh.html) | No &lt;title&gt; element at all. | Missing title. | `title` |
| TS-03 | [products/driftwood-and-amber.html](https://crawlcove.github.io/seo-test-site/products/driftwood-and-amber.html) | A 140-character title. | Title too long (truncated in results). | `title-length` |
| TS-04 | [products/pillar-candles.html](https://crawlcove.github.io/seo-test-site/products/pillar-candles.html) | Two &lt;title&gt; elements with different text. | Multiple title tags. | `multiple-title-tags` |
| TS-05 | [blog/title-same-as-h1.html](https://crawlcove.github.io/seo-test-site/blog/title-same-as-h1.html) | The title and the H1 are the same string, with no brand or qualifier. | Title identical to H1. | `title-equals-h1` |

## Meta descriptions

| ID | URL | What is planted | A crawler should report | Crawl Cove check |
|---|---|---|---|---|
| TS-06 | [products/storm-lantern.html](https://crawlcove.github.io/seo-test-site/products/storm-lantern.html)<br>[products/fog-bell.html](https://crawlcove.github.io/seo-test-site/products/fog-bell.html) | Two products share one boilerplate meta description. | Duplicate meta description on both URLs. | `duplicate-meta-description` |
| TS-07 | [products/lighthouse-keeper.html](https://crawlcove.github.io/seo-test-site/products/lighthouse-keeper.html) | No meta description. | Missing meta description. Also expected: `social-meta` (og:description is empty too). | `meta-description` |

## Headings

| ID | URL | What is planted | A crawler should report | Crawl Cove check |
|---|---|---|---|---|
| TS-08 | [products/gift-box.html](https://crawlcove.github.io/seo-test-site/products/gift-box.html) | No H1; the product name is an H2. | Missing H1. | `heading-h1` |
| TS-09 | [blog/two-headlines.html](https://crawlcove.github.io/seo-test-site/blog/two-headlines.html) | Two H1 elements. | More than one H1. | `heading-h1` |
| TS-10 | [blog/wax-blends.html](https://crawlcove.github.io/seo-test-site/blog/wax-blends.html)<br>[blog/soy-vs-paraffin.html](https://crawlcove.github.io/seo-test-site/blog/soy-vs-paraffin.html) | Two different articles share the H1 &quot;Choosing a candle wax&quot;. | Duplicate H1 on both URLs. | `duplicate-h1` |
| TS-11 | [blog/heading-skip.html](https://crawlcove.github.io/seo-test-site/blog/heading-skip.html) | H1 is followed directly by H4s (no H2 or H3). | Skipped heading level. | `heading-order` |

## Indexing

| ID | URL | What is planted | A crawler should report | Crawl Cove check |
|---|---|---|---|---|
| TS-12 | [products/archive-sale.html](https://crawlcove.github.io/seo-test-site/products/archive-sale.html) | meta robots noindex on a page that is linked from the shop and listed in sitemap.xml. | Noindex page; noindex URL in the sitemap. | `robots-noindex`, `sitemap-non-indexable-url` |
| TS-13 | [blog/nofollow-page.html](https://crawlcove.github.io/seo-test-site/blog/nofollow-page.html) | meta robots &quot;index, nofollow&quot;. | Page tells crawlers not to follow its links. | `robots-nofollow` |

## Canonicals

| ID | URL | What is planted | A crawler should report | Crawl Cove check |
|---|---|---|---|---|
| TS-14 | [blog/old-guide.html](https://crawlcove.github.io/seo-test-site/blog/old-guide.html) | Canonical points to blog/first-burn-guide.html, which answers 404. | Canonical target is broken (4xx). Also expected: `sitemap-non-indexable-url` (the sitemap lists a page whose canonical names another URL). | `canonical` |
| TS-15 | [blog/winter-guide.html](https://crawlcove.github.io/seo-test-site/blog/winter-guide.html) | Canonical points to products/archive-sale.html, which is noindex. | Canonical points at a noindex page. Also expected: `sitemap-non-indexable-url` (the sitemap lists a page whose canonical names another URL). | `canonical-to-noindex` |
| TS-16 | [blog/care-tips.html](https://crawlcove.github.io/seo-test-site/blog/care-tips.html) | Canonical is .../seo-test-site/blog with no trailing slash, which GitHub Pages answers with a 301 to /blog/. | Canonical points at a redirect. Also expected: `sitemap-non-indexable-url` (the sitemap lists a page whose canonical names another URL). | `canonical-to-redirect` |
| TS-17 | [blog/http-canonical.html](https://crawlcove.github.io/seo-test-site/blog/http-canonical.html) | Canonical uses http:// on an https site. | Insecure (http) canonical. | `insecure-canonical` |
| TS-18 | [products/tea-lights.html](https://crawlcove.github.io/seo-test-site/products/tea-lights.html) | Two canonical tags pointing to different URLs. | Multiple canonical tags. | `multiple-canonical-tags` |

## Broken resources

| ID | URL | What is planted | A crawler should report | Crawl Cove check |
|---|---|---|---|---|
| TS-19 | [blog/broken-links.html](https://crawlcove.github.io/seo-test-site/blog/broken-links.html)<br>[products/discontinued-tins.html](https://crawlcove.github.io/seo-test-site/products/discontinued-tins.html) | Link to products/discontinued-tins.html, which does not exist. | Broken internal link: the target answers 404. | `status-code-404` |
| TS-20 | [blog/broken-links.html](https://crawlcove.github.io/seo-test-site/blog/broken-links.html) | Image img/supplier-map.png does not exist. | Broken image (404). | `broken-image` |
| TS-21 | [blog/broken-links.html](https://crawlcove.github.io/seo-test-site/blog/broken-links.html) | Stylesheet css/old-theme.css does not exist. | Broken stylesheet (404). Crawlers that do not render or fetch CSS will not see it. | `broken-script-or-stylesheet` |
| TS-22 | [blog/broken-links.html](https://crawlcove.github.io/seo-test-site/blog/broken-links.html) | External link to https://crawlcove.com/seo-test-site-supplier-directory, which answers 404. | Broken external link. | `broken-external-link` |

## Images

| ID | URL | What is planted | A crawler should report | Crawl Cove check |
|---|---|---|---|---|
| TS-23 | [blog/image-problems.html](https://crawlcove.github.io/seo-test-site/blog/image-problems.html) | img/melting-pots.png has no alt attribute. | Image missing alt text. | `image-alt` |
| TS-24 | [blog/image-problems.html](https://crawlcove.github.io/seo-test-site/blog/image-problems.html) | img/curing-shelves.png has alt=&quot;image&quot;. | Generic, meaningless alt text. | `image-alt-generic` |
| TS-25 | [blog/image-problems.html](https://crawlcove.github.io/seo-test-site/blog/image-problems.html) | img/packing-table.png has no width or height. | Image without dimensions (layout shift). | `image-missing-dimensions` |
| TS-26 | [blog/image-problems.html](https://crawlcove.github.io/seo-test-site/blog/image-problems.html) | The first image on the page (likely the LCP image) has loading=&quot;lazy&quot;. | Lazy-loaded first image. | `lazy-loaded-first-image` |
| TS-27 | [blog/image-problems.html](https://crawlcove.github.io/seo-test-site/blog/image-problems.html) | img/harbour-panorama.png is an uncompressed PNG over 500 KB shown at 900x300. | Oversized image file. | `image-oversized` |

## Security

| ID | URL | What is planted | A crawler should report | Crawl Cove check |
|---|---|---|---|---|
| TS-28 | [blog/mixed-content.html](https://crawlcove.github.io/seo-test-site/blog/mixed-content.html) | An image loaded over http:// on an https page. | Mixed content. | `mixed-content` |

## Links

| ID | URL | What is planted | A crawler should report | Crawl Cove check |
|---|---|---|---|---|
| TS-29 | [blog/link-problems.html](https://crawlcove.github.io/seo-test-site/blog/link-problems.html) | Anchor text &quot;click here&quot; and &quot;read more&quot;. | Non-descriptive anchor text. | `non-descriptive-anchor-text` |
| TS-30 | [blog/link-problems.html](https://crawlcove.github.io/seo-test-site/blog/link-problems.html) | rel=&quot;nofollow&quot; on the only link from this page to blog/care-tips.html. | Nofollowed internal link. | `nofollow-internal-link` |
| TS-31 | [blog/link-problems.html](https://crawlcove.github.io/seo-test-site/blog/link-problems.html) | An icon-only link (an svg with aria-hidden) with no text or label. | Link with no accessible name. | `link-no-name` |
| TS-32 | [blog/link-problems.html](https://crawlcove.github.io/seo-test-site/blog/link-problems.html) | href=&quot;https://www gov.uk/firekills&quot; (a space in the host name, so it is not a URL at all). | Malformed link. | `malformed-links` |
| TS-53 | [blog/link-problems.html](https://crawlcove.github.io/seo-test-site/blog/link-problems.html)<br>[blog/htps//www.gov.uk/fire-safety](https://crawlcove.github.io/seo-test-site/blog/htps//www.gov.uk/fire-safety) | href=&quot;htps//www.gov.uk/fire-safety&quot;: the misspelt scheme makes it a RELATIVE link, so it resolves to blog/htps//www.gov.uk/fire-safety on this site. | Broken link: that URL answers 404. | `status-code-404` |
| TS-33 | [blog/link-problems.html](https://crawlcove.github.io/seo-test-site/blog/link-problems.html) | Internal link to /seo-test-site/blog without the trailing slash, which 301s. | Internal link to a redirect. | `internal-link-to-redirect` |

## Site structure

| ID | URL | What is planted | A crawler should report | Crawl Cove check |
|---|---|---|---|---|
| TS-34 | [products/hidden-reserve.html](https://crawlcove.github.io/seo-test-site/products/hidden-reserve.html) | Listed in sitemap.xml, linked from no page. | Orphan page. | `orphan-page` |
| TS-35 | [products/new-arrival.html](https://crawlcove.github.io/seo-test-site/products/new-arrival.html) | Linked from the shop but missing from sitemap.xml. | Indexable page not in the sitemap. | `page-missing-from-sitemap` |
| TS-36 | [products/sold-out.html](https://crawlcove.github.io/seo-test-site/products/sold-out.html) | sitemap.xml lists a URL that answers 404. | Sitemap lists a broken URL. | `sitemap-non-indexable-url` |
| TS-54 | [wholesale/price-list.html](https://crawlcove.github.io/seo-test-site/wholesale/price-list.html) | robots.txt (at the host root, crawlcove.github.io/robots.txt) disallows /seo-test-site/wholesale/, and sitemap.xml lists this page. | Sitemap lists a URL robots.txt blocks. | `sitemap-non-indexable-url` |
| TS-37 | [archive/2025/autumn/week-40/maple-and-smoke.html](https://crawlcove.github.io/seo-test-site/archive/2025/autumn/week-40/maple-and-smoke.html) | Five clicks from the home page (home, archive, 2025, autumn, week 40, page). | Excessive crawl depth. | `excessive-crawl-depth` |
| TS-38 | [archive/2025/autumn/week-40/maple-and-smoke.html](https://crawlcove.github.io/seo-test-site/archive/2025/autumn/week-40/maple-and-smoke.html) | No links out of the page at all, no navigation either. | Dead-end page. | `dead-end-page` |
| TS-39 | [shop/](https://crawlcove.github.io/seo-test-site/shop/) | Sort links and a colour by size filter grid create 26 query-string variants of the shop page (each canonicalises back to /shop/). | One path explodes into 25 or more parameter URLs. | `parameter-url-explosion` |

## URLs

| ID | URL | What is planted | A crawler should report | Crawl Cove check |
|---|---|---|---|---|
| TS-40 | [products/Gift_Set_LARGE.html](https://crawlcove.github.io/seo-test-site/products/Gift_Set_LARGE.html) | Capital letters and underscores in the URL. | Inconsistent URL format. | `url-consistency` |

## Content

| ID | URL | What is planted | A crawler should report | Crawl Cove check |
|---|---|---|---|---|
| TS-41 | [blog/thin-note.html](https://crawlcove.github.io/seo-test-site/blog/thin-note.html) | About 40 words of body copy. | Thin content. | `thin-content` |
| TS-42 | [blog/rainy-day-candles.html](https://crawlcove.github.io/seo-test-site/blog/rainy-day-candles.html)<br>[blog/rainy-day-candles-2.html](https://crawlcove.github.io/seo-test-site/blog/rainy-day-candles-2.html) | Two articles whose body differs only in the first sentence. | Near-duplicate content on both URLs. | `near-duplicate-content` |
| TS-43 | [blog/js-only.html](https://crawlcove.github.io/seo-test-site/blog/js-only.html) | All body copy is written into the page by JavaScript; the HTML has none. | Content depends on JavaScript (needs a rendering crawl to see it). Also expected: `thin-content` (a crawler that does not render sees an almost empty page). | `content-depends-on-js` |

## Redirects

| ID | URL | What is planted | A crawler should report | Crawl Cove check |
|---|---|---|---|---|
| TS-44 | [blog/moved.html](https://crawlcove.github.io/seo-test-site/blog/moved.html) | &lt;meta http-equiv=&quot;refresh&quot; content=&quot;0; url=...&quot;&gt; to the wick guide. | Meta refresh redirect. Also expected: `thin-content` (the holding page is a single line). | none yet |

## Mobile

| ID | URL | What is planted | A crawler should report | Crawl Cove check |
|---|---|---|---|---|
| TS-45 | [about/team.html](https://crawlcove.github.io/seo-test-site/about/team.html) | No viewport meta tag. | Missing viewport. | `viewport-missing` |
| TS-46 | [about/history.html](https://crawlcove.github.io/seo-test-site/about/history.html) | Viewport sets maximum-scale=1, user-scalable=no. | Viewport blocks zoom. | `viewport-blocks-zoom` |

## Language

| ID | URL | What is planted | A crawler should report | Crawl Cove check |
|---|---|---|---|---|
| TS-47 | [about/team.html](https://crawlcove.github.io/seo-test-site/about/team.html) | &lt;html&gt; has no lang attribute. | Missing html lang. | `html-lang` |

## International

| ID | URL | What is planted | A crawler should report | Crawl Cove check |
|---|---|---|---|---|
| TS-48 | [intl/en/](https://crawlcove.github.io/seo-test-site/intl/en/)<br>[intl/fr/](https://crawlcove.github.io/seo-test-site/intl/fr/) | The English page lists the French one as an alternate; the French page does not link back. | hreflang missing return link. | `hreflang` |
| TS-49 | [intl/de/](https://crawlcove.github.io/seo-test-site/intl/de/) | hreflang=&quot;en-UK&quot; (the region code for the United Kingdom is GB). | Invalid hreflang code. | `hreflang` |

## Structured data

| ID | URL | What is planted | A crawler should report | Crawl Cove check |
|---|---|---|---|---|
| TS-50 | [products/ember.html](https://crawlcove.github.io/seo-test-site/products/ember.html) | One JSON-LD block has a trailing comma (invalid JSON); a second Product block has no name. | Unparseable JSON-LD; Product missing a required property. | `schema-validity` |

## Social

| ID | URL | What is planted | A crawler should report | Crawl Cove check |
|---|---|---|---|---|
| TS-51 | [blog/no-social.html](https://crawlcove.github.io/seo-test-site/blog/no-social.html) | No Open Graph or Twitter Card tags. | Missing social meta. | `social-meta` |

## Local

| ID | URL | What is planted | A crawler should report | Crawl Cove check |
|---|---|---|---|---|
| TS-52 | [contact/](https://crawlcove.github.io/seo-test-site/contact/) | A street address with a UK postcode and phone number in the main content; no LocalBusiness markup anywhere. | Local business markup missing. | `local-business-markup-missing` |

## Control pages (should be clean)

These pages carry no planted problem. A finding on one of them is a false positive, apart from site-wide notes such as missing security headers, which GitHub Pages does not let a site set.

- https://crawlcove.github.io/seo-test-site/
- https://crawlcove.github.io/seo-test-site/products/tide-pool.html
- https://crawlcove.github.io/seo-test-site/blog/
- https://crawlcove.github.io/seo-test-site/blog/choosing-a-wick.html
- https://crawlcove.github.io/seo-test-site/about/

## What GitHub Pages cannot plant

The site is static and hosted on GitHub Pages, so some problems cannot be planted here:

- **Server redirects, redirect chains and loops.** Pages has no redirect rules. The only real 301 is its trailing-slash redirect (`/blog` to `/blog/`), used in TS-16 and TS-33.
- **5xx errors, slow responses, 429 rate limits.** Every response comes from GitHub's CDN.
- **Most robots.txt problems.** robots.txt is only read at the host root, so it lives in a separate repo, [CrawlCove/crawlcove.github.io](https://github.com/CrawlCove/crawlcove.github.io). It declares the sitemap and carries one deliberate Disallow (TS-54); a malformed robots.txt would break every other test, so none is planted.
- **Soft 404s.** Pages returns a real 404 for any unknown URL.

Suggestions for problems Pages *can* host are welcome as issues or pull requests.
