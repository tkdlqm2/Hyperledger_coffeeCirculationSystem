// ExpressJS Setup
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
// Constants
const PORT = 8080;
const HOST = '0.0.0.0';


// Hyperledger Bridge
const { FileSystemWallet, Gateway } = require('fabric-network');
const fs = require('fs');
const path = require('path');
const ccpPath = path.resolve(__dirname, '..', '..', 'network', 'connection2.json');
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);
//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});
/////////////////////////////////////////////////////////////////////////////////////
////////////////////// 유통업체) 모든 원두 이력 조회
/////////////////////////////////////////////////////////////////////////////////////
app.get('/', function (req, res) {
    fs.readFile('./index.html', function (error, data) {
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
    const userExists = await wallet.exists('admin1');
    if (!userExists) {
        console.log('An identity for the user "user1" does not exist in the wallet');
        console.log('Run the registerUser.js application before retrying');
        return;
    }

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccp, { wallet, identity: 'admin1', discovery: { enabled: false } });

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
////////////////////// 유통업체)  원두 이력 조회
/////////////////////////////////////////////////////////////////////////////////////
app.get('/api/querykey/', function (req, res) {
    fs.readFile('./querykey.html', function (error, data) {
        res.send(data.toString());
    });
});

// Query car handle
// localhost:8080/api/querycar?carno=CAR5
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
        const userExists = await wallet.exists('admin1');
        if (!userExists) {
            console.log('An identity for the user "user1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }
        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'admin1', discovery: { enabled: false } });

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
////////////////////// 유통업체)  원두 이력 등록
/////////////////////////////////////////////////////////////////////////////////////
app.get('/api/createkey', function (req, res) {
    fs.readFile('./en_info1.html', function (error, data) {
        res.send(data.toString());
    });
});

app.post('/api/createkey/', async function (req, res) {
    try {
        var key = req.body.key;
        var value1 = req.body.value11;
        var value2 = req.body.value12;
        var value3 = req.body.value13;
        var value4 = req.body.value14;
        var value5 = req.body.value15.toString();
        var value6 = req.body.value16;
        var value7 = req.body.latitute.toString();


        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), '..', 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('admin1');
        if (!userExists) {
            console.log('An identity for the user "user1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }
        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'admin1', discovery: { enabled: false } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('sacc');

        const listener = await contract.addContractListener('importer_1', 'enroll_seedByImporter', (err, event, blockNumber, transactionId, status) => {
            if (err) {
                console.error(err);
                return;
            }

            console.log("------유통업체 ( 원두 이력 등록 ) ---------")
            console.log("날짜 등록 : ", value1)
            console.log(`Block Number: ${blockNumber} \nTransaction ID: ${transactionId} \nStatus: ${status}`);

            console.log("------------------------------------")
        })
        await contract.submitTransaction('enroll_seedByImporter', key, value1, value2, value3, value4, value5, value6, value7);
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
////////////////////// 유통업체)  상품 출고 등록
/////////////////////////////////////////////////////////////////////////////////////
app.get('/api/createkey2', function (req, res) {
    fs.readFile('./en_info_data.html', function (error, data) {
        res.send(data.toString());
    });
});
// Create car handle
app.post('/api/createkey2/', async function (req, res) {
    try {
        var key = req.body.key;
        var value17 = req.body.value17;
        var destination1 = req.body.destination1;

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), '..', 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('admin1');
        if (!userExists) {
            console.log('An identity for the user "user1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }
        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'admin1', discovery: { enabled: false } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('sacc');
        const listener = await contract.addContractListener('importer_2', 'set_timeByImporter', (err, event, blockNumber, transactionId, status) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log("----------유통업체 (출고 날짜 등록)---------------")
            console.log("날짜 등록 : ", value17)
            console.log("배송지 : ", destination1)
            console.log(`Block Number: ${blockNumber}\n Transaction ID: ${transactionId} \nStatus: ${status}`);
            console.log("-------------------------------------------")

        })

        //
        await contract.submitTransaction('set_timeByImporter', key, value17, destination1);
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


