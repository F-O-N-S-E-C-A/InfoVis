const margin = { top: 20, right: 30, bottom: 40, left: 90 };
const width = 600 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

function init() {
    createBarChart("#vi1");
    createScatterPlot("#vi2");
    createLineChart("#vi3");
    d3.select("#new").on("click", () => {
        updateBarChart(2008, 2014);
        updateScatterPlot(2008, 2014);
        updateLineChart(2008, 2014);
    });
    d3.select("#old").on("click", () => {
        updateBarChart(2000, 2007);
        updateScatterPlot(2000, 2007);
        updateLineChart(2000, 2007);
    });
    d3.select("#all").on("click", () => {
        updateBarChart(2000, 2014);
        updateScatterPlot(2000, 2014);
        updateLineChart(2000, 2014);
    });
}

function createBarChart(id) {
    const svg = d3
        .select(id)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("id", "gBarChart")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    d3.json("data/data.json").then(function (data) {
        const x = d3.scaleLinear().domain([0, 10]).range([0, width]);
        svg
            .append("g")
            .attr("id", "gXAxis")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x));

        const y = d3
            .scaleBand()
            .domain(data.map((d) => d.oscar_year ))
            .range([0, height])
            .padding(0.2);
        svg
            .append("g")
            .attr("id", "gYAxis")
            .call(d3.axisLeft(y));

        svg
            .selectAll("rect.rectValue")
            .data(data, (d) => d.title)
            .join("rect")
            .attr("class", "rectValue itemValue")
            .attr("x", x(0))
            .attr("y", (d) => y(d.oscar_year))
            .attr("width", (d) => x(d.rating))
            .attr("height", y.bandwidth())
            .attr("fill", "steelblue")
            .on("mouseover", (event, d) => handleMouseOver(d))
            .on("mouseleave", (event, d) => handleMouseLeave())
            .append("title")
            .text((d) => d.title);
    });
}

function createScatterPlot(id) {
    const svg = d3
        .select(id)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("id", "gScatterPlot")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    d3.json("data/data.json").then(function (data) {
        const x = d3
            .scaleLinear()
            .domain([0, d3.max(data, (d) => d.budget)])
            .range([0, width]);
        svg
            .append("g")
            .attr("id", "gXAxis")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x).tickFormat((x) => x / 1000000 + "M"));

        const y = d3.scaleLinear().domain([0, 10]).range([height, 0]);
        svg
            .append("g")
            .attr("id", "gYAxis")
            .call(d3.axisLeft(y));

        svg
            .selectAll("circle.circleValues")
            .data(data, (d) => d.title)
            .join("circle")
            .attr("class", "circleValues itemValue")
            .attr("cx", (d) => x(d.budget))
            .attr("cy", (d) => y(d.rating))
            .attr("r", 4)
            .style("fill", "steelblue")
            .on("mouseover", (event, d) => handleMouseOver(d))
            .on("mouseleave", (event, d) => handleMouseLeave())
            .append("title")
            .text((d) => d.title);
    });
}

function createLineChart(id) {
    const svg = d3
        .select(id)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("id", "gLineChart")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    d3.json("data/data.json").then(function (data) {
        const x = d3
            .scalePoint()
            .domain(data.map((d) => d.oscar_year))
            .range([width, 0]);
        svg
            .append("g")
            .attr("id", "gXAxis")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x));

        const y = d3
            .scaleLinear()
            .domain([0, d3.max(data, (d) => d.budget)])
            .range([height, 0]);
        svg
            .append("g")
            .attr("id", "gYAxis")
            .call(d3.axisLeft(y).tickFormat((x) => x / 1000000 + "M"));

        svg
            .append("path")
            .datum(data)
            .attr("class", "pathValue")
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr(
                "d",
                d3
                    .line()
                    .x((d) => x(d.oscar_year))
                    .y((d) => y(d.budget))
            );
        svg
            .selectAll("circle.circleValues")
            .data(data, (d) => d.title)
            .join("circle")
            .attr("class", "circleValues itemValue")
            .attr("cx", (d) => x(d.oscar_year))
            .attr("cy", (d) => y(d.budget))
            .attr("r", 4)
            .style("fill", "steelblue")
            .on("mouseover", (event, d) => handleMouseOver(d))
            .on("mouseleave", (event, d) => handleMouseLeave())
            .append("title")
            .text((d) => d.title);
    });
}

function updateBarChart(start, finish) {
    d3.json("data/data.json").then(function (data) {
        data = data.filter(function (elem) {
            return start <= elem.oscar_year && elem.oscar_year <= finish;
        });

        const svg = d3.select("#gBarChart");

        const x = d3.scaleLinear().domain([0, 10]).range([0, width]);
        svg.select("#gXAxis").call(d3.axisBottom(x));

        const y = d3
            .scaleBand()
            .domain(data.map((d) => d.oscar_year))
            .range([0, height])
            .padding(0.2);
        svg.select("#gYAxis").call(d3.axisLeft(y));

        svg
            .selectAll("rect.rectValue")
            .data(data, (d) => d.title)
            .join(
                (enter) => {
                    rects = enter
                        .append("rect")
                        .attr("class", "rectValue itemValue")
                        .attr("x", x(0))
                        .attr("y", (d) => y(d.oscar_year))
                        .attr("width", (d) => x(0))
                        .attr("height", y.bandwidth())
                        .attr("fill", "steelblue")
                        .on("mouseover", (event, d) => handleMouseOver(d))
                        .on("mouseleave", (event, d) => handleMouseLeave())
                    rects
                        .transition()
                        .duration(1000)
                        .attr("width", (d) => x(d.rating));
                    rects.append("title").text((d) => d.title);
                },
                (update) => {
                    update
                        .transition()
                        .duration(1000)
                        .attr("x", x(0))
                        .attr("y", (d) => y(d.oscar_year))
                        .attr("width", (d) => x(d.rating))
                        .attr("height", y.bandwidth());
                },
                (exit) => {
                    exit.remove();
                }
            );
    });
}

function updateScatterPlot(start, finish) {
    d3.json("data/data.json").then(function (data) {
        data = data.filter(function (elem) {
            return start <= elem.oscar_year && elem.oscar_year <= finish;
        });

        const svg = d3.select("#gScatterPlot");

        const x = d3
            .scaleLinear()
            .domain([0, d3.max(data, (d) => d.budget)])
            .range([0, width]);
        svg
            .select("#gXAxis")
            .call(d3.axisBottom(x).tickFormat((x) => x / 1000000 + "M"));

        const y = d3.scaleLinear().domain([0, 10]).range([height, 0]);
        svg.select("gYAxis").call(d3.axisLeft(y));

        svg
            .selectAll("circle.circleValues")
            .data(data, (d) => d.title)
            .join(
                (enter) => {
                    circles = enter
                        .append("circle")
                        .attr("class", "circleValues itemValue")
                        .attr("cx", (d) => x(d.budget))
                        .attr("cy", (d) => y(0))
                        .attr("r", 4)
                        .style("fill", "steelblue")
                        .on("mouseover", (event, d) => handleMouseOver(d))
                        .on("mouseleave", (event, d) => handleMouseLeave())
                    circles
                        .transition()
                        .duration(1000)
                        .attr("cy", (d) => y(d.rating));
                    circles.append("title").text((d) => d.title);
                },
                (update) => {
                    update
                        .transition()
                        .duration(1000)
                        .attr("cx", (d) => x(d.budget))
                        .attr("cy", (d) => y(d.rating))
                        .attr("r", 4);
                },
                (exit) => {
                    exit.remove();
                }
            );
    });
}

function updateLineChart(start, finish) {
    d3.json("data/data.json").then(function (data) {
        data = data.filter(function (elem) {
            return start <= elem.oscar_year && elem.oscar_year <= finish;
        });

        const svg = d3.select("#gLineChart");

        const x = d3
            .scalePoint()
            .domain(data.map((d) => d.oscar_year))
            .range([width, 0]);
        svg.select("#gXAxis").call(d3.axisBottom(x));

        const y = d3
            .scaleLinear()
            .domain([0, d3.max(data, (d) => d.budget)])
            .range([height, 0]);
        svg
            .select("gYAxis")
            .call(d3.axisLeft(y).tickFormat((x) => x / 1000000 + "M"));

        svg
            .select("path.pathValue")
            .datum(data)
            .transition()
            .duration(1000)
            .attr(
                "d",
                d3
                    .line()
                    .x((d) => x(d.oscar_year))
                    .y((d) => y(d.budget))
            );

        svg
            .selectAll("circle.circleValues")
            .data(data, (d) => d.title)
            .join(
                (enter) => {
                    circles = enter
                        .append("circle")
                        .attr("class", "circleValues itemValue")
                        .attr("cx", (d) => x(d.oscar_year))
                        .attr("cy", (d) => y(0))
                        .attr("r", 4)
                        .style("fill", "steelblue")
                        .on("mouseover", (event, d) => handleMouseOver(d))
                        .on("mouseleave", (event, d) => handleMouseLeave())
                    circles
                        .transition()
                        .duration(1000)
                        .attr("cy", (d) => y(d.budget));
                    circles.append("title").text((d) => d.title);
                },
                (update) => {
                    update
                        .transition()
                        .duration(1000)
                        .attr("cx", (d) => x(d.oscar_year))
                        .attr("cy", (d) => y(d.budget))
                        .attr("r", 4);
                },
                (exit) => {
                    exit.remove();
                }
            );
    });
}

function handleMouseOver(item) {
    d3.selectAll(".itemValue")
        .filter(function (d, i) {
            return d.title == item.title;
        })
        .attr("r", 10)
        .style("fill", "red");
}

function handleMouseLeave() {
    d3.selectAll(".itemValue").style("fill", "steelblue").attr("r", 4);
}
