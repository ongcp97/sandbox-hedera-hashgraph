import {
    Client,
    Hbar,
    TokenAssociateTransaction
} from '@hashgraph/sdk';

export async function associateToken(
    operatorAccountId, operatorPrivateKey,
    accountId, accountPvKey,
    payAccountId, // 
    tokenIdArray) {
    try {

        if (payAccountId === accountId) {

            // Fee paid by account being associated.

            const payerAccountId = accountId;
            const payerPrivateKey = accountPvKey;

        } else {

            // Fee paid by operator.

            const payerAccountId = operatorAccountId;
            const payerPrivateKey = operatorPrivateKey;
        }

        const client = Client.forTestnet().setOperator(payerAccountId, payerPrivateKey);


        const associateTokenTx = await new TokenAssociateTransaction()
            .setAccountId(accountId)
            .setTokenIds(tokenIdArray)
            .freezeWith(client)
            .sign(accountPvKey);

        //Submit the transaction to a Hedera network
        const associateTokenTxSubmit = await associateTokenTx.execute(client);

        //Get the transaction receipt
        const associateTokenRx = await associateTokenTxSubmit.getReceipt(client);

        //Confirm the transaction was successful
        console.log(`- Token association for account ${transfer_to_account_id}: ${associateTokenRx.status}\n`);

        return true;

    } catch (error) {
        console.error("Error associating token:", error);
        return false;
    }
}