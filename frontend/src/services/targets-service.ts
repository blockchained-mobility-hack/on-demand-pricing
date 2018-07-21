/**
 * Interface for TargetsService
 */
export abstract class TargetsService {

  abstract addTarget(
    fromLocation: string,
    toLocation: string,
    arrivalTime: number,
    maxStops?: number,
    timeFlexibility?: number,
    serviceClass?: number
  ): Promise<boolean | any>;

}

/**
 * Implementation for TargetsService
 */
export class TargetsServiceImpl implements TargetsService {

  async addTarget(): Promise<boolean | any> {

  }
}
