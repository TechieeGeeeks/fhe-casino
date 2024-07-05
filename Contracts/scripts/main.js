const {ethers} = require("hardhat")

async function main() {
    
    await run("compile")
    const accounts = await ethers.getSigners();
    const deployer = accounts[0];

    const usdcContractFactory = await ethers.getContractFactory("USDC");
    const usdc = await usdcContractFactory.connect(deployer).deploy();
    console.log("USDC Contract addresses is : ", usdc.address);

    const bankRollFactory = await ethers.getContractFactory("Bankroll");
    const bankRoll = await bankRollFactory.connect(deployer).deploy(usdc.address);
    console.log("Bank Roll Contract Address is ", bankRoll.address);
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})