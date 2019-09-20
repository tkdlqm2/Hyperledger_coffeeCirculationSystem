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
const ccpPath = path.resolve(__dirname, '..', 'network', 'connection2.json');
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);

////////////////////////////////////////////////////////////////////////////////////////////////

// var channel_event_hub = channel.newChannelEventHub('peer0.org1.example.com');
// let data = fs.readFileSync(path.join(__dirname, '..', 'network', 'crypto-config', 'peerOrganizations', 'org1.example.com', 'org1.example.com-cert.pem'));
// let peer = client.newPeer(
//     'grpcs://localhost:7051',
//     {
//         pem: Buffer.from(data).toString(),
//         'ssl-target-name-override': 'peer0.org1.example.com'
//     }
// );
// let channel_event_hub = channel.newChannelEventHub(peer);

////////////////////////////////////////////////////////////////////////////////////////////////

app.use(bodyParser.urlencoded({ extended: false }));

// Index page
app.get('/', function (req, res) {
    fs.readFile('./index.html', function (error, data) {
        res.send(data.toString());

    });
});

// Qeury all cars page
app.get('/api/query', async function (req, res) {
    // create the key value store as defined in the fabric-client/config/default.json 'key-value-store' setting

    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), 'wallet');
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
    await contract.addContractListener('my-contract-listener', 'TradeEvent', (err, event, blockNumber, transactionId, status) => {
        if (err) {
            console.error(err);
            return;
        }

        //convert event to something we can parse 
        event = event.payload.toString();
        event = JSON.parse(event)

        //where we output the TradeEvent
        console.log('************************ Start Trade Event *******************************************************');
        console.log(`type: ${event.type}`);
        console.log(`ownerId: ${event.ownerId}`);
        console.log(`id: ${event.id}`);
        console.log(`description: ${event.description}`);
        console.log(`status: ${event.status}`);
        console.log(`amount: ${event.amount}`);
        console.log(`buyerId: ${event.buyerId}`);
        console.log(`Block Number: ${blockNumber} Transaction ID: ${transactionId} Status: ${status}`);
        console.log('************************ End Trade Event ************************************');
    });


    // Evaluate the specified transaction.
    // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
    // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
    const result = await contract.evaluateTransaction('getAllKeys');
    console.log(`Transaction has been evaluated, result is: ${result.toString()}`);

    var obj = JSON.parse(result);
    res.status(200).json(obj);
});

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
        const walletPath = path.join(process.cwd(), 'wallet');
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

// Create car page
app.get('/api/createkey', function (req, res) {
    fs.readFile('./en_info1.html', function (error, data) {
        res.send(data.toString());
    });
});
// Create car handle
app.post('/api/createkey/', async function (req, res) {
    try {
        var key = req.body.key;
        var value1 = req.body.value11;
        var value2 = req.body.value12;
        var value3 = req.body.value13;
        var value4 = req.body.value14;
        var value5 = req.body.value15;
        var value6 = req.body.value16;


        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
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


        // Submit the specified transaction.
        // createCar transaction - requires 5 argument, ex: ('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom')
        // changeCarOwner transaction - requires 2 args , ex: ('changeCarOwner', 'CAR10', 'Dave')
        //        await contract.submitTransaction('createCar', 'CAR11', 'Hnda', 'Aord', 'Bla', 'Tom');
        await contract.submitTransaction('set1', key, value1, value2, value3, value4, value5, value6);
        console.log('정보 등록에 성공 했습니다.');

        // Disconnect from the gateway.
        await gateway.disconnect();

        res.status(200).json({ response: 'Transaction has been submitted' });

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        res.status(400).json(error);
    }

});
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
        const walletPath = path.join(process.cwd(), 'wallet');
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


        // Submit the specified transaction.
        // createCar transaction - requires 5 argument, ex: ('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom')
        // changeCarOwner transaction - requires 2 args , ex: ('changeCarOwner', 'CAR10', 'Dave')
        //        await contract.submitTransaction('createCar', 'CAR11', 'Hnda', 'Aord', 'Bla', 'Tom');
        await contract.submitTransaction('set_time1', key, value17, destination1);
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


