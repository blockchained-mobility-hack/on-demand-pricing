pragma solidity ^0.4.24;

contract TravelTargets {

    address public owner;

    /**
     * Registry of travel targets per User.
     * In given PoC we don't have User Management,
     * so, we will hardcode userID / address.
     */
    mapping (address => Target) travelTargets;

    /**
     * Travel Target Entity
     * describing the wish of the user to go
     * from location A to B, arrive by point of Time and
     * set requirements on the trip quality (direct or up to 1/2 stops, etc)
     */
    struct Target {
        string fromLocation;
        string toLocation;
        uint arrivalTime; // timestamp
        MetaData metaData;
    }

    /**
     * MetaData of the TripTarget
     */
    struct MetaData {
        uint maxStops; // set to 0 for Direct connection
        uint timeFlexibility; // +/- 3 hours flexibility on ArrivalTime
        uint class; // 0 - for Economy/2nd Class; 1 - for 1st (or Business) Class
    }

    constructor () public {
        owner = msg.sender;
    }

    /**
     * Add new Target for User
     */
    function addTarget(
        string fromLocation,
        string toLocation,
        uint arrivalTime,
        uint[] metaData // metaData[0] - maxStops; metaData[1] - timeFlexibility; metaData[2] - class;
    ) public
    returns (bool) {
        // right now (hackathon PoC) it will add all targets for single user (owner of the contract)
        travelTargets[owner] = Target(
            fromLocation,
            toLocation,
            arrivalTime,
            setMetaData(metaData)
        );
        emit TravelTargetAdded(fromLocation, toLocation, arrivalTime);
        return true;
    }

    /**
     * Builds MetaData entity for us
     */
    function setMetaData(uint[] metaData) private
    returns (MetaData) {
        return MetaData(metaData[0], metaData[1], metaData[2]);
    }

    // indicates that a new user was added
    event TravelTargetAdded(string fromLocation, string toLocation, uint arrivalTime);
}
