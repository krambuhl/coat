// Compiler
var Compiler = require('coat').Compiler;
var Runtime = require('coat').Runtime;

var PageTemplate = Compiler.precompile('../templates/page.coat');

// Runtime 
var container = document.getElementById('#page');
var page = Runtime.render(container, PageTemplate)

function createPage(data) {
  return new Page({
    id: data._id,
    el: this.el
  });
};

function createTag(tag, data) {
  return new Tag({
    id: tag._id,
    el: page.select('tags', { id: tag._id })
  });
};

function destroyView(view) {
  view.destroy();
}

page.state({
  enter: createPage,
  exit: destroyView
});

page.state('tags', {
  enter: createTag,
  exit: destroyView
});



page.set({
  title: 'Hello World', 
  body: 'Lorem ipsum Deserunt.',
  tags: [
    { name: 'javascript' }
  ]
});

page.set('pageClass', 'l-page-home');

page.add('tags', [
  { name: 'code' },
  { name: 'design' }
]);

page.edit('tags', { name: 'code' }, { name: 'programming' });

page.remove('tags', { name: 'design' });




var TagControl = View.selectElement('.tag-control');
var TagControlClick = View.event(TagControl, 'click', function(ev) {
  page.remove('card', { _id: this.id });
});

var Tag = View.use([
  TagControl,
  TagControlClick
]);


var PageTags = View.selectElements('.tags')
var PageTagsDrag = View.event(PageTags, 'drag', function(ev) { });
var PageTagsResize = View.event(window, 'resize', function(ev) { 
  var offset = 0;
  PageTags.each(function(Tag, i) {
    Tag.css('top', offset);
    offset += Tag.offsetHeight;
  });
});

var PageTagCreate = View.selectElement('.l-tags-create');
var PageTagCreateClick = View.event(PageTagCreate, 'click', function(ev) {
  page.
});

var Page = View.use([
  PageTags,
  PageTagsDrag,
  PageTagsResize
]);












