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
      expect(this.model.attributes.content).toBe('');
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
    it('should check for initialized localStorage', function() {
      return expect(typeof this.notes.localStorage).toBe('object');
    });
    return it('should set a note to be current', function() {
      this.notes.create({
        title: 'TITLE',
        content: 'CONTENT'
      });
      this.notes.create({
        title: 'TITLE2',
        content: 'CONTENT2'
      });
      expect(this.notes.models.length).toBe(2);
      expect(this.notes.models[0].attributes.current).toBe(false);
      expect(this.notes.models[1].attributes.current).toBe(false);
      this.notes.setCurrent(this.notes.models[0]);
      expect(this.notes.models[0].attributes.current).toBe(true);
      expect(this.notes.models[1].attributes.current).toBe(false);
      this.notes.setCurrent(this.notes.models[1]);
      expect(this.notes.models[0].attributes.current).toBe(false);
      return expect(this.notes.models[1].attributes.current).toBe(true);
    });
  });
  
}});

window.require.define({"test/spec": function(exports, require, module) {
  

  
}});

window.require.define({"test/views/new_note_view": function(exports, require, module) {
  var NewNoteView;

  NewNoteView = require('views/new_note_view');

  describe('NewNoteView', function() {
    return beforeEach(function() {
      return this.view = new NewNoteView();
    });
  });
  
}});

window.require.define({"test/views/note_list_view": function(exports, require, module) {
  var NoteListView;

  NoteListView = require('views/note_list_view');

  describe('NoteListView', function() {
    return beforeEach(function() {
      return this.view = new NoteListView();
    });
  });
  
}});

window.require.define({"test/views/note_view": function(exports, require, module) {
  var NoteView;

  NoteView = require('views/note_view');

  describe('NoteView', function() {
    return beforeEach(function() {
      return this.view = new NoteView();
    });
  });
  
}});

window.require.define({"test/views/notepad_view": function(exports, require, module) {
  var NotepadView;

  NotepadView = require('views/notepad_view');

  describe('NotepadView', function() {
    return beforeEach(function() {
      return this.view = new NotepadView();
    });
  });
  
}});


