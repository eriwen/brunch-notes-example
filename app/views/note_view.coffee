View = require './view'
app = require 'application'
template = require './templates/note'

module.exports = class NoteView extends View
  template: template
  tagName: 'li'

  initialize: =>
    @model.bind 'change', @render
    @model.view = this

  afterRender: =>
    noteTitle = @$el.find('.note')
    noteTitle.focus() if @model.attributes.current
    noteTitle.bind 'blur', @updateTitle
    noteTitle.bind 'keyup', @updateTitleOnEnter

  getRenderData: =>
    {note: @model.toJSON()}

  updateTitle: (event) =>
    @model.save title: @$(event.target).text()

  remove: =>
    @$el.remove()

  clear: =>
    @model.clear()
