# Tooltip

Popup tooltip

## value, header

> **Breaking (KNB-5757):** `value` and `header` are rendered as **plain text** by default.  
> Before they were rendered as HTML. Markup like `<b>` or `<br>` is now shown as is.  
> If you need markup, pass `isHtml`.

User data (card, tag, file names, emails) - pass as is, without `escape(...)`, otherwise user sees `&lt;`.

```html
<Tooltip value={card.name}>...</Tooltip>
```

## isHtml

`value` and `header` are rendered as HTML, sanitized by DOMPurify (scripts, event handlers, `javascript:` urls are removed).  
Do not concatenate user data into HTML without escaping.

```html
<Tooltip isHtml value="Connect related tasks <br/>to switch between them">...</Tooltip>
```

## tooltip prop of other components

Button, Input (`tooltip`, `iconTooltip`), Userpic, Tag (`iconTooltip`) take string or Tooltip props object.  
String is always plain text. For HTML pass object:

```html
<Button tooltip={{ value: 'Line 1<br>Line 2', isHtml: true }} />
```

Hint passes all props to Tooltip, so `isHtml` works the same.
