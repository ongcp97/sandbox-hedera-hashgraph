import {
	TopicMessageSubmitTransaction
} from '@hashgraph/sdk';

export async function submitMsg(client, submitKey, topicId, topicMsg) {
	try {
		//Create the transaction
		const submitMsgTx = await new TopicMessageSubmitTransaction()
			.setTopicId(topicId)
			.setMessage(topicMsg)
			.freezeWith(client);

		const signedSubmitMsgTx = await submitMsgTx.sign(submitKey);
		const signedSubmitMsgTxResponse = await signedSubmitMsgTx.execute(client);

		//Request the receipt of the transaction
		const signedSubmitMsgTxReceipt = await signedSubmitMsgTxResponse.getReceipt(client);

		// console.log(signedSubmitMsgTxReceipt)

		return true;
	} catch (error) {
		console.error("Error creating new topic:", error);
		return false;
	}
}