var numEnemies = 25;
var radius = 5;
var width = 500;
var height = 400;

var enemies = [];
enemies.length = numEnemies;

var x = function () {
  return Math.random() * (width - 2 * radius);
};

var y = function () {
  return Math.random() * (height - 2 * radius);
};

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
  .attr('x', function (d, i) { return x(); })
  .attr('y', function (d, i) { return y(); });

// move enemies to random location every second
var stepEnemies = function () {
  enemies
    .transition()
      .duration(1000)
      .attr('x', function (d, i) { return x(); })
      .attr('y', function (d, i) { return y(); });

  setTimeout(stepEnemies, 1000);
};

stepEnemies();

// make draggable player element

// detect collisions

// track scoring

