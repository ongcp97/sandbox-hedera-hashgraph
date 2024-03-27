import {
    Hbar,
    AccountBalanceQuery,
    TransferTransaction
} from '@hashgraph/sdk';

export async function transferNFT(
    client,
    treasuryId, treasuryKey,
    accountId,
    tokenId, tokenSerial) {
    try {
        // Check the balance before the transfer for the treasury account
        var balanceCheckTx = await new AccountBalanceQuery().setAccountId(treasuryId).execute(client);
        console.log(`- Treasury balance: ${balanceCheckTx.tokens._map.get(tokenId.toString())} NFTs of ID ${tokenId}`);

        // Check the balance before the transfer for Transferee's account
        var balanceCheckTx = await new AccountBalanceQuery().setAccountId(accountId).execute(client);
        console.log(`- Transferee's balance: ${balanceCheckTx.tokens._map.get(tokenId.toString())} NFTs of ID ${tokenId}`);

        // Transfer the NFT from treasury to Transferee
        // Sign with the treasury key to authorize the transfer with serial number tokenSerial
        const tokenTransferTx = await new TransferTransaction()
            .addNftTransfer(tokenId, tokenSerial, treasuryId, accountId)
            .freezeWith(client)
            .sign(treasuryKey);

        const tokenTransferSubmit = await tokenTransferTx.execute(client);
        const tokenTransferRx = await tokenTransferSubmit.getReceipt(client);

        console.log(`\n- NFT transfer from Treasury to Transferee: ${tokenTransferRx.status} \n`);

        // Check the balance of the treasury account after the transfer
        var balanceCheckTx = await new AccountBalanceQuery().setAccountId(treasuryId).execute(client);
        console.log(`- Treasury balance: ${balanceCheckTx.tokens._map.get(tokenId.toString())} NFTs of ID ${tokenId}`);

        // Check the balance of Transferee's account after the transfer
        var balanceCheckTx = await new AccountBalanceQuery().setAccountId(accountId).execute(client);
        console.log(`- Transferee's balance: ${balanceCheckTx.tokens._map.get(tokenId.toString())} NFTs of ID ${tokenId}`);

        return true;

    } catch (error) {
        console.error("Error minting NFT:", error);
        return false;
    }
}