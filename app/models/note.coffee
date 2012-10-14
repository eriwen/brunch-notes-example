Model = require './model'

module.exports = class Note extends Model
  defaults:
    title: 'Click to edit'
    content: ''
    current: no

  clear: =>
    @destroy()
    @view.remove()
