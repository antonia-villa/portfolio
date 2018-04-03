var names = [ 'HTML',
              'Javascript',
              'CSS',
              'Node/Expresss',
              'React',
              'SQL',
              'MongoDB',
              'D3',
              'Recharts',
              'Cause of Death',
              'DreamState',
              'Visualize County Data',
              'Population Growth' ],
    colors = ['#6093BF',
              '#3C74A6',
              '#194973',
              '#5F9EA0',
              '#66CDAA',
              '#4B0082',
              '#D8BFD8',
              '#FF8200',
              '#F09F0D',
              '#333333',
              '#333333',
              '#333333',
              '#333333'],
    opacityDefault = 0.8;


var matrix = [ 
                [0,0,0,0,0,0,0,0,0,1,1,1,1],
                [0,0,0,0,0,0,0,0,0,1,1,1,1],
                [0,0,0,0,0,0,0,0,0,1,1,1,1],
                [0,0,0,0,0,0,0,0,0,0,1,1,0],
                [0,0,0,0,0,0,0,0,0,0,1,0,1],
                [0,0,0,0,0,0,0,0,0,0,1,1,0],
                [0,0,0,0,0,0,0,0,0,0,1,0,0],
                [0,0,0,0,0,0,0,0,0,1,0,1,1],
                [0,0,0,0,0,0,0,0,0,0,1,0,1],
                [1,1,1,0,0,0,0,1,0,0,0,0,0],
                [1,1,1,1,1,1,1,0,1,0,0,0,0],
                [1,1,1,1,0,1,0,1,0,0,0,0,0],
                [1,1,1,0,1,0,0,1,1,0,0,0,0]
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
var height = bbox.height - (bbox.height/15)
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
  

////////////////////////////////////////////////////////////
////////////////////// Append names ////////////////////////
////////////////////////////////////////////////////////////

// To append text to interior of chord for project names 
 outerArcs.append("text")
        .attr("x", 6)
        .attr("dy", -10)
        .attr("class", "projectLink")
        .attr("id", function(d, i) { 
              if(names[i]==='Cause of Death'){
                return 'project1';
              } else if (names[i]==='DreamState'){
                return 'project2';
              } else if (names[i]==='Visualize County Data'){
                return 'project3';
              } else if (names[i]==='Population Growth'){
                return 'project4';
              }
            })
      .append("textPath")
        .attr("xlink:href", function(d) { return "#group" + d.index; })
        .text(function(d, i){ if(names[i] === 'DreamState' || names[i] === 'Cause of Death' || names[i] === 'Visualize County Data' || names[i] === 'Population Growth') return names[i]; })
        .style("fill", "#616566")
        .style("font-size", "15px")
        .attr("startOffset", "20%")
        .style("text-anchor","middle")
        .on("mouseover", function(d) {
            d3.select(this).attr("r", 10)
            .style("fill", "black")
            .style("font-size", "20px")
            .style("font-weight", "bold")
            .style("cursor", "pointer")
          })                  
          .on("mouseout", function(d) {
            d3.select(this).style("font-size", "18px").style("fill", "#616566");
          });



//Append the label names on the outside
outerArcs.append("text")
  .each(function(d) { d.angle = (d.startAngle + d.endAngle) / 2; })
  .attr("dy", ".35em")
  .attr("class", "titles")
  .attr("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
  .attr("transform", function(d) {
    return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
    + "translate(" + (outerRadius + 10) + ")"
    + (d.angle > Math.PI ? "rotate(180)" : "");
  })
  .text(function(d,i) { if(names[i] != 'DreamState' && names[i] != 'Cause of Death' && names[i] != 'Visualize County Data' && names[i] != 'Population Growth') return names[i]; })
  .style("font-size", "12px")
  .style("fill", "#333333")
  .on("mouseover", function(d) {
    d3.select(this).attr("r", 10)
    .style("font-size", "18px")
    .style("font-weight", "bold")
  })
  .on("mouseout", function(d) {
    d3.select(this).style("font-size", "12px")
  });

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