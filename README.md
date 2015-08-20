# Coat


## API Useage


### Variables

```html
<h2>{title}</h2>
```

### Filters

```html
<span>{ date|format('MM-YYYY') }</span>
```

### Directives

```html
{!import card './card.coat'}

<card>Mr. Magazine Man</card>
```

### Contents

```html
<!-- link.coat -->
<a href="{href}">{>contents}</a>

<!-- page.coat -->
{!import link './link.coat'}
<link href="#/abc">ABC</link>

<!-- output.html -->
<a href="#/abc">ABC</a>
```

### Elements

```html
<!-- card.coat -->
<div class="card">
  {@card-header}
    <h3 class="heading">{>content}</h3>
  {/card-header}
</div>

<!-- page.coat -->
{!import card './card.coat'}

<card>
  <card-header>My Title</card-header>
</card>

<!-- output.html -->
<div class="card">
  <h3 class="heading">My Title</h3>
</div>
```

### Helpers

```html
{!import card './card.coat'}

<div class="cardgrid">
  {#each card in cardlist}
    <card>
      <card-header>{card.title}</card-header>
    </card>
  {/each}
</div>
```