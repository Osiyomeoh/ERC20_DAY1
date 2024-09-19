// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyERC20 is ERC20, Ownable{



    constructor() ERC20("ERC20", "ERC") Ownable(msg.sender){
        _mint(msg.sender, 1000e18);

    }
    function mint(address to, uint256 amount) external onlyOwner{
        _mint(to, amount);
    }
    function burn(uint256 amount) external {
        _burn(msg.sender, amount);

    }
    function transferOwnership(address newOwner) public override onlyOwner{
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        _transferOwnership(newOwner);
    }

}




