// Function to calculate average resale price for each floor area sqm
function calculateAverageResalePrice(data) {
  // Create a map to store total resale price and count of data points for each floor area sqm
  var priceMap = new Map();

  // Iterate through the data to populate the priceMap
  data.forEach(function (d) {
    var floorArea = d.floor_area_sqm;
    var price = d.resale_price;

    // If floor area is not already in the map, initialize its values
    if (!priceMap.has(floorArea)) {
      priceMap.set(floorArea, { total: 0, count: 0 });
    }

    // Update the total resale price and count for the floor area
    var floorAreaData = priceMap.get(floorArea);
    floorAreaData.total += price;
    floorAreaData.count++;
    priceMap.set(floorArea, floorAreaData);
  });

  // Calculate the average resale price for each floor area
  var averagePrices = [];
  priceMap.forEach(function (value, key) {
    var averagePrice = value.total / value.count;
    averagePrices.push([key, averagePrice]);
  });

  return averagePrices;
}

// Function to calculate linear regression parameters (slope and intercept)
function calculateLinearRegression(data) {
  // Calculate mean of x and y values
  var xMean = d3.mean(data, function (d) {
    return d[0];
  });
  var yMean = d3.mean(data, function (d) {
    return d[1];
  });

  // Calculate numerator and denominator of slope
  var numerator = d3.sum(data, function (d) {
    return (d[0] - xMean) * (d[1] - yMean);
  });
  var denominator = d3.sum(data, function (d) {
    return Math.pow(d[0] - xMean, 2);
  });

  // Calculate slope and intercept
  var slope = numerator / denominator;
  var intercept = yMean - slope * xMean;

  return { slope: slope, intercept: intercept };
}

// Function to create a scatter plot
function createFloorAreaSqmPlot(data, title, containerId) {
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
      0,
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
    .call(xAxis);

  // Append Y axis
  svg
    .append("g")
    .attr("class", "y-axis")
    .attr("transform", "translate(" + margin.left + ",0)")
    .call(yAxis);

  // Append circles for data points
  svg
    .selectAll(".circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "circle")
    .attr("cx", function (d) {
      return x(d[0]);
    }) // x-coordinate
    .attr("cy", function (d) {
      return y(d[1]);
    }) // y-coordinate
    .attr("r", 5) // radius of the circle
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 2)
    .on("mouseover", function () {
      d3.select(this).attr("stroke", "red");
    })
    .on("mouseout", function () {
      d3.select(this)
        .transition("colorfade")
        .duration(250)
        .attr("stroke", "steelblue");
    });

  // Append tooltips
  svg
    .selectAll(".circle")
    .append("title")
    .text(function (d) {
      return (
        "Floor Area: " +
        d[0] +
        " sqm, Average Resale Price: $" +
        d[1].toFixed(2)
      );
    });

  // Calculate linear regression parameters
  var regressionParams = calculateLinearRegression(data);

  // Calculate predicted y-values using linear regression
  var xValues = data.map(function (d) {
    return d[0];
  });
  var predictedYValues = xValues.map(function (x) {
    return regressionParams.intercept + regressionParams.slope * x;
  });

  // Append trendline
  svg
    .append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", 2)
    .attr(
      "d",
      d3
        .line()
        .x(function (d) {
          return x(d[0]);
        })
        .y(function (d, i) {
          return y(predictedYValues[i]);
        })
    );
      }
      
// Load data and create scatter plot
d3.csv(
  "../../data/ResaleflatpricesbasedonregistrationdatefromJan2017onwards.csv"
).then(function (data) {
  // Convert value strings to numbers
  data.forEach(function (d) {
    d.resale_price = +d.resale_price;
    d.floor_area_sqm = +d.floor_area_sqm;
  });

  // Calculate average resale price for each floor area sqm
  var averagePrices = calculateAverageResalePrice(data);

  // Create scatter plot for chart7
  createFloorAreaSqmPlot(
    averagePrices,
    "Average Resale Price vs. Floor Area Sqm",
    "chart7"
  );
})
