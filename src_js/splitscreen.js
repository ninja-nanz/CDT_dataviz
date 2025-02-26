var leftBuffer;
var rightBuffer;

function setup() {
    // 800 x 400 (double width to make room for each "sub-canvas")
    createCanvas(800, 400);
    // Create both of your off-screen graphics buffers
    leftBuffer = createGraphics(400, 400);
    rightBuffer = createGraphics(400, 400);
}

function draw() {
    // Draw on your buffers however you like
    drawLeftBuffer();
    drawRightBuffer();
    // Paint the off-screen buffers onto the main canvas
    image(leftBuffer, 0, 0);
    image(rightBuffer, 400, 0);
}

function drawLeftBuffer() {
    leftBuffer.background(0, 0, 0);
    leftBuffer.fill(255, 255, 255);
    leftBuffer.textSize(32);
    leftBuffer.text("This is the left buffer!", 50, 50);
}

function drawRightBuffer() {
    //rightBuffer.background(255, 100, 255);
    drawGrid()
}