(function() {
  var Query;

  Query = (function() {

    function Query() {
      this.cube = null;
      this.axes = [];
      this.where = [];
      this["with"] = [];
    }

    Query.prototype.axis = function() {};

    Query.prototype.except = function() {};

    Query.prototype.filter = function(condition, options) {
      if (options == null) {
        options = {};
      }
    };

    Query.prototype.toMDX = function() {
      return "finally, here is our MDX string";
    };

    return Query;

  })();

  (typeof exports !== "undefined" && exports !== null ? exports : this).Query = Query;

}).call(this);
