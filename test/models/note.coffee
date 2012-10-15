Note = require 'models/note'

buster.spec.expose()

describe '[app.models.Note]', ->
  beforeEach ->
    @model = new Note()

  afterEach ->
    @model = null

  it 'should have defaults', ->
    expect(@model.attributes.title).toBe 'Click to edit'
    expect(@model.attributes.content).toBe 'Note content'
    expect(@model.attributes.current).toBe false
