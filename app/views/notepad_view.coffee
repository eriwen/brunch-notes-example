View = require './view'
app = require 'application'
template = require './templates/notepad'

module.exports = class NotepadView extends View
  template: template
  currentNote: null

  initialize: =>
    app.notes.bind 'sync', @showNoteContent

  showNoteContent: (note, notes) =>
    @currentNote = note
    @$('#note-input').text(note.attributes.content)

  afterRender: =>
    @$('#note-input').bind 'blur', @updateContent

  updateContent: =>
    @currentNote.save(content: @$('#note-input').text()) if @currentNote
