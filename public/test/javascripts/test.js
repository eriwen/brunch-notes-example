(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    definition(module.exports, localRequire(name), module);
    var exports = cache[name] = module.exports;
    return exports;
  };

  var require = function(name) {
    var path = expand(name, '.');

    if (has(cache, path)) return cache[path];
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex];
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '"');
  };

  var define = function(bundle) {
    for (var key in bundle) {
      if (has(bundle, key)) {
        modules[key] = bundle[key];
      }
    }
  }

  globals.require = require;
  globals.require.define = define;
  globals.require.brunch = true;
})();

window.require.define({"test/models/note": function(exports, require, module) {
  var Note;

  Note = require('models/note');

  buster.spec.expose();

  describe('[app.models.Note]', function() {
    beforeEach(function() {
      return this.model = new Note();
    });
    afterEach(function() {
      return this.model = null;
    });
    return it('should have defaults', function() {
      expect(this.model.attributes.title).toBe('Click to edit');
      expect(this.model.attributes.content).toBe('Note content');
      return expect(this.model.attributes.current).toBe(false);
    });
  });
  
}});

window.require.define({"test/models/notes": function(exports, require, module) {
  var Notes, app;

  Notes = require('models/notes');

  app = require('application');

  buster.spec.expose();

  describe('[app.models.notes]', function() {
    beforeEach(function() {
      app.initialize();
      return this.notes = app.notes;
    });
    afterEach(function() {
      return localStorage.clear();
    });
    return it('should check for initialized localStorage', function() {
      return expect(typeof this.notes.localStorage).toBe('object');
    });
  });
  
}});

window.require.define({"test/spec": function(exports, require, module) {
  

  
}});

window.require.define({"test/views/new_note_view": function(exports, require, module) {
  var NewNoteView, Note;

  Note = require('models/note');

  NewNoteView = require('views/new_note_view');

  buster.spec.expose();

  describe('[views.NewNoteView]', function() {
    beforeEach(function() {
      return this.view = new NewNoteView;
    });
    afterEach(function() {
      return localStorage.clear();
    });
    return it('should render the note', function() {
      var el;
      el = this.view.render().el;
      return expect($(el).find('#add-note').length).toBe(1);
    });
  });
  
}});

window.require.define({"test/views/note_list_view": function(exports, require, module) {
  var Note, NoteListView, app;

  Note = require('models/note');

  NoteListView = require('views/note_list_view');

  app = require('application');

  buster.spec.expose();

  describe('[views.NoteListView]', function() {
    beforeEach(function() {
      app.initialize();
      return this.view = new NoteListView();
    });
    afterEach(function() {
      return localStorage.clear();
    });
    it('should render the note list', function() {
      var el;
      el = this.view.render().el;
      expect($(el).find('ul').length).toBe(1);
      return expect($(el).find('li#add-note').length).toBe(1);
    });
    return it('should add one note', function() {
      var el;
      el = this.view.render().el;
      expect($(el).find('li').length).toBe(1);
      this.view.addOne(new Note());
      return expect($(el).find('li').length).toBe(2);
    });
  });
  
}});

window.require.define({"test/views/note_view": function(exports, require, module) {
  var Note, NoteView;

  Note = require('models/note');

  NoteView = require('views/note_view');

  buster.spec.expose();

  describe('[views.NoteView]', function() {
    beforeEach(function() {
      this.model = new Note();
      return this.view = new NoteView({
        model: this.model
      });
    });
    afterEach(function() {
      return localStorage.clear();
    });
    it('should initialize view', function() {
      expect(typeof this.view.model._callbacks.change).toBe('object');
      return expect(typeof this.view.model.view).toBe('object');
    });
    return it('should render the note', function() {
      var el;
      el = this.view.render().el;
      expect($(el).find('.note').length).toBe(1);
      return expect($(el).find('.delete').length).toBe(1);
    });
  });
  
}});

window.require.define({"test/views/notepad_view": function(exports, require, module) {
  var Note, NotepadView, app;

  Note = require('models/note');

  NotepadView = require('views/notepad_view');

  app = require('application');

  buster.spec.expose();

  describe('[views.NotepadView]', function() {
    beforeEach(function() {
      app.initialize();
      return this.view = new NotepadView();
    });
    afterEach(function() {
      return localStorage.clear();
    });
    it('should render the note list', function() {
      var el;
      el = this.view.render().el;
      return expect($(el).find('#note-input').length).toBe(1);
    });
    return it('should show note content', function() {
      var el, note;
      el = this.view.render().el;
      note = new Note({
        title: 'TITLE',
        content: 'CONTENT'
      });
      this.view.showNoteContent(note);
      return expect($(el).find('#note-input').text()).toBe('CONTENT');
    });
  });
  
}});


