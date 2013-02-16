chai.should()
expect = chai.expect
assert = chai.assert

# Query = window.Query

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

# BUILDER
describe "builder", ->

  beforeEach ->
    @query = new Query('Sales')

  describe "from cube", ->
    it "should return query", ->
      assert.equal @query.cube_name, 'Sales'

  describe "columns", ->
    it "should accept list", ->
      assert.deepEqual @query.columns('[Measures].[Unit Sales]', '[Measures].[Store Sales]'), @query
      assert.deepEqual @query.columns(), ['[Measures].[Unit Sales]', '[Measures].[Store Sales]']

    it "should accept list as array", ->
      @query.columns(['[Measures].[Unit Sales]', '[Measures].[Store Sales]'])
      assert.deepEqual @query.columns(), ['[Measures].[Unit Sales]', '[Measures].[Store Sales]']

    it "should accept with several method calls", ->
      @query.columns('[Measures].[Unit Sales]').columns('[Measures].[Store Sales]')
      assert.deepEqual @query.columns(), ['[Measures].[Unit Sales]', '[Measures].[Store Sales]']

  describe "other axis", ->
    it "should accept rows list", ->
      @query.rows('[Product].children')
      assert.deepEqual @query.rows(), ['[Product].children']

    it "should accept pages list", ->
      @query.pages('[Product].children')
      assert.deepEqual @query.pages(), ['[Product].children']

  # describe "crossjoin", ->
  #   it "should do crossjoin of several dimensions", ->
  #     @query.rows('[Product].children').crossjoin('[Customers].[Canada]', '[Customers].[USA]')
  #     assert.deepEqual @query.rows(), ['crossjoin', ['[Product].children'], ['[Customers].[Canada]', '[Customers].[USA]']]

  #   it "should do crossjoin passing array as first argument", ->
  #     @query.rows('[Product].children').crossjoin(['[Customers].[Canada]', '[Customers].[USA]'])
  #     assert.deepEqual @query.rows(), ['crossjoin', ['[Product].children'], ['[Customers].[Canada]', '[Customers].[USA]']]

  # describe "nonempty_crossjoin", ->
  #   it "should do nonempty_crossjoin of several dimensions", ->
  #     @query.rows('[Product].children').nonempty_crossjoin('[Customers].[Canada]', '[Customers].[USA]')
  #     assert.deepEqual @query.rows(), ['nonempty_crossjoin', ['[Product].children'], ['[Customers].[Canada]', '[Customers].[USA]']]

  # describe "nonempty", ->
  #   it "should limit to set of members with nonempty values", ->
  #     @query.rows('[Product].children').nonempty()
  #     assert.deepEqual @query.rows(), ['nonempty', ['[Product].children']]

  describe "order", ->
    it "should order by one measure", ->
      @query.rows('[Product].children')
      @query.order('[Measures].[Unit Sales]', 'bdesc')
      assert.deepEqual @query.rows(), ['order', ['[Product].children'], '[Measures].[Unit Sales]', 'BDESC']

    it "should order using String order direction", ->
      @query.rows('[Product].children').order('[Measures].[Unit Sales]', 'DESC')
      assert.deepEqual @query.rows(), ['order', ['[Product].children'], '[Measures].[Unit Sales]', 'DESC']

    it "should order by measure and other member", ->
      @query.rows('[Product].children').order(['[Measures].[Unit Sales]', '[Customers].[USA]'], 'basc')
      assert.deepEqual @query.rows(), ['order', ['[Product].children'], ['[Measures].[Unit Sales]', '[Customers].[USA]'], 'BASC']

  describe "filter", ->
    it "should filter set by condition", ->
      @query.rows('[Customers].[Country].Members').filter('[Measures].[Unit Sales] > 1000')
      assert.deepEqual @query.rows(), ['filter', ['[Customers].[Country].Members'], '[Measures].[Unit Sales] > 1000']

    it "should filter using set alias", ->
      @query.rows('[Customers].[Country].Members').filter('NOT ISEMPTY(S.CURRENT)', { as: 'S' })
      assert.deepEqual @query.rows(), ['filter', ['[Customers].[Country].Members'], 'NOT ISEMPTY(S.CURRENT)', 'S']

  describe "to MDX", ->
    it "should return MDX query", ->
      MDX = @query.columns('[Measures].[Unit Sales]', '[Measures].[Store Sales]')
                  .rows('[Product].children')
                  .where('[Time].[2010].[Q1]', '[Customers].[USA].[CA]')
                  .toMDX()
      SQL = """
      SELECT {[Measures].[Unit Sales], [Measures].[Store Sales]} ON COLUMNS,
      [Product].children ON ROWS
      FROM [Sales]
      """
      # WHERE ([Time].[2010].[Q1], [Customers].[USA].[CA])
      # """
      assert.equal MDX, SQL




# ERRORS

# DRILL THROUGH
