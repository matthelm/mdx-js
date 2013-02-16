(function() {
  var Query;

  Query = (function() {
    var AXIS_ALIASES, MDX_FUNCTIONS;

    function Query(cube_name) {
      this.cube = null;
      this.axes = [];
      this._where = [];
      this["with"] = [];
      this.cube_name = cube_name;
    }

    Query.prototype.axis = function(index, members) {
      var _base, _ref;
      if (members && members.length > 0) {
        (_base = this.axes)[index] || (_base[index] = []);
        this.current_set = this.axes[index];
        if (members.length === 1 && members[0] instanceof Array) {
          this.current_set = this.current_set.concat(members[0]);
        } else {
          this.current_set = (_ref = this.current_set).concat.apply(_ref, members);
        }
        this.axes[index] = this.current_set;
        return this;
      } else {
        return this.axes[index];
      }
    };

    AXIS_ALIASES = ['columns', 'rows', 'pages', 'sections', 'chapters'];

    Query.prototype.columns = function() {
      return this.axis(0, arguments);
    };

    Query.prototype.rows = function() {
      return this.axis(1, arguments);
    };

    Query.prototype.pages = function() {
      return this.axis(2, arguments);
    };

    Query.prototype.sections = function() {
      return this.axis(3, arguments);
    };

    Query.prototype.chapters = function() {
      return this.axis(4, arguments);
    };

    Query.prototype.except = function() {
      return console.log("Implementation Needed");
    };

    Query.prototype.filter = function() {
      return console.log("Implementation Needed");
    };

    Query.prototype.hierarchize = function() {
      return console.log("Implementation Needed");
    };

    Query.prototype.filter = function(condition, options) {
      if (options == null) {
        options = {};
      }
      if (!this.current_set) {
        throw "Can not use filter method before axis or with_set method";
      }
      this.axes[1] = ['filter', this.current_set.slice(0), condition];
      if (options.as) {
        this.axes[1].push(options.as);
      }
      return this;
    };

    Query.prototype.order = function(expression, direction) {
      if (!this.current_set) {
        throw "Can not use order method before axis or with_set method";
      }
      this.axes[1] = ['order', this.current_set.slice(0), expression, direction.toUpperCase()];
      return this;
    };

    Query.prototype.where = function(members) {
      if (members && members.length > 0) {
        if (members.length === 1 && members[0] instanceof Array) {
          this._where = this._where.concat(members[0]);
        } else {
          this._where = this._where.concat(members);
        }
        return this;
      } else {
        return this._where;
      }
    };

    Query.prototype.toMDX = function() {
      var mdx;
      mdx = "";
      mdx += "SELECT " + (this.axisToMDX()) + "\n";
      mdx += "FROM " + (this.fromToMDX());
      return mdx;
    };

    Query.prototype.axisToMDX = function() {
      var axis_members, axis_name, i, mdx, _i, _len, _ref;
      mdx = "";
      _ref = this.axes;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        axis_members = _ref[i];
        axis_name = AXIS_ALIASES[i] ? AXIS_ALIASES[i].toUpperCase() : "AXIS(" + i + ")";
        if (i > 0) {
          mdx = mdx.concat(",\n");
        }
        mdx = mdx.concat("" + (this.membersToMDX(axis_members)) + " ON " + axis_name);
      }
      return mdx;
    };

    MDX_FUNCTIONS = {
      top_count: 'TOPCOUNT',
      top_percent: 'TOPPERCENT',
      top_sum: 'TOPSUM',
      bottom_count: 'BOTTOMCOUNT',
      bottom_percent: 'BOTTOMPERCENT',
      bottom_sum: 'BOTTOMSUM'
    };

    Query.prototype.membersToMDX = function(members) {
      var as_alias;
      if (members.length === 1 && members[0].substr(-1, 1) !== ']') {
        return members[0];
      } else if (members[0] instanceof String) {
        switch (members[0]) {
          case 'filter':
            as_alias = members[3] ? " AS " + members[3] : null;
            return "FILTER(" + (this.membersToMDX(members[1])) + as_alias + ", " + members[2] + ")";
          case 'order':
            return "ORDER(" + (this.membersToMDX(members[1])) + ", " + (expression_to_mdx(members[2])) + ", " + members[3] + ")";
          case 'hierarchize':
            return "HIERARCHIZE(" + (this.membersToMDX(members[1])) + (members[2] && (", " + members[2])) + ")";
          default:
            throw "Cannot generate MDX for invalid set operation " + members[0];
        }
      } else {
        return "{" + (members.join(', ')) + "}";
      }
    };

    Query.prototype.fromToMDX = function() {
      return "[" + this.cube_name + "]";
    };

    Query.prototype.execute = function() {
      throw "This connector doesn't maintain a connection";
    };

    return Query;

  })();

  (typeof exports !== "undefined" && exports !== null ? exports : this).Query = Query;

}).call(this);
