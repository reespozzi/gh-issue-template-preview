/**
 * GFM inline link unit tests for simpleMarkdownToHtml
 *
 * Tests assert GFM-specified behavior (href, title attribute, link text)
 * via semantic assertions rather than duplicating full HTML output.
 *
 * GFM spec reference: https://github.github.com/gfm/
 * GFM v0.29-gfm §6.6: An inline link consists of a link text followed by a
 * set of parentheses containing a URL and an optional title.
 */
const assert = require('node:assert');
const { describe, it } = require('node:test');

const { simpleMarkdownToHtml } = require('../../out/htmlUtils.js');

describe('GFM §6.1 — Inline links (simpleMarkdownToHtml)', () => {
	for (const { name, md, expect, blocked, tag } of [
		{ name: 'basic inline link',                        md: '[t](https://a.com)',                expect: { text: 't', href: 'a.com' } },
		{ name: 'scheme-less URL',                          md: '[t](a.com)',                        expect: { text: 't', href: 'https://a.com' } },
		{ name: 'mailto: link',                             md: '[e](mailto:t@t.com)',               expect: { text: 'e', href: 'mailto:t@t.com' } },
		{ name: 'double-quoted title',                      md: '[t](a.com "T")',                    expect: { text: 't', href: 'a.com', title: 'T' } },
		{ name: 'double-quoted title (escaped)',            md: '[t](a.com "a & b <c>")',            expect: { text: 't', href: 'a.com', title: 'a &amp; b &lt;c&gt;' } },
		{ name: 'single-quoted title',                      md: "[t](a.com 'T')",                    expect: { text: 't', href: 'a.com', title: 'T' } },
		{ name: 'single-quoted title (escaped)',            md: "[t](a.com 'a & b')",                expect: { text: 't', href: 'a.com', title: 'a &amp; b' } },
		{ name: 'dangerous URL (double)',                   md: '[x](javascript:alert(1) "bad")',    blocked: true },
		{ name: 'dangerous URL (single)',                   md: "[x](javascript:alert(1) 'bad')",    blocked: true },
		{ name: 'bold + link',                              md: '**b [l](e.com "t")**',              expect: { text: 'l', href: 'e.com', title: 't' },  tag: '<strong>' },
		{ name: 'italic + link',                            md: "*i [l](e.com 't')*",                expect: { text: 'l', href: 'e.com', title: 't' },  tag: '<em>' },
		{ name: 'link after heading',                       md: '### H\n[l](g.com "GH")',            expect: { text: 'l', href: 'g.com', title: 'GH' }, tag: '<h3>' },
		{ name: 'list with links after heading',            md: '### L\n- [a](u1 "A")\n- [b](u2)',
			expect: [{ text: 'a', href: 'u1', title: 'A' }, { text: 'b', href: 'u2' }], tag: '<h3>' },
		{ name: 'multiple links mixed',                     md: `[a](u1 "A") and [b](u2 'B') and [c](u3)`,
			expect: [{ text: 'a', href: 'u1', title: 'A' }, { text: 'b', href: 'u2', title: 'B' }, { text: 'c', href: 'u3' }] },
	]) {
		it(name, () => {
			if (blocked) { const r = simpleMarkdownToHtml(md); return assert.ok(!r.includes('<a '), `expected no link in output: ${r}`); }
			const assertContains = (sub, label) => assert.ok(simpleMarkdownToHtml(md).includes(sub), `expected ${label} not found in output`);
			(Array.isArray(expect) ? expect : [expect]).forEach(({ text, href, title }) => {
				assertContains(`>${text}</a>`, `link text "${text}"`);
				assertContains(href, `href "${href}"`);
				if (title != null) assertContains(`title="${title}"`, `title "${title}"`);
			});
			if (tag) assertContains(tag, tag);
		});
	}
});
