import { ethers } from "hardhat";

async function main() {
	const myERC20 = await ethers.getContractAt("MyERC20", "0x8F21657a7eA75383bD5723b10747DCFA05e6268A");
	
	const owner = await ethers.provider.getSigner(0);
	const recipient = "0xC114Cb365FD75b8bf15739126E6EDD7b8A39A606";
	const spender = await ethers.provider.getSigner(1);

	// Check initial balances
	console.log("Initial balances:");
	console.log("Owner:", ethers.formatEther(await myERC20.balanceOf(await owner.getAddress())));
	console.log("Recipient:", ethers.formatEther(await myERC20.balanceOf(recipient)));

	// Transfer tokens
	const transferAmount = ethers.parseEther("100");
	console.log("\nTransferring 100 tokens to recipient...");
	const transferTx = await myERC20.connect(owner).transfer(recipient, transferAmount);
	await transferTx.wait();

	// Check balances after transfer
	console.log("Balances after transfer:");
	console.log("Owner:", ethers.formatEther(await myERC20.balanceOf(await owner.getAddress())));
	console.log("Recipient:", ethers.formatEther(await myERC20.balanceOf(recipient)));

	// Approve spending
	const approvalAmount = ethers.parseEther("50");
	console.log("\nApproving spender to spend 50 tokens...");
	const approvalTx = await myERC20.connect(owner).approve(await spender.getAddress(), approvalAmount);
	await approvalTx.wait();

	// Check allowance
	console.log("Allowance for spender:", ethers.formatEther(await myERC20.allowance(await owner.getAddress(), await spender.getAddress())));

	// Perform transferFrom
	const transferFromAmount = ethers.parseEther("25");
	console.log("\nPerforming transferFrom of 25 tokens...");
	const transferFromTx = await myERC20.connect(spender).transferFrom(await owner.getAddress(), recipient, transferFromAmount);
	await transferFromTx.wait();

	// Final balance check
	console.log("Final balances:");
	console.log("Owner:", ethers.formatEther(await myERC20.balanceOf(await owner.getAddress())));
	console.log("Recipient:", ethers.formatEther(await myERC20.balanceOf(recipient)));
	console.log("Remaining allowance for spender:", ethers.formatEther(await myERC20.allowance(await owner.getAddress(), await spender.getAddress())));
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
