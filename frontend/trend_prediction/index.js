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
    console.log(groupedData)
    return groupedData;
}


// Read the data
d3.csv("../../../data.csv").then(function(data) {
    const pastData = processData(data);
    console.log(pastData);

    // fetch('/predicted_values')
    //     .then(response => response.json())
    //     .then(predictedData => {
    //         // Combine historical and predicted data
    //         const pastData = pastData.concat(predictedData);
    //         update(pastData);
    //     })
    //     .catch(error => console.error('Error fetching predicted data:', error));

    // console.log(pastData);

    // Temporary fix for prediction data
    const predictedData =
    [
        {
          "data": [
            {
              "medianPrice": 378161,
              "year": 2025
            },
            {
              "medianPrice": 377831,
              "year": 2026
            },
            {
              "medianPrice": 377647,
              "year": 2027
            },
            {
              "medianPrice": 377544,
              "year": 2028
            },
            {
              "medianPrice": 377486,
              "year": 2029
            },
            {
              "medianPrice": 377453,
              "year": 2030
            }
          ],
          "town": "ANG MO KIO"
        },
        {
          "data": [
            {
              "medianPrice": 402669,
              "year": 2025
            },
            {
              "medianPrice": 402151,
              "year": 2026
            },
            {
              "medianPrice": 401860,
              "year": 2027
            },
            {
              "medianPrice": 401698,
              "year": 2028
            },
            {
              "medianPrice": 401607,
              "year": 2029
            },
            {
              "medianPrice": 401556,
              "year": 2030
            }
          ],
          "town": "BEDOK"
        },
        {
          "data": [
            {
              "medianPrice": 662426,
              "year": 2025
            },
            {
              "medianPrice": 662508,
              "year": 2026
            },
            {
              "medianPrice": 662554,
              "year": 2027
            },
            {
              "medianPrice": 662579,
              "year": 2028
            },
            {
              "medianPrice": 662593,
              "year": 2029
            },
            {
              "medianPrice": 662601,
              "year": 2030
            }
          ],
          "town": "BISHAN"
        },
        {
          "data": [
            {
              "medianPrice": 418330,
              "year": 2025
            },
            {
              "medianPrice": 417717,
              "year": 2026
            },
            {
              "medianPrice": 417374,
              "year": 2027
            },
            {
              "medianPrice": 417181,
              "year": 2028
            },
            {
              "medianPrice": 417074,
              "year": 2029
            },
            {
              "medianPrice": 417013,
              "year": 2030
            }
          ],
          "town": "BUKIT BATOK"
        },
        {
          "data": [
            {
              "medianPrice": 624163,
              "year": 2025
            },
            {
              "medianPrice": 623039,
              "year": 2026
            },
            {
              "medianPrice": 622409,
              "year": 2027
            },
            {
              "medianPrice": 622056,
              "year": 2028
            },
            {
              "medianPrice": 621859,
              "year": 2029
            },
            {
              "medianPrice": 621748,
              "year": 2030
            }
          ],
          "town": "BUKIT MERAH"
        },
        {
          "data": [
            {
              "medianPrice": 458224,
              "year": 2025
            },
            {
              "medianPrice": 458339,
              "year": 2026
            },
            {
              "medianPrice": 458404,
              "year": 2027
            },
            {
              "medianPrice": 458440,
              "year": 2028
            },
            {
              "medianPrice": 458460,
              "year": 2029
            },
            {
              "medianPrice": 458472,
              "year": 2030
            }
          ],
          "town": "BUKIT PANJANG"
        },
        {
          "data": [
            {
              "medianPrice": 747064,
              "year": 2025
            },
            {
              "medianPrice": 745297,
              "year": 2026
            },
            {
              "medianPrice": 744308,
              "year": 2027
            },
            {
              "medianPrice": 743754,
              "year": 2028
            },
            {
              "medianPrice": 743443,
              "year": 2029
            },
            {
              "medianPrice": 743270,
              "year": 2030
            }
          ],
          "town": "BUKIT TIMAH"
        },
        {
          "data": [
            {
              "medianPrice": 579803,
              "year": 2025
            },
            {
              "medianPrice": 579638,
              "year": 2026
            },
            {
              "medianPrice": 579546,
              "year": 2027
            },
            {
              "medianPrice": 579494,
              "year": 2028
            },
            {
              "medianPrice": 579465,
              "year": 2029
            },
            {
              "medianPrice": 579449,
              "year": 2030
            }
          ],
          "town": "CENTRAL AREA"
        },
        {
          "data": [
            {
              "medianPrice": 432751,
              "year": 2025
            },
            {
              "medianPrice": 432861,
              "year": 2026
            },
            {
              "medianPrice": 432922,
              "year": 2027
            },
            {
              "medianPrice": 432957,
              "year": 2028
            },
            {
              "medianPrice": 432976,
              "year": 2029
            },
            {
              "medianPrice": 432986,
              "year": 2030
            }
          ],
          "town": "CHOA CHU KANG"
        },
        {
          "data": [
            {
              "medianPrice": 472114,
              "year": 2025
            },
            {
              "medianPrice": 472157,
              "year": 2026
            },
            {
              "medianPrice": 472182,
              "year": 2027
            },
            {
              "medianPrice": 472195,
              "year": 2028
            },
            {
              "medianPrice": 472203,
              "year": 2029
            },
            {
              "medianPrice": 472207,
              "year": 2030
            }
          ],
          "town": "CLEMENTI"
        },
        {
          "data": [
            {
              "medianPrice": 428929,
              "year": 2025
            },
            {
              "medianPrice": 429170,
              "year": 2026
            },
            {
              "medianPrice": 429305,
              "year": 2027
            },
            {
              "medianPrice": 429380,
              "year": 2028
            },
            {
              "medianPrice": 429423,
              "year": 2029
            },
            {
              "medianPrice": 429446,
              "year": 2030
            }
          ],
          "town": "GEYLANG"
        },
        {
          "data": [
            {
              "medianPrice": 454391,
              "year": 2025
            },
            {
              "medianPrice": 455157,
              "year": 2026
            },
            {
              "medianPrice": 455587,
              "year": 2027
            },
            {
              "medianPrice": 455827,
              "year": 2028
            },
            {
              "medianPrice": 455961,
              "year": 2029
            },
            {
              "medianPrice": 456037,
              "year": 2030
            }
          ],
          "town": "HOUGANG"
        },
        {
          "data": [
            {
              "medianPrice": 420612,
              "year": 2025
            },
            {
              "medianPrice": 420597,
              "year": 2026
            },
            {
              "medianPrice": 420588,
              "year": 2027
            },
            {
              "medianPrice": 420583,
              "year": 2028
            },
            {
              "medianPrice": 420580,
              "year": 2029
            },
            {
              "medianPrice": 420579,
              "year": 2030
            }
          ],
          "town": "JURONG EAST"
        },
        {
          "data": [
            {
              "medianPrice": 434940,
              "year": 2025
            },
            {
              "medianPrice": 434809,
              "year": 2026
            },
            {
              "medianPrice": 434735,
              "year": 2027
            },
            {
              "medianPrice": 434693,
              "year": 2028
            },
            {
              "medianPrice": 434670,
              "year": 2029
            },
            {
              "medianPrice": 434657,
              "year": 2030
            }
          ],
          "town": "JURONG WEST"
        },
        {
          "data": [
            {
              "medianPrice": 524832,
              "year": 2025
            },
            {
              "medianPrice": 525222,
              "year": 2026
            },
            {
              "medianPrice": 525440,
              "year": 2027
            },
            {
              "medianPrice": 525563,
              "year": 2028
            },
            {
              "medianPrice": 525631,
              "year": 2029
            },
            {
              "medianPrice": 525669,
              "year": 2030
            }
          ],
          "town": "KALLANG/WHAMPOA"
        },
        {
          "data": [
            {
              "medianPrice": 483616,
              "year": 2025
            },
            {
              "medianPrice": 483993,
              "year": 2026
            },
            {
              "medianPrice": 484203,
              "year": 2027
            },
            {
              "medianPrice": 484321,
              "year": 2028
            },
            {
              "medianPrice": 484387,
              "year": 2029
            },
            {
              "medianPrice": 484424,
              "year": 2030
            }
          ],
          "town": "MARINE PARADE"
        },
        {
          "data": [
            {
              "medianPrice": 531153,
              "year": 2025
            },
            {
              "medianPrice": 530183,
              "year": 2026
            },
            {
              "medianPrice": 529641,
              "year": 2027
            },
            {
              "medianPrice": 529337,
              "year": 2028
            },
            {
              "medianPrice": 529166,
              "year": 2029
            },
            {
              "medianPrice": 529071,
              "year": 2030
            }
          ],
          "town": "PASIR RIS"
        },
        {
          "data": [
            {
              "medianPrice": 494129,
              "year": 2025
            },
            {
              "medianPrice": 493728,
              "year": 2026
            },
            {
              "medianPrice": 493503,
              "year": 2027
            },
            {
              "medianPrice": 493377,
              "year": 2028
            },
            {
              "medianPrice": 493307,
              "year": 2029
            },
            {
              "medianPrice": 493267,
              "year": 2030
            }
          ],
          "town": "PUNGGOL"
        },
        {
          "data": [
            {
              "medianPrice": 623497,
              "year": 2025
            },
            {
              "medianPrice": 622350,
              "year": 2026
            },
            {
              "medianPrice": 621707,
              "year": 2027
            },
            {
              "medianPrice": 621347,
              "year": 2028
            },
            {
              "medianPrice": 621146,
              "year": 2029
            },
            {
              "medianPrice": 621033,
              "year": 2030
            }
          ],
          "town": "QUEENSTOWN"
        },
        {
          "data": [
            {
              "medianPrice": 435630,
              "year": 2025
            },
            {
              "medianPrice": 435701,
              "year": 2026
            },
            {
              "medianPrice": 435741,
              "year": 2027
            },
            {
              "medianPrice": 435763,
              "year": 2028
            },
            {
              "medianPrice": 435776,
              "year": 2029
            },
            {
              "medianPrice": 435783,
              "year": 2030
            }
          ],
          "town": "SEMBAWANG"
        },
        {
          "data": [
            {
              "medianPrice": 475591,
              "year": 2025
            },
            {
              "medianPrice": 474814,
              "year": 2026
            },
            {
              "medianPrice": 474378,
              "year": 2027
            },
            {
              "medianPrice": 474135,
              "year": 2028
            },
            {
              "medianPrice": 473998,
              "year": 2029
            },
            {
              "medianPrice": 473922,
              "year": 2030
            }
          ],
          "town": "SENGKANG"
        },
        {
          "data": [
            {
              "medianPrice": 504551,
              "year": 2025
            },
            {
              "medianPrice": 504099,
              "year": 2026
            },
            {
              "medianPrice": 503846,
              "year": 2027
            },
            {
              "medianPrice": 503704,
              "year": 2028
            },
            {
              "medianPrice": 503625,
              "year": 2029
            },
            {
              "medianPrice": 503581,
              "year": 2030
            }
          ],
          "town": "SERANGOON"
        },
        {
          "data": [
            {
              "medianPrice": 495675,
              "year": 2025
            },
            {
              "medianPrice": 494705,
              "year": 2026
            },
            {
              "medianPrice": 494162,
              "year": 2027
            },
            {
              "medianPrice": 493858,
              "year": 2028
            },
            {
              "medianPrice": 493687,
              "year": 2029
            },
            {
              "medianPrice": 493592,
              "year": 2030
            }
          ],
          "town": "TAMPINES"
        },
        {
          "data": [
            {
              "medianPrice": 454843,
              "year": 2025
            },
            {
              "medianPrice": 454632,
              "year": 2026
            },
            {
              "medianPrice": 454514,
              "year": 2027
            },
            {
              "medianPrice": 454448,
              "year": 2028
            },
            {
              "medianPrice": 454411,
              "year": 2029
            },
            {
              "medianPrice": 454390,
              "year": 2030
            }
          ],
          "town": "TOA PAYOH"
        },
        {
          "data": [
            {
              "medianPrice": 422290,
              "year": 2025
            },
            {
              "medianPrice": 422423,
              "year": 2026
            },
            {
              "medianPrice": 422497,
              "year": 2027
            },
            {
              "medianPrice": 422539,
              "year": 2028
            },
            {
              "medianPrice": 422562,
              "year": 2029
            },
            {
              "medianPrice": 422575,
              "year": 2030
            }
          ],
          "town": "WOODLANDS"
        },
        {
          "data": [
            {
              "medianPrice": 396431,
              "year": 2025
            },
            {
              "medianPrice": 396617,
              "year": 2026
            },
            {
              "medianPrice": 396721,
              "year": 2027
            },
            {
              "medianPrice": 396780,
              "year": 2028
            },
            {
              "medianPrice": 396812,
              "year": 2029
            },
            {
              "medianPrice": 396831,
              "year": 2030
            }
          ],
          "town": "YISHUN"
        }
      ]

    // Merging of past and predicted data based on town
    const allData = pastData.map(d => {
        const predictedTown = predictedData.find(e => e.town === d.town);
        if (predictedTown) {
            d.data = d.data.concat(predictedTown.data);
        }
        return d;
    });
    console.log(allData);


    // List of groups (for creating dropdown menu)
    const allGroup = new Set(pastData.map(d => d.town))
    console.log(allGroup);

    // Add options to the button
    d3.select("#selectButton")
        .selectAll('myOptions')
            .data(allGroup)
        .enter()
            .append('option')
        .text(function (d) { return d; })
        .attr("value", function (d) { return d; });

    // Add x domain range between 2017 and 2030
    x.domain([new Date(2017), new Date(2030)]);
    // Add y domain range between 0 and max median price of the selected town
    y.domain([0, d3.max(pastData.find(d => d.town === "ANG MO KIO").data, d => d.medianPrice)]);

    // Add the x-axis
    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .attr("class", "xAxis")
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

    // Add legend
    // legend.append("circle")
    //     .attr("x", 0)
    //     .attr("y", 0)
    //     .attr("width", 10)
    //     .attr("height", 10)
    //     .style("fill", "steelblue");

    // legend.append("text")
    //     .attr("x", 20)
    //     .attr("y", -15)
    //     .text("Past Data")
    //     .style("font-size", "14px");

    // legend.append("circle")
    //     .attr("x", 0)
    //     .attr("y", 20)
    //     .attr("width", 10)
    //     .attr("height", 10)
    //     .style("fill", "red");

    // legend.append("text")
    //     .attr("x", 20)
    //     .attr("y", 5)
    //     .text("Predicted Data")
    //     .style("font-size", "14px");

    // Handmade legend
    svg.append("circle").attr("cx",500).attr("cy",-20).attr("r", 6).style("fill", "steelblue")
    svg.append("circle").attr("cx",500).attr("cy",5).attr("r", 6).style("fill", "red")
    svg.append("text").attr("x", 520).attr("y", -20).text("Actual").style("font-size", "15px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 520).attr("y", 5).text("Predicted").style("font-size", "15px").attr("alignment-baseline","middle")

    // Initialize line
    const line = d3.line()
        .x(d => x(d.year))
        .y(d => y(d.medianPrice));
        
    // Add the line for past data
    const pathPast = svg
        .append("path")
        .attr("stroke", "steelblue")
        .style("stroke-width", 2)
        .style("fill", "none")
        .attr("d", line(pastData.find(d => d.town === "ANG MO KIO").data));

    // Add the line for predicted data
    const pathPredicted = svg
        .append("path")
        .attr("stroke", "red")
        .style("stroke-width", 2)
        .style("fill", "none")
        .style("stroke-dasharray", ("10, 3"))
        .attr("d", line(predictedData.find(d => d.town === "ANG MO KIO").data));

    // A function that update the chart
    function update(selectedGroup) {
        console.log(selectedGroup);
        console.log(allData.find(d => d.town === selectedGroup).data);
        console.log(y);
        const selectedPastData = pastData.find(d => d.town === selectedGroup).data
        const selectedPredictedData = predictedData.find(d => d.town === selectedGroup).data;

        const maxMedianPrice = d3.max(selectedPastData.concat(selectedPredictedData), d => d.medianPrice);

        // update y domain range between 0 and max median price of the selected town
        y.domain([0, maxMedianPrice]);
        
        // Update the Y axis
        svg.select("g.yAxis")
            .transition()
            .duration(1000)
            .call(d3.axisLeft(y));

        // Create new line for past data after the selection
        pathPast
            .datum(selectedPastData)
            .transition()
            .duration(1000)
            .attr("d", line);

        // Create new line for predicted data after the selection
        pathPredicted
            .datum(selectedPredictedData)
            .transition()
            .duration(1000)
            .attr("d", line);

        // Update horizontal gridlines
        horizontalGridlines
            // .data(y.ticks().slice(1))
            .transition()
            .duration(1000)
            .attr("y1", d => y(d))
            .attr("y2", d => y(d))

        // Update listening rectangle
        listeningRect
            .on("mousemove", function (event) {
                const [xCoord] = d3.pointer(event, this);
                const bisectDate = d3.bisector(d => d.year).left;
                const x0 = x.invert(xCoord);
                const i = bisectDate(pastData.find(d => d.town === selectedGroup).data, x0, 1);
                const d0 = pastData.find(d => d.town === selectedGroup).data[i - 1];
                const d1 = pastData.find(d => d.town === selectedGroup).data[i];
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
        const i = bisectDate(pastData.find(d => d.town === "ANG MO KIO").data, x0, 1);
        const d0 = pastData.find(d => d.town === "ANG MO KIO").data[i - 1];
        const d1 = pastData.find(d => d.town === "ANG MO KIO").data[i];
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