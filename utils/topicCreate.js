import {
	TopicCreateTransaction
} from '@hashgraph/sdk';

export async function createTopic(client, submitKey, TopicMemo) {
	try {
		//Create the transaction
		const transaction = new TopicCreateTransaction()
			.setSubmitKey(submitKey)
			.setTopicMemo(TopicMemo);

		//Sign with the client operator private key and submit the transaction to a Hedera network
		const txResponse = await transaction.execute(client);

		//Request the receipt of the transaction
		const receipt = await txResponse.getReceipt(client);

		//Get the topic ID
		const newTopicId = receipt.topicId;

		console.log("The new topic ID is " + newTopicId);
		console.log(`https://hashscan.io/testnet/topic/${newTopicId}?p=1`);

		return receipt;
		
	} catch (error) {
		console.error("Error creating new topic:", error);
		throw error;
	}
}