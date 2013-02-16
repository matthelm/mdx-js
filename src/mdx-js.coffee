class Query

  constructor: (cube_name) ->
    @cube  = null
    @axes  = []
    @_where = []
    @with  = []

    @cube_name = cube_name

  #
  # PARSE
  #

  axis: (index, members) ->
    if members && members.length > 0
      @axes[index] ||= []
      @current_set = @axes[index]
      if members.length == 1 && members[0] instanceof Array
        @current_set = @current_set.concat members[0]
      else
        @current_set = @current_set.concat members...
      @axes[index] = @current_set                                 # TODO: This line isn't in the ruby version. Why does their's work?
      this
    else
      @axes[index]

  AXIS_ALIASES = ['columns', 'rows', 'pages', 'sections', 'chapters']

  columns:  -> @axis(0, arguments)
  rows:     -> @axis(1, arguments)
  pages:    -> @axis(2, arguments)
  sections: -> @axis(3, arguments)
  chapters: -> @axis(4, arguments)

  except: -> console.log "Implementation Needed"
  filter: -> console.log "Implementation Needed"
  hierarchize: -> console.log "Implementation Needed"

  filter: (condition, options={}) ->
    throw "Can not use filter method before axis or with_set method" unless @current_set
    @axes[1] = ['filter', @current_set.slice(0), condition]
    @axes[1].push options.as if options.as
    this

  order: (expression, direction) ->
    throw "Can not use order method before axis or with_set method" unless @current_set
    @axes[1] = ['order', @current_set.slice(0), expression, direction.toUpperCase()]
    this

  where: (members) ->
    if members && members.length > 0
      if members.length == 1 && members[0] instanceof Array
        @_where = @_where.concat members[0]
      else
        @_where = @_where.concat members # I REMOVED THE SPLAT FROM HERE
      this
    else
      @_where

  #
  # RENDER
  #

  toMDX:   ->
    mdx  = ""
    mdx += "SELECT #{@axisToMDX()}\n"
    mdx += "FROM #{@fromToMDX()}"
    mdx

  axisToMDX: ->
    mdx = ""
    for axis_members, i in @axes
      axis_name = if AXIS_ALIASES[i] then AXIS_ALIASES[i].toUpperCase() else "AXIS(#{i})"
      mdx = mdx.concat ",\n" if i > 0
      mdx = mdx.concat "#{@membersToMDX(axis_members)} ON #{axis_name}"
    mdx

  MDX_FUNCTIONS =
    top_count: 'TOPCOUNT'
    top_percent: 'TOPPERCENT'
    top_sum: 'TOPSUM'
    bottom_count: 'BOTTOMCOUNT'
    bottom_percent: 'BOTTOMPERCENT'
    bottom_sum: 'BOTTOMSUM'

  membersToMDX: (members) ->
    # if only one member which does not end with ]
    # then assume it is expression which returns set
    # TODO: maybe always include also single expressions in {...} to avoid some edge cases?
    if members.length is 1 and members[0].substr(-1,1) isnt ']'
      members[0]
    else if members[0] instanceof String
      switch members[0]
        when 'filter'
          as_alias = if members[3] then " AS #{members[3]}" else null
          "FILTER(#{@membersToMDX(members[1])}#{as_alias}, #{members[2]})"
        when 'order'
          "ORDER(#{@membersToMDX(members[1])}, #{expression_to_mdx(members[2])}, #{members[3]})"
        when 'hierarchize'
          "HIERARCHIZE(#{@membersToMDX(members[1])}#{members[2] and ", #{members[2]}"})"
        else
          throw "Cannot generate MDX for invalid set operation #{members[0]}"
    else
      "{#{members.join(', ')}}"

  fromToMDX: ->
    "[#{@cube_name}]"

  execute: -> throw "This connector doesn't maintain a connection"

(exports ? this).Query = Query
