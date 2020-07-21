var createAccPerSecond = 0;
var paymentsPerSecond = 0;
var accounts = 0;
var payments = 0;
var maxAccounts = 0;
var maxPayments = 0;
var interval = 10000;
var denominator = 1;
var totalTransactions = [];

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

    if (typeof totalTransactions[app] === 'undefined') totalTransactions[app] = 0;//initialize

    switch (txType) {
        case "payment":
            payments++;
            totalTransactions[app]++;//+= parseFloat(transaction.operations[0].amount);
            pushBubble({
                app: app,
                amount: transaction.operations[0].amount,
                id: id
            });
            break;
        case "createAccount":
            accounts++;
            totalTransactions[app]++;
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

//listen for transactions
var es = server.transactions()
    .cursor('now')
    .limit(200)
    .stream({
        onmessage: txHandler
    });

