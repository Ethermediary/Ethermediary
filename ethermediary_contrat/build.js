var Web3 = require('web3');
var solc = require('solc');
let fs = require("fs");
var Q = require('q');
const readline = require('readline');



const fileName = "Test";
const contractName = "SampleContract";

web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8080"));

// Read the compiled contract code
// Compile with
// solc SampleContract.sol --combined-json abi,asm,ast,bin,bin-runtime,clone-bin,devdoc,interface,opcodes,srcmap,srcmap-runtime,userdoc > contracts.json
//let source = fs.readFileSync("contracts.json");
//let contracts = JSON.parse(source)["contracts"];

// ABI description as JSON structure
//let abi = JSON.parse(`[{"constant":false,"inputs":[],"name":"g","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]`);
let abi = JSON.parse(fs.readFileSync(fileName + "_sol_" + contractName + ".abi"));
// Smart contract EVM bytecode as hex
//let code = '0x' + `60606040523415600e57600080fd5b5b607e8061001d6000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063e2179b8e14603d575b600080fd5b3415604757600080fd5b604d604f565b005b5b5600a165627a7a723058203cbbf0ecd08827144d96142c6d138827b8383235021bfa242a3ab823381a28820029`;
let code = '0x' + fs.readFileSync(fileName + "_sol_" + contractName + ".bin");

// Create Contract proxy class
let SampleContract = web3.eth.contract(abi);

// Unlock the coinbase account to make transactions out of it
console.log("Unlocking coinbase account");
var password = "password";
try {
    web3.personal.unlockAccount(web3.eth.coinbase, password);
} catch (e) {
    console.log(e);
    return;
}

console.log("estimatin gas");

let gasEstimateData = SampleContract.new.getData({
    from: web3.eth.coinbase,
    data: code
});
let estimate = web3.eth.estimateGas({ data: gasEstimateData });
console.log("estimate gas=" + estimate);

console.log("Deploying the contract");

let contract = SampleContract.new({
    from: web3.eth.coinbase,
    gas: estimate + 4000,
    data: code
});

// Transaction has entered to geth memory pool
console.log("Your contract is being deployed in transaction at http://testnet.etherscan.io/tx/" + contract.transactionHash);

// http://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// We need to wait until any miner has included the transaction
// in a block to get the address of the contract
function waitBlock() {
    
    let receipt = web3.eth.getTransactionReceipt(contract.transactionHash);
    if (receipt && receipt.contractAddress) {
        console.log("Your contract has been deployed at http://testnet.etherscan.io/address/" + receipt.contractAddress);
        console.log("Note that it might take 30 - 90 sceonds for the block to propagate befor it's visible in etherscan.io");
        console.log("type stuff:");

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.on('line', (input) => {
            console.log(eval(input));
        });
        return;
    }
    console.log("Waiting a mined block to include your contract... currently in block " + web3.eth.blockNumber);
    return Q.delay(1000).then(waitBlock);
}

waitBlock();