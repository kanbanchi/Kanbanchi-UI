# Snackbar

Popup with icon, text, button

## title, text

> **Breaking (KNB-5757):** `title` and `text` are rendered as **plain text** by default.  
> Before they were rendered as HTML. Markup like `<b>` or `<br>` is now shown as is.  
> If you need markup, pass `isHtml`.

User data (board, card names, emails) - pass as is, without `escape(...)`, otherwise user sees `&lt;`.

## isHtml

`title` and `text` are rendered as HTML, sanitized by DOMPurify (scripts, event handlers, `javascript:` urls, `<style>`, form elements are removed).  
The flag applies to both `title` and `text`. If only one of them has markup, escape user data in the other one.

```html
<Snackbar isHtml text="The <b>email</b> address is not valid." />
```

## variant

Change background & default icon.  
Timer has block with countdown.

> `info` *default*  
> error  
> success  
> timer  

## icon

Each variant has default icon.

```html
<Snackbar text="Default info snackbar" />

<Snackbar text="Info snackbar with custom icon" icon="search" />
```

## button

Adds button with given value

```html
<Snackbar text="Default info snackbar" button="Close" />
```

## timer

If not null, snackbar will hide in {timer} seconds

If (variant === 'timer') timer default 10 seconds

```html
<Snackbar timer={5} variant="error" text="Error text shown 5 seconds" />
```

## action

Fires on button click

# Examples
```html
<Snackbar
    title="We've updated the app!"
    text="Click to refresh the page and receive updates"
    button="Refresh"
    action={actionForReload}
/>

<Snackbar
    variant="success"
    title="Data has been successfully exported"
    text="We've sent you an email with the link"
    button="Open the link"
    action={actionForLink}
/>
```

## Timer

In Storybook you can find example of stateful component SnackbarsQueue.  
SnackbarsQueue adds Snackbars in queue and shows the first.