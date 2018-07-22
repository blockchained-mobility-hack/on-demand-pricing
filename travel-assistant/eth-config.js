// Replace keys with wallet service
module.exports = {

  domain: 'localhost',
  port: '8545',
  gasPrice: '1',
  gas: '1000000',
  seed: 'candy maple cake sugar pudding cream honey rich smooth crumble sweet treat',
  ownerAddress: '0x627306090abaB3A6e1400e9345bC60c78a8BEf57',
  ownerPrivateKey: '0xc87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3',
  travelTargetsAddress: '0x345ca3e014aaf5dca488057592ee47305d9b3e10',
  travelTargetsAbi: [
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
