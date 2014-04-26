var scorerId;
var score = 0;
var hiScore = 0;
var numCollisions = 0;

var nodeScore = d3.select('.current > span');
var nodeHiScr = d3.select('.high > span');
var nodeColls = d3.select('.collisions > span');

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
var svg = d3.select('body').append('svg')
  .attr('width', width)
  .attr('height', height);

// initialize enemies within svg element
enemies = svg.selectAll('circle')
  .data(enemies) // no key function necessary
  .enter()
  .append('image')
  .classed('enemy', true)
  .attr('xlink:href', 'file:///Users/zmp/Hack\ Reactor/d3/asteroid.png')
  .attr('width', 0)
  .attr('height', 0)
  .attr('x', function (d, i) { return x() + radius; })
  .attr('y', function (d, i) { return y() + radius; });

enemies
  .transition()
    .duration(1000)
    .attr('width', radius * 2)
    .attr('height', radius * 2)
    .attr('x', function (d, i) { return d3.select(this).attr('x') - radius; })
    .attr('y', function (d, i) { return d3.select(this).attr('y') - radius; });

// move enemies to random location every second
var stepEnemies = function () {
  enemies
    .transition()
      .duration(2000)
      // detect collisions on tweening
      .tween('collisionDetection', function () {
	var x0 = d3.select(this).attr('x');
	var y0 = d3.select(this).attr('y');

	var ix = d3.interpolate(x0, x());
	var iy = d3.interpolate(y0, y());
	
	return function (t) {
	  var x = ix(t);
	  var y = iy(t);

	  d3.select(this).attr('x', x);
	  d3.select(this).attr('y', y);

	  isCollided(x, y);
	};
      });
	  
  setTimeout(stepEnemies, 2000);
};

// initialize player within svg element
var player = svg.selectAll('circle')
  .data([null])
  .enter()
  .append('circle')
  .classed('player', true)
  .attr('r', radius)
  .attr('cx', width / 2)
  .attr('cy', width / 2);

var dragPlayer = d3.behavior.drag()
  .on('drag', function () {
    var x = +player.attr('cx') + d3.event.dx;
    var y = +player.attr('cy') + d3.event.dy;

    x = x < radius / 2 ? radius / 2 : x;
    x = x > width - radius / 2 ? width - radius / 2 : x;
    y = y < radius / 2 ? radius / 2 : y;
    y = y > height - radius / 2 ? height - radius / 2 : y;

    player.attr('cx', x);
    player.attr('cy', y);

    enemies.each( function () {
      var x = d3.select(this).attr('x');
      var y = d3.select(this).attr('y');
      
      isCollided(x, y);
    });
  });

// give player draggable behavior
player.call(dragPlayer);

// basic collision detection (invoked in tweening)
var isCollided = function (x, y) {
  var dx = +player.attr('cx') - x - radius;
  var dy = +player.attr('cy') - y - radius;

  if (dx * dx + dy * dy < radius * radius) {
    recordCollision();
  }
};

// scoring functions
var recordCollision = function () {
  numCollisions++;
  nodeColls.text(numCollisions);
  restart();
};

var updateScore = function () {
  score++;
  hiScore = score > hiScore ? score : hiScore;
  nodeScore.text(score);
  nodeHiScr.text(hiScore);
};

var restart = function() {
  scorerId && clearInterval(scorerId);
  score = 0;
  nodeScore.text(score);
  scorerId = setInterval(updateScore, 50);
}

// start the game
restart();

// delay start to avoid overwriting first transition
setTimeout(stepEnemies, 1000);
