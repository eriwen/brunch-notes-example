View = require './view'
app = require 'application'
template = require './templates/home'

module.exports = class HomeView extends View
  el: '#page-container'
  template: template

  afterRender: ->
    @$el.find('#note-editor').append app.notepadView.render().el
    @$el.find('#notes-list').append app.noteListView.render().el
