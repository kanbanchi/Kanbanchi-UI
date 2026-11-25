# Modal

Modal popup

## title

> **Breaking (KNB-5757):** `title` is rendered as **plain text** by default.  
> Before it was rendered as HTML. If you need markup, pass `isHtml`.

## isHtml

`title` is rendered as HTML, sanitized by DOMPurify (scripts, event handlers, `javascript:` urls, `<style>`, form elements are removed).

```html
<Modal isHtml title="Delete <b>board</b>?" onClose={onClose} />
```

## release

`variant="release"` shows slides. Each slide has own `isHtml`:
it applies to slide `description` and slide `title` (shown in modal header instead of `title` prop).

> **Breaking (KNB-5757):** slide `description` and `title` are plain text by default.

```js
release={{
    slides: [{
        isHtml: true,
        title: 'Shared Drives integration',
        description: 'Create boards in Shared Drives. <a href="..." target="_blank">Learn more</a>',
    }],
    footer: {
        stars: 'Give us 5 stars in <a href="..." target="_blank">Marketplace</a>', // always HTML (sanitized)
        follow: { text: 'Follow us!', socials: [...] }, // text is plain text
    },
}}
```
