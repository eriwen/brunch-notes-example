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

window.require.define({"application": function(exports, require, module) {
  var Application;

  Application = {
    initialize: function() {
      var HomeView, NewNoteView, NoteListView, NoteView, NotepadView, Notes, Router;
      Notes = require('models/notes');
      HomeView = require('views/home_view');
      NoteListView = require('views/note_list_view');
      NotepadView = require('views/notepad_view');
      NoteView = require('views/note_view');
      NewNoteView = require('views/new_note_view');
      Router = require('lib/router');
      this.notes = new Notes();
      this.homeView = new HomeView();
      this.noteListView = new NoteListView();
      this.notepadView = new NotepadView();
      this.newNoteView = new NewNoteView();
      this.router = new Router();
      return typeof Object.freeze === "function" ? Object.freeze(Application) : void 0;
    }
  };

  module.exports = Application;
  
}});

window.require.define({"initialize": function(exports, require, module) {
  var app;

  app = require('application');

  $(function() {
    app.initialize();
    return Backbone.history.start();
  });
  
}});

window.require.define({"lib/router": function(exports, require, module) {
  var Router, app,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  app = require('application');

  module.exports = Router = (function(_super) {

    __extends(Router, _super);

    function Router() {
      return Router.__super__.constructor.apply(this, arguments);
    }

    Router.prototype.routes = {
      '': 'home'
    };

    Router.prototype.home = function() {
      app.homeView.render();
      return app.notes.fetch();
    };

    return Router;

  })(Backbone.Router);
  
}});

window.require.define({"models/collection": function(exports, require, module) {
  
  module.exports = Backbone.Collection.extend({});
  
}});

window.require.define({"models/model": function(exports, require, module) {
  
  module.exports = Backbone.Model.extend({});
  
}});

window.require.define({"models/note": function(exports, require, module) {
  var Model, Note,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('./model');

  module.exports = Note = (function(_super) {

    __extends(Note, _super);

    function Note() {
      this.setCurrent = __bind(this.setCurrent, this);

      this.clear = __bind(this.clear, this);
      return Note.__super__.constructor.apply(this, arguments);
    }

    Note.prototype.defaults = {
      title: 'Click to edit',
      content: 'Note content',
      current: false
    };

    Note.prototype.clear = function() {
      this.destroy();
      return this.view.remove();
    };

    Note.prototype.setCurrent = function(bool) {
      return this.save({
        current: bool
      });
    };

    return Note;

  })(Model);
  
}});

window.require.define({"models/notes": function(exports, require, module) {
  var Collection, Note, Notes, app,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Collection = require('./collection');

  app = require('application');

  Note = require('models/note');

  module.exports = Notes = (function(_super) {

    __extends(Notes, _super);

    function Notes() {
      this.setCurrent = __bind(this.setCurrent, this);

      this.initialize = __bind(this.initialize, this);
      return Notes.__super__.constructor.apply(this, arguments);
    }

    Notes.prototype.model = Note;

    Notes.prototype.initialize = function() {
      return this.localStorage = new Store('notes');
    };

    Notes.prototype.setCurrent = function(note) {
      app.notes.map(function(n) {
        if (n !== note) {
          return n.setCurrent(false);
        }
      });
      return note.save({
        current: true
      }, {
        silent: true
      });
    };

    return Notes;

  })(Collection);
  
}});

window.require.define({"views/home_view": function(exports, require, module) {
  var HomeView, View, app, template,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('./view');

  app = require('application');

  template = require('./templates/home');

  module.exports = HomeView = (function(_super) {

    __extends(HomeView, _super);

    function HomeView() {
      return HomeView.__super__.constructor.apply(this, arguments);
    }

    HomeView.prototype.el = '#page-container';

    HomeView.prototype.template = template;

    HomeView.prototype.afterRender = function() {
      this.$el.find('#note-editor').append(app.notepadView.render().el);
      return this.$el.find('#notes-list').append(app.noteListView.render().el);
    };

    return HomeView;

  })(View);
  
}});

window.require.define({"views/new_note_view": function(exports, require, module) {
  var NewNoteView, View, app, template,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('./view');

  app = require('application');

  template = require('./templates/new_note');

  module.exports = NewNoteView = (function(_super) {

    __extends(NewNoteView, _super);

    function NewNoteView() {
      this.createNewNote = __bind(this.createNewNote, this);
      return NewNoteView.__super__.constructor.apply(this, arguments);
    }

    NewNoteView.prototype.template = template;

    NewNoteView.prototype.id = 'add-note-view';

    NewNoteView.prototype.events = {
      'click #add-note': 'createNewNote'
    };

    NewNoteView.prototype.createNewNote = function() {
      return app.notes.create();
    };

    return NewNoteView;

  })(View);
  
}});

window.require.define({"views/note_list_view": function(exports, require, module) {
  var NoteView, NotesView, View, app, template,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('./view');

  NoteView = require('./note_view');

  app = require('application');

  template = require('./templates/note_list');

  module.exports = NotesView = (function(_super) {

    __extends(NotesView, _super);

    function NotesView() {
      this.afterRender = __bind(this.afterRender, this);

      this.initialize = __bind(this.initialize, this);

      this.addAll = __bind(this.addAll, this);

      this.addOne = __bind(this.addOne, this);
      return NotesView.__super__.constructor.apply(this, arguments);
    }

    NotesView.prototype.template = template;

    NotesView.prototype.addOne = function(note) {
      var view;
      view = new NoteView({
        model: note
      });
      this.$el.find('#add-note').before(view.render().el);
      if (note.attributes.current) {
        return view.$el.find('.note').click();
      }
    };

    NotesView.prototype.addAll = function() {
      return app.notes.each(this.addOne);
    };

    NotesView.prototype.initialize = function() {
      app.notes.bind('add', this.addOne);
      return app.notes.bind('reset', this.addAll);
    };

    NotesView.prototype.afterRender = function() {
      return this.$el.find('ul').append(app.newNoteView.render().el);
    };

    return NotesView;

  })(View);
  
}});

window.require.define({"views/note_view": function(exports, require, module) {
  var NoteView, View, app, template,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('./view');

  app = require('application');

  template = require('./templates/note');

  module.exports = NoteView = (function(_super) {

    __extends(NoteView, _super);

    function NoteView() {
      this.clear = __bind(this.clear, this);

      this.remove = __bind(this.remove, this);

      this.updateTitleOnEnter = __bind(this.updateTitleOnEnter, this);

      this.updateTitle = __bind(this.updateTitle, this);

      this.viewEdit = __bind(this.viewEdit, this);

      this.getRenderData = __bind(this.getRenderData, this);

      this.afterRender = __bind(this.afterRender, this);

      this.initialize = __bind(this.initialize, this);
      return NoteView.__super__.constructor.apply(this, arguments);
    }

    NoteView.prototype.template = template;

    NoteView.prototype.tagName = 'li';

    NoteView.prototype.events = {
      'click .note': 'viewEdit'
    };

    NoteView.prototype.initialize = function() {
      this.model.bind('change', this.render);
      return this.model.view = this;
    };

    NoteView.prototype.afterRender = function() {
      var noteTitle;
      noteTitle = this.$el.find('.note');
      if (this.model.attributes.current) {
        noteTitle.focus();
      }
      noteTitle.bind('blur', this.updateTitle);
      return noteTitle.bind('keyup', this.updateTitleOnEnter);
    };

    NoteView.prototype.getRenderData = function() {
      return {
        note: this.model.toJSON()
      };
    };

    NoteView.prototype.viewEdit = function() {
      return app.notes.setCurrent(this.model);
    };

    NoteView.prototype.updateTitle = function(event) {
      return this.model.save({
        title: this.$(event.target).text()
      });
    };

    NoteView.prototype.updateTitleOnEnter = function(event) {
      var noteTitle;
      noteTitle = this.$(event.target);
      if (event.keyCode === 13) {
        this.model.save({
          title: noteTitle.text()
        });
        return noteTitle.blur();
      }
    };

    NoteView.prototype.remove = function() {
      return this.$el.remove();
    };

    NoteView.prototype.clear = function() {
      return this.model.clear();
    };

    return NoteView;

  })(View);
  
}});

window.require.define({"views/notepad_view": function(exports, require, module) {
  var NotepadView, View, app, template,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('./view');

  app = require('application');

  template = require('./templates/notepad');

  module.exports = NotepadView = (function(_super) {

    __extends(NotepadView, _super);

    function NotepadView() {
      this.updateContent = __bind(this.updateContent, this);

      this.afterRender = __bind(this.afterRender, this);

      this.showNoteContent = __bind(this.showNoteContent, this);

      this.initialize = __bind(this.initialize, this);
      return NotepadView.__super__.constructor.apply(this, arguments);
    }

    NotepadView.prototype.template = template;

    NotepadView.prototype.currentNote = null;

    NotepadView.prototype.initialize = function() {
      return app.notes.bind('sync', this.showNoteContent);
    };

    NotepadView.prototype.showNoteContent = function(note, notes) {
      this.currentNote = note;
      return this.$('#note-input').text(note.attributes.content);
    };

    NotepadView.prototype.afterRender = function() {
      return this.$('#note-input').bind('blur', this.updateContent);
    };

    NotepadView.prototype.updateContent = function() {
      if (this.currentNote) {
        return this.currentNote.save({
          content: this.$('#note-input').text()
        });
      }
    };

    return NotepadView;

  })(View);
  
}});

window.require.define({"views/templates/home": function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
  buf.push('<div class="row-fluid fullheight"><aside id="notes-list" class="span3"></aside><section id="note-editor" class="span9"></section></div>');
  }
  return buf.join("");
  };
}});

window.require.define({"views/templates/index": function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
  buf.push('<div id="content"><h1>brunch<h2>Welcome!</h2><ul><li><a href="http://brunch.readthedocs.org/">Documentation</a></li><li><a href="https://github.com/brunch/brunch/issues">Github Issues</a></li><li><a href="https://github.com/brunch/twitter">Twitter Example App</a></li><li><a href="https://github.com/brunch/todos">Todos Example App</a></li></ul></h1></div>');
  }
  return buf.join("");
  };
}});

window.require.define({"views/templates/layout": function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
  buf.push('<!DOCTYPE html><html><head><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"><title>Brunch Notes</title><link rel="stylesheet" href="/stylesheets/app.css"></head><body>');
  var __val__ = body
  buf.push(null == __val__ ? "" : __val__);
  buf.push('<script src="/javascripts/vendor.js"></script><script src="/javascripts/app.js"></script></body></html>');
  }
  return buf.join("");
  };
}});

window.require.define({"views/templates/new_note": function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
  buf.push('<li id="add-note">New Note</li>');
  }
  return buf.join("");
  };
}});

window.require.define({"views/templates/note": function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
  if ( note.current)
  {
  buf.push('<div contenteditable="true" class="note current">' + escape((interp = note.title) == null ? '' : interp) + '</div>');
  }
  else
  {
  buf.push('<div contenteditable="true" class="note">' + escape((interp = note.title) == null ? '' : interp) + '</div>');
  }
  }
  return buf.join("");
  };
}});

window.require.define({"views/templates/note_list": function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
  buf.push('<ul class="fullheight"></ul>');
  }
  return buf.join("");
  };
}});

window.require.define({"views/templates/notepad": function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
  buf.push('<div id="note-input" contenteditable="true" class="notepad"></div>');
  }
  return buf.join("");
  };
}});

window.require.define({"views/view": function(exports, require, module) {
  
  module.exports = Backbone.View.extend({
    initialize: function() {
      return this.render = _.bind(this.render, this);
    },
    template: function() {},
    getRenderData: function() {},
    render: function() {
      this.$el.html(this.template(this.getRenderData()));
      this.afterRender();
      return this;
    },
    afterRender: function() {}
  });
  
}});

