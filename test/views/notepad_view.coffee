Note = require 'models/note'
NotepadView = require 'views/notepad_view'
app = require 'application'

buster.spec.expose()

describe '[views.NotepadView]', ->
  beforeEach ->
    app.initialize()
    @view = new NotepadView()

  afterEach ->
    localStorage.clear()

  it 'should render the note list', ->
    el = @view.render().el
    expect($(el).find('#note-input').length).toBe 1

  it 'should show note content', ->
    el = @view.render().el
    note = new Note title: 'TITLE', content: 'CONTENT'
    @view.showNoteContent(note)
    expect($(el).find('#note-input').text()).toBe 'CONTENT'
