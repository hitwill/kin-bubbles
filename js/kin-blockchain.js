var createAccPerSecond = 0;
var paymentsPerSecond = 0;
var accounts = 0;
var payments = 0;
var maxAccounts = 0;
var maxPayments = 0;
var intervalCalc = 10000;
var totalIntervalPassed = 0;
var denominator = 1;
var totalSpends = [];
var totalAccounts = [];
var totalKin = [];
var appList = [];
var statsHolder = {
    kin: [],
    spends: [],
    accounts: []
};

var server = new KinSdk.Server('https://horizon-block-explorer.kininfrastructure.com');

/*setMountain(m1Width, m2Width, m3Width,
    m1Height, m2Height, m3Height,
    m1Text, m2Text, m3Text)*/


//parse incoming transactions
var txHandler = function (txResponse) {
    const transaction = new KinSdk.Transaction(txResponse.envelope_xdr);
    var txType = null;
    var memo = '1-anon-random';
    var app = 'anon';
    var id = 'r' + randomNumber(0, 1000000);
    try {
        txType = transaction.operations[0].type;
    } catch (e) {
        console.log(e);
    }

    if (typeof txResponse.memo === 'string') memo = txResponse.memo;

    if (memo.split('-')[1]) app = memo.split('-')[1];
    if (memo.split('-')[2]) id = (memo.split('-')[2] + id).replace(/\W/g, '');//make sure id is random
    app = app.toLocaleLowerCase();
    id='i'+id;//start with letter to be legal
    id = id.replace(/[^a-z0-9]/gi,'');

    if(['payment', 'createAccount'].indexOf(txType) != -1){
        if (typeof totalSpends[app] === 'undefined') totalSpends[app] = 0;//initialize
        if (typeof totalKin[app] === 'undefined') totalKin[app] = 0;//initialize
        if (typeof totalAccounts[app] === 'undefined') totalAccounts[app] = 0;//initialize
    }
   

    switch (txType) {
        case "payment":
            payments++;
            totalSpends[app]++;
            totalSpends['Ecosystem']++;

            totalKin[app] += parseFloat(transaction.operations[0].amount);
            totalKin['Ecosystem'] += parseFloat(transaction.operations[0].amount);
            appList[app] = true;
            pushBubble({
                app: app,
                amount: transaction.operations[0].amount,
                id: id
            });
            break;
        case "createAccount":
            accounts++;
            totalAccounts[app]++;
            totalAccounts['Ecosystem']++;
            appList[app] = true;
            pushBubble({
                app: app,
                amount: null, //new account
                id: id
            });
            break;
    }
};


function randomNumber(min, max) {  
    return Math.round(Math.random() * (max - min) + min); 
}  

function initTotals() {
    totalSpends = [];
    totalKin = [];
    totalAccounts = [];
    totalSpends['Ecosystem'] = 0;
    totalKin['Ecosystem'] = 0;
    totalAccounts['Ecosystem'] = 0;
}

//listen for transactions
var es = server.transactions()
    .cursor('now')
    .limit(200)
    .stream({
        onmessage: txHandler
    });

function updateTotals() {
    totalIntervalPassed +=intervalCalc;
    for (app in totalSpends) {
         statsHolder.spends[app] = totalSpends[app] ? Number(1000*totalSpends[app]/totalIntervalPassed).toFixed(2) : 0;
    }
    for (app in totalKin) {
        statsHolder.kin[app] = totalKin[app] ? Number(1000*totalKin[app]/totalIntervalPassed).toFixed(2) : 0;
    }
    for (app in totalAccounts) {
        statsHolder.accounts[app] = totalAccounts[app] ? Number(1000*totalAccounts[app]/totalIntervalPassed).toFixed(2) : 0;
    }
}

setInterval(function(){
    updateTotals();
}, intervalCalc);

initTotals();
