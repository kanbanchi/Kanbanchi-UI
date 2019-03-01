# Snackbar

Popup with icon, text, button

## variant
> `info` *default*  
> warning  
> success

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

Adds contdown block in seconds

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

In Storybook you can find examples of stateful components.  
SnackbarTimer - shows Snackbar with animated countdown.  
SnackbarsQueue - adds SnackbarTimers in queue and shows the first.