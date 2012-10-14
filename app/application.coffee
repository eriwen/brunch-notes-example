Application = initialize: ->
  Notes = require 'models/notes'
  HomeView = require 'views/home_view'
  NoteListView = require 'views/note_list_view'
  NotepadView = require 'views/notepad_view'
  NoteView = require 'views/note_view'
  NewNoteView = require 'views/new_note_view'
  Router = require 'lib/router'

  @notes = new Notes()

  @homeView = new HomeView()
  @noteListView = new NoteListView()
  @notepadView = new NotepadView()
  @newNoteView = new NewNoteView()

  @router = new Router()

  Object.freeze? Application

module.exports = Application
