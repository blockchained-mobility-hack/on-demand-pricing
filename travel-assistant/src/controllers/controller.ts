import {GET, Path, PathParam, PUT} from "typescript-rest";
import {Inject} from "typescript-ioc";
import {GoalManagerService, RecommendService} from "../services/service";
import {EventType, GoalType, TripSuggeston} from "../models/model";

@Path('/goal')
export class GoalController {
  readonly goalManageerService: GoalManagerService;

  constructor(@Inject goalManageerService: GoalManagerService) {
    this.goalManageerService = goalManageerService;
  }

  @PUT
  @Path(':userid')
  setNewGoal(@PathParam('userid') userId: string, gaol: GoalType): void {
    this.goalManageerService.setGoalForUser(userId, gaol);
  }
}

@Path('/recommend')
export class RecommenderController {
  readonly recommendService: RecommendService;
  readonly goalManageerService: GoalManagerService

  constructor(@Inject recommenderService: RecommendService, @Inject goalManageerService: GoalManagerService) {
    this.recommendService = recommenderService;
    this.goalManageerService = goalManageerService;
  }

  @GET
  @Path(':goalid')
  getRecommandations(@PathParam('goalid') goalid: string): Array<TripSuggeston> {
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
