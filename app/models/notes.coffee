Collection = require './collection'
app = require 'application'
Note = require 'models/note'

module.exports = class Notes extends Collection
  model: Note

  initialize: =>
    @localStorage = new Store 'notes'

  setCurrent: (note) =>
    # Set all notes to noncurrent
    app.notes.map (n) ->
      n.setCurrent(false) if n isnt note
    note.save({current: true}, {silent: true})
