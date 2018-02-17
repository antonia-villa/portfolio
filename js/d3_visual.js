var names = [ 'HTML',
              'Javascript',
              'CSS',
              'Node/Expresss',
              'React',
              'SQL',
              'Mongo',
              'D3',
              'ChartsJS',
              'Recharts',
              'Playing Dead',
              'Census Visualizer',
              'DreamState',
              'Up and Coming' ],
    colors = ['#6093BF',
              '#3C74A6',
              '#194973',
              '#5F9EA0',
              '#66CDAA',
              '#4B0082',
              '#D8BFD8',
              '#FF8200',
              '#F09F0D',
              '#C73C1C',
              '#708090',
              '#708090',
              '#708090',
              '#708090'],
    opacityDefault = 0.8;


var matrix = [
              [0,0,0,0,0,0,0,0,0,0,1,1,1,1],
              [0,0,0,0,0,0,0,0,0,0,1,1,1,1],
              [0,0,0,0,0,0,0,0,0,0,1,1,1,1],
              [0,0,0,0,0,0,0,0,0,0,0,1,1,1],
              [0,0,0,0,0,0,0,0,0,0,0,0,1,0],
              [0,0,0,0,0,0,0,0,0,0,0,1,1,1],
              [0,0,0,0,0,0,0,0,0,0,0,0,1,0],
              [0,0,0,0,0,0,0,0,0,0,1,0,0,1],
              [0,0,0,0,0,0,0,0,0,0,0,1,0,0],
              [0,0,0,0,0,0,0,0,0,0,0,0,1,0],
              [1,1,1,0,0,0,1,0,0,0,0,0,0,0],
              [1,1,1,1,1,0,0,1,0,0,0,0,0,0],
              [1,1,1,1,1,1,0,0,1,1,0,0,0,0],
              [1,1,1,1,1,0,1,0,0,0,0,0,0,0]
            ]

  ////////////////////////////////////////////////////////////
  /////////// Create scale and layout functions //////////////
  ////////////////////////////////////////////////////////////

  var colors = d3.scaleOrdinal()
      .domain(d3.range(names.length))
    .range(colors);

  var chord = d3.chord()
    .padAngle(.15)
    .sortChords(d3.descending)





////////////////////////////////////////////////////////////
////////////////////// Create SVG //////////////////////////
////////////////////////////////////////////////////////////

// console.log('node', d3.select("#d3_visual").node())

// var test = d3.select("#d3_visual").node()
// var bbox = test.getBBox();


var bbox = d3.select("#d3_visual").node().getBoundingClientRect()
var width = bbox.width 
var height = bbox.height
var innerRadius = Math.min(width, height) * .39,
    outerRadius = innerRadius * 1.1;

//console.log(height, wid)
    var arc = d3.arc()
    .innerRadius(innerRadius*1.01)
    .outerRadius(outerRadius);

  var path = d3.ribbon()
  .radius(innerRadius);



var svg = d3.select("#d3_visual").append("svg")
  // .attr("viewBox", "0 0 " + width + " " + "height")
  .attr("width", width )
  .attr("height", height)
  .append("g")
  .attr("transform", "translate(" + (width/2 ) + "," + (height/2) + ")")
  .datum(chord(matrix));



// var svg = d3.select("#d3_visual")
//    .append("div")
//    .classed("svg-container", true) //container class to make it responsive
//    .append("svg")
//    //responsive SVG needs these 2 attributes and no width and height attr
//    .attr("preserveAspectRatio", "xMinYMin meet")
//    .attr("viewBox", "0 0 800 800")
//    //class to make it responsive
//    .classed("svg-content-responsive", true)
//    .append("g")
//    .attr("transform", "translate(" + (width/2 + margin.left) + "," + (height/2 + margin.top) + ")")
//    .datum(chord(matrix));

////////////////////////////////////////////////////////////
////////////////// Draw outer Arcs /////////////////////////
////////////////////////////////////////////////////////////

var outerArcs = svg.selectAll("g.group")
  .data(function(chords) { return chords.groups; })
  .enter().append("g")
  .attr("class", "group")
  .on("mouseover", fade(.1))
  .on("mouseout", fade(opacityDefault))

  // text popups
  .on("click", mouseoverChord)
  .on("mouseout", mouseoutChord);

outerArcs.append("path")
  .style("fill", function(d) { return colors(d.index); })
  .attr("id", function(d, i) { return "group" + d.index; })
  .attr("d", arc);
  
 // outerArcs.append("text")
 //         .attr("x", 6)
 //        .attr("dy", -10)
 //      .append("textPath")
 //        .attr("xlink:href", function(d) { return "#group" + d.index; })
 //        .text(function(chords, i){return names[i];})
 //        .style("fill", "black");
  

////////////////////////////////////////////////////////////
////////////////////// Append names ////////////////////////
////////////////////////////////////////////////////////////

// Append the label names on the outside
outerArcs.append("text")
  .each(function(d) { d.angle = (d.startAngle + d.endAngle) / 2; })
  .attr("dy", ".35em")
  .attr("class", "titles")
  .attr("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
  .attr("transform", function(d) {
    return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
    + "translate(" + (outerRadius + 20) + ")"
    + (d.angle > Math.PI ? "rotate(180)" : "");
  })
  .text(function(d,i) { return names[i]; });
  
////////////////////////////////////////////////////////////
////////////////// Draw inner chords ///////////////////////
////////////////////////////////////////////////////////////

svg.selectAll("path.chord")
  .data(function(chords) { return chords; })
  .enter().append("path")
  .attr("class", "chord")
  .style("fill", function(d) { return colors(d.source.index); })
  .style("opacity", opacityDefault)
  .attr("d", path);

////////////////////////////////////////////////////////////
////////////////// Extra Functions /////////////////////////
////////////////////////////////////////////////////////////

function popup() {
  return function(d,i) {
    console.log("love");
  };
}//popup

//Returns an event handler for fading a given chord group.
function fade(opacity) {
  return function(d,i) {
    svg.selectAll("path.chord")
        .filter(function(d) { return d.source.index != i && d.target.index != i; })
    .transition()
        .style("opacity", opacity);
  };
}//fade

  //Highlight hovered over chord
function mouseoverChord(d,i) {

  //Decrease opacity to all
  svg.selectAll("path.chord")
    .transition()
    .style("opacity", 0.1);
  //Show hovered over chord with full opacity
  d3.select(this)
    .transition()
        .style("opacity", 1);

  //Define and show the tooltip over the mouse location
  $(this).popover({
    //placement: 'auto top',
    title: 'test',
    placement: 'right',
    container: 'body',
    animation: false,
    offset: "20px -100px",
    followMouse: true,
    trigger: 'click',
    html : true,
    content: function() {
      return "<p style='font-size: 11px; text-align: center;'><span style='font-weight:900'>"  +
           "</span> text <span style='font-weight:900'>"  +
           "</span> folgt hier <span style='font-weight:900'>" + "</span> movies </p>"; }
  });
  $(this).popover('show');
}
//Bring all chords back to default opacity
function mouseoutChord(d) {
  //Hide the tooltip
  $('.popover').each(function() {
    $(this).remove();
  })
  //Set opacity back to default for all
  svg.selectAll("path.chord")
    .transition()
    .style("opacity", opacityDefault);
  }      //function mouseoutChord