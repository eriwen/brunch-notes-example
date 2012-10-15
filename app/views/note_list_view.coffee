View = require './view'
NoteView = require './note_view'
app = require 'application'
template = require './templates/note_list'

module.exports = class NotesView extends View
  template: template

  addOne: (note) =>
    view = new NoteView model: note
    @$el.find('#add-note').before view.render().el
    if note.attributes.current
      view.$el.find('.note').click()

  addAll: =>
    app.notes.each @addOne

  initialize: =>
    app.notes.bind 'add', @addOne
    app.notes.bind 'reset', @addAll

  afterRender: =>
    @$el.find('ul').append app.newNoteView.render().el
