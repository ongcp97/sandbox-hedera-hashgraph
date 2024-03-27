import {
	TopicMessageQuery
} from '@hashgraph/sdk';

export async function queryMsg(client, topicId, startTime) {
	try {
		//Create the transaction
		new TopicMessageQuery()
			.setTopicId(topicId)
			.setStartTime(startTime)
			.subscribe(
				client,
				(message) => console.log(Buffer.from(message.contents, "utf8").toString())
			);
		return true;
	} catch (error) {
		console.error("Error creating new topic:", error);
		return false;
	}
}