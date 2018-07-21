import {Provides} from 'typescript-ioc';
import {TransactionBuilder} from "./transactions-service";

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
@Provides(TargetsService)
export class TargetsServiceImpl extends TransactionBuilder implements TargetsService {

  /**
   * Adding new Travel target to the ledger
   */
  async addTarget(
    fromLocation: string,
    toLocation: string,
    arrivalTime: number,
    maxStops?: number,
    timeFlexibility?: number,
    serviceClass?: number
  ): Promise<boolean | any> {


  }
}
