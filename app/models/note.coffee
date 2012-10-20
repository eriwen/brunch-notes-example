Model = require './model'

module.exports = class Note extends Model
  defaults:
    title: 'Click to edit'
    content: 'Note content'
    current: no

  url: =>

  clear: =>
    @destroy()
    @view.remove()

  setCurrent: (bool) =>
    @save current: bool
