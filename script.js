var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body;

var engine = Engine.create();

var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 800,
        height: 400,
        wireframes: false
    }
});

var topWall = Bodies.rectangle(400, 50, 720, 20, { isStatic: true });
var leftWall = Bodies.rectangle(50, 210, 20, 300, { isStatic: true });
var rightWall = Bodies.rectangle(750, 210, 20, 300, { isStatic: true });
var bottomWall = Bodies.rectangle(400, 350, 720, 20, { isStatic: true });

// Ball
var ball = Bodies.circle(90, 280, 20, {
    render: {
        sprite: {
            texture: "https://opengameart.org/sites/default/files/styles/medium/public/SoccerBall_0.png",
            xScale: 0.4,
            yScale: 0.4
        }
    }
});
ball.friction = 0.05;
ball.frictionAir = 0.0005;
ball.restitution = 0.9;
// Car
var car = Bodies.rectangle(130, 280, 80, 20)

World.add(engine.world, [topWall, leftWall, rightWall, bottomWall, ball, car]);

Engine.run(engine);

Render.run(render);
var controller = document.createElement('INPUT')
document.body.appendChild(controller)
controller.style.width = '500px'
controller.style.height = '200px'
controller.style.display = 'block'
car.canjump1 = true
car.canjump2 = false
controller.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
            if (car.canjump1) {
                car.canjump1 = false
                car.canjump2 = true
                Body.applyForce(car,
                    { x: car.position.x, y: car.position.y },
                    { x: 0, y: -0.04 }
                )
                setTimeout(() => { car.canjump1 = true; car.canjump2 = false }, 1000)
            }
            else if (car.canjump2) {
                Body.applyForce(car,
                    { x: car.position.x, y: car.position.y },
                    { x: 0, y: -0.02 }
                )
                Body.setAngularVelocity(car, Math.PI / 24);
                car.canjump2 = false
            }

            break;
        case 'a':
            Body.applyForce(car,
                { x: car.position.x, y: car.position.y },
                { x: -0.01, y: 0 }
            )
            break;
        case 'd':
            Body.applyForce(car,
                { x: car.position.x, y: car.position.y },
                { x: 0.01, y: 0 }
            )
            break;

        default:
            break;
    }
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
