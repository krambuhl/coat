# Coat Templating Language

Coat templates attempt to provide a powerful syntax sharing similarities to handlebars and swig.  Each coat file describes an element that can be rendered, composed, imported, and/or extended. 

## Langage Documentation


### Variables

Variables use single mustache syntax.  Variables can be selected using dot seperated object paths (eg. `{user.photo.width}`).  Arrays can be accessed using dot syntax as well (ed. `{items.2.title}`)

```html
<h2>{title}</h2>
```



### Filters

Filters can be used to manipulate variables.  They can be chained using the pipe `|` character (eg. `{ user.names|first|capitalize }`).  Filters are plugin based, described in more detail in [addFilter](#addfilter).

```html
<span>{date|format('MM-YYYY')}</span>
```


### Helpers

Helpers are logical blocks in code. Inside they create a new scoped variable called `this` that references the current iterator and `loop` that references helper variables. Helpers are plugin based, described in more detail in [addHelper](#addhelper).

```html
<ul>
  {#each cast}
    <li>{loop.index} - {this.name}</li>
  {/each}
</ul>
```


### Directives

Directives modify how modules are processed by the precompiler.  

```html
{!import link './link.coat'}
<!-- import can overwrite built-in elements -->
<link href="#/123">123ABC</link>
```


### Yield Point

The yield keyword defines a yield point in a template module.  Each template can define one yield point using the `!yield` directive. This can be used to fill with content or further composed with other modules.

```html
<!-- link.coat -->
<a href="{href}" class="link">{!yield}</a>

<!-- page.coat -->
{!import link './link.coat'}
<link href="#/abc">ABC</link>
```

```html
<!-- output.html -->
<a href="#/abc" class="link">ABC</a>
```


### Yield Block

Yield Blocks are used to define multiple yield points inside of a template. They can be extended and modified using the `!extends` directive.  Blocks are similar to using the `!import` directive to import and use another module, but allows for more elegant module composition and inheritance.

```html
<!-- card.coat -->
<div class="card">
  {@header}
    <header>
      <h3>{!yield}</h3>
    </header>
  {/header}

  {!yield}
</div>

<!-- page.coat -->
{!import card './card.coat'}

<card>
  <card-header>Hello Beautiful World</card-header>
  <p>Lorem ipsum Commodo mollit amet ut dolore ullamco ad.</p>
</card>
```

```html
<!-- output.html -->
<div class="card">
  <header>
    <h3>Hello Beautiful World</h3>
  </header>
  <p>Lorem ipsum Commodo mollit amet ut dolore ullamco ad.</p>
</div>
```

## Module Inheritance

Modules can be extended using the `!extends` directive, this allows you to reuse another modules structure and redefine specific yield blocks.

```html
<!-- media-card.coat -->
{!extends "./card.coat"}

{@header}
  <header>
    <img src="{src}" alt="{title}" />
    <h1>{!yield}</h1>
  </header>
{/header}

<!-- page.coat -->
{!import mcard './media-card.coat'}

<mcard type="image">
    <mcard-header src="http://lorempixel.com/400/200" title="Card #4">Card #4</mcard-header>
    Lorem ipsum Aliqua in ea amet anim sed deserunt.
</mcard>
```

```html
<!-- output.html -->
<div class="card" data-type="image">
  <header class="card-header">
    <img src="http://lorempixel.com/400/200" alt="Card #4" />
    <h1>Card #4</h1>
  </header>
  <div class="card-content">Lorem ipsum Aliqua in ea amet anim sed deserunt.</div>
</div>
```


# Javascript API

## Coat

The `coat` module includes a precompiler and a renderer, the renderer can be included seperated using the `coat-runtime` module.

```js
var Coat = require('coat');
```

### compile(filepath)

Precompiles a coat template into a javascript function. The function accepts a JSON object argument and outputs a html string.

```js
var PageTemplate = Coat.compile('./page.coat');
```

### addFilter

```js
Coat.addFilter('nth', function(contents, n) {
    return contents[n];
});

Coat.addFilter('first', function(contents) {
    return contents[0];
});
```

### addHelper

```js
Coat.addHelper('nth', function(contents, n) {
    return contents[n];
});
```

