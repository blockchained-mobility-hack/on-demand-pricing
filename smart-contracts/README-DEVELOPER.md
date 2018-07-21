# Perquisites

The project uses [truffle suite](http://truffleframework.com/) and implicit NodeJS,
if you are behind the proxy consider [this article](https://jjasonclark.com/how-to-setup-node-behind-web-proxy/).

Truffle (and all the related tools) implies at least nodeJS 8.00.
If you don't want to manage different nodeJS version then you may consider [Node Version Manager - nvm](https://github.com/creationix/nvm),
all the test for this project was done with node `v8.10.0`.

You will also require [ganache-cli](https://github.com/trufflesuite/ganache-cli).
If you do not like to install `Ganache` locally you can use it as docker container with the following command:
`docker run -it --rm -p 8545:8545 trufflesuite/ganache-cli:latest` or use the [start-ganache-cli-docker.bash](./bin/start-ganacle-cli-docker.bash)
script located in the `bin` directory.

## Project structure

This projects follows the standard truffle project structure with some project specific changes.
Here are the main components:

* `bin` directory, it holds project specific executable / scripts.
* `build` directory, output directory for the compile process.
* `contract` directory, it holds the contracts for this project (the contracts as also know as [Solidity]() files).
This files are converted in javascript files during the `compile` step.
* `migrations` directory, contains scripts able to migrate the contracts in to any target `chain`.
* `test` unit tests for the contracts, this can be javascript and Solidity.
The `javascript tests` are test where you interact with contracts over the `web3` client.
The `Solidity tests` are the test where you interact with the contract directly.
* `.soliumrc` and `soliumrc.json` files are configuration for the [Solium](https://github.com/duaraghav8/Solium). This is a [linter](https://en.wikipedia.org/wiki/Lint_(software)) and a formatted as well.
* `truffle.js` used to configure the truffle framework, for the moment it contains only the connection to the test chain named
`development` (which runs on `localhost:8545`).

There are at least three ways to interact with the project: compile, deploy and test the contracts, each of them are described below.

## Compile

In order to compile use the following command: `truffle compile`, the result is present in `build` directory.

## Deploy (migrate)

In order to deploy your compiled contract use the following command: `truffle migrate`.
For this you need a running chain, the configuration for the chain to be used in available in the `truffle.js` file. You can have several chains, with different names and you can choose in which chain you like to deploy your contracts.
Use the `ganache-cli` or the docker container with ganache-cli in order to start a local chain.
The local chain and the deployment must run as two different processes (two separate terminal sessions).

In the Blockchain jargon the deploy to a chain is also know as `migration`.

## Test (on a chain)

In order to test you need to have a test chain running, follow the steps from the `Deploy` to start your chain if this is required.
Tun all the unit test with the command: `truffle test`

## Travis Integration

The actual project uses [Travis-CI](https://travis-ci.org/) to compiles, deploys (on a local test chain) and tests all the contracts. Also the build chain cares about your coding style, if your new added code violate the style-guide you will be not able to deploy.

For more information consider the [travis config](./.travis.yml) file.


## Coding Style-guide

This project uses [Solium](https://github.com/duaraghav8/Solium) in order to keep the solidity code consistent from code style point of view.

The solium is a nodeJS application, in order to install it use this command `npm install -g solium`.
The soluim configuration is on the [.soliumrc.json](./.soliumrc.json) file.

Follow actions are available:

1. generate a style-guide violations report, use this command: `solium -d ../contracts` in the project root directory. As alternative you can use the [solium-report.bash](./solium-report.bash) from the bin directory.
2. fix some style-guide violations, use this command: `solium -d ../contracts --fix` in the project root directory. As alternative you can use the [solium-fix-contracts.bash](./solium-fix-contracts.bash) from the bin directory. This action may alter some of the existent contacts.


# The contract explained

The bidding logic is simple, more users are able to engage in a bidding action. Each user can bid his/her offer as many time he/she wants. Only the last bid is taken in consideration - this means the new bids will replace the old one, if any.
The bidder with the greatest bid value winns.

We deal with two kind of users, bidders and contract owner (only one of this kind).
*Only the contract owner* is able to query for the winner. All the other users are only bidding.

The user are identified after their [Blockchain address](https://blockgeeks.com/guides/blockchain-address-101/), if you want to add more users then you need to add new accounts to your chain.

## Events and their semantic

Following events are available that far:

1. NewMaxBid - used to signal that a new bid value appears.
