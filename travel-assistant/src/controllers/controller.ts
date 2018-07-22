import {GET, Path, PathParam, PUT} from "typescript-rest";
import {Inject} from "typescript-ioc";
import {GoalManagerService, RecommendService} from "../services/service";
import {EventType, GoalType, TripSuggestion} from "../models/model";

@Path('/goal')
export class GoalController {
  readonly goalManagerService: GoalManagerService;

  constructor(@Inject goalManageerService: GoalManagerService) {
    this.goalManagerService = goalManageerService;
  }

  @PUT
  @Path(':userid')
  setNewGoal(@PathParam('userid') userId: string, gaol: GoalType): void {
    this.goalManagerService.setGoalForUser(userId, gaol);
  }
}

@Path('/recommend')
export class RecommenderController {
  readonly recommendService: RecommendService;
  readonly goalManageerService: GoalManagerService

  constructor(@Inject recommendService: RecommendService, @Inject goalManagerService: GoalManagerService) {
    this.recommendService = recommendService;
    this.goalManageerService = goalManagerService;
  }

  @GET
  @Path(':goalid')
  getRecommandations(@PathParam('goalid') goalid: string): Array<TripSuggestion> {
    const goal = this.goalManageerService.getGoal(goalid);
    return this.recommendService.recommend(goal);
  }
}


@Path('/event')
export class EventController {

  @PUT
  fire(event: EventType): void {
  }
}
