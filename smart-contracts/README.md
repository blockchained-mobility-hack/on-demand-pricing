# Purpose

This is simple educational purposed Blockchain bidding application.

Beside its educational purpose it can be used as template for a Blockchain/Ethereum project.

## Why it is special?

It contains a little bit more than classical [truffle init project](https://github.com/trufflesuite/truffle-init-default).
More precisely, here are some improvements from the truffle-init project:
1. the contract is a little bit more complex (it introduces a basic
rights management).
2. the tests are more compact and they make use of
[async/await](https://javascript.info/async-await)
3. it uses a style checker, if you commit code that violates the standards the
build will fail.
4. it is integrated in a
[software life cycle](https://en.wikipedia.org/wiki/Application_lifecycle_management) - Travis.

For more details of technical nature use consider the [developer read-me](./README-DEVELOPER.md).

## Why to use it?

1. Use it if you want to learn about Blockchain/Ethereum , ruffle, and other necessary evils.
2. Use this project if you want to setup a Blockchain/Ethereum truffle based project.
Just clone the project and add your contracts and test to the contract/test directory.
The rest can remain the same.

> About simplicity: the actual contract logic  is purposed that simple, it is used only to prove how ethereum Blockcahin works.
