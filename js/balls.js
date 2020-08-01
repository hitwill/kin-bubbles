let bubbles = {};
var numberFormat = Intl.NumberFormat();
let maxTimeOnScreen = 4000;
let minTimeOnScreen = 3000;

//https://animejs.com/documentation/#cssSelector
function createBubble(amount, app, id, position) {
    let className = 'bubble';
    if(amount == null) {
        className += ' newaccount';
        amount = '<span class="vert-center">NEW<BR>USER</span>'; //new account
    } else {
        amount = numberFormat.format(amount) + '<BR>KIN';
    }
    let color = getColor(app);
    app = '<BR><span class="app">' + appCodeToName(app) +'</span>';
    let bubble = $('<div/>', {
        class: className,
        id: id,
        css: {
            'background-color': color,
            height: getSize(),
            width: getSize(),
            bottom: position + 'vh',
        },
    }).html(amount + app).prependTo('#bubbles');
    moveBubble(id);
}

function getSize() {
    return '3vmax';
}

function popBubble(id) {
    document.getElementById(id).remove();
}

function moveBubble(id) {
    if(randomNumber(1,20) < 2) {
        duration = 7000;
        scale2 = 4;
        scale1 = 2;
    }else{
        duration = randomNumber(1000,3000);
        scale1 = randomNumber(1,randomNumber(1,2));
        scale2 = randomNumber(1,randomNumber(1,3));
    }
    
    if(scale2 == 4) {
        $('#' + id).find('.app').show();//boast
    }
    anime({
        targets: '#' + id,
        duration:  duration,
        easing: 'cubicBezier(.5, .05, .1, .3)',
        keyframes: [
            { translateY: -randomNumber(60,80), translateX: randomNumber(10,30) + 'vw', scale: scale1, rotateY: randomNumber(0,20) + 'deg', rotateX: randomNumber(0,20) + 'deg', rotateZ: - randomNumber(0,randomNumber(0,4)) + 'deg' },
            { translateY: -randomNumber(20,40), translateX: randomNumber(30,50)+'vw', scale: scale2,  rotateY: '0deg',  rotateX: '0deg', rotateZ: '0deg' },
            {
                rotateZ:  randomNumber(0,randomNumber(0,20)) + 'deg',
                rotateX: -randomNumber(0,20) + 'deg',
                rotateY: -randomNumber(50,90)+'deg',
                translateY: randomNumber(30,50),
                translateX: '120vw',
                scale: 0.5,
                easing: function (el, i, total) {
                    return function (t) {
                        return Math.pow(Math.sin(t * (i + 1)), total);
                    };
                },
            },
        ],
    }).finished.then(() => {
        $('#' + id).remove();
    });
}


function pushBubble(bubble) {
    if(!bubbles[bubble.app]) bubbles[bubble.app] = [];
    bubbles[bubble.app].push(bubble);
}

function pullBubbles(){
    let delay = 200;
    let speed = 0;
    let app = null;
    let amount = null;
    let typeCount = 0;
    let totalBubbles = totalBubblesInQueue(bubbles);
    let totalOfApp;
    let appNumber = 0;
    let clonedBubbles = JSON.parse(JSON.stringify(bubbles))
    bubbles = {}; // reset
   
    $.each(clonedBubbles, function(i, appBubbles) {
        appNumber++;
        totalOfApp = appBubbles.length;
        $.each(appBubbles, function(ii, bubble) {
            bubble.position = bubblePosition(appNumber);
            setTimeout(function(){
                createBubble(bubble.amount, bubble.app, bubble.id, bubble.position);
            }, delay);
            delay += 100;
        });
    });
}

function bubblePosition(appNumber) {
    return randomNumber(1,50);// appNumber.toString().replace('0','').slice(-1) * 2;
}

function totalBubblesInQueue(bubbles) {
    let count = 0;
    $(bubbles).each(function(i,bubble){
        count+= Object.keys(bubble).length;
    });
    return count;
}

setInterval(function(){
    pullBubbles();
}, 1000);
