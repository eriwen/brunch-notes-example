Notes = require 'models/notes'
app = require 'application'

buster.spec.expose()

describe '[app.models.notes]', ->
  beforeEach ->
    app.initialize()
    @notes = app.notes

  afterEach ->
    localStorage.clear()

  it 'should check for initialized localStorage', ->
    expect(typeof @notes.localStorage).toBe 'object'

  it 'should set a note to be current', ->
    @notes.create title: 'TITLE', content: 'CONTENT'
    @notes.create title: 'TITLE2', content: 'CONTENT2'
    expect(@notes.models.length).toBe 2
    expect(@notes.models[0].attributes.current).toBe false
    expect(@notes.models[1].attributes.current).toBe false

    @notes.setCurrent(@notes.models[0])
    expect(@notes.models[0].attributes.current).toBe true
    expect(@notes.models[1].attributes.current).toBe false

    @notes.setCurrent(@notes.models[1])
    expect(@notes.models[0].attributes.current).toBe false
    expect(@notes.models[1].attributes.current).toBe true
