d3.csv("../../../data.csv").then(function(data) {
    const titleText = 'Average Resale Prices of Different Flat Types';
    const xAxisLabelText = 'Flat Types';
    const yAxisLabelText = "Average Resale Prices"

    const svg = d3.select('svg');

    const width = +svg.attr('width');
    const height = +svg.attr('height');

    const render = data => {
        const averageData = d3.group(data, d => d['flat_type']);
        const averagePrices = Array.from(averageData, ([flatType, values]) => ({
            flat_type: flatType,
            average_price: d3.mean(values, d => +d['resale_price'])
        }));


        const xValue = d => d['flat_type'];
        const yValue = d => d['average_price'];
        const margin = {
            top: 50,
            right: 40,
            bottom: 77,
            left: 180
    };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = d3.scaleBand()
        .domain(data.map(xValue))
        .range([0, innerWidth])
        .padding(0.1);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(averagePrices, yValue)])
        .range([innerHeight, 0]);

    const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    // const xAxisTickFormat = number =>
    //     d3.format('.3s')(number)
    //     .replace('G', 'B');

    const yAxis = d3.axisLeft(yScale);

    const xAxis = d3.axisBottom(xScale);
        // .tickFormat(xAxisTickFormat)
        // .tickSize(-innerHeight);

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
        .style('text-anchor', 'end');

    // const xAxisG = g.append('g').call(xAxis)
    //     .attr('transform', `translate(0,${innerHeight})`)

    // xAxisG.select('.domain').remove();

    // xAxisG.append('text')
    //     .attr('class', 'axis-label')
    //     .attr('y', 65)
    //     .attr('x', innerWidth / 2)
    //     .attr('fill', 'black')
    //     .text(xAxisLabelText);

    // g.selectAll('text')
    //     .style('font-size', '15px');

    // g.selectAll('rect').data(data)
    //     .enter().append('rect')
    //     .attr('y', d => yScale(yValue(d)))
    //     .attr('width', d => xScale(xValue(d)))
    //     .attr('height', yScale.bandwidth());

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
        .attr('y', innerHeight + 50)
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
        .attr('width', xScale.bandwidth() - 40) // Adjust the width of bars
        .attr('height', d => innerHeight - yScale(yValue(d)))
        .attr('fill', 'steelblue');

    g.append('text')
        .attr('class', 'title')
        .attr('y', -10)
        .style('font-size', `20px`)
        .style('font-weight', 'bold')
        .text(titleText);
    
    };

    render(data);

});