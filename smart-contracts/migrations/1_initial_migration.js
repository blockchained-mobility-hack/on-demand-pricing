var Migrations = artifacts.require("./Migrations.sol");
var Targets = artifacts.require("./Migrations.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations).then(function () {
    deployer.deploy(Targets);
  });
};
