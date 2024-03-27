import {
	Hbar,
	TokenPauseTransaction,
	TokenUnpauseTransaction,
	TokenUpdateTransaction
} from '@hashgraph/sdk';


export async function pauseToken(
	client,
	pauseKey,
	tokenId,
) {
	try {
		//Create the token pause transaction, specify the token to pause, freeze the unsigned transaction for signing
		const transaction = new TokenPauseTransaction()
			.setTokenId(tokenId)
			.freezeWith(client);

		//Sign with the pause key 
		const signTx = await transaction.sign(pauseKey);

		//Submit the transaction to a Hedera network    
		const txResponse = await signTx.execute(client);

		//Request the receipt of the transaction
		const receipt = await txResponse.getReceipt(client);

		//Get the transaction consensus status
		const transactionStatus = receipt.status;

		console.log("The transaction consensus status " + transactionStatus.toString());

		return true;

	} catch (error) {
		console.error("Error pausing Token:", error);
		return false;
	}
}

export async function unpauseToken(
	client,
	pauseKey,
	tokenId,
) {
	try {
		//Create the token pause transaction, specify the token to pause, freeze the unsigned transaction for signing
		const transaction = new TokenUnpauseTransaction()
			.setTokenId(tokenId)
			.freezeWith(client);

		//Sign with the pause key 
		const signTx = await transaction.sign(pauseKey);

		//Submit the transaction to a Hedera network    
		const txResponse = await signTx.execute(client);

		//Request the receipt of the transaction
		const receipt = await txResponse.getReceipt(client);

		//Get the transaction consensus status
		const transactionStatus = receipt.status;

		console.log("The transaction consensus status " + transactionStatus.toString());

		return true;

	} catch (error) {
		console.error("Error unpausing Token:", error);
		return false;
	}
}


export async function updatePauseKey(
	client,
	adminKey,
	tokenId, newPauseKey,
) {
	try {
		//Create the transaction and freeze for manual signing
		const SetPauseKeyTx = await new TokenUpdateTransaction()
			.setTokenId(tokenId)
			.setPauseKey(newPauseKey)
			.freezeWith(client);

		// Sign with admin key if client is not admin
		const SignedSetPauseKeyTxResponse = await SetPauseKeyTx.sign(adminKey);

		//Submit the signed transaction to a Hedera network
		const SetPauseKeyTxResponse = await SignedSetPauseKeyTxResponse.execute(client);

		// Request the receipt of the transaction
		const SetPauseKeyTxReceipt = await SetPauseKeyTxResponse.getReceipt(client);

		//Get the transaction consensus status
		const SetPauseKeyTxStatus = SetPauseKeyTxReceipt.status.toString();

		console.log("The transaction consensus status is " + SetPauseKeyTxStatus);

		return true;

	} catch (error) {
		console.error("Error setting new Pause Key:", error);
		return false;
	}
}