import {Inject, Provides} from 'typescript-ioc';
import {ConfigService, ConfigurationKey} from './config-service';
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

  readonly configService: ConfigService;

  constructor(@Inject configService: ConfigService) {
    super();
    this.configService = configService;
  }

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

    const args = [];
    args.push(fromLocation);
    args.push(toLocation);
    args.push(arrivalTime);
    args.push([maxStops, timeFlexibility, serviceClass]);

    const methodName = 'addTarget';

    const configKey = ConfigurationKey.TravelTargets;
    return super.buildRawTx(this.configService , configKey, methodName, args);

  }
}
