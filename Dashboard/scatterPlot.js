var hub_scale = 2;

var year = sessionStorage.getItem("year");

var selected_country = sessionStorage.getItem("selectedCountry");



// set the dimensions and margins of the graph
margin = {top: 50, right: 15, bottom: 50, left:50},
    width = 700 - margin.left - margin.right,
    height = 370 - margin.top - margin.bottom;

//Set ranges
var x = d3.scaleLinear().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);


//Append svg object to the body page
var svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.csv("../data/csvCleaned.csv").then(function(data) {

    // Scale the range of the data
    x.domain([0,0]);
    y.domain([0,160000]);
    // Add the X Axis
    svg.append("g")
        .attr("class", "myXaxis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .attr("opacity", "0");
    // Add the Y Axis
    svg.append("g")
        .call(d3.axisLeft(y).ticks(15).tickFormat(d3.format("~s")));

    // Add the scatterplot
    var tooltip = d3.select("body")
                    .append("div")
                    .attr("class", "tooltip")
                    .style("opacity", 0);

    svg.selectAll("dot")
        .data(data)
        .enter().append("circle")
        .filter(function(d) {
        //console.log(year);
        return d.hrst_2010 != ":" && d.AverageWage_2010 != ":" &&
            d.hrst_2011 != ":" && d.AverageWage_2011 != ":" &&
            d.hrst_2012 != ":" && d.AverageWage_2012 != ":" &&
            d.hrst_2013 != ":" && d.AverageWage_2013 != ":" &&
            d.hrst_2014 != ":" && d.AverageWage_2014 != ":" &&
            d.hrst_2015 != ":" && d.AverageWage_2015 != ":" &&
            d.hrst_2016 != ":" && d.AverageWage_2016 != ":" &&
            d.hrst_2017 != ":" && d.AverageWage_2017 != ":" &&
            d.hrst_2018 != ":" && d.AverageWage_2018 != ":" &&
            d.hrst_2019 != ":" && d.AverageWage_2019 != ":" &&d.hrst_2020 != ":" && d.AverageWage_2020 != ":";
        })
        .attr("r", function(d) {
            switch(+year){
                case 2010:
                    return x(d.hub_2010 * hub_scale);
                case 2011:
                    return x(d.hub_2011 * hub_scale);
                case 2012:
                    return x(d.hub_2012 * hub_scale);
                case 2013:
                    return x(d.hub_2013 * hub_scale);
                case 2014:
                    return x(d.hub_2014 * hub_scale);
                case 2015:
                    return x(d.hub_2015 * hub_scale);
                case 2016:
                    return x(d.hub_2016 * hub_scale);
                case 2017:
                    return x(d.hub_2017 * hub_scale);
                case 2018:
                    return x(d.hub_2018 * hub_scale);
                case 2019:
                    return x(d.hub_2019 * hub_scale);
                case 2020:
                    return x(d.hub_2020 * hub_scale);
                default:
                    return x(d.hub_2015 * hub_scale);
            }
        })
        .attr("cx", function(d) {
            switch(+year){
                case 2010:
                    return x(d.hrst_2010);
                case 2011:
                    return x(d.hrst_2011);
                case 2012:
                    return x(d.hrst_2012);
                case 2013:
                    return x(d.hrst_2013);
                case 2014:
                    return x(d.hrst_2014);
                case 2015:
                    return x(d.hrst_2015);
                case 2016:
                    return x(d.hrst_2016);
                case 2017:
                    return x(d.hrst_2017);
                case 2018:
                    return x(d.hrst_2018);
                case 2019:
                    return x(d.hrst_2019);
                case 2020:
                    return x(d.hrst_2020);
                default:
                    return x(d.hrst_2015);
            }
        })
        .attr("cy", function(d) {
            switch(+year){
                case 2010:
                    return y(d.AverageWage_2010);
                case 2011:
                    return y(d.AverageWage_2011);
                case 2012:
                    return y(d.AverageWage_2012);
                case 2013:
                    return y(d.AverageWage_2013);
                case 2014:
                    return y(d.AverageWage_2014);
                case 2015:
                    return y(d.AverageWage_2015);
                case 2016:
                    return y(d.AverageWage_2016);
                case 2017:
                    return y(d.AverageWage_2017);
                case 2018:
                    return y(d.AverageWage_2018);
                case 2019:
                    return y(d.AverageWage_2019);
                case 2020:
                    return y(d.AverageWage_2020);
                default:
                    return y(d.AverageWage_2015);
            }
        })
        .attr("stroke", "#154360")
        .attr("stroke-width", 1.5)
        .attr("fill", function(d){
            if (d.ID === selected_country){
                return "#1AE7ED";
            }
            return "#FFFFFF";
        })
        .on('mouseover', (event, d) => {
            event.target.setAttribute("stroke","#3498DB");
            event.target.setAttribute("fill","#3498DB");
            d3.select(tooltip).transition()
                .duration('100');
            tooltip.transition()
                .duration(100)
                .style("opacity", 1);
            tooltip.html(returnHtml(d))
                .style("left", (event.pageX - 100) + "px")
                .style("top", (event.pageY - 50) + "px")
        })
        .on('mouseout', function (d, i) {
            d3.select(this)
            .attr("stroke", "#154360")
            .attr("fill", "#FFFFFF");
            d3.select(this).transition()
                .duration('200')
                .attr("r", function(d) {
                    switch(+year){
                        case 2010:
                            return x(d.hub_2010 * hub_scale);
                        case 2011:
                            return x(d.hub_2011 * hub_scale);
                        case 2012:
                            return x(d.hub_2012 * hub_scale);
                        case 2013:
                            return x(d.hub_2013 * hub_scale);
                        case 2014:
                            return x(d.hub_2014 * hub_scale);
                        case 2015:
                            return x(d.hub_2015 * hub_scale);
                        case 2016:
                            return x(d.hub_2016 * hub_scale);
                        case 2017:
                            return x(d.hub_2017 * hub_scale);
                        case 2018:
                            return x(d.hub_2018 * hub_scale);
                        case 2019:
                            return x(d.hub_2019 * hub_scale);
                        case 2020:
                            return x(d.hub_2020 * hub_scale);
                        default:
                            return x(d.hub_2015 * hub_scale);
                    }
        });
            tooltip.transition()
                .duration('200')
                .style("opacity", 0);
        });

    x.domain([0,100]);
    svg.select(".myXaxis")
        .transition()
        .duration(1000)
        .attr("opacity", "1")
        .call(d3.axisBottom(x));

    svg.selectAll("circle")
        .filter(function(d) {
            //console.log(year);
            return d.hrst_2010 != ":" && d.AverageWage_2010 != ":" &&
                d.hrst_2011 != ":" && d.AverageWage_2011 != ":" &&
                d.hrst_2012 != ":" && d.AverageWage_2012 != ":" &&
                d.hrst_2013 != ":" && d.AverageWage_2013 != ":" &&
                d.hrst_2014 != ":" && d.AverageWage_2014 != ":" &&
                d.hrst_2015 != ":" && d.AverageWage_2015 != ":" &&
                d.hrst_2016 != ":" && d.AverageWage_2016 != ":" &&
                d.hrst_2017 != ":" && d.AverageWage_2017 != ":" &&
                d.hrst_2018 != ":" && d.AverageWage_2018 != ":" &&
                d.hrst_2019 != ":" && d.AverageWage_2019 != ":" &&d.hrst_2020 != ":" && d.AverageWage_2020 != ":";
        })
        .transition()
        .delay(function(d,i){return(i*3)})
        .duration(500)
        .attr("r", function(d) {
            switch(+year){
                case 2010:
                    return x(d.hub_2010 * hub_scale);
                case 2011:
                    return x(d.hub_2011 * hub_scale);
                case 2012:
                    return x(d.hub_2012 * hub_scale);
                case 2013:
                    return x(d.hub_2013 * hub_scale);
                case 2014:
                    return x(d.hub_2014 * hub_scale);
                case 2015:
                    return x(d.hub_2015 * hub_scale);
                case 2016:
                    return x(d.hub_2016 * hub_scale);
                case 2017:
                    return x(d.hub_2017 * hub_scale);
                case 2018:
                    return x(d.hub_2018 * hub_scale);
                case 2019:
                    return x(d.hub_2019 * hub_scale);
                case 2020:
                    return x(d.hub_2020 * hub_scale);
                default:
                    return x(d.hub_2015 * hub_scale);
            }
        })
        .attr("cx", function(d) {
            switch(+year){
                case 2010:
                    return x(d.hrst_2010);
                case 2011:
                    return x(d.hrst_2011);
                case 2012:
                    return x(d.hrst_2012);
                case 2013:
                    return x(d.hrst_2013);
                case 2014:
                    return x(d.hrst_2014);
                case 2015:
                    return x(d.hrst_2015);
                case 2016:
                    return x(d.hrst_2016);
                case 2017:
                    return x(d.hrst_2017);
                case 2018:
                    return x(d.hrst_2018);
                case 2019:
                    return x(d.hrst_2019);
                case 2020:
                    return x(d.hrst_2020);
                default:
                    return x(d.hrst_2015);
            }
        })
        .attr("cy", function(d) {
            switch(+year){
                case 2010:
                    return y(d.AverageWage_2010);
                case 2011:
                    return y(d.AverageWage_2011);
                case 2012:
                    return y(d.AverageWage_2012);
                case 2013:
                    return y(d.AverageWage_2013);
                case 2014:
                    return y(d.AverageWage_2014);
                case 2015:
                    return y(d.AverageWage_2015);
                case 2016:
                    return y(d.AverageWage_2016);
                case 2017:
                    return y(d.AverageWage_2017);
                case 2018:
                    return y(d.AverageWage_2018);
                case 2019:
                    return y(d.AverageWage_2019);
                case 2020:
                    return y(d.AverageWage_2020);
                default:
                    return y(d.AverageWage_2015);
            }
        })

    var lg = calcLinear(data.filter(function(d){
            return d.hrst_2010 != ":" && d.AverageWage_2010 != ":" &&
                d.hrst_2011 != ":" && d.AverageWage_2011 != ":" &&
                d.hrst_2012 != ":" && d.AverageWage_2012 != ":" &&
                d.hrst_2013 != ":" && d.AverageWage_2013 != ":" &&
                d.hrst_2014 != ":" && d.AverageWage_2014 != ":" &&
                d.hrst_2015 != ":" && d.AverageWage_2015 != ":" &&
                d.hrst_2016 != ":" && d.AverageWage_2016 != ":" &&
                d.hrst_2017 != ":" && d.AverageWage_2017 != ":" &&
                d.hrst_2018 != ":" && d.AverageWage_2018 != ":" &&
                d.hrst_2019 != ":" && d.AverageWage_2019 != ":" &&d.hrst_2020 != ":" && d.AverageWage_2020 != ":";
        }),
        "hrst_"+year,
        "AverageWage_"+year,
        /*We first filter the dataset to don't include ":",
         then we pass the column that we want to do the correlation*/
        d3.min(data.filter(function(d){
            return d.hrst_2010 != ":" && d.AverageWage_2010 != ":" &&
                d.hrst_2011 != ":" && d.AverageWage_2011 != ":" &&
                d.hrst_2012 != ":" && d.AverageWage_2012 != ":" &&
                d.hrst_2013 != ":" && d.AverageWage_2013 != ":" &&
                d.hrst_2014 != ":" && d.AverageWage_2014 != ":" &&
                d.hrst_2015 != ":" && d.AverageWage_2015 != ":" &&
                d.hrst_2016 != ":" && d.AverageWage_2016 != ":" &&
                d.hrst_2017 != ":" && d.AverageWage_2017 != ":" &&
                d.hrst_2018 != ":" && d.AverageWage_2018 != ":" &&
                d.hrst_2019 != ":" && d.AverageWage_2019 != ":" &&d.hrst_2020 != ":" && d.AverageWage_2020 != ":";
        }), function(d){ return d.hrst_2015}),
        d3.min(data.filter(function(d){
            return d.hrst_2010 != ":" && d.AverageWage_2010 != ":" &&
                d.hrst_2011 != ":" && d.AverageWage_2011 != ":" &&
                d.hrst_2012 != ":" && d.AverageWage_2012 != ":" &&
                d.hrst_2013 != ":" && d.AverageWage_2013 != ":" &&
                d.hrst_2014 != ":" && d.AverageWage_2014 != ":" &&
                d.hrst_2015 != ":" && d.AverageWage_2015 != ":" &&
                d.hrst_2016 != ":" && d.AverageWage_2016 != ":" &&
                d.hrst_2017 != ":" && d.AverageWage_2017 != ":" &&
                d.hrst_2018 != ":" && d.AverageWage_2018 != ":" &&
                d.hrst_2019 != ":" && d.AverageWage_2019 != ":" &&d.hrst_2020 != ":" && d.AverageWage_2020 != ":";
        }), function(d){ return d.AverageWage_2015})
    );
    //console.log("ptA: "+"("+lg.ptA.x+","+lg.ptA.y+")");
    //console.log("ptB: "+"("+lg.ptB.x+","+lg.ptB.y+")");
    svg.append("line")
        .attr("class", "regression")
        .attr("x1", x(lg.ptA.x))
        .attr("y1", y(lg.ptA.y))
        .attr("x2", x(lg.ptB.x))
        .attr("y2", y(lg.ptB.y));
})

//console.log(selected_country);



function returnHtml(d){
    switch(+year){
        case 2010:
            return d.GEO+":<br>Average R&I and IT salary: ???" + d.AverageWage_2010+"</br>Active Population on R&I and IT: "+d.hrst_2010;
        case 2011:
            return d.GEO+":<br>Average R&I and IT salary: ???" + d.AverageWage_2011+"</br>Active Population on R&I and IT: "+d.hrst_2011;
        case 2012:
            return d.GEO+":<br>Average R&I and IT salary: ???" + d.AverageWage_2012+"</br>Active Population on R&I and IT: "+d.hrst_2012;
        case 2013:
            return d.GEO+":<br>Average R&I and IT salary: ???" + d.AverageWage_2013+"</br>Active Population on R&I and IT: "+d.hrst_2013;
        case 2014:
            return d.GEO+":<br>Average R&I and IT salary: ???" + d.AverageWage_2014+"</br>Active Population on R&I and IT: "+d.hrst_2014;
        case 2015:
            return d.GEO+":<br>Average R&I and IT salary: ???" + d.AverageWage_2015+"</br>Active Population on R&I and IT: "+d.hrst_2015;
        case 2016:
            return d.GEO+":<br>Average R&I and IT salary: ???" + d.AverageWage_2016+"</br>Active Population on R&I and IT: "+d.hrst_2016;
        case 2017:
            return d.GEO+":<br>Average R&I and IT salary: ???" + d.AverageWage_2017+"</br>Active Population on R&I and IT: "+d.hrst_2017;
        case 2018:
            return d.GEO+":<br>Average R&I and IT salary: ???" + d.AverageWage_2018+"</br>Active Population on R&I and IT: "+d.hrst_2018;
        case 2019:
            return d.GEO+":<br>Average R&I and IT salary: ???" + d.AverageWage_2019+"</br>Active Population on R&I and IT: "+d.hrst_2019;
        case 2020:
            return d.GEO+":<br>Average R&I and IT salary: ???" + d.AverageWage_2020+"</br>Active Population on R&I and IT: "+d.hrst_2020;
        default:
            return d.GEO+":<br>Average R&I and IT salary: ???" + d.AverageWage_2015+"</br>Active Population on R&I and IT: "+d.hrst_2015;
    }
}


/*From this line it's to calculate Linear Regression*/
// (1) Your data
// (2) The column of data plotted on your x-axis
// (3) The column of data plotted on your y-axis
// (4) The minimum value of your x-axis
// (5) The minimum value of your y-axis
function calcLinear(data, x, y, minX, minY){
    /////////
    //SLOPE//
    /////////

    // Let n = the number of data points
    var n = data.length;

    // Get just the points
    var pts = [];
    data.forEach(function(d,i){
        var obj = {};
        obj.x = +d[x];
        obj.y = +d[y];
        obj.mult = obj.x*obj.y;
        pts.push(obj);
    });

    // Let a equal n times the summation of all x-values multiplied by their corresponding y-values
    // Let b equal the sum of all x-values times the sum of all y-values
    // Let c equal n times the sum of all squared x-values
    // Let d equal the squared sum of all x-values
    var sum = 0;
    var xSum = 0;
    var ySum = 0;
    var sumSq = 0;
    pts.forEach(function(pt){
        sum = sum + pt.mult;
        xSum = xSum + pt.x;
        ySum = ySum + pt.y;
        sumSq = sumSq + (pt.x * pt.x);
    });
    var a = sum * n;
    var b = xSum * ySum;
    var c = sumSq * n;
    var d = xSum * xSum;

    // Plug the values that you calculated for a, b, c, and d into the following equation to calculate the slope
    // slope = m = (a - b) / (c - d)
    var m = (a - b) / (c - d);

    /////////////
    //INTERCEPT//
    /////////////

    // Let e equal the sum of all y-values
    var e = ySum;

    // Let f equal the slope times the sum of all x-values
    var f = m * xSum;

    // Plug the values you have calculated for e and f into the following equation for the y-intercept
    // y-intercept = b = (e - f) / n
    var b = (e - f) / n;

    //console.log("equation:"+"y = " + m + "x + " + b);
    //console.log("equation:"+"x = ( y - " + b + " ) / " + m);
    //console.log("########### POINT B ###########");
    //console.log("x : (minY - b) / m");
    //console.log("X:\n->minY: "+minY+"\n->b: "+b+"\n->m: "+m);
    //console.log("Y : "+minY);
    //console.log("x: "+ySum);
    // Return an object of 2 points: 1)The starting and the 2)ending of the line
    return {
        ptA : {
            x: minX,
            y: 7500//m * minX + b
        },
        ptB : {
            y: 150000,
            x: (150000 - b) / m
        }
    }
}