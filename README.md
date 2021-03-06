# Ethermediary

Ethereum based smart contract that acts as a secure & decentralized third-party for object/service transaction against ETH. Access online using the Dapp front-end and @MetaMask or through the API of the smart contract.

Whenever you buy an object or a service online from a seller, you often have to trust the seller for providing you with the object/service for which you paid. Similarly, as a seller, you don't want to provide a service or send an object without the guarantee to be paid.

Ethermediary removes the need for trust. It is a secure & decentralized third-party that holds payment until the transaction is validated by the buyer. To make misbehaviors unprofitable, a caution is added by both the buyer and the seller to the smart contract's balance.

![alt text](https://raw.githubusercontent.com/Ethermediary/Ethermediary/master/infos/ethermediary_readme.jpg)


# Setup

```bash
cd Ethermediary/web/
npm install
node server.js
```

Or as a Docker container:

```bash
cd Ethermediary/web/
./build.sh
./start.sh
```

Access the web interface locally on ```localhost:8001```


# How it works

(1) A buyer proposes a seller to buy an object/service in return for a given amount of ETH. To do so, the buyer creates a new "deal" contract using the Ethermediary smart contract and sends the proposed price plus a caution (10% of the transaction) to the deal contract. 

(2) If the seller agrees, he must send a caution to the deal contract (again, 10% of the transaction), and send the object / provide the service for which the buyer paid. The deal contract then proceeds to step 3. If the seller refuses the offer, then the buyer's caution is returned to him and the deal contract is closed.

(3) After sending the object / providing the service to the buyer, the seller informs the deal contract about it. The deal contract now waits for the seller to validate that he has received the object/service for which he paid.

(4) If the buyer validates, then the payment plus the seller's caution is sent to the seller's account, the buyer gets his caution back, and the deal contract is closed. The payment and cautions will be kept on the deal contract for as long as the buyer does not validate that he received the object/service.

(5) Conflicts might happen. At any time, a participant can ask the other to cancel the deal. The deal contract is automatically canceled if the deal is not yet accepted by the seller. If the seller already accepted the deal, then both participants must agree to cancel the deal. In they both agree, the buyer's caution is returned to the seller, and the buyer's caution plus payment is returned to the buyer.

## Why participants have no interest to cheat

As a buyer, if you don't provide/send the object/service, the deal contract will hold your payment plus caution indefinitely.

As a seller, if you don't validate that you received the object/service for which you paid (which would prevent the seller from being paid), you won't get your caution back.

If one participant asks the other to cancel the deal but the other refuses, then both cautions as well as the payment will be kept on the deal contract indefinitely. Therefore, both participants have every interest to collaborate to resolve the conflict.