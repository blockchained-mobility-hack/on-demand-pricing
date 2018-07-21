const Biddings = artifacts.require('./Bidding.sol')

contract('Biddings tests', (accounts) => {

  let contractInstance;
  let ownerAddress, winnerAddress, looserAddress, fromOwner, fromWinner, fromLooser;

  beforeEach('assign default variables values', async() => {
    contractInstance = await Biddings.new()
    ownerAddress = accounts[0]
    winnerAddress = accounts[1]
    looserAddress = accounts[2]
    fromOwner = {from: ownerAddress}
    fromWinner = {from: accounts[1]}
    fromLooser = {from: accounts[2]}

  })

  it('test bid', async() => {
    let successBid = await contractInstance.bid.call(10, new Date().getTime(), fromWinner)
    assert.isTrue(successBid, 'The bid was not succesfully')
  })

  it('the winner takes it all', async() => {
    let winnerValue = 10
    let winnerTimestamp = new Date().getTime()

    let winnerBid = await contractInstance.bid(winnerValue, winnerTimestamp, fromWinner)
    let loserBid = await contractInstance.bid(3, new Date().getTime(), fromLooser)

    // the winner can be only query from the contract owner (look at the fuction modifier)
    let winner = await contractInstance.winner.call(fromOwner)
    assert.equal(winnerAddress, winner[0], "Winner address expected.")
    assert.equal(winnerValue, winner[1], "Winner value expected.")
    assert.equal(winnerTimestamp, winner[2], "Winner timestamp expected.")
  })

  function isZeroAddress(address) {
    if (!address) return false
    addressType = Object.prototype.toString.call(address)
    return '[object Array]' == addressType
  }

  it('the loser standing small', async() => {
    let winnerValue = 10
    let winnerTimestamp = new Date().getTime()

    let winnerBid = await contractInstance.bid(winnerValue, winnerTimestamp, fromWinner)
    let loserBid = await contractInstance.bid(3, new Date().getTime(), fromLooser)

    let win = await contractInstance.isWinner.call(fromWinner)
    assert.isTrue(win, 'The winner must win the bid.')

    let loose = await contractInstance.isWinner.call(fromLooser)
    assert.isFalse(loose, 'The looser must lose the bid.')
  })

  it('test events', async() => {
    let winnerValue = 10
    let winnerTimestamp = new Date().getTime()
    let winnerBid = await contractInstance.bid(winnerValue, winnerTimestamp, fromWinner)
    let newMaxBidEvent = winnerBid.logs[0].args
    assert.equal(winnerAddress, newMaxBidEvent.bidderAddress, "Winner address expected.")
    assert.equal(winnerValue, newMaxBidEvent.value, "Winner value expected.")
    assert.equal(winnerTimestamp, newMaxBidEvent.date, "Winner timestamp expected.")
  })
})
