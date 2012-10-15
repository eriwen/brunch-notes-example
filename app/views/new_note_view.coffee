View = require './view'
app = require 'application'
template = require './templates/new_note'

module.exports = class NewNoteView extends View
  template: template
  id: 'add-note-view'
  events:
    'click #add-note': 'createNewNote'

  createNewNote: =>
    app.notes.create()
