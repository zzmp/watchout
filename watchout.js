var numEnemies = 25;
var radius = 5;
var width = 500;
var height = 400;

var enemies = [];
enemies.length = numEnemies;

// create svg element
d3.select('body').append('svg')
  .attr('width', width)
  .attr('height', height);

// initialize enemies within svg element
enemies = d3.select('svg').selectAll('circle')
  .data(enemies) // no key function necessary
  .enter()
  .append('image')
  .classed('enemy', true)
  .attr('xlink:href', 'file:///Users/zmp/Hack\ Reactor/d3/asteroid.png')
  .attr('width', radius * 2)
  .attr('height', radius * 2)
  .attr('x', function (d, i) { return radius + Math.random() * (width - 2 * radius); })
  .attr('y', function (d, i) { return radius + Math.random() * (height - 2 * radius); });

// move enemies to random location every second

// make draggable player element

// detect collisions

// track scoring

