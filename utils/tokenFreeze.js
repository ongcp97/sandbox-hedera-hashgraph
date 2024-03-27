import {
	Hbar,
	TokenFreezeTransaction,
	TokenUnfreezeTransaction
} from '@hashgraph/sdk';

export async function freezeAccountToken(
	client,
	tokenId, freezeKey,
	accountId) {
	try {
		//Freeze an account from transferring a token
		const transaction = await new TokenFreezeTransaction()
			.setAccountId(accountId)
			.setTokenId(tokenId)
			.freezeWith(client);

		//Sign with the freeze key of the token 
		const signTx = await transaction.sign(freezeKey);

		//Submit the transaction to a Hedera network    
		const txResponse = await signTx.execute(client);

		//Request the receipt of the transaction
		const receipt = await txResponse.getReceipt(client);

		//Get the transaction consensus status
		const transactionStatus = receipt.status;

		console.log("The transaction consensus status " + transactionStatus.toString());

		return true;

	} catch (error) {
		console.error("Error freezing Token:", error);
		return false;
	}
}


export async function unfreezeAccountToken(
	client,
	tokenId, freezeKey,
	accountId) {
	try {
		//Freeze an account from transferring a token
		const transaction = await new TokenUnfreezeTransaction()
			.setAccountId(accountId)
			.setTokenId(tokenId)
			.freezeWith(client);

		//Sign with the freeze key of the token 
		const signTx = await transaction.sign(freezeKey);

		//Submit the transaction to a Hedera network    
		const txResponse = await signTx.execute(client);

		//Request the receipt of the transaction
		const receipt = await txResponse.getReceipt(client);

		//Get the transaction consensus status
		const transactionStatus = receipt.status;

		console.log("The transaction consensus status " + transactionStatus.toString());

		return true;

	} catch (error) {
		console.error("Error unfreezing Token:", error);
		return false;
	}
}



