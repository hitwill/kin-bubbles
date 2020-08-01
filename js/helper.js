let updateFrequency = 20000;
let updateFrequencyEcosystem = 1000;
let appStatPos = 0;

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

function getColor(app) {
    let col = stringToColour(app);
    let rgb = hexToRgb(darkenColr(col));
    if (!rgb) rgb = { r: 0, g: 0, b: 0 };
    return ' rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')';
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

function appCodeToName(app) {
    var appArray = [];
    appArray['kit'] = 'Kinit';
    appArray['kik'] = 'Kik';
    appArray['p365'] = 'P365';
    appArray['8vlz'] = 'Nearby';
    appArray['l83h'] = 'Rave';  
    appArray['l68b'] = 'Vent';  
    appArray['lipz'] = 'MadLipz';  
    appArray['tapa'] = 'TapaTalk';  
    appArray['swel'] = 'Swelly';  
    appArray['rced'] = 'Kinny';  
    appArray['vefj'] = 'PlanetsNu';  
    appArray['jf1d'] = 'SpeedGenius';  
    appArray['xjv6'] = 'Kinpet';  
    appArray['xnxb'] = 'Peerbet';  
    appArray['aqv3'] = 'imgvue';  
    appArray['kfit'] = 'kinfit';  
    appArray['jdnn'] = 'SXLVE';  
    appArray['pgbv'] = 'Pause For';  
    appArray['lsff'] = 'Pop.in';  
    appArray['uhrz'] = 'Tiny Ted';  
    appArray['m8jd'] = 'TRK';  
    appArray['uvoj'] = 'Subway Sc';  
    appArray['mkme'] = 'MonkingMe';  
    appArray['mech'] = 'SuperMechs';  
    appArray['zmoq'] = 'Catpurse';  
    appArray['nbps'] = 'L&L Radio';  
    appArray['8onm'] = 'Kimeo';  
    appArray['g58b'] = 'Kinetik';  
    appArray['nm8e'] = 'Subti';  
    appArray['psip'] = 'PsiphonPro';  
    appArray['obpk'] = 'Dog Rescue';  
    appArray['trbl'] = 'Trebel';  
    
    appArray['mgsv'] = 'Migration Service';  
    
    if (typeof appArray[app.toLowerCase()] !== 'undefined') {
        return (appArray[app.toLowerCase()]);
    } else {
        return (app);//just return the original code
    }
}

setTimeout(function(){
    displayStats();
}, 10000);

setInterval(function(){
    displayStats();
}, updateFrequency);

setInterval(function(){
    displayStatsEcosystem();
}, updateFrequencyEcosystem);

function dirtyPrecision(num) {
    //i feel like hacking
    if(num.indexOf('.') == -1) return num + '.00';
    if(num.split('.')[1].length == 1) return num + '0';
    return num;
}

function displayStats() {
    let kin = 0;
    let spends = 0;
    let accounts = 0;
    let apps = Object.keys(appList);
    if(apps.length == 0) return;
    
    if(typeof apps[appStatPos] === 'undefined') appStatPos = 0; //restart
    let app = apps[appStatPos];
    let col = getColor(app);

    //get values per second
    if(statsHolder.kin[app]) kin = dirtyPrecision(numberFormat.format(statsHolder.kin[app]));
    if(statsHolder.spends[app]) spends = dirtyPrecision(numberFormat.format(statsHolder.spends[app]));
    if(statsHolder.accounts[app]) accounts = dirtyPrecision(numberFormat.format(statsHolder.accounts[app]));
    
    appStatPos++;// move to next app

    if(!spends) return;

    $('#stats-table').show();
    $('.card-stats').css('background-color', col);
    app = appCodeToName(app);
    $('.app-name').html(app);
    $('#app-kin').html(kin);
    $('#app-accounts').html(accounts);
    $('#app-spends').html(spends);

    app = 'Ecosystem';
    $('#progress-modifier').html(
        '.app-kin::after {width:'+Math.max(1,Math.round(100*toNumber(kin)/toNumber(statsHolder.kin[app]))*4)+'%}' +
        '.app-accounts::after {width:'+Math.max(1,Math.round(100*toNumber(accounts)/toNumber(statsHolder.accounts[app]))*4)+'%}' +
        '.app-spends::after {width:'+Math.max(1,Math.round(100*toNumber(spends)/toNumber(statsHolder.spends[app]))*4)+'%}'
    );
        
}

function toNumber(string) {
    string = string + '';//typecase
    return parseFloat(string.replace(',',''));
}

function displayStatsEcosystem() {
    let kin = 0;
    let spends = 0;
    let accounts = 0;
    
    let app = 'Ecosystem';
    //get values per second
    if(statsHolder.kin[app]) kin = dirtyPrecision(numberFormat.format(statsHolder.kin[app]));
    if(statsHolder.spends[app]) spends = dirtyPrecision(numberFormat.format(statsHolder.spends[app]));
    if(statsHolder.accounts[app]) accounts = dirtyPrecision(numberFormat.format(statsHolder.accounts[app]));

    if(spends) {
        $('#ecosystem-kin').html(kin);
        $('#ecosystem-accounts').html(accounts);
        $('#ecosystem-spends').html(spends);
    }
}