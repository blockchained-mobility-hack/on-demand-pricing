const TravelTargets = artifacts.require('./TravelTargets.sol')

contract('Travel Targets tests', (accounts) => {

  let contractInstance;
  let ownerAddress;

  beforeEach('assign default variables values', async() => {
    contractInstance = await TravelTargets.new()
    ownerAddress = accounts[0]
  })

  it('test addTarget', async() => {
    let success = await contractInstance.addTarget.call('Munich', 'Berlin', new Date().getTime(), [1, 3, 0])
    assert.isTrue(success, 'The Target was added succesfully')
  })

  it('test events', async() => {
    let fromLocation = 'Munich'
    let toLocation = 'Berlin'
    let arrivalTime = new Date().getTime()
    let success = await contractInstance.addTarget(fromLocation, toLocation, arrivalTime, [1, 3, 0])
    let newTargetEvent = success.logs[0].args
    assert.equal(fromLocation, newTargetEvent.fromLocation, "Departure location expected.")
    assert.equal(toLocation, newTargetEvent.toLocation, "Destination location expected.")
    assert.equal(arrivalTime, newTargetEvent.arrivalTime, "Arrival time expected.")
  })
})
