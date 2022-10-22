//The width and the height of the line
//These parameters may be changed without comprimising the overall dashboard
var margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;


function init(){

    console.log(window.mapColors);

    createBarChart("#retention");
    //createScatterPlot("#correlation");
}
function createBarChart(id) {

// append the svg object to the body of the page
    var svg = d3.select("#retention")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
    d3.csv("../data/csvCleaned.csv", function (data) {

// X axis
        var x = d3.scaleBand()
            .range([0, width])
            .domain(data.map(function (d) {
                return d.GEO;
            }))
            .padding(0.2);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");

// Add Y axis
        var y = d3.scaleLinear()
            .domain([0, 2])
            .range([height, 0]);
        svg.append("g")
            .call(d3.axisLeft(y));

// Bars
        /*svg.selectAll("mybar")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", function (d) {
                return x(d.GEO);
            })
            .attr("y", function (d) {
                return y(d.retention_2011);
            })
            .attr("width", x.bandwidth())
            .attr("height", function (d) {
                return height - y(d.retention_2010);
            })
            .attr("fill", "#69b3a2")*/
    })
}

function createScatterPlot(id){

}
