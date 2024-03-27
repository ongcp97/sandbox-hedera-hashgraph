import {
	Hbar,
	TokenGrantKycTransaction, TokenRevokeKycTransaction
} from '@hashgraph/sdk';

export async function grantTokenKyc(
	client,
	tokenId, kycKey,
	accountId) {
	try {
		//Enable KYC flag on account and freeze the transaction for manual signing
		const transaction = await new TokenGrantKycTransaction()
			.setAccountId(accountId)
			.setTokenId(tokenId)
			.freezeWith(client);

		//Sign with the kyc private key of the token
		const signTx = await transaction.sign(kycKey);

		//Submit the transaction to a Hedera network    
		const txResponse = await signTx.execute(client);

		//Request the receipt of the transaction
		const receipt = await txResponse.getReceipt(client);

		//Get the transaction consensus status
		const transactionStatus = receipt.status;

		console.log("The transaction consensus status " + transactionStatus.toString());

		return true;

	} catch (error) {
		console.error("Error granting KYC:", error);
		return false;
	}
}

async function revokeTokenKyc(
	client,
	tokenId, kycKey,
	accountId) {
	try {
		//Enable KYC flag on account and freeze the transaction for manual signing
		const transaction = await new TokenRevokeKycTransaction()
			.setAccountId(accountId)
			.setTokenId(tokenId)
			.freezeWith(client);

		//Sign with the kyc private key of the token
		const signTx = await transaction.sign(kycKey);

		//Submit the transaction to a Hedera network    
		const txResponse = await signTx.execute(client);

		//Request the receipt of the transaction
		const receipt = await txResponse.getReceipt(client);

		//Get the transaction consensus status
		const transactionStatus = receipt.status;

		console.log("The transaction consensus status " + transactionStatus.toString());

		return true;

	} catch (error) {
		console.error("Error revoking KYC:", error);
		return false;
	}
}
