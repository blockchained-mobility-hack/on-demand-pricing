pragma solidity ^0.4.22;

contract TreasuryContract {
    struct User {
        uint balance;   //when user is created, some balance is assigned to him/her
        string userName;
        bool exists;
    }
    
    struct UserTrip {
        string src;
        string dest;
        uint amountPaid;
        uint refund;
        address serviceProvider;
        uint spTripId;
        bool exists;
    }
    
    //address is the account address of user - serves as uniqueID too
    mapping (address=>User) userAddressToUserMapping;
    mapping (address=>mapping(uint=>UserTrip)) userToUserTripMapping;
    
    struct ServiceProvider {
        uint balance;   //This balances increase with each user trip but is also used to pay user in case of disruption
        string providerName;
        bool exists;
    }
    
    //address is the account address of service provider - serves as uniqueID too
    mapping (address=>ServiceProvider) spAddressToSpMapping;
    address[] allServiceProviders;
    
    struct ProviderTrips {
        uint tripId;        //unique
        string source;      //city
        string destination; //city
        uint cost;          
        uint departureTime; //Epoch
        uint arrivalTime;   //Epoch
        uint ruleId;        //unique
    }

    mapping (address=>mapping(uint=>ProviderTrips)) serviceProviderToTripIdToTripMapping;
    mapping (address=>mapping(string=>mapping(string=>uint))) spToSourceToDestinationToTripIDMapping;
    mapping (uint=>uint) ruleIdToDiscountRateMapping;
    
    //This method is super unsafe - for demo purposes only.
    //Right now same user can recreate his/her account - so do not use in production
    function createUser(uint _balance, string _userName){
        require(!userAddressToUserMapping[msg.sender].exists);
        userAddressToUserMapping[msg.sender] = User(_balance, _userName, true);
    }
    
    //Same rules apply to this method too -- read the previous comment
    function createServiceProvider(uint _balance, string _name){
        require(!spAddressToSpMapping[msg.sender].exists);
        spAddressToSpMapping[msg.sender] = ServiceProvider(_balance, _name, true);
        allServiceProviders.push(msg.sender);
    }
    
    function addNewProviderTrip(uint _id, string _src, string _dest, uint _cost, uint _deptTime, uint _arrTime, uint _ruleId, uint _discount){
        require(spAddressToSpMapping[msg.sender].exists);
        serviceProviderToTripIdToTripMapping[msg.sender][_id] = ProviderTrips(_id, _src, _dest, _cost, _deptTime, _arrTime, _ruleId);
        spToSourceToDestinationToTripIDMapping[msg.sender][_src][_dest] = _id;
        ruleIdToDiscountRateMapping[_ruleId] = _discount;
    }
    
    function getTripDetails(address _provider, uint _tripId) view returns(string, string, uint, uint, uint, uint){
        ProviderTrips _tempTrip = serviceProviderToTripIdToTripMapping[_provider][_tripId];
        return(_tempTrip.source, _tempTrip.destination, _tempTrip.cost, _tempTrip.departureTime, _tempTrip.arrivalTime,
            ruleIdToDiscountRateMapping[_tempTrip.ruleId]);
    }
    
    function getMatchingTrips(address _sp, string _source, string _destination) view returns(uint){
        return(spToSourceToDestinationToTripIDMapping[_sp][_source][_destination]);
    }
    
    function takeMoneyFromUser(address _userAddress, address _spAddress, uint _amount){
        spAddressToSpMapping[_spAddress].balance = spAddressToSpMapping[_spAddress].balance + _amount;
        userAddressToUserMapping[_userAddress].balance = userAddressToUserMapping[_userAddress].balance - _amount ;
    }
    
    function giveMoneyToUser(address _userAddress, address _spAddress, uint _amount){
        spAddressToSpMapping[_spAddress].balance = spAddressToSpMapping[_spAddress].balance - _amount;
        userAddressToUserMapping[_userAddress].balance = userAddressToUserMapping[_userAddress].balance + _amount ;
    }
    
    enum travelStates {start, running, stop}
    travelStates state;
    
    struct Event {
        travelStates state;
        uint timestamp;
        uint percentageCompletion;
        bool isDisrupted;
    }
    
    function startTrip(uint _userTripId, address _serviceProvider, uint _spTripId, string _src, string _dest){
        uint cost = serviceProviderToTripIdToTripMapping[_serviceProvider][_spTripId].cost;
        userToUserTripMapping[msg.sender][_userTripId] = UserTrip(_src, _dest, cost, 0, _serviceProvider, _spTripId, true);
    }
    
    mapping(address=>mapping(uint=>Event[])) userTripIdToStates;
    function setState(address _userId, uint _userTripId, travelStates _state, uint _time, uint _percentageComplete, bool _disruption){
        userTripIdToStates[_userId][_userTripId].push(Event(_state, _time, _percentageComplete, _disruption));
    }
    
    function endTrip(uint _userTripId, string _dest, uint _percentageComplete, bool _disruption){
        address serviceProvider = userToUserTripMapping[msg.sender][_userTripId].serviceProvider;
        takeMoneyFromUser(msg.sender, serviceProvider, userToUserTripMapping[msg.sender][_userTripId].amountPaid);
        
        if(_disruption){
            uint spTripId= userToUserTripMapping[msg.sender][_userTripId].spTripId;
            uint discountPercentage = ruleIdToDiscountRateMapping[serviceProviderToTripIdToTripMapping[serviceProvider][spTripId].ruleId];
            uint discount = getDisruptionDiscount(_percentageComplete, discountPercentage);       
            giveMoneyToUser(msg.sender, serviceProvider, discount);
        }
    }
    
    function getDisruptionDiscount(uint _percentageComplete, uint discountPercentage) returns (uint){
        return ((100 - _percentageComplete)*discountPercentage);
    }
    
    function getUserDetails() view returns(string, uint){
        return(userAddressToUserMapping[msg.sender].userName, userAddressToUserMapping[msg.sender].balance);
    }
    
    function getUserTripDetails(uint _tripId) view returns(string, string, uint, uint, address, uint){
        UserTrip tempVar = userToUserTripMapping[msg.sender][_tripId];
        return(tempVar.src,tempVar.dest, tempVar.amountPaid,tempVar.refund,tempVar.serviceProvider ,tempVar.spTripId);
    }
    
    function getserviceProviderDetails() view returns(string, uint){
        return(spAddressToSpMapping[msg.sender].providerName, spAddressToSpMapping[msg.sender].balance);
    }
}