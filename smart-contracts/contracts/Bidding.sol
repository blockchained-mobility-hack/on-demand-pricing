pragma solidity ^0.4.21;

// A simple bidding system which allows several users to make bidds.
// A bid can be defined as a price (value) on a given moment in time (timestamp).
// Every user can make only one bid, if a unser makes more bids then they will be
contract Bidding {

    //owner of the contract
    address public owner;

    // Used to define a Bid object,
    // a bid can be defined as a price (value) on a given moment in time
    // (timestamp).
    struct Bid {
        uint val;
        uint timestamp;
    }

    // The associaitons between the users (address) and their bid.
    mapping (address => Bid) private bidds;

    // The address for the bidder that place the bid with the biggest value.
    address bestBidder;

    // The value for the biggest bid
    uint bestBidValue;

    // can only be called by the admin of the contract
    modifier onlyOwnerAllowed() {
        require(msg.sender == owner);
        _;
    }

    // This is the constructor whose code is
    // run only when the contract is created.
    function Bidding() public {
        owner = msg.sender;
    }

    // Makes a bid and return true if this opperation is successful
    // if the new added bid has the greatest value so far then a NewMaxBid is
    // also raising.
    function bid(uint bidValue, uint bidDate) public payable
    returns(bool success)
    {
        bidds[msg.sender] = Bid(bidValue, bidDate);
        if (bidValue >= bestBidValue) {
            bestBidValue = bidValue;
            bestBidder = msg.sender;
            emit NewMaxBid(bestBidder, bestBidValue, bidDate);
        }
        return true;
    }

    // Gets the bid for the current user
    function getBid() public view
    returns (uint retValue, uint retDate) {
        retValue = bidds[msg.sender].val;
        retDate = bidds[msg.sender].timestamp;
    }

    function winner() public payable onlyOwnerAllowed
    returns (address winnerAddress, uint winnerValue, uint winnerDate) {
        winnerAddress = bestBidder;
        winnerValue = bidds[bestBidder].val;
        winnerDate = bidds[bestBidder].timestamp;
    }

    function isWinner() public view
    returns (bool) {
        return msg.sender == bestBidder;
    }

    function addAdmin(uint bidValue, uint bidDate) public payable
    returns(bool success)
    {
        bestBidder = msg.sender;
        bidds[msg.sender] = Bid(bidValue, bidDate);
        return true;
    }

    function isAdmin(address query) public
    view
    returns(uint queryResult)
    {
        return bidds[query].val;
    }

    // Used  to indicate that a bid with greatest value so far was done
    // The event caries the address from the invoved user and the bidding infromatins.
    event NewMaxBid(address bidderAddress, uint value, uint date);
}
