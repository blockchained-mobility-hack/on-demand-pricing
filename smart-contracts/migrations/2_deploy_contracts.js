var TreasuryContract = artifacts.require("./TreasuryContract.sol");
var TravelTargets = artifacts.require("./TravelTargets.sol");

module.exports = function(deployer) {
  deployer.deploy(TreasuryContract)
    .then(() => {
    deployer.deploy(TravelTargets);
  });
};
