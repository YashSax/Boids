let flock

function setup() {
    createCanvas(windowWidth, windowHeight - 10);
    flock = new Flock(100, 50)
}

function draw() {
    background(255, 255, 255)
    flock.update()
    flock.render()
}
