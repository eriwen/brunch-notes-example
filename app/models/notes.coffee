Collection = require './collection'
app = require 'application'
Note = require 'models/note'

module.exports = class Notes extends Collection
  model: Note

  initialize: =>
    @localStorage = new Store 'notes'