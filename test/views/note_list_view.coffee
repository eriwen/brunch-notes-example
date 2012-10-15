Note = require 'models/note'
NoteListView = require 'views/note_list_view'
app = require 'application'

buster.spec.expose()

describe '[views.NoteListView]', ->
  beforeEach ->
    app.initialize()
    @view = new NoteListView()

  afterEach ->
    localStorage.clear()

  it 'should render the note list', ->
    el = @view.render().el
    expect($(el).find('ul').length).toBe 1
    expect($(el).find('li#add-note').length).toBe 1

  it 'should add one note', ->
    el = @view.render().el
    expect($(el).find('li').length).toBe 1
    @view.addOne(new Note())
    expect($(el).find('li').length).toBe 2
