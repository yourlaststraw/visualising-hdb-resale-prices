// set the dimensions and margins of the graph
const margin = {top: 70, right: 30, bottom: 40, left: 80},
    width = 700 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// Add X axis
const x = d3.scaleTime()
    .range([0, width]);

// Add Y axis
const y = d3.scaleLinear()
    .range([ height, 0 ]);

// append the svg object to the body of the page
const svg = d3.select("#trend_chart")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

function processData(data) {
    // Parse date and extract year
    data.forEach(d => {
        d.date = new Date(d.month);
        d.year = d.date.getFullYear();
    });

    // Group data by town
    const groupedData = Array.from(d3.group(data, d => d.town), ([town, townValues]) => {
        const medianPriceByYear = d3.group(townValues, d => d.year);
        const townData = {
            town: town,
            data: []
        };
        medianPriceByYear.forEach((yearValues, year) => {
            const medianPrice = d3.median(yearValues, d => +d.resale_price);
            townData.data.push({ year: year, medianPrice: medianPrice });
        });
        return townData;
    });
    return groupedData;
}


// Read the data
d3.csv("../../../data.csv").then(function(data) {
    const processedData = processData(data);
    console.log(processedData);

    // List of groups (for creating dropdown menu)
    const allGroup = new Set(processedData.map(d => d.town))
    console.log(allGroup);

    // Add options to the button
    d3.select("#selectButton")
        .selectAll('myOptions')
            .data(allGroup)
        .enter()
            .append('option')
        .text(function (d) { return d; })
        .attr("value", function (d) { return d; });

    // Add x domain range between earliest date and latest date within processedData
    x.domain(d3.extent(processedData.find(d => d.town === "ANG MO KIO").data, d => d.year));
    // Add y domain range between 0 and max median price of the selected town
    y.domain([0, d3.max(processedData.find(d => d.town === "ANG MO KIO").data, d => d.medianPrice)]);

    // Add the x-axis
    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x))

    // Add the y-axis
    svg.append("g")
        .attr("class", "yAxis")
        .call(d3.axisLeft(y));

     // Add vertical gridlines
    svg.selectAll("xGrid")
        .data(x.ticks().slice(1))
        .join("line")
        .attr("x1", d => x(d))
        .attr("x2", d => x(d))
        .attr("y1", 0)
        .attr("y2", height)
        .attr("stroke", "#e0e0e0")
        .attr("stroke-width", .5);

    // Add horizontal gridlines
    const horizontalGridlines = svg
        .selectAll("yGrid")
        .data(y.ticks().slice(1))
        .join("line")
        .attr("x1", 0)
        .attr("x2", width)
        .attr("y1", d => y(d))
        .attr("y2", d => y(d))
        .attr("stroke", "#e0e0e0")
        .attr("stroke-width", 1)

    // x-axis label
    svg.append("text")
        .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.bottom) + ")")
        .style("text-anchor", "middle")
        .text("Year");
        
    // y-axis label
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Median Price of HDB Resale Flats ($)");

    // Add a title
    svg.append("text")
        .attr("class", "chart-title")
        .attr("x", margin.left)
        .attr("y", margin.top - 100)
        .style("font-size", "18px")
        .style("font-weight", "bold")
        .style("font-family", "sans-serif")
        .text("Median Prices of HDB Resale Flats in Singapore");

    // Initialize line with first group of the list
    const line = d3.line()
        .x(d => x(d.year))
        .y(d => y(d.medianPrice));
        
    const path = svg
        .append("path")
        .attr("stroke", "steelblue")
        .style("stroke-width", 2)
        .style("fill", "none")
        .attr("d", line(processedData.find(d => d.town === "ANG MO KIO").data));

    // A function that update the chart
    function update(selectedGroup) {
        console.log(selectedGroup);
        console.log(processedData.find(d => d.town === selectedGroup).data);
        const selectedData = processedData.find(d => d.town === selectedGroup).data

        // update y domain range between 0 and max median price of the selected town
        y.domain([0, d3.max(selectedData, d => d.medianPrice)]);
        
        // Update the Y axis
        svg.select("g.yAxis")
            .transition()
            .duration(1000)
            .call(d3.axisLeft(y));

        // Create new line after the selection
        path
            .datum(selectedData)
            .transition()
            .duration(1000)
            .attr("d", d3.line()
                .x(d => x(d.year))
                .y(d => y(d.medianPrice))
            );

        // Update horizontal gridlines
        horizontalGridlines
            .join("line")
            .transition()
            .duration(1000)
            .attr("y1", d => y(d))
            .attr("y2", d => y(d));

        // Update listening rectangle
        listeningRect
            .on("mousemove", function (event) {
                const [xCoord] = d3.pointer(event, this);
                const bisectDate = d3.bisector(d => d.year).left;
                const x0 = x.invert(xCoord);
                const i = bisectDate(processedData.find(d => d.town === selectedGroup).data, x0, 1);
                const d0 = processedData.find(d => d.town === selectedGroup).data[i - 1];
                const d1 = processedData.find(d => d.town === selectedGroup).data[i];
                const d = x0 - d0.year > d1.year - x0 ? d1 : d0;
                const xPos = x(d.year);
                const yPos = y(d.medianPrice);

                circle.attr("cx", xPos)
                    .attr("cy", yPos);

                circle.transition()
                    .duration(50)
                    .attr("r", 5);

                tooltip
                    .style("display", "block")
                    .style("left", `${xPos + 100}px`)
                    .style("top", `${yPos + 120}px`)
                    .html(`<strong>Year:</strong> ${d.year.toString()}<br><strong>Median Resale Price:</strong> ${'$' + d.medianPrice}`)

                listeningRect.on("mouseleave", function () {
                    circle.transition()
                        .duration(50)
                        .attr("r", 0);
                
                    tooltip.style("display", "none");
                });
            });
    }

    // ADDITIONAL: CREATING TOOLTIP FOR VISUALISATION
    const tooltip = d3.select("body")
        .append("div")
        .attr("class", "tooltip");

    // Add point below cursor
    const circle = svg.append("circle")
        .attr("r", 0)
        .attr("fill", "steelblue")
        .style("stroke", "steelblue")
        .attr("opacity", .70)
        .style("pointer-events", "none");

    // Create a listening rectangle
    const listeningRect = svg.append("rect")
        .attr("width", width)
        .attr("height", height);

    // Listen for mouse moving events
    listeningRect.on("mousemove", function (event) {
        const [xCoord] = d3.pointer(event, this);
        const bisectDate = d3.bisector(d => d.year).left;
        const x0 = x.invert(xCoord);
        const i = bisectDate(processedData.find(d => d.town === "ANG MO KIO").data, x0, 1);
        const d0 = processedData.find(d => d.town === "ANG MO KIO").data[i - 1];
        const d1 = processedData.find(d => d.town === "ANG MO KIO").data[i];
        const d = x0 - d0.year > d1.year - x0 ? d1 : d0;
        const xPos = x(d.year);
        const yPos = y(d.medianPrice);

    circle.attr("cx", xPos)
        .attr("cy", yPos);

    circle.transition()
        .duration(50)
        .attr("r", 5);

    tooltip
        .style("display", "block")
        .style("left", `${xPos + 100}px`)
        .style("top", `${yPos + 120}px`)
        .html(`<strong>Year:</strong> ${d.year.toString()}<br><strong>Median Resale Price:</strong> ${'$' + d.medianPrice}`)

    listeningRect.on("mouseleave", function () {
        circle.transition()
            .duration(100)
            .attr("r", 0);
    
        tooltip.style("display", "none");
    });


    // When the button is changed, run the updateChart function
    d3.select("#selectButton").on("change", function(event,d) {
        // recover the option that has been chosen
        const selectedOption = d3.select(this).property("value")
        // run the updateChart function with this selected option
        update(selectedOption);

    })
})})