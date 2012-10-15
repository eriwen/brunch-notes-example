View = require './view'
app = require 'application'
template = require './templates/note'

module.exports = class NoteView extends View
  template: template
  tagName: 'li'

  events:
    'click .note': 'viewEdit'

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

  viewEdit: =>
    app.notes.setCurrent @model

  updateTitle: (event) =>
    @model.save title: @$(event.target).text()

  updateTitleOnEnter: (event) =>
    noteTitle = @$(event.target)
    if event.keyCode is 13
      @model.save(title: noteTitle.text())
      noteTitle.blur()

  remove: =>
    @$el.remove()

  clear: =>
    @model.clear()
