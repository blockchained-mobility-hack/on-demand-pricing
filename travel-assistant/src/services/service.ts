import { Provides } from 'typescript-ioc';
import {EventType, Goal, GoalType, TripSuggeston} from "../models/model";

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

  setGoalForUser(userId: string, goal: GoalType): void {
    this.goals.set(userId, goal);
  }

  getGoal(goalId: string): GoalType {
    return this.goals.get(goalId);
  }
}

export abstract class RecommendService {
  abstract recommend(goal: GoalType): Array<TripSuggeston>;
}

@Provides(RecommendService)
export class RecommendServiceImpl implements RecommendService{
  recommend(goal: GoalType): Array<TripSuggeston> {
    return undefined;
  }
}

export abstract class EventObserver {
  abstract onEvent(event: EventType): any;
}

@Provides(EventObserver)
export class EventObserverImpl implements EventObserver {
  onEvent(event: EventType): any {
  }
}


