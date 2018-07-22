// Replace keys with wallet service
module.exports = {

  domain: 'localhost', // tslint:disable-line
  port: '8545', // tslint:disable-line
  gasPrice: '1', // tslint:disable-line
  gas: '1000000', // tslint:disable-line
  seed: 'candy maple cake sugar pudding cream honey rich smooth crumble sweet treat', // tslint:disable-line
  ownerAddress: '0x627306090abaB3A6e1400e9345bC60c78a8BEf57', // tslint:disable-line
  ownerPrivateKey: '0xc87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3', // tslint:disable-line
  travelTargetsAddress: '0xf25186b5081ff5ce73482ad761db0eb0d25abfbf', // tslint:disable-line
  travelTargetsAbi: [ // tslint:disable-line
    {
      "constant": true,
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "fromLocation",
          "type": "string"
        },
        {
          "indexed": false,
          "name": "toLocation",
          "type": "string"
        },
        {
          "indexed": false,
          "name": "arrivalTime",
          "type": "uint256"
        }
      ],
      "name": "TravelTargetAdded",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "fromLocation",
          "type": "string"
        },
        {
          "name": "toLocation",
          "type": "string"
        },
        {
          "name": "arrivalTime",
          "type": "uint256"
        },
        {
          "name": "metaData",
          "type": "uint256[]"
        }
      ],
      "name": "addTarget",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
}
