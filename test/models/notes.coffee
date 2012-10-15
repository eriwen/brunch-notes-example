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
