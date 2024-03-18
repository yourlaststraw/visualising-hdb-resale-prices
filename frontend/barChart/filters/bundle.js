let titleText;
let xAxisLabelText;
let data;

const yAxisLabelText = "Average Resale Prices";
const svg = d3.select('svg');
const width = +svg.attr('width');
const height = +svg.attr('height');

// Define the render function outside of the d3.csv callback
const render = (data, selectedOption, titleText, xAxisLabelText, yAxisLabelText) => {
    const averageData = d3.group(data, d => d[selectedOption]);
    const averagePrices = Array.from(averageData, ([option, values]) => ({
        option: option,
        average_price: d3.mean(values, d => +d['resale_price'])
    }));

    const xValue = d => d['option'];
    const yValue = d => d['average_price'];
    const margin = {
        top: 50,
        right: 40,
        bottom: 120,
        left: 180
    };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = d3.scaleBand()
        .domain(data.map(d => d[selectedOption]))
        .range([0, innerWidth])
        .padding(0.1);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(averagePrices, yValue)])
        .range([innerHeight, 0]);

    const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    const yAxis = d3.axisLeft(yScale);

    const xAxis = d3.axisBottom(xScale);

    g.append('g')
        .call(d3.axisLeft(yScale))
        .selectAll('.domain, .tick line')
        .remove();

    g.append('g')
        .call(d3.axisBottom(xScale))
        .attr('transform', `translate(0,${innerHeight})`)
        .selectAll('text')
        .attr('y', 10)
        .attr('x', -10)
        .attr('transform', 'rotate(-45)')
        .style('text-anchor', 'end');

    g.append('text')
            .attr('class', 'axis-label')
            .attr('y', -70)
            .attr('x', -innerHeight / 2)
            .attr('transform', 'rotate(-90)')
            .attr('fill', 'black')
            .style('text-anchor', 'middle')
            .text(yAxisLabelText);

    g.append('text')
        .attr('class', 'axis-label')
        .attr('y', innerHeight + 110)
        .attr('x', innerWidth / 2)
        .attr('fill', 'black')
        .style('text-anchor', 'middle')
        .text(xAxisLabelText);

    g.selectAll('rect')
        .data(averagePrices)
        .enter()
        .append('rect')
        .attr('x', d => xScale(xValue(d)))
        .attr('y', d => yScale(yValue(d)))
        .attr('width', xScale.bandwidth())
        .attr('height', d => innerHeight - yScale(yValue(d)))
        .attr('fill', 'steelblue');

    g.append('text')
        .attr('class', 'title')
        .attr('y', -10)
        .style('font-size', `20px`)
        .style('font-weight', 'bold')
        .text(titleText);
};

d3.csv("../../../data.csv").then(function(csvData) {
    data = csvData;

    let selectedOption = 'town'; // Default selected option
    titleText = 'Average Resale Prices by ' + selectedOption.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    xAxisLabelText = selectedOption.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    render(data, selectedOption, titleText, xAxisLabelText, yAxisLabelText);

});

// Define the updateChart function outside of the d3.csv callback
const updateChart = (option) => {
    selectedOption = option;
    console.log(selectedOption)
    titleText = 'Average Resale Prices by ' + selectedOption.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    xAxisLabelText = selectedOption.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');


    // Remove existing chart elements
    d3.select('svg').selectAll('*').remove();

    // Render the chart with the updated data
    render(data, selectedOption, titleText, xAxisLabelText, yAxisLabelText);
};

// Event listener for option selection
d3.selectAll('.option').on('click', function() {
    const option = d3.select(this).attr('data-option');
    updateChart(option);
});