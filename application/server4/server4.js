// ExpressJS Setup
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
// Constants
const PORT = 8083;
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
    fs.readFile('./index4.html', function (error, data) {
        res.send(data.toString());

    });
});

// Qeury all cars page
app.get('/api/query', async function (req, res) {
    // create the key value store as defined in the fabric-client/config/default.json 'key-value-store' setting

    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), '..', 'wallet');
    const wallet = new FileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    // Check to see if we've already enrolled the user.
    const userExists = await wallet.exists('admin4');
    if (!userExists) {
        console.log('An identity for the user "user1" does not exist in the wallet');
        console.log('Run the registerUser.js application before retrying');
        return;
    }

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccp, { wallet, identity: 'admin4', discovery: { enabled: false } });

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

    try {

        var key = req.params.id;
        console.log(key);

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), '..', 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('admin4');
        if (!userExists) {
            console.log('An identity for the user "user1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }
        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'admin4', discovery: { enabled: false } });

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
////////////////////// 패키징 업체 ) 상품 도착 날짜 등록
/////////////////////////////////////////////////////////////////////////////////////
app.get('/api/createkey2', function (req, res) {
    fs.readFile('./en_info4.html', function (error, data) {
        res.send(data.toString());
    });
});

app.post('/api/createkey2/', async function (req, res) {
    try {
        var key = req.body.key;
        var value40 = req.body.value40;


        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), '..', 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('admin4');
        if (!userExists) {
            console.log('An identity for the user "user1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }
        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'admin4', discovery: { enabled: false } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('sacc');
        const listener = await contract.addContractListener('pack_1', 'setarr_timeByService', (err, event, blockNumber, transactionId, status) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log("---------패키징가게-----------")
            console.log("-      상품도착날짜 등록      -")
            console.log(`Block Number: ${blockNumber}\n Transaction ID: ${transactionId}\n Status: ${status}`);
            console.log("------------------------------")
        })
        await contract.submitTransaction('setarr_timeByService', key, value40);
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
////////////////////// 패키징 업체 ) 상품 패키징 날짜 등록
/////////////////////////////////////////////////////////////////////////////////////

app.get('/api/createkey3', function (req, res) {
    fs.readFile('./en_info_data_c.html', function (error, data) {
        res.send(data.toString());
    });
});
// Create car handle
app.post('/api/createkey3/', async function (req, res) {
    try {
        var key = req.body.key;
        var value42 = req.body.value42;

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), '..', 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('admin4');
        if (!userExists) {
            console.log('An identity for the user "user1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }
        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'admin4', discovery: { enabled: false } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('sacc');
        const listener = await contract.addContractListener('pack_2', 'set_timeByService', (err, event, blockNumber, transactionId, status) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log("---------패키징가게------------")
            console.log("-      패키징 시간 등록        -")
            console.log(`Block Number: ${blockNumber}\n Transaction ID: ${transactionId}\n Status: ${status}`);
            console.log("----------------------------")
        })
        await contract.submitTransaction('set_timeByService', key, value42);
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
////////////////////// 패키징 업체 ) 상품 출고 날짜 등록
/////////////////////////////////////////////////////////////////////////////////////
app.get('/api/createkey4', function (req, res) {
    fs.readFile('./en_info_data_d.html', function (error, data) {
        res.send(data.toString());
    });
});
// Create car handle
app.post('/api/createkey4/', async function (req, res) {
    try {
        var key = req.body.key;
        var value44 = req.body.value44;

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), '..', 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('admin4');
        if (!userExists) {
            console.log('An identity for the user "user1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }
        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'admin4', discovery: { enabled: false } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('sacc');
        const listener = await contract.addContractListener('pack_3', 'set_timeByService2', (err, event, blockNumber, transactionId, status) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log("-----------패키징가게--------------")
            console.log("-        패키징 출고시간 등록          -")
            console.log(`Block Number: ${blockNumber}\n Transaction ID: ${transactionId}\n Status: ${status}`);
            console.log("--------------------------------")
        })
        await contract.submitTransaction('set_timeByService2', key, value44);
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


