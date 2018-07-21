var BiddingLib = artifacts.require("./Bidding.sol");
var TravelTargets = artifacts.require("./TravelTargets.sol");

module.exports = function(deployer) {
  deployer.deploy(BiddingLib)
    .then(() => {
    deployer.deploy(TravelTargets, TravelTargets.address);
  });
};
