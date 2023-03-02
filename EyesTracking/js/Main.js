var eyes = new Eyes(750, 250);
var mouse_position = new p5.Vector(0, 0);
var eyesGenerator = {
    from: 0,
    to: 100,

    *[Symbol.iterator]() {
        for(let index = this.from;index < this.to;index++) {
            yield new Eye(0, 0);
        }
    }
};

var many_eyes = [...eyesGenerator];
var timer;

function setup()
{
    createCanvas(windowWidth, windowHeight);
    /*
    many_eyes.forEach((eye) => {
        var vector = new p5.Vector(0, 0, 0);
        vector.x = random(50, 1400);
        vector.y = random(50, 650);
        vector.z = int(random(1, 5));
        eye.position = vector;
    });*/
    timer = new Timer(1000);
    timer.start();
}

function draw()
{
    background(128, 217, 108);

    eyes.draw((timer.getRemainingTime() % 10) == eyes.period);
    /*
    many_eyes.forEach((eye) => {
        eye.draw((timer.getRemainingTime() % 10) == eye.period);
    });*/

    if (timer.expired()) {
        timer.start();
    }
}

function mouseMoved()
{
    mouse_position.x = mouseX;
    mouse_position.y = mouseY;

    eyes.track(mouse_position);
    /*
    many_eyes.forEach((eye) => {
        eye.track(mouse_position);
    });
    */

    return false;
}
