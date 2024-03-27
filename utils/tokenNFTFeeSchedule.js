import {
	Hbar,
	TokenPauseTransaction,
	TokenUnpauseTransaction,
	TokenUpdateTransaction
} from '@hashgraph/sdk';


//  Example customFee. Empty Array for customFeeArray to remove all fee schedules.
// let customFee = new CustomFixedFee()
//     .setHbarAmount(new Hbar(1)) // 1 HBAR is transferred to the fee collecting account each time this token is transferred
//     .setFeeCollectorAccountId(feeCollectorAccountId) // 1 token is sent to this account everytime it is transferred
//     .setAllCollectorsAreExempt(true);

export async function updateTokenFeeSchedule(
	client,
	feeScheduleKey,
	feeCollectorAccountId, customFeeArray
) {
	try {
		//Create the transaction and freeze for manual signing
		const transaction = await new TokenFeeScheduleUpdateTransaction()
			.setTokenId(tokenId)
			.setCustomFees(customFeeArray)
			.freezeWith(client);

		//Sign the transaction with the fee schedule key
		const signTx = await transaction.sign(feeScheduleKey);

		//Submit the signed transaction to a Hedera network
		const txResponse = await signTx.execute(client);

		//Request the receipt of the transaction
		const receipt = await txResponse.getReceipt(client);

		//Get the transaction consensus status
		const transactionStatus = receipt.status.toString();

		console.log("The transaction consensus status is " + transactionStatus);

		return true;

	} catch (error) {
		
		console.error("Error updating Fee Schedule for Token:", error);

		return false;
	}
}