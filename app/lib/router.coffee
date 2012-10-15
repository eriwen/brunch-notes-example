app = require('application')
module.exports = class Router extends Backbone.Router
  routes:
    '': 'home'

  home: ->
    app.homeView.render()
    app.notes.fetch()
