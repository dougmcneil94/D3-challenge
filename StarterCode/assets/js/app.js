// @TODO: YOUR CODE HERE!
var svgWidth = 1000;
var svgHeight = 500;

// create an SVG element
var svg = d3.select("#svg-area")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Load csv data
d3.csv("data.csv").then(function(povertyData) {

  console.log(povertyData);

  // cast the data from the csv as numbers
  povertyData.forEach(function(data) {
    data.poverty = +data.poverty;
    data.obesity = +data.obesity;
  });

  // Create a scale for your independent (x) coordinates
  var xScale = d3.scaleLinear()
    .domain(d3.extent(povertyData, d => d.poverty))
    .range([0, svgWidth]);

  // Create a scale for your dependent (y) coordinates
  var yScale = d3.scaleLinear()
    .domain([0, d3.max(povertyData, d => d.obesity)])
    .range([svgHeight, 0]);

  // create a line generator function and store as a variable
  // use the scale functions for x and y data
  var createLine = d3.line()
    .x(data => xScale(data.poverty))
    .y(data => yScale(data.obesity));

  // Append a path element to the svg, make sure to set the stroke, stroke-width, and fill attributes.
  svg.append("path")
    .attr("stroke", "black")
    .attr("stroke-width", "1")
    .attr("fill", "none")
    .attr("d", createLine(povertyData));

}).catch(function(error) {
  console.log(error);
});
