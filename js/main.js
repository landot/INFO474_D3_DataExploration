// Main JavaScript File


//data for the visualization

  
 console.log('HELLOOO you');

// console.log(data[0]);

// //how to filter data
// var uw = data.filter(function (d) {
//   return d.Agency_Title == 'University of Washington';
// })

// var uwProf = data.filter(function (d) {
//   return d.job_title.indexOf("PROFESSOR") >= 0 ;
// })

// console.log('prof');
// console.log(uwProf.length);

// var schools = {};
// for(var i in data) {
//     schools[data[i].Agency_Title] = null;
// }
// schools = Object.keys(schools);

// console.log(schools);

// console.log(uw.length);

// console.log(data.length);

// console.log('test');
// // Set domain and range for the scale

// var testData = $(uwProf).slice(0,20);

// console.log(testData)

// var padding = {
//   left:50,
//   bottom:50,
//   right:50,
//   top:50
// };

//var domain = [0, 20000];

//var topRange = [100, width - 100];
//var bottomRange = [0, width];
//var middleRange = [width/2 - 20, width/2 + 20];
//var colorRange = ['red', 'blue'];


var year = 'Sal2011';
var school = 'University of Washington';
var bar1, bar2, bar3, bar4, bar5, barNums;

// You'll have to wait for you page to load to assign events to the elements created in your index.html file
$(function() {
  // Select SVG for manipulation
  
  d3.csv("data/professordata.csv", function(error, data) {
    var xScale, yScale, currentData;
    // Convert strings to numbers.
    data.forEach(function(d) {
      d.Sal2011 = +d.Sal2011;
      d.Sal2012 = +d.Sal2012;
      d.Sal2013 = +d.Sal2013;
      d.Sal2014 = +d.Sal2014;
    });
    
    var margin = {
			left:70,
			bottom:100,
			top:50,
			right:50,
		};
    
    var height = 800 - margin.top - margin.bottom;
    var width = 960 - margin.left - margin.right;
    
  
  // Write a function to filter down the data to the current sex and type
  data = data.filter(function (d) {
    return d.job_title.indexOf("PROFESSOR") >= 0 ;
  })
  
  //console.log(barNums);
  var filterData = function(year) {
    bar1 = data.filter(function(d){
      return d[year] > 0 && d[year] <= 40000;
    })
    bar2 = data.filter(function(d){
      return d[year] > 40000 && d[year] <= 80000;
    })
    bar3 = data.filter(function(d){
      return d[year] > 80000 && d[year] <= 120000;
    })
    bar4 = data.filter(function(d){
      return d[year] > 120000 && d[year] <= 160000;
    })
    bar5 = data.filter(function(d){
      return d[year] > 160000;
    })
    barNums = [bar1.length, bar2.length, bar3.length, bar4.length, bar5.length];
  }
  
  filterData(year);
  console.log(bar1.length);
  console.log(barNums);
  console.log(d3.min(barNums));
  
  var svg = d3.select('#my-svg')
            .attr('height', 800)
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
      .attr('transform', 'translate(' + (margin.left + width/2) + ',' + (height + margin.top + 40) + ')')
      .attr('class', 'title')

  // Append text to label the y axis (don't specify the text yet)
  var yAxisText = svg.append('text')
      .attr('transform', 'translate(' + (margin.left - 40) + ',' + (margin.top + height/2) + ') rotate(-90)')
      .attr('class', 'title')

//function for setting scales
var setScales = function(data) {
  var xTextLabels = ['1-40,000','40,000-80,000','80,000-120,000','120,000-160,000','160,000+'];

  // Define an ordinal xScale using rangeBands
  xScale  = d3.scale.ordinal().rangeBands([0, width], .2).domain(xTextLabels);

  // Get min/max values of the percent data
  var yMin =d3.min(barNums);
  var yMax =d3.max(barNums);

  console.log(bar1)
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
			xAxisText.text('Salary (USD)')
			yAxisText.text('Frequency')
}

    // // Write a function to filter down the data to the current sex and type
		// data = data.filter(function (d) {
    //   return d.job_title.indexOf("PROFESSOR") >= 0 ;
    // })
    
    // var year = 'Sal2011';
    // var school = 'University of Washington';
   
    
    
    
    // console.log('test')
    // console.log(barNums);
    // console.log(d3.min(barNums));
    // console.log(d3.max(barNums));
    
    // var bar1, bar2, bar3, bar4, bar5, barNums;
    
    
    // console.log(barNums);
    // var filterData = function(year) {
		// 	bar1 = data.filter(function(d){
    //     return d[year] > 0 && d[year] <= 40000;
    //   })
    //   bar2 = data.filter(function(d){
    //     return d[year] > 40000 && d[year] <= 80000;
    //   })
    //   bar3 = data.filter(function(d){
    //     return d[year] > 80000 && d[year] <= 120000;
    //   })
    //   bar4 = data.filter(function(d){
    //     return d[year] > 120000 && d[year] <= 160000;
    //   })
    //   bar5 = data.filter(function(d){
    //     return d[year] > 160000;
    //   })
    //   barNums = [bar1.length, bar2.length, bar3.length, bar4.length, bar5.length];
		// }
    
    
    // filterData(year);
    console.log(barNums);


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
				.attr('x', function(d){return xScale(d)})
				.attr('y', height)
				.attr('height', 0)
				.attr('width', xScale.rangeBand())
				.attr('class', 'bar')
				.attr('title', function(d) {return d});

			// Use the .exit() and .remove() methods to remove elements that are no longer in the data
			bars.exit().remove();

			// Transition properties of the update selection
			bars.transition()
				.delay(function(d,i){return i*50})
				.attr('x', function(d){return xScale(d)})
				.attr('y', function(d){return yScale(d)})
				.attr('height', function(d) {return height - yScale(d)})
				.attr('width', xScale.rangeBand())
				.attr('title', function(d) {return d});
		}

    // Filter data to the current settings then draw
		//filterData()
		draw(data)




  
//   var x = d3.scale.ordinal() 
//           .rangeRoundBands([0, width], .05);
          
//   var y = d3.scale.linear()
//             .range([height, 0])


//   var xAxis = d3.svg.axis()
//       .scale(x)
//       .orient("bottom");

//   var yAxis = d3.svg.axis()
//       .scale(y)
//       .orient("left")
//       .ticks(10, "%");
  
//   var xaxis = svg.append("g")
//       .attr("class", "x axis")
//       .attr("transform", "translate(0," + height + ")")
//       .call(xAxis)  
//       .append("text")
//       .attr("x", 400)  
//       .attr("y", 60)
//       .attr("dx", ".71em")
//       .text("Salary (USD)");         
             
//   var yaxis = svg.append("g")
//       .attr("class", "y axis")
//       .call(yAxis)
//       .append("text")
//       .attr("transform", "rotate(-90)")
//       .attr("y", 6)
//       .attr("dy", ".71em")
//       .style("text-anchor", "end")
//       .text("Frequency");           
 
 
//  var bars = svg.selectAll(".bar")
//       .data(testData)
//       .enter().append("rect")
//       .attr("class", "bar")
//       .attr("x", function(d) { return x(50); })
//       .attr("width", 50)
//       .attr("y", function(d) { return y(d.Sal2011 * .000001); })
//       .attr("height", function(d) { return height - y(d.Sal2011); });
            
             
  // // Declare a scale for displaying the domain
  // var topScale = d3.scale.linear().domain(domain).range(topRange);

  // // // Declare a scale the shows the range (you won't typically do this)
  // var middleScale = d3.scale.linear().domain(domain).range(middleRange);

  // // // Declare a scale showing the "function" in between domain and range
  // var bottomScale = d3.scale.linear().domain(domain).range(bottomRange);

  // // // Declare a scale to show the color
  // var colorScale = d3.scale.linear().domain(domain).range(colorRange);

  // // // Create an axis for the domain
  // var topAxis = d3.svg.axis()
  //                     .scale(topScale)
  //                     .orient('top')
  //                     .tickFormat(d3.format('.2s')); // 2 significant digits

  // // // Append rangeAxis to svg
  // var topAxisLabel = g.append("g")
  //                     .attr("class", "x axis")
  //                     .call(topAxis);

  // // // Create an axis for the function
  // var middleAxis = d3.svg.axis()
  //                        .scale(middleScale)
  //                        .orient('top')
  //                        .ticks(0) // no ticks
  //                        .tickFormat(""); // don't display these values

  // // // Append the center axis
  // var middleAxisLabel = g.append("g")
  //                        .attr("class", "x axis")
  //                        .attr("transform", "translate(0," + ( height/2) + ")")
  //                        .call(middleAxis)


  // // // Create an axis for the function
  // var bottomAxis = d3.svg.axis()
  //                        .scale(bottomScale)
  //                        .orient('bottom')                         
  //                        .tickFormat(function(d){
  //                          // return bottomScale(d) + 'px'
  //                          return colorScale(d);
  //                        }); // Show as pixels

  // // // Change bottom axis text
  // // // 

  // // // Append the center axis
  // var bottomAxisLabel = g.append("g")
  //                        .attr("class", "x axis")                         
  //                        .attr("transform", "translate(0," + height + ")")
  //                        .call(bottomAxis)
                         
  // // bottomAxisLabel.selectAll('text')
  //           .style('fill', function(d){
  //               console.log(d);
  //               return colorScale(d)
  //            });

  // // Add text
  // var scaleText = g.append('text')
  //              .text('scale(')
  //              .attr('x', width/2 - 22)
  //              .attr('y', height/2)
  //              .attr('class', 'mid-label')
  //              .style('text-anchor', 'end');


  //  var closeScale = g.append('text')
  //               .text(')')
  //               .attr('x', width/2 + 22)
  //               .attr('y', height/2)
  //               .attr('class', 'mid-label')
  //               .style('text-anchor', 'start');

  // // Add labels
  // var topLabel = svg.append('text')
  //                   .text('Data Space (domain)')
  //                   .attr('x', padding.left + width/2)
  //                   .attr('y', 15)
  //                   .attr('class', 'axis-label');

  // var bottomLabel = svg.append('text')
  //                   .text('Visual Space (range)')
  //                   .attr('x', padding.left + width/2)
  //                   .attr('y', height + padding.top + padding.bottom - 5)
  //                   .attr('class', 'axis-label');

  // // Line interpolater
  // var line = d3.svg.line().interpolate('cardinal')

  // // Path drawing function for displaying line
  // var path = function(d) {
  //   // Calculate position to accomodate the use of 3 scales
  //   var lineData = [];

  //   // Top position
  //   lineData.push([topScale(d), 0]);

  //   // Middle position
  //   lineData.push([middleScale(d), height/2]);

  //   // Bottom position
  //   lineData.push([bottomScale(d), height]);

  //   // Return ther interpolation of the data
  //   return line(lineData);
  // }
  // // Bind data
  // var draw = function(data) {
  //   var paths = g.selectAll('.path')
  //                .data(data);

  //   // Enter new paths
  //   paths.enter().append("path");

  //   // Draw paths
  //   paths.attr('d', function(d){return path(d)})
  //        .attr('class', 'path')
  //        .style('fill', 'none')
  //        .style("opacity", 0.4)
  //        .style("stroke", '#d3d3d3');

  //   // Remove paths
  //   paths.exit().remove()

  // }
  //draw(d3.range(domain[0], domain[1] + 1000, 1000))

})});
