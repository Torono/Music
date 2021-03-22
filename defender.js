const canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
myAudio = new Audio('music.mp3'); 
if (typeof myAudio.loop == 'boolean')
{
    myAudio.loop = true;
}
else
{
    myAudio.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
}
myAudio.play();
let number = 0;
let start = 0;
let lives = 5;
let x = 175;
let y = 100;
let text = 'Press Space To Start';
let maxVolley = 0;
let volley = 0;
let pVerify = 0;
let p = 0;
let c = 0;
let colors = ['#0000FF', '#800080', '#D4AF37'];
let color = '#000000';
let color2 = '#000000';
let num = 0;
let time = 0;
let counter = 0;
let dot1 = [-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6];
let dot2 = [1,2,3,4,5,6];
let dot3 = [-6,-5,-4,-3,-2,-1];
let wall = {
    x: 0,
    y: 500,
    height: 100,
    width: 600
}
let dot = {
    x: 300,
    y: 1,
    speed: 0,
    height: 10,
    width: 10,
    maxSpeed: 0,
    speedX: 0
}
let square = {
    x: 260,
    y: 450,
    speed: 0,
    height: 10,
    width: 100,
    maxSpeed: 8
};
function animate() {
    ctx.clearRect(0,0,600,600);
    ctx.fillStyle = '#000000';
    ctx.fillRect(square.x,square.y,square.width,square.height);
    ctx.fillStyle = color;
    ctx.fillRect(dot.x,dot.y,dot.width,dot.height);
    ctx.fillStyle = '#808080';
    ctx.fillRect(wall.x,wall.y,wall.width,wall.height);
    ctx.font = '30px arial';
    ctx.fillStyle = (color2);
    ctx.fillText(text, x, y);
    square.x += square.speed;
    dot.y += dot.speed;
    dot.x += dot.speedX;
    if (square.x >= 600 - square.width) {
        square.x = 600 - square.width;
    }
    if (square.x <= 0) {
        square.x = 0;
    }
    if (dot.x <= 0) {
        dot.speedX = dot2[Math.floor(dot2.length * Math.random())];
    }
    if (dot.x >= 590) {
        dot.speedX = dot3[Math.floor(dot3.length * Math.random())];
    }
    if (dot.x >= square.x && dot.x <= square.x + square.width && dot.y >= square.y && dot.y <= square.y + square.height) {
        dot.speed = -dot.maxSpeed;
        volley = volley + 1;
        if (dot.speedX > 0){
            dot.speedX = dot2[Math.floor(dot2.length * Math.random())];
        } else if (dot.speedX < 0) {
            dot3[Math.floor(dot3.length * Math.random())];
        } else {
        dot.speedX = dot1[Math.floor(dot1.length * Math.random())];
        }
        if (color == '#D4AF37') {
            c = 1;
            dot.maxSpeed = 2;
            color = '#000000';
            setTimeout(reset2, 5000);
        }
        if (color == '#0000FF') {
            square.width = 200;
            color = '#000000';
            setTimeout(reset, 5000);
        }
        if (color == '#800080') {
            c = 1;
            square.maxSpeed = 15;
            color = '#000000';
            setTimeout(reset, 5000);
        }
    }
    if (dot.y <= 0) {
        dot.speed = dot.maxSpeed;
        dot.y = 1;
        if (dot.speedX > 0){
            dot.speedX = dot2[Math.floor(dot2.length * Math.random())];
        } else if (dot.speedX < 0) {
            dot3[Math.floor(dot3.length * Math.random())];
        } else {
        dot.speedX = dot1[Math.floor(dot1.length * Math.random())];
        }
        if (pVerify == 1) {
            pVerify = 0;
            color = colors[Math.floor(colors.length * Math.random())];
        }
    }
    if (dot.y >= wall.y) {
        dot.maxSpeed = 6;
        square.maxspeed = 8;
        dot.y = -10;
        dot.x = 290;
        square.x = 250;
        if (volley > maxVolley) {
            maxVolley = volley;
        }
        volley = 0;
        dot.speedX = 0;
        wallDamage();
    }
    if (wall.height == 0) {
        number = 1;
        x = 25;
        y = 50;
        myAudio.pause();
        myAudio.currentTime = 0;
        text = ('Points: ' + maxVolley)        
        dot.y = -10;
        dot.maxSpeed = 0; 
        } else {
            myAudio.play();
        }
    if (dot.maxSpeed == 15) {
        dot.maxSpeed = 15;
        square.maxSpeed = 12;
    }

    if (time == counter + 10) {
        counter = time;
        if (c == 0) {
        dot.maxSpeed = dot.maxSpeed + 1.5;
        square.maxSpeed = square.maxSpeed + 0.5;
        }
    }
    requestAnimationFrame(animate);
}
function liveCount() {
    if (number == 0) {
        text = ('Lives: ' + lives);
    }
    requestAnimationFrame(liveCount);
}
function pUp() {
    if (p == 1) {
    num = Math.floor(Math.random() * Math.floor(6));
        if (num == 3) {
            pVerify = 1;
        }
    }
    p = 1;
    setTimeout(pUp, 10000);
}
function reset() {
    c = 0;
    dot.maxSpeed = ((counter / 10) * 1.5) + 6;
    square.maxSpeed = ((counter / 10) * 0.5) + 8;
    square.width = 100;
}
function reset2() {
    c = 0;
    dot.maxSpeed = 6;
    square.maxSpeed = 8;
    square.width = 100;
}
function wallDamage() {
    color = '#000000';
    lives = lives - 1;
    time = 0;
    counter = 0;
    wall.height = wall.height - 20;
    wall.y = wall.y + 20;
}
function clock() {
    time = time + 1;
    setTimeout(clock, 1000);
}
document.onkeydown = function (e) {
    e = e || window.event;
    let key = e.which || e.keyCode
    if (key == 37) {
        square.speed = -square.maxSpeed;
    }
    if (key == 39) {
        square.speed = +square.maxSpeed; 
    }
    if (key == 32) {
        if (start == 0) {
        dot.speed = 6;
        dot.maxSpeed = 6;
        x = 25;
        y = 50;
        liveCount();
        clock();
        pUp();
        start = 1;
        }
    }
    if (key == 90) {
        square.width = 600;
    }
    if (key == 88) {
        dot.maxSpeed = 1;
    }
}
document.onkeyup = function (e) {
    e = e || window.event;
    let key = e.which || e.keyCode
    if (key == 37) {
        if (square.speed < 0) {
        square.speed = 0;
        }
    }
    if (key == 39) {
        if (square.speed > 0) {
        square.speed = 0;
        }
    }
}
animate();