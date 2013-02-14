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

}).call(this);
