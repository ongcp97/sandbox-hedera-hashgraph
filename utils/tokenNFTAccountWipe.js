import {
	Client,
	Hbar,
	TokenWipeTransaction
} from '@hashgraph/sdk';

export async function wipeAccountNFT(
	operatorAccountId, operatorPrivateKey,
	accountId, accountPvKey,
	payAccountId,
	wipeKey,
	tokenId,
	tokenSerialsArray,
	accountId) {
	try {

		if (payAccountId === accountId) {

			// Fee paid by account whose token is being wiped.

			const payerAccountId = accountId;
			const payerPrivateKey = accountPvKey;

		} else {

			// Fee paid by operator.

			const payerAccountId = operatorAccountId;
			const payerPrivateKey = operatorPrivateKey;
		}

		const client = Client.forTestnet().setOperator(payerAccountId, payerPrivateKey);

		//Wipe token from an account and freeze the unsigned transaction for manual signing
		const transaction = await new TokenWipeTransaction()
			.setAccountId(accountId)
			.setTokenId(tokenId)
			.setSerials(tokenIdArray)
			.freezeWith(client);

		//Sign with the payer account private key, sign with the wipe private key of the token
		const signTx = await (await transaction.sign(accountKey)).sign(wipeKey);

		//Submit the transaction to a Hedera network    
		const txResponse = await signTx.execute(client);

		//Request the receipt of the transaction
		const receipt = await txResponse.getReceipt(client);


		//Obtain the transaction consensus status
		const transactionStatus = receipt.status;

		console.log("The transaction consensus status is " + transactionStatus.toString());

		return true;

	} catch (error) {
		console.error("Error wiping NFT:", error);
		return false;
	}
}