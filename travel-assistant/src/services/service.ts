import { Provides } from 'typescript-ioc';
import {EventType, Goal, GoalType, TripSuggestion} from "../models/model";
import {Web3Util} from "./web3-services";

const ethConfig = require('../../eth-config.js');

export abstract class GoalManagerService {
  abstract setGoalForUser(userId: string, goal: GoalType): void;
  abstract getGoal(goalId: string): GoalType;
}

@Provides(GoalManagerService)
export class GoalManagerServiceImpl implements GoalManagerService {
  readonly goals: Map<string, Goal>;

  constructor() {
    this.goals = new Map<string, Goal>()
  }

  async setGoalForUser(userId: string, goal: GoalType): Promise<void> {
    const web3 = Web3Util.buildWeb3('http', ethConfig.domain, ethConfig.port);
    const rawTx = Web3Util.buildRawTransaction(
      web3,
     'addTarget',
      ethConfig.travelTargetsAbi,
      ethConfig.travelTargetsAddress,
      [
        goal.fromLocation,
        goal.toLocation,
        goal.arrivalTime,
        [goal.metadata.maxStops, goal.metadata.timeFlexibility, goal.metadata.serviceClass]],
      1,
      '1000000000',
      ethConfig.ownerAddress // since we don't have UserManagement, we use Admin's address
    );

    const reciept = await Web3Util.invokeTransaction(web3, rawTx);
    console.log(reciept);
  }

  getGoal(goalId: string): GoalType {
    return this.goals.get(goalId);
  }
}

export abstract class RecommendService {
  abstract recommend(goal: GoalType): Array<TripSuggestion>;
}

@Provides(RecommendService)
export class RecommendServiceImpl implements RecommendService{
  recommend(goal: GoalType): Array<TripSuggestion> {
    return undefined;
  }
}

export abstract class EventObserver {
  abstract onEvent(event: EventType): any;
}

@Provides(EventObserver)
export class EventObserverImpl implements EventObserver {
  onEvent(event: EventType): any {
    //
  }
}


