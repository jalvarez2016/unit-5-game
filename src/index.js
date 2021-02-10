// const body = document.getElementById('body')
// const intro = document.getElementById('intro')
//  const buttonstart = document.createElement('button')
//  const instruction = document.createElement('button')
//  instruction.innerText = "INSTRUCTIONS"
//  intro.append(instruction)
//  buttonstart.innerText = "START GAME"
//  buttonstart.style.position = "center"
//  intro.append(buttonstart)
//  buttonstart.addEventListener('click', () => {
//    body.removeChild(intro)
//    body.append(instruction)
//  })
//  let introdiv = document.createElement('div')
 let ptag = document.createElement('p')
//  intro.append(introdiv)
//  introdiv.style.backgroundColor = "blue"
//  introdiv.append(ptag)
 ptag.innerHTML = `<h1 class="h1">Controls</h1>
 The controls are the arrow keys
 `
 ptag.classList.add('instruc')
//  instruction.addEventListener('click', () => {
//
// })

document.querySelector("body").addEventListener("click", document.querySelector("body").requestFullscreen);

const { Engine, Render, World, Bounds, Bodies, Body, Constraint, Composites, Composite, Events  } = Matter;

// // create engine
const engine = Engine.create(), world = engine.world;
const trackLength = window.innerWidth * 20;
// create renderer
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: screen.width,
    height: screen.height,
    wireframes: false,
    background: 'url("img/back2.jpg")',
    hasBounds : true,
    showCollisions: true,
    showPositions: true,
    showShadows: true,
  }
});
let instructioncontainer = document.createElement('div')

instructioncontainer.classList.add('container')
let resume = document.createElement('button')
let restart = document.createElement('button')
let controlpic = document.createElement('div')
restart.classList.add('resume')
resume.classList.add('resume')
restart.innerText = "Restart"
resume.innerHTML = `Resume`
controlpic.classList.add('controlpic')
controlpic.innerText = "hey yall"
  let instructionbtn = document.createElement('button')
  instructionbtn.classList.add('controls')
  instructionbtn.innerText = "Instructions"
  body.append(instructionbtn)
  instructioncontainer.append(ptag,resume,restart,controlpic)
  instructionbtn.addEventListener('click', (e) => {
    instructioncontainer.style.display = "block"
    body.append(instructioncontainer)
  })
  resume.addEventListener('click', (e) => {
    instructioncontainer.style.display = "none"
  })
console.log(render)

Engine.run(engine);

Render.run(render);
// const carBodynew = Bodies.rectangle(230, 640, 200, 90);
const underground = Bodies.rectangle(trackLength/2, screen.height + 890, trackLength + 40, 200, { isStatic: true })

// camline.render.setOpacity(0);
// camline.bodies.forEach(el => el.render.fillStyle = 'transparent');
// const finishLine = Composites.pyramid(trackLength - 400, 50, 8, 7, 0, 0, function(x, y) {
//   return Bodies.rectangle(x, y, 50, 50);
// });
const wall = Bodies.rectangle(0 + 15, screen.height/2, 60, screen.height, { isStatic: true });
const ground = Bodies.rectangle(0 + trackLength/2, screen.height -15, trackLength, 30, { isStatic: true })
wall.render.visible = false
ground.render.visible = true
const newCar = new Car(400, screen.height - 50,"../img/car-body.png", '../img/car-wheel.png')
console.log(newCar);
const newGas = new Gas(8090, screen.height - 70, "../img/gasicon.png");
console.log(newGas);
const newFinish = new FinishLine(trackLength, screen.height - 70, "../img/Finish.png");
// const newGame = new Game(newCar, window.innerWidth * 20, newGas);

World.add(world, [
  newGas.matter,
  newCar.car,
  underground,
  // walls back and ground
    //ground
  ground,
    //start
  wall,
    // Flage/Finish line
  newFinish.matter
  // finishLine
]);

underground.render.sprite = {
  texture: "../img/undergroundtexture.png",
  xScale: 40, yScale: 6.3, xOffset: 0.5, yOffset: 0.5
}
// newCar.car.bodies.push(camcircle);
// Composite.add(newCar.car, Constraint.create({
//   bodyA: newCar.car.bodies[0],
//   bodyB: camcircle,
//   length: 820,
//   render: {
//     visible: true
//   },
//   stiffness: 0.2
// }))

// console.log(finishLine);
// console.log(wall);
Events.on(engine, 'collisionActive', (event) => {
  newCar.checkCollision(event, newGas)
  newCar.checkCollision(event, newFinish);
//   const carIds = {};
//   car.bodies.forEach(element => carIds[element.id] = true);
//   const finishLineIds = {};
//   finishLine.bodies.forEach(element => finishLineIds[element.id] = true);
//   // console.log(event.pairs);
//   let pairs = event.pairs.filter(pair => {
//     if (carIds[pair.bodyA.id]  || carIds[pair.bodyB.id]) {
//       if (finishLineIds[pair.bodyA.id] || finishLineIds[pair.bodyB.id]) {
//         pair.bodyA.render.fillStyle = '#03fc2c';
//         pair.bodyB.render.fillStyle = '#03fc2c';
//         // console.log("You reached the end");
//       }
//     }
//   });

  // for (var i = 0; i < pairs.length; i++) {
  //   var pair = pairs[i];
  //   pair.bodyA.render.fillStyle = '#333';
  //   pair.bodyB.render.fillStyle = '#333';
  // }
  // event.pairs.forEach(function(obj){

  // });
});


// // get the centre of the viewport
// var viewportCentre = {
//   x: render.options.width * 0.5,
//   y: render.options.height * 0.5
// };

//     // make the world bounds a little bigger than the render bounds
    // world.bounds.min.x = -300;
    // world.bounds.min.y = -300;
    // world.bounds.max.x = 1100;
    // world.bounds.max.y = 900;


document.addEventListener('keydown', function(event) {
  const key = event.key;
  newCar.move(key);
  switch (event.key) {
    case "ArrowLeft":
      break;
    case "ArrowRight":

      break;
    // case "ArrowUp":
    //     // Up pressed
    //     break;
    // case "ArrowDown":
    //     // Down pressed
    //     break;
}
});

// let update = setInterval(()=>{
//   // camcircle.position.x = car.bodies[0].position.x + 800
//   Render.lookAt(render, camcircle, {
//     x: 400,
//     y: 900,
//   }, false)}, 1);
const initialWorldBounds = {
  max : {
    x: 1366,
    y: 780
  },
  min : {
    x: 0,
    y: 0
  }
}

let update = setInterval(()=>{
  // Render.lookAt(render, newCar.car.bodies[0], {
  //   x: 160,
  //   y: 900,
  // }, false)

  // Render.lookAt(render, newCar.car.bodies[0],{
  //        x: 160,
  //   y: 900,
  // }, false);

  // console.log(render);
  // render.bounds.min.x = newCar.car.bodies[0].bounds.min.x - 800 + newCar.car.bodies[0].position.x;
  // render.bounds.max.x = newCar.car.bodies[0].bounds.min.x - 800 + 2000 + newCar.car.bodies[0].position.x;

  
  render.bounds.min.x = 154 - 800 + newCar.car.bodies[0].position.x;
  render.bounds.max.x = 154 - 800 + 2500 + newCar.car.bodies[0].position.x;
  
  // console.log(newCar.car.bodies[0].bounds.min.y)
  render.bounds.min.y = 653 - 1760 + newCar.car.bodies[0].position.y;
  render.bounds.max.y = 653 - 1760 + 1200 + newCar.car.bodies[0].position.y;

  
  // render.bounds.min.x = newCar.car.bodies[0].position.x;
  // render.bounds.max.x = 500 + newCar.car.bodies[0].position.x;

  // render.bounds.min.x = newCar.car.bodies[0].position.y;
  // render.bounds.max.y = newCar.car.bodies[0].position.y;
}, 1);

console.log(render);
console.log(wall)
