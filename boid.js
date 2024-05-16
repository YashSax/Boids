class Flock {
    constructor(numBoids, neighborRadius) {
        this.numBoids = numBoids;
        this.neighborRadius = neighborRadius
        this.boids = []

        for (let i = 0; i < numBoids; i++) {
            let xPos = Math.random() * windowWidth
            let yPos = Math.random() * windowHeight
            let orientation = Math.random() * 2 * PI
            this.boids.push(new Boid(xPos, yPos, orientation))
        }
    }

    update() {
        this.boids.forEach((b1) => {
            let neighbors = []
            this.boids.forEach((b2) => {
                if (p5.Vector.sub(b2.position, b1.position).mag() < this.neighborRadius) {
                    neighbors.push(b2)
                }
            })
            b1.update(neighbors)
        })
    }

    render() {
        this.boids.forEach((b) => { b.render() })
    }
}

class Boid {
    constructor(xPos, yPos, orientation) {
        this.orientation = orientation;
        this.position = createVector(xPos, yPos)
        this.velocity = createVector(Math.cos(this.orientation), Math.sin(orientation))
    }

    update(neighbors) {
        if (this.position.x < -20) {
            this.position.x = windowWidth + 20
        }
        if (this.position.x > windowWidth + 20) {
            this.position.x = -20
        }
        if (this.position.y < -20) {
            this.position.y = windowHeight + 20
        }
        if (this.position.y > windowHeight + 20) {
            this.position.y = -20
        }

        // Separation
        let separationVector = createVector(0, 0)
        neighbors.forEach((n) => {
            separationVector.add(p5.Vector.sub(this.position, n.position))
        })
        separationVector.normalize()

        
        // Alignment
        let alignmentVector = createVector(0, 0)
        neighbors.forEach((n) => {
            alignmentVector.add(n.velocity)
        })
        alignmentVector.normalize()

        // Cohesion
        let averagePosition = createVector(0, 0)
        neighbors.forEach((n) => {
            averagePosition.add(n.position)
        })
        let cohesionVector = p5.Vector.sub(averagePosition, this.position)
        cohesionVector.normalize()
        
        let separationCoeff = 1
        let alignmentCoeff = 1
        let cohesionCoeff = 1
        let momentum = 1
        let speed = 3

        this.velocity.mult(momentum)
        this.velocity.add(separationVector.mult(separationCoeff))
        this.velocity.add(alignmentVector.mult(alignmentCoeff))
        this.velocity.add(cohesionVector.mult(cohesionCoeff))

        this.velocity.normalize()
        this.position.add(this.velocity.mult(speed))
        this.orientation = this.velocity.heading()
    }

    render() {
        push()
        translate(this.position.x, this.position.y)
        rotate(this.orientation)
        fill(255, 255, 255)
        triangle(10, 0, -10, -7, -10, 7)
        pop()
    }
}