import {
    Client, PrivateKey, AccountId
} from '@hashgraph/sdk';
import dotenv from 'dotenv';

//  Example usage 
import {
	createNFT
} from './utils/tokenNFTCreate.js'

dotenv.config();
const operatorAccountId = AccountId.fromString(process.env.OPERATOR_ACCOUNT_ID);
const operatorPrivateKey = PrivateKey.fromString(process.env.OPERATOR_PRIVATE_KEY)
const client = Client.forTestnet().setOperator(operatorAccountId, operatorPrivateKey);

const treasuryAccId = operatorAccountId;
const treasuryAccPvKey = operatorPrivateKey;
const maxHbarTxFee = 30;

const supplyKey = PrivateKey.generateED25519();
const pauseKey = PrivateKey.generateED25519();
const kycKey = PrivateKey.generateED25519();
const wipeKey = PrivateKey.generateED25519();
const freezeKey = PrivateKey.generateED25519(); 
const feeScheduleKey = PrivateKey.generateED25519();

const tokenName = 'POTATO';
const tokenSymbol = 'POTATO';
const tokenDecimals = 0;
const tokenInitialSupply = 0;

const tokenId = createNFT(
    client,
    treasuryAccId, treasuryAccPvKey, maxHbarTxFee,
    supplyKey, pauseKey, kycKey, wipeKey, freezeKey, feeScheduleKey,
    tokenName, tokenSymbol, tokenDecimals, tokenInitialSupply);