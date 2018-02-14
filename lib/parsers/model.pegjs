model = m:(start expr+ end) {
  return m[1];
  }
  
  expr = e:(space+ word colon? space? word comma? newLine?) { 
  return { 
  key: e[1].join(""), 
  value: e[4].join("") 
  }; 
  }

  start = "export default DS.Model.extend({\n"
  end = "});\n"

  word = letter+

  letter = [a-zA-Z0-9.()""'']

  space = " "

  colon = ":"

  comma = ","

  newLine = "\n"