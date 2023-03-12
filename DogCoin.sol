//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

contract DogCoin {
    uint256 totalSupply = 2000000;
    address owner;

    event totalChanged(uint256);
    event trnasferDone(uint256, address);

    Payment[] public payments;

    struct Payment {
        uint256 amt;
        address receiver;
    }

    mapping(address => uint256) public balances;
    mapping(address => Payment[]) public paymentRecord;

    constructor() {
        owner = msg.sender;
        balances[msg.sender] = totalSupply;
    }

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "Only cotract owner can run this transaction"
        );
        _;
    }

    function getTotalSupply() public view returns (uint256) {
        return totalSupply;
    }

    function increase() public onlyOwner {
        totalSupply += 1000;
        emit totalChanged(totalSupply);
    }

    function transfer(uint256 _amt, address receiver) public {
        require(balances[msg.sender] >= _amt, "You do not have enough balance");
        // Payment memory newRecord;
        // newRecord.amt = _amt;
        // newRecord.receiver = receiver;
        // paymentRecord[msg.sender].push(newRecord);
        balances[msg.sender] -= _amt;
        balances[receiver] += _amt;
        // paymentRecord[msg.sender].push(Payment({amt:_amt,receiver:receiver}));
        paymentRecord[msg.sender].push(Payment(_amt, receiver));

        emit trnasferDone(_amt, receiver);
    }
}
