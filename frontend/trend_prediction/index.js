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

    // Retrieve predicted data from forecast.json and assign to predictedData
    const predictedData = 
    [
        {
          "town": "ANG MO KIO",
          "data": [
            {
              "medianPrice": 472475,
              "year": 2024
            },
            {
              "medianPrice": 531203,
              "year": 2025
            },
            {
              "medianPrice": 589931,
              "year": 2026
            },
            {
              "medianPrice": 648659,
              "year": 2027
            },
            {
              "medianPrice": 707387,
              "year": 2028
            },
            {
              "medianPrice": 766115,
              "year": 2029
            },
            {
              "medianPrice": 824843,
              "year": 2030
            }
          ]
        },
        {
          "town": "BEDOK",
          "data": [
            {
              "medianPrice": 518308,
              "year": 2024
            },
            {
              "medianPrice": 586066,
              "year": 2025
            },
            {
              "medianPrice": 653825,
              "year": 2026
            },
            {
              "medianPrice": 721583,
              "year": 2027
            },
            {
              "medianPrice": 789342,
              "year": 2028
            },
            {
              "medianPrice": 857100,
              "year": 2029
            },
            {
              "medianPrice": 924859,
              "year": 2030
            }
          ]
        },
        {
          "town": "BISHAN",
          "data": [
            {
              "medianPrice": 870612,
              "year": 2024
            },
            {
              "medianPrice": 984432,
              "year": 2025
            },
            {
              "medianPrice": 1098262,
              "year": 2026
            },
            {
              "medianPrice": 1212097,
              "year": 2027
            },
            {
              "medianPrice": 1325935,
              "year": 2028
            },
            {
              "medianPrice": 1439774,
              "year": 2029
            },
            {
              "medianPrice": 1553614,
              "year": 2030
            }
          ]
        },
        {
          "town": "BUKIT BATOK",
          "data": [
            {
              "medianPrice": 570906,
              "year": 2024
            },
            {
              "medianPrice": 645823,
              "year": 2025
            },
            {
              "medianPrice": 720740,
              "year": 2026
            },
            {
              "medianPrice": 795657,
              "year": 2027
            },
            {
              "medianPrice": 870574,
              "year": 2028
            },
            {
              "medianPrice": 945491,
              "year": 2029
            },
            {
              "medianPrice": 1020408,
              "year": 2030
            }
          ]
        },
        {
          "town": "BUKIT MERAH",
          "data": [
            {
              "medianPrice": 808400,
              "year": 2024
            },
            {
              "medianPrice": 915019,
              "year": 2025
            },
            {
              "medianPrice": 1021638,
              "year": 2026
            },
            {
              "medianPrice": 1128257,
              "year": 2027
            },
            {
              "medianPrice": 1234876,
              "year": 2028
            },
            {
              "medianPrice": 1341494,
              "year": 2029
            },
            {
              "medianPrice": 1448113,
              "year": 2030
            }
          ]
        },
        {
          "town": "BUKIT PANJANG",
          "data": [
            {
              "medianPrice": 562308,
              "year": 2024
            },
            {
              "medianPrice": 589145,
              "year": 2025
            },
            {
              "medianPrice": 615983,
              "year": 2026
            },
            {
              "medianPrice": 642823,
              "year": 2027
            },
            {
              "medianPrice": 669662,
              "year": 2028
            },
            {
              "medianPrice": 696501,
              "year": 2029
            },
            {
              "medianPrice": 723341,
              "year": 2030
            }
          ]
        },
        {
          "town": "BUKIT TIMAH",
          "data": [
            {
              "medianPrice": 1197494,
              "year": 2024
            },
            {
              "medianPrice": 1614846,
              "year": 2025
            },
            {
              "medianPrice": 2032973,
              "year": 2026
            },
            {
              "medianPrice": 2451100,
              "year": 2027
            },
            {
              "medianPrice": 2869226,
              "year": 2028
            },
            {
              "medianPrice": 3287353,
              "year": 2029
            },
            {
              "medianPrice": 3705480,
              "year": 2030
            }
          ]
        },
        {
          "town": "CENTRAL AREA",
          "data": [
            {
              "medianPrice": 528807,
              "year": 2024
            },
            {
              "medianPrice": 537853,
              "year": 2025
            },
            {
              "medianPrice": 546828,
              "year": 2026
            },
            {
              "medianPrice": 555802,
              "year": 2027
            },
            {
              "medianPrice": 564777,
              "year": 2028
            },
            {
              "medianPrice": 573751,
              "year": 2029
            },
            {
              "medianPrice": 582726,
              "year": 2030
            }
          ]
        },
        {
          "town": "CHOA CHU KANG",
          "data": [
            {
              "medianPrice": 562793,
              "year": 2024
            },
            {
              "medianPrice": 635207,
              "year": 2025
            },
            {
              "medianPrice": 707920,
              "year": 2026
            },
            {
              "medianPrice": 780634,
              "year": 2027
            },
            {
              "medianPrice": 853348,
              "year": 2028
            },
            {
              "medianPrice": 926062,
              "year": 2029
            },
            {
              "medianPrice": 998776,
              "year": 2030
            }
          ]
        },
        {
          "town": "CLEMENTI",
          "data": [
            {
              "medianPrice": 519681,
              "year": 2024
            },
            {
              "medianPrice": 554282,
              "year": 2025
            },
            {
              "medianPrice": 589039,
              "year": 2026
            },
            {
              "medianPrice": 623796,
              "year": 2027
            },
            {
              "medianPrice": 658553,
              "year": 2028
            },
            {
              "medianPrice": 693310,
              "year": 2029
            },
            {
              "medianPrice": 728067,
              "year": 2030
            }
          ]
        },
        {
          "town": "GEYLANG",
          "data": [
            {
              "medianPrice": 436823,
              "year": 2024
            },
            {
              "medianPrice": 336160,
              "year": 2025
            },
            {
              "medianPrice": 235477,
              "year": 2026
            },
            {
              "medianPrice": 134793,
              "year": 2027
            },
            {
              "medianPrice": 34110,
              "year": 2028
            },
            {
              "medianPrice": -66572,
              "year": 2029
            },
            {
              "medianPrice": -167255,
              "year": 2030
            }
          ]
        },
        {
          "town": "HOUGANG",
          "data": [
            {
              "medianPrice": 602220,
              "year": 2024
            },
            {
              "medianPrice": 679089,
              "year": 2025
            },
            {
              "medianPrice": 755986,
              "year": 2026
            },
            {
              "medianPrice": 832885,
              "year": 2027
            },
            {
              "medianPrice": 909785,
              "year": 2028
            },
            {
              "medianPrice": 986684,
              "year": 2029
            },
            {
              "medianPrice": 1063583,
              "year": 2030
            }
          ]
        },
        {
          "town": "JURONG EAST",
          "data": [
            {
              "medianPrice": 496290,
              "year": 2024
            },
            {
              "medianPrice": 519282,
              "year": 2025
            },
            {
              "medianPrice": 542495,
              "year": 2026
            },
            {
              "medianPrice": 565699,
              "year": 2027
            },
            {
              "medianPrice": 588903,
              "year": 2028
            },
            {
              "medianPrice": 612106,
              "year": 2029
            },
            {
              "medianPrice": 635310,
              "year": 2030
            }
          ]
        },
        {
          "town": "JURONG WEST",
          "data": [
            {
              "medianPrice": 556394,
              "year": 2024
            },
            {
              "medianPrice": 628749,
              "year": 2025
            },
            {
              "medianPrice": 701061,
              "year": 2026
            },
            {
              "medianPrice": 773374,
              "year": 2027
            },
            {
              "medianPrice": 845686,
              "year": 2028
            },
            {
              "medianPrice": 917999,
              "year": 2029
            },
            {
              "medianPrice": 990311,
              "year": 2030
            }
          ]
        },
        {
          "town": "KALLANG/WHAMPOA",
          "data": [
            {
              "medianPrice": 683827,
              "year": 2024
            },
            {
              "medianPrice": 775106,
              "year": 2025
            },
            {
              "medianPrice": 866162,
              "year": 2026
            },
            {
              "medianPrice": 957217,
              "year": 2027
            },
            {
              "medianPrice": 1048272,
              "year": 2028
            },
            {
              "medianPrice": 1139327,
              "year": 2029
            },
            {
              "medianPrice": 1230382,
              "year": 2030
            }
          ]
        },
        {
          "town": "MARINE PARADE",
          "data": [
            {
              "medianPrice": 539578,
              "year": 2024
            },
            {
              "medianPrice": 558956,
              "year": 2025
            },
            {
              "medianPrice": 578269,
              "year": 2026
            },
            {
              "medianPrice": 597581,
              "year": 2027
            },
            {
              "medianPrice": 616893,
              "year": 2028
            },
            {
              "medianPrice": 636206,
              "year": 2029
            },
            {
              "medianPrice": 655518,
              "year": 2030
            }
          ]
        },
        {
          "town": "PASIR RIS",
          "data": [
            {
              "medianPrice": 696687,
              "year": 2024
            },
            {
              "medianPrice": 786906,
              "year": 2025
            },
            {
              "medianPrice": 877266,
              "year": 2026
            },
            {
              "medianPrice": 967626,
              "year": 2027
            },
            {
              "medianPrice": 1057986,
              "year": 2028
            },
            {
              "medianPrice": 1148346,
              "year": 2029
            },
            {
              "medianPrice": 1238706,
              "year": 2030
            }
          ]
        },
        {
          "town": "PUNGGOL",
          "data": [
            {
              "medianPrice": 628003,
              "year": 2024
            },
            {
              "medianPrice": 705565,
              "year": 2025
            },
            {
              "medianPrice": 785045,
              "year": 2026
            },
            {
              "medianPrice": 864560,
              "year": 2027
            },
            {
              "medianPrice": 944075,
              "year": 2028
            },
            {
              "medianPrice": 1023590,
              "year": 2029
            },
            {
              "medianPrice": 1103106,
              "year": 2030
            }
          ]
        },
        {
          "town": "QUEENSTOWN",
          "data": [
            {
              "medianPrice": 777404,
              "year": 2024
            },
            {
              "medianPrice": 835001,
              "year": 2025
            },
            {
              "medianPrice": 882612,
              "year": 2026
            },
            {
              "medianPrice": 930043,
              "year": 2027
            },
            {
              "medianPrice": 977471,
              "year": 2028
            },
            {
              "medianPrice": 1024899,
              "year": 2029
            },
            {
              "medianPrice": 1072327,
              "year": 2030
            }
          ]
        },
        {
          "town": "SEMBAWANG",
          "data": [
            {
              "medianPrice": 595743,
              "year": 2024
            },
            {
              "medianPrice": 672810,
              "year": 2025
            },
            {
              "medianPrice": 749894,
              "year": 2026
            },
            {
              "medianPrice": 826979,
              "year": 2027
            },
            {
              "medianPrice": 904063,
              "year": 2028
            },
            {
              "medianPrice": 981148,
              "year": 2029
            },
            {
              "medianPrice": 1058233,
              "year": 2030
            }
          ]
        },
        {
          "town": "SENGKANG",
          "data": [
            {
              "medianPrice": 606843,
              "year": 2024
            },
            {
              "medianPrice": 665419,
              "year": 2025
            },
            {
              "medianPrice": 735016,
              "year": 2026
            },
            {
              "medianPrice": 806365,
              "year": 2027
            },
            {
              "medianPrice": 877992,
              "year": 2028
            },
            {
              "medianPrice": 949664,
              "year": 2029
            },
            {
              "medianPrice": 1021342,
              "year": 2030
            }
          ]
        },
        {
          "town": "SERANGOON",
          "data": [
            {
              "medianPrice": 626596,
              "year": 2024
            },
            {
              "medianPrice": 708000,
              "year": 2025
            },
            {
              "medianPrice": 789422,
              "year": 2026
            },
            {
              "medianPrice": 870853,
              "year": 2027
            },
            {
              "medianPrice": 952287,
              "year": 2028
            },
            {
              "medianPrice": 1033723,
              "year": 2029
            },
            {
              "medianPrice": 1115161,
              "year": 2030
            }
          ]
        },
        {
          "town": "TAMPINES",
          "data": [
            {
              "medianPrice": 651636,
              "year": 2024
            },
            {
              "medianPrice": 737663,
              "year": 2025
            },
            {
              "medianPrice": 823697,
              "year": 2026
            },
            {
              "medianPrice": 909730,
              "year": 2027
            },
            {
              "medianPrice": 995764,
              "year": 2028
            },
            {
              "medianPrice": 1081797,
              "year": 2029
            },
            {
              "medianPrice": 1167831,
              "year": 2030
            }
          ]
        },
        {
          "town": "TOA PAYOH",
          "data": [
            {
              "medianPrice": 660120,
              "year": 2024
            },
            {
              "medianPrice": 743339,
              "year": 2025
            },
            {
              "medianPrice": 827400,
              "year": 2026
            },
            {
              "medianPrice": 911466,
              "year": 2027
            },
            {
              "medianPrice": 995532,
              "year": 2028
            },
            {
              "medianPrice": 1079597,
              "year": 2029
            },
            {
              "medianPrice": 1163663,
              "year": 2030
            }
          ]
        },
        {
          "town": "WOODLANDS",
          "data": [
            {
              "medianPrice": 613019,
              "year": 2024
            },
            {
              "medianPrice": 692440,
              "year": 2025
            },
            {
              "medianPrice": 771806,
              "year": 2026
            },
            {
              "medianPrice": 851172,
              "year": 2027
            },
            {
              "medianPrice": 930538,
              "year": 2028
            },
            {
              "medianPrice": 1009903,
              "year": 2029
            },
            {
              "medianPrice": 1089269,
              "year": 2030
            }
          ]
        },
        {
          "town": "YISHUN",
          "data": [
            {
              "medianPrice": 527550,
              "year": 2024
            },
            {
              "medianPrice": 562525,
              "year": 2025
            },
            {
              "medianPrice": 597817,
              "year": 2026
            },
            {
              "medianPrice": 633120,
              "year": 2027
            },
            {
              "medianPrice": 668424,
              "year": 2028
            },
            {
              "medianPrice": 703727,
              "year": 2029
            },
            {
              "medianPrice": 739031,
              "year": 2030
            }
          ]
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