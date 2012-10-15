Note = require 'models/note'
NoteView = require 'views/note_view'

buster.spec.expose()

describe '[views.NoteView]', ->
  beforeEach ->
    @model = new Note()
    @view = new NoteView model: @model

  afterEach ->
    localStorage.clear()

  it 'should initialize view', ->
    expect(typeof @view.model._callbacks.change).toBe 'object'
    expect(typeof @view.model.view).toBe 'object'

  it 'should render the note', ->
    el = @view.render().el
    expect($(el).find('.note').length).toBe 1
    expect($(el).find('.delete').length).toBe 1
