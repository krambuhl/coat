# Coat Templating Language

Coat templates attempt to provide a powerful syntax inspired by react, handlebars and swig.

## Variables

Variables use single mustache syntax.  Variables can be selected using dot seperated object paths (eg. `{user.photo.width}`). 

```html
<h2>{title}</h2>
```

## Filters

Filters can be used to manipulate variables.  They can be chained using the pipe `|` character (eg. `{user.name|capitalize}`)

- `date(format)`
- `default(var)`
- `capitalize`
- `uppercase`
- `lowercase`
- `camelcase`
- `split(string)`
- `join(string)`
- `first`
- `last`
- `nth(n)`
- `limit(n)`
- `filter(obj)`
- `reject(obj)`
- `where(obj)`
- `reverse`
- `sort`
- `groupBy(property)`
- `sortBy(property)`
- `unique`
- `striptags`
- `escape`
- `safe`

###### Example

```html
<span>{date|format('MM-YYYY')}</span>
```


## Helpers

Coat helpers behave very similar to handlebars helpers, so google results for handlebars can be relevant.

- `#if cond`
- `#unless cond`
- `#each list`
- `#for min max`

###### Example

```html
{!import card './card.coat'}

<div class="cardgrid">
  {#each cardlist}
    <card>
      <card-header>{this.title}</card-header>
    </card>
  {/each}
</div>
```


## Directives

Directives are modify how modules are processed by the precompiler.

- `!import name module`
- `!extends module`
- `!parent`

###### Example

```html
{!import card './card.coat'}

<card>Mr. Magazine Man</card>
```


## Yield Point

The yield keyword defines a yield point in a template module.  Each template can define one root yield point.  A Yield Point is prefixed with `>` like `{>yield}`. 

```html
<!-- link.coat -->
<a href="{href}">{>yield}</a>

<!-- page.coat -->
{!import link './link.coat'}
<link href="#/abc">ABC</link>

<!-- output.html -->
<a href="#/abc">ABC</a>
```


## Blocks

Blocks define sub-yield points inside of a template.  Blocks can be extended and modified using the `{!extends}` and `{!parent}` directives.  

```html
<!-- tag.coat -->
<a href="#/tag/{href}" class="tag">{>yield}</div>

<!-- card.coat -->
<div class="card">
  {@card-header}
    <h3 class="heading">{>yield}</h3>
  {/card-header}

  {@card-body}
    <div>{>yield}</div>
    <ul>
      {#each meta.tags}
        <li><tag href="{this|safe}">{this}</tag></li>
      {/each}
    </ul>
  {/card-body}
</div>

<!-- page.coat -->
{!import card './card.coat'}

<card>
  <card-header>{title}</card-header>
  <card-body><p>{body|safe}</p></card-body>
</card>

<!-- output.html -->
<div class="card">
  <h3 class="heading">Hello Beautiful World</h3>
  <p>Lorem ipsum Deserunt.</p>
</div>
```

## Module Inheritance

```html
<!-- media.coat -->
<div class="media {class}">
  {@media-header}
    <header>
      <h1>{>yeild}</h1>
    </header>
  {/media-header}

  {@media-body}{>yield}{/media-body}
</div>

<!-- media-special.coat -->
{!extends './media.coat'}

{@media-header}
  <div><img src="{src}" alt="{alt}" /></div>
  {!parent}
{/media-header}

<!-- output.coat -->
{!import media './media.coat'}
{!import media-special './media-special.coat'}

<media>
  <media-header>Hello there</media-header>
</media>

<media-special>
  <media-header src="./image.jpg" alt="hello!">Hello there</media-header>
  <media-body>
    <p>Lorem ipsum</p>
  </media-body>
</media-special>
```

###### output.html

```html
<div class="media">
  <header>
    <h1>Hello there</h1>
  </header>
</div>

<div class="media">
  <div><img src="./image.jpg" alt="hello!" /></div>
  <header>
    <h1>Hello there</h1>
  </header>

  <p>Lorem ipsum</p>
</div>
```

# Javascript API

## Coat

The `coat` module includes a precompiler and a renderer, the renderer can be included seperated using the `coat-runtime` module.

```js
var Coat = require('coat');
```

### precompile(filepath)

Precompiles a coat template into a javascript function. The function accepts a JSON object argument and outputs a html string. Can be initiated with the `Coat.create` function to gain additional 

```js
var PageTemplate = Coat.precompile('./page.coat');
```

## Coat Runtime

`coat-runtime` is built into the full library, but can be required seperately with precompiled templates to reduce file size.

```js
var CoatRuntime = require('coat-runtime');
```

### create(Template, data)

Creates an instance of the template, can optionally pass data (uses `set` method) before template is rendered.  An instance is not rendered by default, 

```js
var homepage = CoatRuntime.create(PageTemplate);
```

## Template Instance

### set(property, value)

__set({ property: value })__

Set/update a property.  Multiple properties can be set by passing an object as an argument.  Passing undefined as a value will remove property.

```js
homepage.set({ 
  title: 'Hello World', 
  body: 'Lorem ipsum Deserunt.',
  meta: {
    tags: ['pickle', 'hamburger']
  } 
})
```

### get(path)

Returns template data at specified path. If no path is passed, all template data is returned.

```js
homepage.get('title') == 'Hello Beautiful World';
homepage.get('meta.tags.0') == 'pickle';
```

### render(element)

Renders template inside passed dom element. 

```js
homepage.render(document.getElementById('#page'));
```

### select(selector, config)

Selects a element by selector and provides an interface for tracking the entrance and exit of new elements.

```js
var CardView = require('someviewlibrary/card-view.js');

homepage.select('.card').state({
  enter: function(el, store) { 
    return new CardView({ el: el, store: store });
  },
  exit: function(view) { view.destroy(); }
});

homepage.select('.tag').state({
  enter: function(el, store) { 
    return new TagView({ el: el, store: store });
  },
  exit: function(view) { view.destroy(); }
});

```

