// Function to create a bar chart
function createFlatTypeChart(data, title, containerId) {
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
      .scaleBand()
      .domain(data.map(function(d) { return d[0]; }))
      .range([margin.left, width])
      .padding(0.1);
  
    var y = d3
      .scaleLinear()
      .domain([0, d3.max(data, function(d) { return d[1]; })])
      .range([height, margin.top]);
  
    var xAxis = d3.axisBottom().scale(x);
    var yAxis = d3.axisLeft().scale(y);
  
    // Append X axis
    svg.append("g")
      .attr("class", "x-axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-45)");
  
    // Append Y axis
    svg.append("g")
      .attr("class", "y-axis")
      .attr("transform", "translate(" + margin.left + ",0)")
      .call(yAxis);
  
    // Append bars
    svg.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d[0]); })
      .attr("width", x.bandwidth())
      .attr("y", height)
      .attr("height", 0)
      .attr("fill", "steelblue")
      .on("mouseover", function () {
        d3.select(this).attr("fill", "red");
      })
      .on("mouseout", function () {
        d3.select(this).transition("colorfade")
          .duration(250)
          .attr("fill", "steelblue");
      })
      .transition()
      .duration(1000)
      .attr("y", function(d) { return y(d[1]); })
      .attr("height", function(d) { return height - y(d[1]); });
  
    // Append tooltips
    svg.selectAll("rect")
      .append("title")
      .text(function(d) { return d[0] + ": $" + d[1].toFixed(2); });
  }
  
  // Load data and create bar charts
  d3.csv("../../data/ResaleflatpricesbasedonregistrationdatefromJan2017onwards.csv").then(function(data) {
  
    // Convert value strings to numbers
    data.forEach(function(d) {
      d.resale_price = +d.resale_price;
    });
  
    // Calculate average resale price for each town
    var averagePrices = d3.rollups(
      data,
      (v) => d3.mean(v, (d) => d.resale_price),
      (d) => d.flat_type
    );
  
    // Sort averagePrices by average resale price
    averagePrices.sort(function(a, b) {
      return d3.descending(a[1], b[1]);
    });
  
    // Create bar chart for chart1
    createFlatTypeChart(averagePrices, "Average Resale Price vs. Flat Type", "chart3");
  });
  