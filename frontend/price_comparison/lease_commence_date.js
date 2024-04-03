// Function to create a line chart
function createLeaseCommenceDateChart(data, title, containerId) {
  var w = 700;
  var h = 500;
  var margin = {
    top: 50,
    bottom: 50,
    left: 50, // Adjusted to accommodate longer x-axis labels
    right: 50,
  };
  var width = w - margin.left - margin.right;
  var height = h - margin.top - margin.bottom;

  // Create container div for chart
  var container = d3.select("#" + containerId).append("div").classed("chart-container", true);

  // Create SVG container
  var svg = container
    .append("svg")
    .attr("width", w)
    .attr("height", h);

  // Append title
  svg.append("text")
    .attr("x", w / 2)
    .attr("y", margin.top / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "20px")
    .text(title);

  // Define scales and axes
  var x = d3
    .scaleLinear()
    .domain([d3.min(data, function(d) { return d[0]; }), d3.max(data, function(d) { return d[0]; })])
    .range([margin.left, width]);

  var y = d3
    .scaleLinear()
    .domain([0, d3.max(data, function(d) { return d[1]; })])
    .range([height, margin.top]);

  var xAxis = d3.axisBottom().scale(x).tickFormat(d3.format("d"));
  var yAxis = d3.axisLeft().scale(y);

  // Append X axis
  svg.append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  // Append Y axis
  svg.append("g")
    .attr("class", "y-axis")
    .attr("transform", "translate(" + margin.left + ",0)")
    .call(yAxis);

  // Define line function
  var line = d3.line()
    .x(function(d) { return x(d[0]); })
    .y(function(d) { return y(d[1]); });

  // Append line
  svg.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 2)
    .attr("d", line);

  // Append tooltips
  svg.selectAll(".dot")
    .data(data)
    .enter().append("circle")
    .attr("class", "dot")
    .attr("cx", function(d) { return x(d[0]); })
    .attr("cy", function(d) { return y(d[1]); })
    .attr("r", 5)
    .attr("fill", "steelblue")
    .on("mouseover", function(d) {
      d3.select(this).attr("fill", "red");
    })
    .on("mouseout", function(d) {
      d3.select(this).transition("colorfade")
        .duration(250)
        .attr("fill", "steelblue");
    });

  // Append tooltips
  svg.selectAll(".dot")
    .append("title")
    .text(function(d) { return d[0] + ": $" + d[1].toFixed(2); });
}

// Load data and create line charts
d3.csv("../../data/ResaleflatpricesbasedonregistrationdatefromJan2017onwards.csv").then(function(data) {

  // Convert value strings to numbers
  data.forEach(function(d) {
    d.lease_commence_date = +d.lease_commence_date;
    d.resale_price = +d.resale_price;
  });

  // Calculate average resale price for each lease commence date
  var averagePrices = d3.rollups(
    data,
    (v) => d3.mean(v, (d) => d.resale_price),
    (d) => d.lease_commence_date
  );

  // Sort averagePrices by lease commence date
  averagePrices.sort(function(a, b) {
    return d3.ascending(a[0], b[0]);
  });

  // Create line chart for chart1
  createLeaseCommenceDateChart(averagePrices, "Average Resale Price vs. Lease Commence Date", "chart5");
});
