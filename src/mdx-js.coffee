class Query

  constructor: ->
    @cube  = null
    @axes  = []
    @where = []
    @with  = []

  axis: ->

  except: ->

  filter: (condition, options={}) ->

  toMDX: ->
    "finally, here is our MDX string"

(exports ? this).Query = Query
