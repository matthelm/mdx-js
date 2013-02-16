(function() {
  var assert, expect;

  chai.should();

  expect = chai.expect;

  assert = chai.assert;

  describe("result", function() {
    before(function() {
      this.expected_column_names = ["Unit Sales", "Store Sales"];
      this.expected_column_full_names = ["[Measures].[Unit Sales]", "[Measures].[Store Sales]"];
      this.expected_drillable_columns = [false, false];
      this.expected_row_names = ["Drink", "Food", "Non-Consumable"];
      this.expected_row_full_names = ["[Product].[Drink]", "[Product].[Food]", "[Product].[Non-Consumable]"];
      this.expected_drillable_rows = [true, true, true];
      return this.result = {
        axes_count: 2,
        column_names: ["Unit Sales", "Store Sales"],
        column_full_names: ["[Measures].[Unit Sales]", "[Measures].[Store Sales]"],
        to_mdx: "THE MDX STRING"
      };
    });
    it("should return axes", function() {
      return assert.equal(this.result.axes_count, 2);
    });
    it("should return column names", function() {
      assert.deepEqual(this.result.column_names, this.expected_column_names);
      return assert.deepEqual(this.result.column_full_names, this.expected_column_full_names);
    });
    it("should return row names", function() {
      return expect(true).to.be["true"];
    });
    it("should return axis by index names", function() {
      return expect(true).to.be["true"];
    });
    it("should return column members", function() {
      return expect(true).to.be["true"];
    });
    it("should return row members", function() {
      return expect(true).to.be["true"];
    });
    it("should return cells", function() {
      return expect(true).to.be["true"];
    });
    it("should return cells with specified axes number sequence", function() {
      return expect(true).to.be["true"];
    });
    it("should return cells with specified axes name sequence", function() {
      return expect(true).to.be["true"];
    });
    return it("should return formatted cells", function() {
      return expect(true).to.be["true"];
    });
  });

  describe("builder", function() {
    beforeEach(function() {
      return this.query = new Query('Sales');
    });
    describe("from cube", function() {
      return it("should return query", function() {
        return assert.equal(this.query.cube_name, 'Sales');
      });
    });
    describe("columns", function() {
      it("should accept list", function() {
        assert.deepEqual(this.query.columns('[Measures].[Unit Sales]', '[Measures].[Store Sales]'), this.query);
        return assert.deepEqual(this.query.columns(), ['[Measures].[Unit Sales]', '[Measures].[Store Sales]']);
      });
      it("should accept list as array", function() {
        this.query.columns(['[Measures].[Unit Sales]', '[Measures].[Store Sales]']);
        return assert.deepEqual(this.query.columns(), ['[Measures].[Unit Sales]', '[Measures].[Store Sales]']);
      });
      return it("should accept with several method calls", function() {
        this.query.columns('[Measures].[Unit Sales]').columns('[Measures].[Store Sales]');
        return assert.deepEqual(this.query.columns(), ['[Measures].[Unit Sales]', '[Measures].[Store Sales]']);
      });
    });
    describe("other axis", function() {
      it("should accept rows list", function() {
        this.query.rows('[Product].children');
        return assert.deepEqual(this.query.rows(), ['[Product].children']);
      });
      return it("should accept pages list", function() {
        this.query.pages('[Product].children');
        return assert.deepEqual(this.query.pages(), ['[Product].children']);
      });
    });
    describe("order", function() {
      it("should order by one measure", function() {
        this.query.rows('[Product].children');
        this.query.order('[Measures].[Unit Sales]', 'bdesc');
        return assert.deepEqual(this.query.rows(), ['order', ['[Product].children'], '[Measures].[Unit Sales]', 'BDESC']);
      });
      it("should order using String order direction", function() {
        this.query.rows('[Product].children').order('[Measures].[Unit Sales]', 'DESC');
        return assert.deepEqual(this.query.rows(), ['order', ['[Product].children'], '[Measures].[Unit Sales]', 'DESC']);
      });
      return it("should order by measure and other member", function() {
        this.query.rows('[Product].children').order(['[Measures].[Unit Sales]', '[Customers].[USA]'], 'basc');
        return assert.deepEqual(this.query.rows(), ['order', ['[Product].children'], ['[Measures].[Unit Sales]', '[Customers].[USA]'], 'BASC']);
      });
    });
    describe("filter", function() {
      it("should filter set by condition", function() {
        this.query.rows('[Customers].[Country].Members').filter('[Measures].[Unit Sales] > 1000');
        return assert.deepEqual(this.query.rows(), ['filter', ['[Customers].[Country].Members'], '[Measures].[Unit Sales] > 1000']);
      });
      return it("should filter using set alias", function() {
        this.query.rows('[Customers].[Country].Members').filter('NOT ISEMPTY(S.CURRENT)', {
          as: 'S'
        });
        return assert.deepEqual(this.query.rows(), ['filter', ['[Customers].[Country].Members'], 'NOT ISEMPTY(S.CURRENT)', 'S']);
      });
    });
    return describe("to MDX", function() {
      return it("should return MDX query", function() {
        var MDX, SQL;
        MDX = this.query.columns('[Measures].[Unit Sales]', '[Measures].[Store Sales]').rows('[Product].children').where('[Time].[2010].[Q1]', '[Customers].[USA].[CA]').toMDX();
        SQL = "SELECT {[Measures].[Unit Sales], [Measures].[Store Sales]} ON COLUMNS,\n[Product].children ON ROWS\nFROM [Sales]";
        return assert.equal(MDX, SQL);
      });
    });
  });

}).call(this);
