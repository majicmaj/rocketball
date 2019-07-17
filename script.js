const Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body;

let engine = Engine.create();

let gameWindow = document.createElement('DIV')
document.body.appendChild(gameWindow)
gameWindow.style.width = '100%'
gameWindow.style.height = '100vh'
gameWindow.style.border = '1px solid grey'
let render = Render.create({
    element: gameWindow,
    engine: engine,
    options: {
        width: 1400,
        height: 700,
        wireframes: false
    }
});
//Stadium
var topWall = Bodies.rectangle(frameWidth / 2, 50, frameWidth, wallThickness, { isStatic: true });
var leftWall = Bodies.rectangle(50, frameHeight / 2, wallThickness, frameHeight, { isStatic: true });
var rightWall = Bodies.rectangle(frameWidth - 50, frameHeight / 2, wallThickness, frameHeight, { isStatic: true });
var bottomWall = Bodies.rectangle(frameWidth / 2, frameHeight - 50, frameWidth, wallThickness, { isStatic: true });

// Ball
var ball = Bodies.circle(150, 280, 30, {
    render: {
        sprite: {
            texture: "https://opengameart.org/sites/default/files/styles/medium/public/SoccerBall_0.png",
            xScale: 0.6,
            yScale: 0.6
        }
    }
});
ball.friction = 0.03;
ball.frictionAir = 0.001;
ball.restitution = 0.7;
// Car
var car = Bodies.rectangle(190, 280, 80, 20)
car.friction = 0.001;
car.frictionAir = 0.001;
car.restitution = 0

World.add(engine.world, [topWall, leftWall, rightWall, bottomWall, ball, car]);

Engine.run(engine);

Render.run(render);
var controller = document.createElement('INPUT')
document.body.appendChild(controller)
controller.style.width = '100%'
controller.style.height = '200px'
controller.style.display = 'block'
car.canjump1 = true
car.canjump2 = false
controller.keys = []
car.move = () => {
    if ((controller.keys.includes('w') || controller.keys.includes(' '))) {
        if (car.position.y > 620 && car.canjump1) {
            Body.applyForce(
                car,
                { x: car.position.x, y: car.position.y },
                { x: 0, y: -0.03 }
            )

            controller.keys.splice(controller.keys.indexOf('w'))
            controller.keys.splice(controller.keys.indexOf(' '))
            car.canjump1 = false
            car.canjump2 = true
            setTimeout(() => {
                car.canjump1 = true
                car.canjump2 = false
            }, 500)
        }
        else if (car.canjump2) {
            car.canjump2 = false
            if (controller.keys.includes('a')) {
                Body.applyForce(
                    car,
                    { x: car.position.x, y: car.position.y },
                    { x: -0.01 * gravity, y: -0.01 * gravity }
                )
                Body.setAngularVelocity(car, -1 * Math.PI / 30);
                if (!controller.keys.includes('a')) {
                    controller.keys.push('a')
                }
            }
            else if (controller.keys.includes('d')) {
                Body.applyForce(
                    car,
                    { x: car.position.x, y: car.position.y },
                    { x: 0.01 * gravity, y: -0.01 * gravity }
                )
                Body.setAngularVelocity(car, Math.PI / 30);
                if (!controller.keys.includes('d')) {
                    controller.keys.push('d')
                }
            }
            else {
                Body.applyForce(
                    car,
                    { x: car.position.x, y: car.position.y },
                    { x: 0, y: -0.02 * gravity }
                )
            }
        }
    }
    else if (controller.keys.includes('a')) {
        // Body.applyForce(
        //     car,
        //     { x: car.position.x, y: car.position.y },
        //     { x: (-0.0005 * carSpeed) * Math.cos(car.angle), y: (-0.0005 * carSpeed) * Math.sin(car.angle) }
        // )
        if (car.velocity.x < maxSpeed) {
            Body.setVelocity(
                car, { x: car.velocity.x - (acceleration * Math.cos(car.angle)), y: car.velocity.y }
            )
        }
    }
    else if (controller.keys.includes('d')) {
        // Body.applyForce(
        //     car,
        //     { x: car.position.x, y: car.position.y },
        //     { x: (0.0005 * carSpeed) * Math.cos(car.angle), y: (0.0005 * carSpeed) * Math.sin(car.angle) }
        // )
        if (-car.velocity.x < maxSpeed) {
            Body.setVelocity(
                car, { x: car.velocity.x + (acceleration * Math.cos(car.angle)), y: car.velocity.y }
            )
        }
    }
}
controller.addEventListener('keydown', (e) => {
    controller.keys.push(e.key)
    console.log(controller.keys)
    car.move()
})
controller.addEventListener('keyup', (e) => {
    controller.keys.splice(controller.keys.indexOf(e.key))
    console.log(controller.keys)
})
// Body.applyForce(car, 
//     {x:car.position.x, y: car.position.y},
//     {x: -0.05, y: 0}
//     )

var leftButt = document.createElement('BUTTON')
leftButt.innerText = 'left'
document.body.appendChild(leftButt)
leftButt.addEventListener('click', () => {
    Body.applyForce(
        car,
        { x: ball.position.x, y: ball.position.y },
        { x: -0.04, y: 0 }
    )
})
var rightButt = document.createElement('BUTTON')
rightButt.innerText = 'right'
document.body.appendChild(rightButt)
rightButt.addEventListener('click', () => {
    Body.applyForce(
        car,
        { x: ball.position.x, y: ball.position.y },
        { x: 0.04, y: 0 }
    )
})
// $(".force").on("click", function () {
//     Body.applyForce(
//         ball,
//         { x: ball.position.x, y: ball.position.y },
//         { x: 0.04, y: 0 }
//     );
// });

// $(".vforce").on("click", function () {
//     Body.applyForce(
//         ball,
//         { x: ball.position.x, y: ball.position.y },
//         { x: 0, y: -0.04 }
//     );
// });

// $(".red-friction").on("click", function () {
//     ball.friction = 0.05;
//     ball.frictionAir = 0.0005;
//     ball.restitution = 0.9;
// });

// $(".res-friction").on("click", function () {
//     ball.friction = 0.1;
//     ball.frictionAir = 0.001;
//     ball.restitution = 0;
// });
