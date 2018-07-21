var BiddingLib = artifacts.require("./Bidding.sol");

module.exports = function(deployer) {
  deployer.deploy(BiddingLib);
};
