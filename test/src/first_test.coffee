chai.should()
expect = chai.expect
assert = chai.assert

# RESULT
describe "result", ->

  before ->
    @expected_column_names = ["Unit Sales", "Store Sales"]
    @expected_column_full_names = ["[Measures].[Unit Sales]", "[Measures].[Store Sales]"]
    @expected_drillable_columns = [false, false]
    @expected_row_names = ["Drink", "Food", "Non-Consumable"]
    @expected_row_full_names = ["[Product].[Drink]", "[Product].[Food]", "[Product].[Non-Consumable]"]
    @expected_drillable_rows = [true, true, true]

    @result =
      axes_count: 2
      column_names: ["Unit Sales", "Store Sales"]
      column_full_names: ["[Measures].[Unit Sales]", "[Measures].[Store Sales]"]
      to_mdx: "THE MDX STRING"

  it "should return axes", ->
    assert.equal @result.axes_count, 2

  it "should return column names", ->
    assert.deepEqual @result.column_names, @expected_column_names
    assert.deepEqual @result.column_full_names, @expected_column_full_names

  it "should return row names", ->
    expect(true).to.be.true

  it "should return axis by index names", ->
    expect(true).to.be.true

  it "should return column members", ->
    expect(true).to.be.true

  it "should return row members", ->
    expect(true).to.be.true

  it "should return cells", ->
    expect(true).to.be.true

  it "should return cells with specified axes number sequence", ->
    expect(true).to.be.true

  it "should return cells with specified axes name sequence", ->
    expect(true).to.be.true

  it "should return formatted cells", ->
    expect(true).to.be.true

  it "should serialize correctly", ->
    query = new window.Query
    assert.equal query.toMDX(), "finally, here is our MDX string"

# BUILDER

# ERRORS

# DRILL THROUGH



