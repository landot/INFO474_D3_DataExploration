var schoolColors = {
    'University of Washington': 'purple',
    'Washington State University': 'red',
    'Central Washington University': 'red',
    'Eastern Washington University': 'red',
    'Western Washington University': 'blue'
}

//vars needed for remaking graph
var year = 'Sal2011';
var school = 'University of Washington';
var schoolCol = schoolColors[school];
var bar1, bar2, bar3, bar4, bar5, barNums;

// You'll have to wait for you page to load to assign events to the elements created in your index.html file
$(function() {
    //load data
    d3.csv("data/professordata.csv", function(error, data) {
        var xScale, yScale;
        // Convert strings to numbers.
        data.forEach(function(d) {
            d.Sal2011 = +d.Sal2011;
            d.Sal2012 = +d.Sal2012;
            d.Sal2013 = +d.Sal2013;
            d.Sal2014 = +d.Sal2014;
        });

        var margin = {
            left: 70,
            bottom: 100,
            top: 10,
            right: 50,
        };

        var height = 600 - margin.top - margin.bottom;
        var width = 960 - margin.left - margin.right;


        // Write a function to filter data for only job titles with Professor in it
        data = data.filter(function(d) {
            return d.job_title.indexOf("PROFESSOR") >= 0;
        })

        //filters the data based on year and university
        var filterData = function(year, school) {
            tempData = data.filter(function(d) {
                return d.Agency_Title == school;
            })
            bar1 = tempData.filter(function(d) {
                return d[year] > 0 && d[year] <= 40000;
            })
            bar2 = tempData.filter(function(d) {
                return d[year] > 40000 && d[year] <= 80000;
            })
            bar3 = tempData.filter(function(d) {
                return d[year] > 80000 && d[year] <= 120000;
            })
            bar4 = tempData.filter(function(d) {
                return d[year] > 120000 && d[year] <= 160000;
            })
            bar5 = tempData.filter(function(d) {
                return d[year] > 160000;
            })
            barNums = [bar1.length, bar2.length, bar3.length, bar4.length, bar5.length];
        }

        //first filter for page load
        filterData(year, school);


        //creating svg and appending g  
        var svg = d3.select('#my-svg')
            .attr('height', 600)
            .attr('width', 960);

        var g = svg.append('g')
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")") // shift from left and top
            .attr('height', height)
            .attr('width', width);

        // Append an xaxis label to your SVG, specifying the 'transform' attribute to position it (don't call the axis function yet)
        var xAxisLabel = svg.append('g')
            .attr('transform', 'translate(' + margin.left + ',' + (height + margin.top) + ')')
            .attr('class', 'axis')

        // Append a yaxis label to your SVG, specifying the 'transform' attribute to position it (don't call the axis function yet)
        var yAxisLabel = svg.append('g')
            .attr('class', 'axis')
            .attr('transform', 'translate(' + margin.left + ',' + (margin.top) + ')')

        // Append text to label the y axis (don't specify the text yet)
        var xAxisText = svg.append('text')
            .attr('transform', 'translate(' + (margin.left + width / 2 - 60) + ',' + (height + margin.top + 50) + ')')
            .attr('class', 'title')

        // Append text to label the y axis (don't specify the text yet)
        var yAxisText = svg.append('text')
            .attr('transform', 'translate(' + (margin.left - 50) + ',' + (margin.top + height / 2 + 50) + ') rotate(-90)')
            .attr('class', 'title')

        //function for setting scales
        var setScales = function(data) {
            var xTextLabels = ['$1-40,000', '$40,000-80,000', '$80,000-120,000', '$120,000-160,000', '$160,000+'];

            // Define an ordinal xScale using rangeBands
            xScale = d3.scale.ordinal().rangeBands([0, width], .2).domain(xTextLabels);

            // Get min/max values of the percent data
            var yMin = d3.min(barNums);
            var yMax = d3.max(barNums);

            console.log(bar1.length)
            console.log(barNums)
            console.log(yMin)
            console.log(yMax)

            // Define the yScale: remember to draw from top to bottom!
            yScale = d3.scale.linear().range([height, 0]).domain([0, yMax]);
        }

        //setting the axes
        var setAxes = function() {
            // Define x axis using d3.svg.axis(), assigning the scale as the xScale
            var xAxis = d3.svg.axis()
                .scale(xScale)
                .orient('bottom')

            // Define y axis using d3.svg.axis(), assigning the scale as the yScale
            var yAxis = d3.svg.axis()
                .scale(yScale)
                .orient('left')
                .tickFormat(d3.format('.2s'));

            // Call xAxis
            xAxisLabel.transition().duration(1500).call(xAxis);

            // Call yAxis
            yAxisLabel.transition().duration(1500).call(yAxis);

            // Update labels
            xAxisText.text('Salary Range (USD)')
            yAxisText.text('Number of Professors')
        }


        // Store the data-join in a function: make sure to set the scales and update the axes in your function.
        var draw = function(data) {
            // Set scales
            setScales(barNums)

            // Set axes
            setAxes()

            // Select all rects and bind data
            var bars = g.selectAll('rect').data(barNums);

            // Use the .enter() method to get your entering elements, and assign initial positions
            bars.enter().append('rect')
                .attr('x', 0)
                .attr('y', height)
                .attr('height', 0)
                .attr('width', xScale.rangeBand())
                .attr('class', 'bar')
                .attr('title', function(d) {
                    return d
                });

            // Use the .exit() and .remove() methods to remove elements that are no longer in the data
            bars.exit().remove();

            // Transition properties of the update selection
            bars.transition()
                .delay(function(d, i) {
                    return i * 50
                })
                //NOTE: bars had trouble positioning x-axis, so I calculated proper spacing by hand
                .attr('x', function(d, i) {
                    return 30 + i * 168 - 6 * i
                })
                .attr('y', function(d) {
                    return yScale(d)
                })
                .attr('height', function(d) {
                    return height - yScale(d)
                })
                .attr('width', xScale.rangeBand())
                .attr('fill', schoolCol)
                .attr('title', function(d) {
                    return d
                });

        }

        //changes filter variables based on button clicks
        $("input").on('click', function() {
            var val = $(this).val();
            console.log('clicking ' + val);
            var isSchool = $(this).hasClass('school');
            if (isSchool) {
                document.getElementById("school-name").innerHTML = 'School: ' + val;
                school = val;
                schoolCol = schoolColors[school]
            } else {
                document.getElementById("year-num").innerHTML = 'Year: ' + val.substr(3);
                year = val;
            }
            // Filter data, update chart
            filterData(year, school);
            draw(data);
        });

        //changes which button is highlighted based on clicks
        $("#list1 .btn").click(function(list) {
            $("#list1 .btn").removeClass('active');
            $(this).toggleClass('active');
        });
        $("#list2 .btn").click(function() {
            $("#list2 .btn").removeClass('active');
            $(this).toggleClass('active');
        });

        //changes values on page on current university and year
        document.getElementById("school-name").innerHTML = 'School: ' + school;
        document.getElementById("year-num").innerHTML = 'Year: ' + year.substr(3);

        //create the chart (first time)
        draw(data)

        //tooltips for the bar values (boxes are slightly off)
        $("rect").tooltip({
            'container': 'body',
            'placement': 'left',
        });
    });
});
