const Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    // Composites = Matter.Composites,
    // Composite = Matter.Composite,
    Constraint = Matter.Constraint;

let engine = Engine.create();
document.body.style.margin = '0'
let render = Render.create({
    element: document.body,
    engine: engine,
    render: { fillStyle: 'red' },
    options: {
        width: 1920,
        height: 850,
        wireframes: false
    }
})
// setTimeout(() => { }, 1)

//Stadium
let bottomWall = Bodies.rectangle(
    render.options.width / 2,
    render.options.height,
    render.options.width,
    99,
    {
        isStatic: true,
        render: {
            fillStyle: '#6a3',
            strokeStyle: '#3a0',
            lineWidth: 2
        }
    }
)
let topWall = Bodies.rectangle(
    render.options.width / 2,
    0,
    render.options.width - 412,
    50,
    {
        isStatic: true,
        render: {
            fillStyle: '#999',
            strokeStyle: '#999',
            lineWidth: 2
        }
    }
)
var leftGoalBackWall = Bodies.rectangle(
    26,
    render.options.height - 176,
    50,
    250,
    {
        isStatic: true,
        render: {
            fillStyle: 'blue',
            strokeStyle: 'blue',
            lineWidth: 2
        }
    }
)
var leftGoalTopWall = Bodies.rectangle(
    100,
    render.options.height - 360,
    50,
    250,
    {
        isStatic: true,
        render: {
            fillStyle: 'blue',
            strokeStyle: 'blue',
            lineWidth: 2
        }
    }
)
Body.setAngle(leftGoalTopWall, 1)
var leftWall = Bodies.rectangle(
    206,
    render.options.height - 658,
    25,
    500,
    {
        isStatic: true,
        render: {
            fillStyle: '#999',
            strokeStyle: '#999',
            lineWidth: 2
        }
    }
)
var rightGoalBackWall = Bodies.rectangle(
    render.options.width - 26,
    render.options.height - 176,
    50,
    250,
    {
        isStatic: true,
        render: {
            fillStyle: 'orange',
            strokeStyle: 'orange',
            lineWidth: 2
        }
    }
)
var rightGoalTopWall = Bodies.rectangle(
    render.options.width - 100,
    render.options.height - 360,
    50,
    250,
    {
        isStatic: true,
        render: {
            fillStyle: 'orange',
            strokeStyle: 'orange',
            lineWidth: 2
        }
    }
)

Body.setAngle(rightGoalTopWall, -1)
var rightWall = Bodies.rectangle(
    render.options.width - 206,
    render.options.height - 658,
    25,
    500,
    {
        isStatic: true,
        render: {
            fillStyle: '#999',
            strokeStyle: '#999',
            lineWidth: 2
        }
    }
)
// Ball
var ball = Bodies.circle(
    render.options.width / 2 + 100,
    render.options.height - 100,
    40,
    {
        render: {
            fillStyle: '#999',
            sprite: {
                texture: "ball.png",
                xScale: 0.3,
                yScale: 0.3
            }
        },
        friction: 0.1,
        frictionAir: 0.01,
        restitution: 0.99,
        mass: 1
    }
);

// Car
var car = {}
car.body = Bodies.trapezoid(
    200,
    render.options.height - 100,
    100,
    20,
    0.2,
    {
        render: {
            fillStyle: 'blue',
            sprite: {
                texture: "car.png",
                xScale: 0.1,
                yScale: 0.1
            }
        }
    }
)
car.frontWheel = Bodies.circle(
    170,
    render.options.height - 100,
    14,
    {
        render: {
            fillStyle: '#000'
        }
    }
)
car.backWheel = Bodies.circle(
    230,
    render.options.height - 100,
    14,
    {
        render: {
            fillStyle: '#000'
        }
    }
)
car.frontAxis = Constraint.create(
    {
        bodyA: car.body,
        bodyB: car.frontWheel,
        pointA: { x: -40, y: 10 },
        length: 14,
        render: {
            strokeStyle: '#999',
            lineWidth: 0,
        }
    }
)
car.backAxis = Constraint.create(
    {
        bodyA: car.body,
        bodyB: car.backWheel,
        pointA: { x: 40, y: 10 },
        length: 14,
        render: {
            strokeStyle: '#999',
            lineWidth: 0,
        },
        angleB: 0
    }
)
// var options = {
//     bodyA: car,
//     pointA: { x: 30, y: 17 },
//     bodyB: wheel,
//     length: 0,
//     stiffness: 0
// }
// var carConstraint = Constraint.create(options)
World.add(engine.world, [
    bottomWall,
    topWall,
    leftGoalBackWall,
    leftWall,
    leftGoalTopWall,
    rightGoalBackWall,
    rightWall,
    rightGoalTopWall,
    ball,
    car.frontWheel,
    car.backWheel,
    car.frontAxis,
    car.backAxis,
    car.body,
]);

Engine.run(engine);
Render.run(render);
// Controls
// Using an array to handle multiple keys being pressed
let keysDown = []
document.body.addEventListener('keydown', (e) => {
    if (!keysDown.includes(e.key.toLocaleLowerCase())) {
        keysDown.push(e.key.toLocaleLowerCase())
    }
    console.log(keysDown)
    move()
})
document.body.addEventListener('keyup', (e) => {
    keysDown.splice(keysDown.indexOf(e.key.toLocaleLowerCase))
})
car.frontWheel.friction = 1
car.backWheel.friction = 1
car.canJump1 = true
car.canJump2 = false
move = () => {
    if (keysDown.includes('d')) {
        if (car.frontWheel.angularVelocity < 1) {
            Body.setAngularVelocity(car.frontWheel, car.frontWheel.angularVelocity + Math.PI / 10)
            Body.setAngularVelocity(car.backWheel, car.frontWheel.angularVelocity + Math.PI / 10)
        }
    }
    if (keysDown.includes('a')) {
        if (car.frontWheel.angularVelocity > -1) {
            Body.setAngularVelocity(car.frontWheel, car.frontWheel.angularVelocity - Math.PI / 10)
            Body.setAngularVelocity(car.backWheel, car.frontWheel.angularVelocity - Math.PI / 10)
        }
    }
    if (keysDown.includes(' ')) {
        Body.applyForce(
            car.body,
            { x: car.body.position.x, y: car.body.position.y },
            { x: 0.015 * (Math.cos(car.body.angle)), y: 0.015 * (Math.sin(car.body.angle)) }
        )
    }
    if (keysDown.includes('w')) {
        keysDown.splice(keysDown.indexOf('w'))
        if (car.canJump1) {
            Body.applyForce(
                car.body,
                { x: car.body.position.x, y: car.body.position.y },
                { x: 0, y: -0.07 }
            )
            car.canJump1 = false
            car.canJump2 = true
            setTimeout(() => { car.canJump1 = true, car.canJump2 = false }, 2000)
        }
        else if (car.canJump2) {
            if (keysDown.includes('a')) {
                Body.applyForce(
                    car.body,
                    { x: car.body.position.x, y: car.body.position.y },
                    { x: -0.05, y: -0.02 }
                )
                Body.setAngularVelocity(
                    car.body, -0.22
                )
            }
            else if (keysDown.includes('d')) {
                Body.applyForce(
                    car.body,
                    { x: car.body.position.x, y: car.body.position.y },
                    { x: 0.05, y: -0.02 }
                )
                Body.setAngularVelocity(
                    car.body, 0.22
                )
            }
            else {
                Body.applyForce(
                    car.body,
                    { x: car.body.position.x, y: car.body.position.y },
                    { x: 0, y: -0.05 }
                )
            }
            car.canJump2 = false
        }
    }
}
// Change background image to very awesome rocket league bg
render.canvas.style.background = 'URL(background.jpg)'








// var topWall = Bodies.rectangle(frameWidth / 2, 50, frameWidth, wallThickness, { isStatic: true });
// var leftWall = Bodies.rectangle(50, frameHeight / 2, wallThickness, frameHeight, { isStatic: true });
// var rightWall = Bodies.rectangle(frameWidth - 50, frameHeight / 2, wallThickness, frameHeight, { isStatic: true });
// var bottomWall = Bodies.rectangle(frameWidth / 2, frameHeight - 50, frameWidth, wallThickness, { isStatic: true });

// // Ball
// var ball = Bodies.circle(150, 280, 30, {
//     render: {
//         sprite: {
//             texture: "https://opengameart.org/sites/default/files/styles/medium/public/SoccerBall_0.png",
//             xScale: 0.6,
//             yScale: 0.6
//         }
//     }
// });
// ball.friction = 0.03;
// ball.frictionAir = 0.001;
// ball.restitution = 0.7;
// // Car
// var car = Bodies.rectangle(190, 280, 80, 20)
// car.friction = 0.001;
// car.frictionAir = 0.001;
// car.restitution = 0

// World.add(engine.world, [topWall, leftWall, rightWall, bottomWall, ball, car]);

// Engine.run(engine);

// Render.run(render);
// var controller = document.createElement('INPUT')
// document.body.appendChild(controller)
// controller.style.width = '100%'
// controller.style.height = '200px'
// controller.style.display = 'block'
// car.canjump1 = true
// car.canjump2 = false
// controller.keys = []
// car.move = () => {
//     if ((controller.keys.includes('w') || controller.keys.includes(' '))) {
//         if (car.position.y > 620 && car.canjump1) {
//             Body.applyForce(
//                 car,
//                 { x: car.position.x, y: car.position.y },
//                 { x: 0, y: -0.03 }
//             )

//             controller.keys.splice(controller.keys.indexOf('w'))
//             controller.keys.splice(controller.keys.indexOf(' '))
//             car.canjump1 = false
//             car.canjump2 = true
//             setTimeout(() => {
//                 car.canjump1 = true
//                 car.canjump2 = false
//             }, 500)
//         }
//         else if (car.canjump2) {
//             car.canjump2 = false
//             if (controller.keys.includes('a')) {
//                 Body.applyForce(
//                     car,
//                     { x: car.position.x, y: car.position.y },
//                     { x: -0.01 * gravity, y: -0.01 * gravity }
//                 )
//                 Body.setAngularVelocity(car, -1 * Math.PI / 30);
//                 if (!controller.keys.includes('a')) {
//                     controller.keys.push('a')
//                 }
//             }
//             else if (controller.keys.includes('d')) {
//                 Body.applyForce(
//                     car,
//                     { x: car.position.x, y: car.position.y },
//                     { x: 0.01 * gravity, y: -0.01 * gravity }
//                 )
//                 Body.setAngularVelocity(car, Math.PI / 30);
//                 if (!controller.keys.includes('d')) {
//                     controller.keys.push('d')
//                 }
//             }
//             else {
//                 Body.applyForce(
//                     car,
//                     { x: car.position.x, y: car.position.y },
//                     { x: 0, y: -0.02 * gravity }
//                 )
//             }
//         }
//     }
//     else if (controller.keys.includes('a')) {
//         // Body.applyForce(
//         //     car,
//         //     { x: car.position.x, y: car.position.y },
//         //     { x: (-0.0005 * carSpeed) * Math.cos(car.angle), y: (-0.0005 * carSpeed) * Math.sin(car.angle) }
//         // )
//         if (car.velocity.x < maxSpeed) {
//             Body.setVelocity(
//                 car, { x: car.velocity.x - (acceleration * Math.cos(car.angle)), y: car.velocity.y }
//             )
//         }
//     }
//     else if (controller.keys.includes('d')) {
//         // Body.applyForce(
//         //     car,
//         //     { x: car.position.x, y: car.position.y },
//         //     { x: (0.0005 * carSpeed) * Math.cos(car.angle), y: (0.0005 * carSpeed) * Math.sin(car.angle) }
//         // )
//         if (-car.velocity.x < maxSpeed) {
//             Body.setVelocity(
//                 car, { x: car.velocity.x + (acceleration * Math.cos(car.angle)), y: car.velocity.y }
//             )
//         }
//     }
// }
// controller.addEventListener('keydown', (e) => {
//     controller.keys.push(e.key)
//     console.log(controller.keys)
//     car.move()
// })
// controller.addEventListener('keyup', (e) => {
//     controller.keys.splice(controller.keys.indexOf(e.key))
//     console.log(controller.keys)
// })
// // Body.applyForce(car, 
// //     {x:car.position.x, y: car.position.y},
// //     {x: -0.05, y: 0}
// //     )

// var leftButt = document.createElement('BUTTON')
// leftButt.innerText = 'left'
// document.body.appendChild(leftButt)
// leftButt.addEventListener('click', () => {
//     Body.applyForce(
//         car,
//         { x: ball.position.x, y: ball.position.y },
//         { x: -0.04, y: 0 }
//     )
// })
// var rightButt = document.createElement('BUTTON')
// rightButt.innerText = 'right'
// document.body.appendChild(rightButt)
// rightButt.addEventListener('click', () => {
//     Body.applyForce(
//         car,
//         { x: ball.position.x, y: ball.position.y },
//         { x: 0.04, y: 0 }
//     )
// })
// // $(".force").on("click", function () {
// //     Body.applyForce(
// //         ball,
// //         { x: ball.position.x, y: ball.position.y },
// //         { x: 0.04, y: 0 }
// //     );
// // });

// // $(".vforce").on("click", function () {
// //     Body.applyForce(
// //         ball,
// //         { x: ball.position.x, y: ball.position.y },
// //         { x: 0, y: -0.04 }
// //     );
// // });

// // $(".red-friction").on("click", function () {
// //     ball.friction = 0.05;
// //     ball.frictionAir = 0.0005;
// //     ball.restitution = 0.9;
// // });

// // $(".res-friction").on("click", function () {
// //     ball.friction = 0.1;
// //     ball.frictionAir = 0.001;
// //     ball.restitution = 0;
// // });
