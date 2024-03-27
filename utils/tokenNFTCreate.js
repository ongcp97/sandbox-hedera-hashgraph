import {
    Hbar,
    TokenCreateTransaction,
    TokenType
} from '@hashgraph/sdk';

export async function createNFT(
    client,
    treasuryAccId, treasuryAccPvKey, maxHbarTxFee,
    supplyKey, pauseKey, kycKey, wipeKey, freezeKey, feeScheduleKey,
    tokenName, tokenSymbol, tokenDecimals, tokenInitialSupply) {
    try {
        const createTokenTxn = await new TokenCreateTransaction()
            .setTokenName(tokenName)
            .setTokenSymbol(tokenSymbol)
            .setTokenType(TokenType.NonFungibleUnique)
            .setDecimals(tokenDecimals)
            .setInitialSupply(tokenInitialSupply)
            .setTreasuryAccountId(treasuryAccId)
            .setAdminKey(treasuryAccPvKey)
            .setSupplyKey(supplyKey)
            .setPauseKey(pauseKey)
            .setKycKey(kycKey)
            .setWipeKey(wipeKey)
            .setFreezeKey(freezeKey)
            .setFeeScheduleKey(feeScheduleKey)
            .setMaxTransactionFee(new Hbar(maxHbarTxFee))
            .freezeWith(client); //freeze tx from from any further mods.

        const createTokenTxnSigned = await createTokenTxn.sign(treasuryAccPvKey);
        const txnResponse = await createTokenTxnSigned.execute(client);

        const txnRx = await txnResponse.getReceipt(client);
        const txnStatus = txnRx.status.toString();
        const tokenId = txnRx.tokenId;
        if (tokenId === null) {
            throw new Error("Error: tokenId is null.");
        }
        console.log(
            `Token Type Creation was a ${txnStatus} and was created with token id: ${tokenId}. View at:`
        );
        const tokenExplorerUrl = `https://hashscan.io/testnet/token/${tokenId}`;
        console.log(tokenExplorerUrl);

        return tokenId;
    } catch (error) {
        console.log(error)
        console.error("Error creating account:", error);
        throw error;
    }
}