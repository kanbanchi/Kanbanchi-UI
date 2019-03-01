# Button

```html
<Button href="#">Anchor</Button> 
<!-- if `href` returns: --> 
<a href="#" class="...">Anchor</a>

<Button>Button</Button> 
<!-- if no `href` returns: --> 
<button type="button" class="...">Button</button>

<Button href="#" disabled>Disabled</Button> 
<!-- disabled anchor removes `href` and adds class: --> 
<a class="... button--disabled">Disabled</a>
```

## variant
> `primary` *default*  
> primary_white  
> secondary  
> fab  
> action  
> text  
> icon

## size
> `small` *default*  
> large  

## type 
> `button` *default*  
> submit

# Icons

```html
<Button variant="action">Action Button</Button>
<!-- adds Kebab icon before text -->

<Button variant="text">Text Button</Button>
<!-- adds Arrow icon after text -->
```

# Examples
```html
<Button size="large">Primary Large</Button>

<Button variant="secondary">Secondary Small</Button>

<Button variant="primary_white">White</Button>
<!-- for dark background -->

<Button variant="fab" size="large">
    <Icon xlink="plus" size={24} />
</Button>
<!-- large FAB with Plus icon -->

<Button variant="text" href="#">Link</Button>
<!-- text anchor with Arrow icon -->

<Button variant="icon">
    <Icon xlink="settings" size={24} />
</Button>
<!-- 48px transparent interaction area for touch -->

```

# Group

Wrap group of buttons in `ButtonsGroup` for default margin top & left between buttons.

```html
<ButtonsGroup>
    <Button>Button 1</Button>
    <Button>Button 2</Button>
</ButtonsGroup>
```

# Segmented buttons

Wrap group of buttons in `ButtonsSegmented` for combine them in one control iOS like.

```html
<ButtonsSegmented>
    <Button>Button 1</Button>
    <Button>Button 2</Button>
</ButtonsSegmented>
```