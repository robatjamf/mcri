# `withBase()` Utility

`withBase(path)` in [`src/utils/helpers.ts`](../src/utils/helpers.ts) prepends Astro's configured `BASE_URL` to internal routes and static assets.

## When to Use It

Use `withBase()` for:

- internal page links
- images, logos, and other static assets served from `public/`
- generated URLs such as the sitemap link in the document head

Do not use it for fully qualified external URLs.

## Why It Matters

The staging site is published under `/mcri`, not the domain root. A root-relative path like `"/about"` points to the wrong location on GitHub Pages, while `withBase("/about")` resolves to `"/mcri/about"`.

## Examples

```ts
withBase("/");
withBase("/about");
withBase("/resources/img/students.jpg");
```
