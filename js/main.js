function drawChart(data){
//Dimensions layout;
    const containerWidth = 500;
    const containerHeight = 300;
    const margin = { top:20, right: 0, bottom: 0, left: 80};
    const width = containerWidth -margin.left -margin.right;
    const height =  containerHeight -margin.top - margin.bottom;
    //Initializes the g part of the screen, inside svg
    const chart = d3.select('svg').append('g')
        .attr('transform', 'translate('+margin.left+','+margin.right+')');

//Scales:
    const max = d3.max(data, d => d.elevation);
    const xScale = d3.scaleLinear()
        .range([0,width])
        .domain([0,max]);
    const yScale = d3.scaleBand()
        .range([0,height])
        .domain(data.map((d) => d.title))
        .paddingInner(0.2);

//Axes
    //Initialize axes
    const xAxis = d3.axisTop(xScale);
    const yAxis = d3.axisLeft(yScale);
    //Draw the axis
    const xAxisGroup = chart.append('g')
        .call(xAxis);
    const yAxisGroup = chart.append('g')
        .call(yAxis);

    //Draw marks
    chart.selectAll('rect')
        .data(data)
        .join('rect')
        .attr('class','bar')
        .attr('width', (d)=> xScale(d.elevation))
        .attr('height', yScale.bandwidth()).attr('y', (d) => yScale(d.title));
}

/*d3.csv('data/summits.csv')
    .then(data => {
        drawChart(data);
    });*/
        const data = [
            {x:0,y:10},
            {x:100,y:75},
            {x:300,y:90},
            {x:350,y:20}
        ];
        //Initialize the shape generator
            const line = d3.line()
                .x(d=>d.x)
                .y(d=> d.y)
        //Add the <path> to the <svg> container
        d3.select('svg').append('path')
            .attr('d',line(data))
            .attr('stroke','red')
            .attr('fill','none');

    /*Hints:
        -> StackerBarChart : d3.stack();
        -> Streamgraph : d3.stack() and d3.area();
        -> Treemap : d3.hierarchy() and d3.treemap();
        -> Tidy tree : d3.hierarchy() and d3.tree();
        -> UpSet plot : (vcg.github.io/upset/)
            Scatch:
            1) set size chart; 2) set names;
            3) combination matrix; 4) intersection size chart;
            Hints programmig:
            -> Share categorical scales;
     */


//Find max value, to not hardcode
//4TH TRY
/*
d3.csv('data/summits.csv')
    .then(data => {
        const svg = d3.select('svg');
        const max= d3.max(data, d=>d.elevation);

        //Creating a linear scale function
        const xScale = d3.scaleLinear()
            .domain([0,max])
            .range([0,400]);
        const yScale = d3.scaleBand()
            .domain(data.map((d) => d.title ))
            .range([0,200])
            .paddingInner(0.2);

            const containerWidth = 500;
            const containerHeight = 300;
            const margin = { top:20, right: 0, bottom: 0, left: 80};
            const width = containerWidth - margin.left - margin.right;
            const height = containerHeight - margin.top - margin.bottom;

            const chart = svg.append('g')
                .attr('transform', 'translate('+margin.left+',' + margin.top+')');

            //Initialize axes:
            const xAxis = d3.axisTop(xScale);
            const yAxis = d3.axisLeft(yScale);
            //Draw the axis:
            const xAxisGroup = chart.append('g').call(xAxis);
            const yAxisGroup = chart.append('g').call(yAxis);

            chart.selectAll('rect')
                .data(data)
                .join('rect')
                .attr('class','bar')
                .attr('width',(d) => xScale(d.elevation))
                .attr('height', yScale.bandwidth())
                .attr('y', (d) => yScale(d.title));
});
*/
//3RD TRY
/*const svg = d3.select('svg');
d3.csv('data/summits.csv')
    .then(data => {
    svg.selectAll('rect')
        .data(data)
        .join('rect')
        .attr('class','bar')
        .attr('width',400)
        .attr('height',30)
        .attr('y',(d ,index) => index * 40);
});*/
//2ND TRY
/*svg.selectAll('rect')
    .data(summits)
    .join('rect')
    //.attr('fill','steelblue')
    .attr('class','bar')
    .attr('width',400)
    .attr('height',50)
    .attr('y',(d,index) => index * 60);
*/
//1ST TRY
/*
d3.csv('data/summits.csv').then( data => {
    svg.selectAll('rect')
        .data(data)
        .join('rect')
        .attr('class','bar')
        .attr('width',400)
        .attr('height',30)
        .attr('y',(d,index) => index * 40);
});


const svg = d3.select('svg');


d3.select('svg').append('rect')
    .attr('fill','steelblue')
    .attr('width',400)
    .attr('height',50)*/