import {
    Hbar,
    Mnemonic,
    AccountCreateTransaction
} from '@hashgraph/sdk';

export async function createAccount(client, initialHbarBalance) {
    try {
        const mnemonic = await Mnemonic.generate12();
        const accountPrivateKey = await mnemonic.toPrivateKey();
        // const accountPrivateKey = PrivateKey.generateED25519();    

        const response = await new AccountCreateTransaction()
            .setInitialBalance(new Hbar(initialHbarBalance))
            .setKey(accountPrivateKey)
            .execute(client);

        const receipt = await response.getReceipt(client);
        const newAccountId = receipt.accountId
        const accountExplorerUrl = `https://hashscan.io/testnet/account/${receipt.accountId}`;
        console.log(accountExplorerUrl);

        return [newAccountId, mnemonic];
    } catch (error) {
        console.error("Error creating account:", error);
        throw error;
    }
}