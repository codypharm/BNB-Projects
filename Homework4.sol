//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

contract Homewrk {
    address owner;

    constructor() {
        owner = msg.sender;
    }

    function getter() external view returns (address) {
        address addr = 0x000000000000000000000000000000000000dEaD;

        if (msg.sender == owner) {
            return addr;
        }

        return owner;
    }
}
