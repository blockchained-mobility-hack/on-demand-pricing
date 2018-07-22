import {Provides} from 'typescript-ioc';
import {Web3Util} from "./web3-service";

const ethConfig = require('../../eth-config.js'); // tslint:disable-line

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
export class TargetsServiceImpl implements TargetsService {

  constructor() {
    // nothing so far
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
    const web3 = Web3Util.buildWeb3('http', ethConfig.domain, ethConfig.port);
    const rawTx = Web3Util.buildRawTransaction(
      web3,
     'addTarget',
      ethConfig.travelTargetsAbi,
      ethConfig.travelTargetsAddress,
      [
        fromLocation,
        toLocation,
        arrivalTime,
        [maxStops, timeFlexibility, serviceClass]],
      1,
      '1000000000',
      ethConfig.ownerAddress // since we don't have UserManagement, we use Admin's address
    );

    const reciept = await Web3Util.invokeTransaction(web3, rawTx);
    console.log(reciept); // tslint:disable-line
  }
}
