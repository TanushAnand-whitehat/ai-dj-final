sound = "" ;
function preload() {
    sound = loadSound("music.mp3");
}

scoreLeftWrist = 0;
scoreRightWrist = 0;
rightWristx = 0;
rightWristy = 0;
leftWristx = 0;
leftWristy = 0;

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("Model has loaded");
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);
        rightWristx = results[0].pose.rightWrist.x;
        rightWristy = results[0].pose.rightWrist.y;
        leftWristx = results[0].pose.leftWrist.x;
        leftWristy = results[0].pose.leftWrist.y;
        console.log("Right Wrist X = " + rightWristx + "Right Wrist Y = " + rightWristy);
        console.log("Left Wrist X = " + leftWristx + "Left Wrist Y = " + leftWristy);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score
    }
    
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("red");
    stroke("red");

    if(scoreLeftWrist > 0.1) {
        circle(leftWristx, leftWristy, 10);
        NumberLeftY = Number(leftWristy);
        LeftYFloor = floor(NumberLeftY)
        volume = LeftYFloor/500;
        document.getElementById("volume").innerHTML = "Volume = " + volume;
        sound.setVolume(volume);

    if(scoreRightWrist > 0.2) {
        circle(rightWristx, rightWristy, 10);
        if(rightWristy > 0 && rightWristy <= 100) {
            document.getElementById("speed").innerHTML = "Speed = 0.5x";
            sound.rate(0.5);
        }
        else if(rightWristy > 100 && rightWristy <= 200) {
            document.getElementById("speed").innerHTML = "Speed = 1x";
            sound.rate(1);
    }
    else if(rightWristy > 200 && rightWristy <= 300) {
        document.getElementById("speed").innerHTML = "Speed = 1.5x";
        sound.rate(1.5);
    }
    else if(rightWristy > 300 && rightWristy <= 400) {
        document.getElementById("speed").innerHTML = "Speed = 2x";
        sound.rate(2);
}
else if(rightWristy > 400 && rightWristy <= 500) {
    document.getElementById("speed").innerHTML = "Speed = 2.5x";
    sound.rate(2.5);
}
}
    } 
}

function play() {
    sound.play();
    sound.setVolume(1);
    sound.rate(1);
}