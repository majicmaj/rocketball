const Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    // Composites = Matter.Composites,
    // Composite = Matter.Composite,
    Constraint = Matter.Constraint,
    Detector = Matter.Detector;

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
        friction: 0.2,
        render: {
            fillStyle: '#6a3',
            sprite: {
                texture: "grass.png",
                xScale: 0.3,
                yScale: 0.3
            }
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
    render.options.width / 2,
    render.options.height - 300,
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
        restitution: 1,
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
                xScale: 0.30,
                yScale: 0.30
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
let keysDown = {
}
document.body.onkeydown = function(e){
    e.preventDefault() // cancels default actions
    if (!keysDown[e.key.toLocaleLowerCase()]) {
        keysDown[e.key.toLocaleLowerCase()] = true
    }
    console.log(keysDown)
    return false; // cancels this function as well as default actions
}
// document.body.addEventListener('keydown', (e) => {
//     e.preventDefault() // cancels default actions
//     if (!keysDown[e.key.toLocaleLowerCase()]) {
//         keysDown[e.key.toLocaleLowerCase()] = true
//     }
//     console.log(keysDown)
//     return false; // cancels this function only
// })
document.body.addEventListener('keyup', (e) => {
    e.preventDefault() // cancels default actions
    keysDown[e.key.toLocaleLowerCase()] = false
    return false; // cancels this function only
})
let i = 1
setTimeout(() => {
    setInterval(() => { move() }, 10)
}, 3)

car.frontWheel.friction = 1
car.backWheel.friction = 1
car.canJump1 = true
car.canJump2 = false
move = () => {
    if (keysDown['d']) {
        if (car.frontWheel.angularVelocity < 0.6) {
            Body.setAngularVelocity(car.frontWheel, car.frontWheel.angularVelocity + Math.PI / 15)
            Body.setAngularVelocity(car.backWheel, car.frontWheel.angularVelocity + Math.PI / 15)
        }
    }
    if (keysDown['a']) {
        if (car.frontWheel.angularVelocity > -0.6) {
            Body.setAngularVelocity(car.frontWheel, car.frontWheel.angularVelocity - Math.PI / 15)
            Body.setAngularVelocity(car.backWheel, car.frontWheel.angularVelocity - Math.PI / 15)
        }
    }
    if (keysDown['e']) {
        Body.applyForce(
            car.body,
            { x: car.body.position.x-60, y: car.body.position.y-10 },
            { x: 0.003 * (Math.cos(car.body.angle)), y: 0.003 * (Math.sin(car.body.angle)) }
        )
    }
    if (keysDown['w']) {
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
            if (keysDown['a']) {
                Body.applyForce(
                    car.body,
                    { x: car.body.position.x, y: car.body.position.y },
                    { x: -0.05, y: -0.06 }
                )
                Body.setAngularVelocity(
                    car.body, -0.22
                )
            }
            else if (keysDown['d']) {
                Body.applyForce(
                    car.body,
                    { x: car.body.position.x, y: car.body.position.y },
                    { x: 0.08, y: -0 }
                )
                Body.setAngularVelocity(
                    car.body, 0.3
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

let board = document.createElement('DIV', {
    style: {
        width: '500px',
        height: '200px',
        background: 'rgba(0,0,0,0.3)'
    }
})