pragma solidity ^0.4.11;

/// @title A safe intermediary for your transaction
contract Ethermediary {

    // Declare a type which contain the transaction informations
    struct Transaction {
        uint256 id;  // The unique id of the transaction

        address seller_pulic; // The public adress of the seller
        bytes32 seller_email; // The email of the seller

        address buyer_public; // The public adress of the buyer
        bytes32 buyer_email; // The email of the buyer

        uint paiement;   // The amount of ether the seller should get (wei)
        uint refund_min; // The min number of day before a refund is authorized
        bool accepted;  // 1 if the seller accepted the transaction from the buyer
        bool received;  // 1 if the buyer received the object/service from the seller
        bool refund;  // 1 if the buyer was refund (only after refund_min elapsed)
    }

    // For each call of the contract we first need to determine the current state of the transaction
    // If the transaction does not exist, we create it
    function state_transaction(){}

    // Called by the buyer (why not the seller as well ?), create a new transaction
    // and ask the seller for acceptation
    function new_transaction(){}

    // Called by the seller, accept the transaction.
    function accept_transaction(){}

    // Called by the seller, cancel the transaction and refund the buyer
    function refused_transaction(){}

    // Called by the buyer, certify that he received the object/service
    // and allow the paiement of the seller.
    function received(){}

    // Called by the buyer, determine if a refund is possible. If true, refund
    // the buyer
    function refund(){}

    // If a transaction has ended, we delete its informations (or not ?)
    function drop_transaction(){}

    // Communicate with an email API to send email to buyer and seller
    function send_email(){}

}

////////////////////////////////////////////////////////////////////////////////
// Below this line content is not related to the contract ethermediary ...
// But rather serve as a coding inspiration
////////////////////////////////////////////////////////////////////////////////

/*

    // A dynamically-sized array of `Proposal` structs.
    Proposal[] public proposals;

    /// Create a new ballot to choose one of `proposalNames`.
    function Ballot(bytes32[] proposalNames) {
        chairperson = msg.sender;
        voters[chairperson].weight = 1;

        // For each of the provided proposal names,
        // create a new proposal object and add it
        // to the end of the array.
        for (uint i = 0; i < proposalNames.length; i++) {
            // `Proposal({...})` creates a temporary
            // Proposal object and `proposals.push(...)`
            // appends it to the end of `proposals`.
            proposals.push(Proposal({
                name: proposalNames[i],
                voteCount: 0
            }));
        }
    }

    // Give `voter` the right to vote on this ballot.
    // May only be called by `chairperson`.
    function giveRightToVote(address voter) {
        // If the argument of `require` evaluates to `false`,
        // it terminates and reverts all changes to
        // the state and to Ether balances. It is often
        // a good idea to use this if functions are
        // called incorrectly. But watch out, this
        // will currently also consume all provided gas
        // (this is planned to change in the future).
        require((msg.sender == chairperson) && !voters[voter].voted && (voters[voter].weight == 0));
        voters[voter].weight = 1;
    }

    /// Delegate your vote to the voter `to`.
    function delegate(address to) {
        // assigns reference
        Voter storage sender = voters[msg.sender];
        require(!sender.voted);

        // Self-delegation is not allowed.
        require(to != msg.sender);

        // Forward the delegation as long as
        // `to` also delegated.
        // In general, such loops are very dangerous,
        // because if they run too long, they might
        // need more gas than is available in a block.
        // In this case, the delegation will not be executed,
        // but in other situations, such loops might
        // cause a contract to get "stuck" completely.
        while (voters[to].delegate != address(0)) {
            to = voters[to].delegate;

            // We found a loop in the delegation, not allowed.
            require(to != msg.sender);
        }

        // Since `sender` is a reference, this
        // modifies `voters[msg.sender].voted`
        sender.voted = true;
        sender.delegate = to;
        Voter storage delegate = voters[to];
        if (delegate.voted) {
            // If the delegate already voted,
            // directly add to the number of votes
            proposals[delegate.vote].voteCount += sender.weight;
        } else {
            // If the delegate did not vote yet,
            // add to her weight.
            delegate.weight += sender.weight;
        }
    }

    /// Give your vote (including votes delegated to you)
    /// to proposal `proposals[proposal].name`.
    function vote(uint proposal) {
        Voter storage sender = voters[msg.sender];
        require(!sender.voted);
        sender.voted = true;
        sender.vote = proposal;

        // If `proposal` is out of the range of the array,
        // this will throw automatically and revert all
        // changes.
        proposals[proposal].voteCount += sender.weight;
    }

    /// @dev Computes the winning proposal taking all
    /// previous votes into account.
    function winningProposal() constant
            returns (uint winningProposal)
    {
        uint winningVoteCount = 0;
        for (uint p = 0; p < proposals.length; p++) {
            if (proposals[p].voteCount > winningVoteCount) {
                winningVoteCount = proposals[p].voteCount;
                winningProposal = p;
            }
        }
    }

    // Calls winningProposal() function to get the index
    // of the winner contained in the proposals array and then
    // returns the name of the winner
    function winnerName() constant
            returns (bytes32 winnerName)
    {
        winnerName = proposals[winningProposal()].name;
    }
}

*/
