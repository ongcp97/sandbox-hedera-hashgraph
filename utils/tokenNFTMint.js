import {
    Hbar,
    TokenMintTransaction
} from '@hashgraph/sdk';

export async function mintNFT(
    client,
    maxHbarTxFee,
    tokenId, supplyKey,
    CIDArray) {
    try {
        const mintTx = new TokenMintTransaction()
            .setTokenId(tokenId)
            .setMetadata(CIDArray) //Batch minting - UP TO 10 NFTs in single tx
            .setMaxTransactionFee(new Hbar(maxHbarTxFee))
            .freezeWith(client);

        //Sign the transaction with the supply key
        const mintTxSign = await mintTx.sign(supplyKey);

        //Submit the transaction to a Hedera network
        const mintTxSubmit = await mintTxSign.execute(client);

        //Get the transaction receipt
        const mintRx = await mintTxSubmit.getReceipt(client);

        //Log the serial number
        for (const serial of mintRx.serials) {
            console.log(`- Created NFT ${tokenId} with serial: ${serial.low} \n`);
        }

        return mintRx.serials;
    } catch (error) {
        console.error("Error minting NFT:", error);
        throw error;
    }
}