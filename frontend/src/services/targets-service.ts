import {Inject, Provides} from 'typescript-ioc';
import {ConfigService, ConfigurationKey} from './config-service';
import {TransactionBuilder} from "./transactions-service";

/**
 * Interface for TargetsService
 */
export abstract class TargetsService {

  public abstract addTarget(
    fromLocation: string,
    toLocation: string,
    arrivalTime: number,
    maxStops?: number,
    timeFlexibility?: number,
    serviceClass?: number
  ): Promise<boolean | any>;

}
// tslint:disable max-classes-per-file
/**
 * Implementation for TargetsService
 */
@Provides(TargetsService)
export class TargetsServiceImpl extends TransactionBuilder implements TargetsService {

  private readonly configService: ConfigService;

  constructor(@Inject configService: ConfigService) {
    super();
    this.configService = configService;
  }

  /**
   * Adding new Travel target to the ledger
   */
  public async addTarget(
    fromLocation: string,
    toLocation: string,
    arrivalTime: number,
    maxStops?: number,
    timeFlexibility?: number,
    serviceClass?: number
  ): Promise<boolean | any> {

    const args: any = [];
    args.push(fromLocation);
    args.push(toLocation);
    args.push(arrivalTime);
    args.push([maxStops, timeFlexibility, serviceClass]);

    const methodName = 'addTarget';

    const configKey = ConfigurationKey.TravelTargets;
    return super.buildRawTx(this.configService , configKey, methodName, args);

  }
}
