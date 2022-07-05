import { PaymentsUtils, NetworkType, Payport, AutoFeeLevels, FeeRate, BalanceResult, BlockInfo } from '../lib-common';
import { Logger, Numeric } from '../ts-common';
import TronWeb from 'tronweb';
import { isValidXprv, isValidXpub, isValidPrivateKey, privateKeyToAddress } from './helpers';
import { BaseTronPaymentsConfig, TronTransactionInfo } from './types';
export declare class TronPaymentsUtils implements PaymentsUtils {
    readonly coinSymbol = "TRX";
    readonly coinName = "Tron";
    readonly coinDecimals = 6;
    readonly networkType: NetworkType;
    logger: Logger;
    fullNode: string;
    solidityNode: string;
    eventServer: string;
    tronweb: TronWeb;
    constructor(config?: BaseTronPaymentsConfig);
    init(): Promise<void>;
    destroy(): Promise<void>;
    isValidExtraId(extraId: string): boolean;
    isValidAddress(address: string): boolean;
    standardizeAddress(address: string): string | null;
    private _getPayportValidationMessage;
    getPayportValidationMessage(payport: Payport): string | undefined;
    validatePayport(payport: Payport): void;
    isValidPayport(payport: Payport): payport is Payport;
    toMainDenomination(amount: string | number): string;
    toBaseDenomination(amount: string | number): string;
    isValidXprv: typeof isValidXprv;
    isValidXpub: typeof isValidXpub;
    isValidPrivateKey: typeof isValidPrivateKey;
    privateKeyToAddress: typeof privateKeyToAddress;
    getFeeRateRecommendation(level: AutoFeeLevels): FeeRate;
    getCurrentBlockNumber(): Promise<number>;
    getAddressUtxos(): Promise<any[]>;
    getAddressNextSequenceNumber(): Promise<any>;
    protected canSweepBalanceSun(balanceSun: number): boolean;
    isAddressBalanceSweepable(balanceTrx: Numeric): boolean;
    getAddressBalance(address: string): Promise<BalanceResult>;
    private extractTxFields;
    getTransactionInfo(txid: string): Promise<TronTransactionInfo>;
    getBlock(id?: string | number): Promise<BlockInfo>;
}