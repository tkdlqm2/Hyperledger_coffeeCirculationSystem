// ExpressJS Setup
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
// Constants
const PORT = 8082;
const HOST = '0.0.0.0';


// Hyperledger Bridge
const { FileSystemWallet, Gateway } = require('fabric-network');
const fs = require('fs');
const path = require('path');
const ccpPath = path.resolve(__dirname, '..', '..', 'network', 'connection2.json');
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});
/////////////////////////////////////////////////////////////////////////////////////
////////////////////// 모든 원두 이력 조회
/////////////////////////////////////////////////////////////////////////////////////
app.get('/', function (req, res) {
    fs.readFile('./index2.html', function (error, data) {
        res.send(data.toString());

    });
});


app.get('/api/query', async function (req, res) {
    // create the key value store as defined in the fabric-client/config/default.json 'key-value-store' setting

    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), '..', 'wallet');
    const wallet = new FileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    // Check to see if we've already enrolled the user.
    const userExists = await wallet.exists('admin3');
    if (!userExists) {
        console.log('An identity for the user "user1" does not exist in the wallet');
        console.log('Run the registerUser.js application before retrying');
        return;
    }

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccp, { wallet, identity: 'admin3', discovery: { enabled: false } });

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork('mychannel');

    // Get the contract from the network.
    const contract = network.getContract('sacc');

    // Evaluate the specified transaction.
    // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
    // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
    const result = await contract.evaluateTransaction('getAllKeys');
    console.log(`Transaction has been evaluated, result is: ${result.toString()}`);

    var obj = JSON.parse(result);
    res.status(200).json(obj);
});
/////////////////////////////////////////////////////////////////////////////////////
////////////////////// 원두 이력 조회
/////////////////////////////////////////////////////////////////////////////////////
app.get('/api/querykey/', function (req, res) {
    fs.readFile('./querykey.html', function (error, data) {
        res.send(data.toString());
    });
});


app.get('/api/querykey/:id', async function (req, res) {
    // create the key value store as defined in the fabric-client/config/default.json 'key-value-store' setting
    try {

        var key = req.params.id;
        console.log(key);

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), '..', 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('admin3');
        if (!userExists) {
            console.log('An identity for the user "user1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }
        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'admin3', discovery: { enabled: false } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('sacc');

        // Evaluate the specified transaction.
        // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
        const result = await contract.evaluateTransaction('get', key);

        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);

        var obj = JSON.parse(result)
        res.status(200).json(obj);

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(400).json(`{response: ${error}`);
    }
});

/////////////////////////////////////////////////////////////////////////////////////
////////////////////// 원두 로스팅 등록
/////////////////////////////////////////////////////////////////////////////////////
app.get('/api/createkey', function (req, res) {
    fs.readFile('./en_info3.html', function (error, data) {
        res.send(data.toString());
    });
});

app.post('/api/createkey/', async function (req, res) {
    try {
        var key = req.body.key;

        var value28 = req.body.value28.toString();
        var value29 = req.body.value29.toString();

        var fragrance = req.body.fragrance.toString();
        var balance = req.body.balance.toString();
        var bitterness = req.body.bitterness.toString();
        var sweetess = req.body.sweetess.toString();
        var aftertaste = req.body.aftertaste.toString();
        var body = req.body.body.toString();
        var acidity = req.body.acidity.toString();
        var aroma = req.body.aroma.toString();

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), '..', 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('admin3');
        if (!userExists) {
            console.log('An identity for the user "user1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }
        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'admin3', discovery: { enabled: false } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('sacc');
        const listener = await contract.addContractListener('Roasting_1', 'set3', (err, event, blockNumber, transactionId, status) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log("---------------커피가게---------------")
            console.log("-             로스팅 등록             -")
            console.log(`Block Number: ${blockNumber}\n Transaction ID: ${transactionId}\n Status: ${status}`);
            console.log("-----------------------------------")
        })

        // Submit the specified transaction.
        // createCar transaction - requires 5 argument, ex: ('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom')
        // changeCarOwner transaction - requires 2 args , ex: ('changeCarOwner', 'CAR10', 'Dave')
        //        await contract.submitTransaction('createCar', 'CAR11', 'Hnda', 'Aord', 'Bla', 'Tom');
        await contract.submitTransaction('set3', key, value28, value29, fragrance, balance, bitterness, sweetess, aftertaste, body, acidity, aroma);
        console.log('정보 등록에 성공 했습니다.');

        // Disconnect from the gateway.
        await gateway.disconnect();

        res.status(200).json({ response: 'Transaction has been submitted' });

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        res.status(400).json(error);
    }

});

/////////////////////////////////////////////////////////////////////////////////////
////////////////////// 원두 도착 날짜 등록
/////////////////////////////////////////////////////////////////////////////////////
app.get('/api/createkey3', function (req, res) {
    fs.readFile('./en_info_data_b3.html', function (error, data) {
        res.send(data.toString());
    });
});

app.post('/api/createkey3/', async function (req, res) {
    try {
        var key = req.body.key;
        var value24 = req.body.value24;

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), '..', 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('admin3');
        if (!userExists) {
            console.log('An identity for the user "user1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }
        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'admin3', discovery: { enabled: false } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('sacc');
        const listener = await contract.addContractListener('Roasting_2', 'set_arr_time', (err, event, blockNumber, transactionId, status) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log("----------------커피가게------------------")
            console.log("-             도착날짜 등록               -")
            console.log(`Block Number: ${blockNumber}\n Transaction ID: ${transactionId}\n Status: ${status}`);
            console.log("---------------------------------------")
        })

        // Submit the specified transaction.
        // createCar transaction - requires 5 argument, ex: ('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom')
        // changeCarOwner transaction - requires 2 args , ex: ('changeCarOwner', 'CAR10', 'Dave')
        //        await contract.submitTransaction('createCar', 'CAR11', 'Hnda', 'Aord', 'Bla', 'Tom');
        await contract.submitTransaction('set_arr_time', key, value24);
        console.log('정보 등록에 성공 했습니다.');

        // Disconnect from the gateway.
        await gateway.disconnect();

        res.status(200).json({ response: 'Transaction has been submitted' });

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        res.status(400).json(error);
    }

});

/////////////////////////////////////////////////////////////////////////////////////
////////////////////// 카페) 상품 출고 날짜 등록
/////////////////////////////////////////////////////////////////////////////////////

app.get('/api/createkey2', function (req, res) {
    fs.readFile('./en_info_data3.html', function (error, data) {
        res.send(data.toString());
    });
});
// Create car handle
app.post('/api/createkey2/', async function (req, res) {
    try {
        var key = req.body.key;
        var value38 = req.body.value38;
        var destination3 = req.body.destination3;

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), '..', 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('admin3');
        if (!userExists) {
            console.log('An identity for the user "user1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }
        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'admin3', discovery: { enabled: false } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('sacc');
        const listener = await contract.addContractListener('Roasting_3', 'set_time3', (err, event, blockNumber, transactionId, status) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log("-----------커피가게--------------")
            console.log("-         상품출고 등록           -")
            console.log(`Block Number: ${blockNumber}\n Transaction ID: ${transactionId}\n Status: ${status}`);
            console.log("---------------------------------")
        })

        // Submit the specified transaction.
        // createCar transaction - requires 5 argument, ex: ('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom')
        // changeCarOwner transaction - requires 2 args , ex: ('changeCarOwner', 'CAR10', 'Dave')
        //        await contract.submitTransaction('createCar', 'CAR11', 'Hnda', 'Aord', 'Bla', 'Tom');
        await contract.submitTransaction('set_time3', key, value38, destination3);
        console.log('정보 등록에 성공 했습니다.');

        // Disconnect from the gateway.
        await gateway.disconnect();

        res.status(200).json({ response: 'Transaction has been submitted' });

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        res.status(400).json(error);
    }

});
// server start
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);


