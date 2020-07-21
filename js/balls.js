let bubbles = {};
var numberFormat = Intl.NumberFormat();
let maxTimeOnScreen = 4000;
let minTimeOnScreen = 3000;

//https://animejs.com/documentation/#cssSelector
function createBubble(amount, app, id, position) {
    if(amount == null) {
        amount = 'NEW<BR>USER'; //new account
    } else {
        amount = numberFormat.format(amount) + '<BR>KIN';
    }
    let bubble = $('<div/>', {
        class: 'bubble',
        id: id,
        css: {
            'background-color': getColor(app),
            height: getSize(),
            width: getSize(),
            bottom: position + 'vh',
        },
    }).html(amount).prependTo('#bubbles');
    moveBubble(id);
}

function getColor(app) {
    let col = stringToColour(app);
    let rgb = hexToRgb(darkenColr(col));
    if (!rgb) rgb = { r: 0, g: 0, b: 0 };
    return ' rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')';
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function stringToColour(str) {
    var hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var colour = '#';
    for (let i = 0; i < 3; i++) {
        var value = (hash >> (i * 8)) & 0xFF;
        colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
}

function darkenColr(col) {
    var usePound = false;
    var amt = -50;
    if (col[0] === "#") {
        col = col.slice(1);
        usePound = true;
    }

    var num = parseInt(col, 16);
    var r = (num >> 16) + amt;

    if (r > 255) r = 255;
    else if (r < 0) r = 0;

    var b = ((num >> 8) & 0x00FF) + amt;

    if (b > 255) b = 255;
    else if (b < 0) b = 0;

    var g = (num & 0x0000FF) + amt;

    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);

}

function getSize() {
    return '3vw';
}

function popBubble(id) {
    document.getElementById(id).remove();
}

function moveBubble(id) {
    if(randomNumber(1,20) < 2) {
        duration = 7000;
        scale = 4;
    }else{
        duration = randomNumber(1000,3000);
        scale = randomNumber(2,4);
    }
    anime({
        targets: '#' + id,
        duration:  duration,
        easing: 'cubicBezier(.5, .05, .1, .3)',
        keyframes: [
            { translateY: -randomNumber(60,80), translateX: randomNumber(10,30) + 'vw', scale: 2 },
            { translateY: -randomNumber(20,40), translateX: randomNumber(30,50)+'vw', scale: scale },
            {
                translateY: 40,
                translateX: '100vw',
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
    let delay = 100;
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
}, 500);
