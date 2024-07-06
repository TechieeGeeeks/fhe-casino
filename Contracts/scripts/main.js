const { ethers } = require("hardhat");

async function main() {
    await run("compile");
    const accounts = await ethers.getSigners();
    const deployer = accounts[0];

    const usdcContractFactory = await ethers.getContractFactory("USDC");
    const usdc = await usdcContractFactory.connect(deployer).deploy();
    await usdc.deployed(); // Wait for the deployment to be mined
    console.log("USDC Contract address is:", usdc.address);

    const coinFactory = await ethers.getContractFactory("CoinFlip");
    const coinFlip = await coinFactory.connect(deployer).deploy(usdc.address);
    await coinFlip.deployed(); // Wait for the deployment to be mined
    console.log("CoinFlip Contract address is:", coinFlip.address);

    const diceFactory = await ethers.getContractFactory("Dice");
    const dice = await diceFactory.connect(deployer).deploy(usdc.address);
    await dice.deployed(); // Wait for the deployment to be mined
    console.log("Dice Contract address is:", dice.address);

    const minesFactory = await ethers.getContractFactory("Mines");
    const mines = await minesFactory.connect(deployer).deploy(usdc.address);
    await mines.deployed(); // Wait for the deployment to be mined
    console.log("Mines Contract address is:", mines.address);

    const plinkoFactory = await ethers.getContractFactory("Plinko");
    const plinko = await plinkoFactory.connect(deployer).deploy(usdc.address);
    await plinko.deployed(); // Wait for the deployment to be mined
    console.log("Plinko Contract address is:", plinko.address);

    const rockPaperScissorsFactory = await ethers.getContractFactory("RockPaperScissors");
    const rockPaperScissors = await rockPaperScissorsFactory.connect(deployer).deploy(usdc.address);
    await rockPaperScissors.deployed(); // Wait for the deployment to be mined
    console.log("RockPaperScissors Contract address is:", rockPaperScissors.address);

    const slotMachineFactory = await ethers.getContractFactory("SlotMachine");
    const slotMachine = await slotMachineFactory.connect(deployer).deploy(usdc.address);
    await slotMachine.deployed(); // Wait for the deployment to be mined
    console.log("SlotMachine Contract address is:", slotMachine.address);

    // Initialize USDC contract with the game contract addresses
    const usdcInitializationTx = await usdc.initialize([
        coinFlip.address,
        dice.address,
        mines.address,
        plinko.address,
        rockPaperScissors.address,
        slotMachine.address
    ],{gasLimit:2000000});
    await usdcInitializationTx.wait();

    const initializeCoinFlipTx = await coinFlip.initialize({gasLimit:2000000});
    await initializeCoinFlipTx.wait();

    const initializeDiceTx = await dice.initialize({gasLimit:2000000});
    await initializeDiceTx.wait();

    const initializeMinesTx = await mines.initialize({gasLimit:2000000});
    await initializeMinesTx.wait();

    const initializePlinkoTx = await plinko.initialize({gasLimit:2000000});
    await initializePlinkoTx.wait();

    const initializeRockPaperScissorsTx = await rockPaperScissors.initialize({gasLimit:2000000});
    await initializeRockPaperScissorsTx.wait();

    const initializeSlotMachineTx = await slotMachine.initialize({gasLimit:2000000});
    await initializeSlotMachineTx.wait();

    console.log("All contracts approved and initialized successfully!");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
