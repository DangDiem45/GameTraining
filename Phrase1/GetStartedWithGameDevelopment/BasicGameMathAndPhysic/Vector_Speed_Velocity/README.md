# Vectors, Speed, and Velocity in Animation
In this project, vectors are used to represent the positions and velocities of circles on the canvas. The movement and behavior of these circles are controlled using vectors, which allow for more flexible and realistic simulations.

## Vector Class:
A vector is a mathematical object that has both a magnitude and a direction. In this code, the Vector class is used to handle the position and velocity of the circles. It supports operations like:

Addition: Adding two vectors to combine their directions and magnitudes. For example, the position of the circle is updated by adding its velocity vector to its current position.
Scaling: Multiplying a vector by a scalar value, which changes the magnitude but keeps the direction the same.
Magnitude: The length of the vector, calculated using the Pythagorean theorem.
Normalization: Converting a vector to a unit vector, where its magnitude becomes 1. This is useful for ensuring consistent movement speed in certain cases.
## Velocity:
Velocity is a vector that describes both the speed and direction of an object. In the code, each circle has a velocity vector that dictates how fast and in which direction the circle moves.
The player-controlled red circle’s velocity is updated based on user input (arrow keys). For example, pressing the "ArrowUp" key adds a downward velocity to the circle, causing it to move upwards.
## Speed:
Speed is the magnitude of the velocity vector, which indicates how fast the object is moving, regardless of its direction.
In this code, speed can be derived from the velocity vector using the .magnitude() method.
## Movement Logic:
The Circle class uses the velocity vector to update its position. The position of each circle is recalculated each frame by adding the velocity to the current position.
If a circle hits the edge of the canvas, its velocity is inverted (i.e., the direction of movement changes), causing the circle to bounce off the wall.