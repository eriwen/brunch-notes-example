Note = require 'models/note'
NewNoteView = require 'views/new_note_view'

buster.spec.expose()

describe '[views.NewNoteView]', ->
  beforeEach ->
    @view = new NewNoteView

  afterEach ->
    localStorage.clear()

  it 'should render the note', ->
    el = @view.render().el
    expect($(el).find('#add-note').length).toBe 1

