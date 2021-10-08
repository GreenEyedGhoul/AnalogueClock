/* eslint-disable linebreak-style */
/* eslint-disable prefer-const */

/* eslint-disable no-var */
/* eslint-disable require-jsdoc */


const c = document.getElementById('mycanvas');
const ctx = c.getContext('2d');
let radius = c.height /2;
ctx.translate(radius, radius);
radius = radius * 0.90;
setInterval(drawClock, 50);

function drawClock() {
  drawFace(ctx, radius);
  drawNumbers(ctx, radius);
  drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
  // eslint-disable-next-line no-var
  var grad;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2*Math.PI);
  ctx.fillStyle = 'white';
  ctx.fill();
  grad = ctx.createRadialGradient(0, 0, radius*0.95, 0, 0, radius*1.05 );
  grad.addColorStop(0, '#333');
  grad.addColorStop(0.5, 'white');
  grad.addColorStop(1, '#333');
  ctx.strokeStyle= grad;
  ctx.lineWidth = radius*0.1;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
  ctx.fillStyle= '#333';
  ctx.fill();
};

function drawNumbers(ctx, radius) {
  var ang;
  var num;
  ctx.font= radius*0.13+'px arial';
  ctx.textBaseline = 'midddle';
  ctx.textAlign = 'center';
  for (num=1; num<13; num++) {
    ang = num*Math.PI/6;
    ctx.rotate(ang);
    ctx.translate(5.5, -radius*0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius*0.84);
    ctx.rotate(-ang);
  };
};

function drawTime(ctx, radius) {
  var time = new Date();
  var hour = time.getHours();
  var min = time.getMinutes();
  var sec = time.getSeconds();
  var milliseconds = time.getMilliseconds();
  var seconds = (sec*1000 + milliseconds)/1000;
  hour = hour%12;
  hour = (hour*Math.PI/6)+(min*Math.PI/(6*60))+(seconds*Math.PI/(6*360));
  drawHand(ctx, hour, radius*0.5, radius*0.07);
  min =(min*Math.PI/30)+(seconds*Math.PI/(30*60));
  drawHand(ctx, min, radius*0.8, radius*0.07);
  seconds = (seconds*Math.PI/30);
  drawHand(ctx, seconds, radius*0.9, radius*0.02);
};

function drawHand(ctx, pos, length, width) {
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.lineCap = 'round';
  ctx.moveTo(0, 0);
  ctx.rotate(pos);
  ctx.lineTo(0, -length);
  ctx.stroke();
  ctx.rotate(-pos);
};

