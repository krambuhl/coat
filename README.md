# Coat Templating Language

## Variables

```html
<h2>{title}</h2>
```

## Filters

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

- `!import name path`
- `!extends path`
- `!parent`

###### Example

```html
{!import card './card.coat'}

<card>Mr. Magazine Man</card>
```


## Contents

```html
<!-- link.coat -->
<a href="{href}">{>contents}</a>

<!-- page.coat -->
{!import link './link.coat'}
<link href="#/abc">ABC</link>

<!-- output.html -->
<a href="#/abc">ABC</a>
```


## Elements

```html
<!-- tag.coat -->
<a href="#/tag/{href}" class="tag">{>contents}</div>

<!-- card.coat -->
<div class="card">
  {@card-header}
    <h3 class="heading">{>contents}</h3>
  {/card-header}

  {@card-body}
    <div>{>contents}</div>
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

# Javascript API

## Coat

The `coat` module includes 
```js
var Coat = require('coat');
```

### precompile(filepath)

```js
var PageTemplate = Coat.precompile('./page.coat');
```

## Coat Runtime

`coat-runtime` is built into the core library, but can be required seperately with precompiled templates to reduce file size.

```js
var CoatRuntime = require('coat-runtime');
```

### create(Template, data)

Creates an instance of the template, can optionally pass data (using `set` method) before template is rendered.  An instance is not rendered by default, 

```js
var homepage = CoatRuntime.create(PageTemplate);
```

## Template Instance

### set(property, value)

__set({ property: value })__

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

Returns template data at specified path. If no path is passed, all template data is returned

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

```js
var CardView = require('someviewlibrary/card-view.js');

homepage.select('card').state({
  enter: function(el, store) { 
    return new CardView({ el: el, store: store });
  },
  exit: function(view) { view.destroy(); }
});

homepage.select('tag').state({
  enter: function(el, store) { 
    return new TagView({ el: el, store: store });
  },
  exit: function(view) { view.destroy(); }
});

```

