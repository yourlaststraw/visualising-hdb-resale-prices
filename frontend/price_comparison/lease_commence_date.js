function calculateAverageResalePrice(data) {
  var priceMap = new Map();

  data.forEach(function (d) {
    var leaseCommenceDate = String(d.lease_commence_date); // Convert to string
    var price = d.resale_price;

    if (!priceMap.has(leaseCommenceDate)) {
      priceMap.set(leaseCommenceDate, { total: 0, count: 0, data: [] });
    }

    var leaseCommenceDateData = priceMap.get(leaseCommenceDate);
    leaseCommenceDateData.total += price;
    leaseCommenceDateData.count++;
    leaseCommenceDateData.data.push(d); // Store data for debugging
    priceMap.set(leaseCommenceDate, leaseCommenceDateData);
  });

  var averagePrices = [];
  priceMap.forEach(function (value, key) {
    console.log("Lease Commence Date:", key);
    console.log("Data:", value.data); // Log data for debugging
    var averagePrice = value.total / value.count;
    averagePrices.push([parseInt(key), averagePrice]); // Convert key back to number
  });

  return averagePrices;
}

// Function to create a line chart with tooltips
function createLeaseCommenceDateLineChart(data, title, containerId) {
  var w = 700;
  var h = 500;
  var margin = {
    top: 50,
    bottom: 100,
    left: 80,
    right: 20,
  };
  var width = w - margin.left - margin.right;
  var height = h - margin.top - margin.bottom;

  // Create container div for chart
  var container = d3
    .select("#" + containerId)
    .append("div")
    .classed("chart-container", true);

  // Create SVG container
  var svg = container.append("svg").attr("width", w).attr("height", h);

  // Append title
  svg
    .append("text")
    .attr("x", w / 2)
    .attr("y", margin.top / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "20px")
    .text(title);

  // Define scales and axes
  var x = d3
    .scaleLinear()
    .domain([
      d3.min(data, function (d) {
        return d[0];
      }),
      d3.max(data, function (d) {
        return d[0];
      }),
    ])
    .range([margin.left, width]);

  var y = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(data, function (d) {
        return d[1];
      }),
    ])
    .range([height, margin.top]);

  var xAxis = d3.axisBottom().scale(x);
  var yAxis = d3.axisLeft().scale(y);

  // Append X axis
  svg
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .selectAll("text")
    .attr("dy", "1em")
    .attr("dx", "-1em")
    .attr("transform", "rotate(-45)")
    .style("text-anchor", "end")
    .text(function (d) {
      return d3.format(".0f")(d);
    });

  // Append Y axis
  svg
    .append("g")
    .attr("class", "y-axis")
    .attr("transform", "translate(" + margin.left + ",0)")
    .call(yAxis);

  // Define the line generator
  var line = d3
    .line()
    .x(function (d) {
      return x(d[0]);
    })
    .y(function (d) {
      return y(d[1]);
    });

  // Append the line path
  svg
    .append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 2)
    .attr("d", line);

  // Append tooltips
  var tooltip = container
    .append("div")
    .attr("class", "tooltip")
    .style("display", "none")
    .style("position", "absolute")
    .style("background-color", "white")
    .style("padding", "5px")
    .style("border", "1px solid #ddd")
    .style("border-radius", "5px")
    .style("box-shadow", "0 2px 4px rgba(0,0,0,0.1)");

  svg
    .selectAll(".point")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "point")
    .attr("cx", function (d) {
      return x(d[0]);
    })
    .attr("cy", function (d) {
      return y(d[1]);
    })
    .attr("r", 5)
    .attr("fill", "steelblue")
    .style("cursor", "pointer")
    .on("mouseover", function (d) {
      tooltip
        .style("display", "block")
        .html("Year: " + d[0] + "<br>Price: $" + d[1].toFixed(2))
        .style("left", d3.event.pageX + 10 + "px")
        .style("top", d3.event.pageY - 10 + "px");
    })
    .on("mouseout", function () {
      tooltip.style("display", "none");
    });
}

// Load data and create line chart with tooltips
d3.csv(
  "../../data/ResaleflatpricesbasedonregistrationdatefromJan2017onwards.csv"
).then(function (data) {
  // Convert value strings to numbers
  data.forEach(function (d) {
    d.resale_price = +d.resale_price;
    d.lease_commence_date = +d.lease_commence_date;
  });

  // Sort data by lease commence date
  data.sort(function (a, b) {
    return a.lease_commence_date - b.lease_commence_date;
  });

  // Calculate average resale price for each lease commence date
  var averagePrices = calculateAverageResalePrice(data);

  // Create line chart with tooltips
  createLeaseCommenceDateLineChart(
    averagePrices,
    "Average Resale Price vs. Lease Commence Date",
    "chart6"
  );
});
