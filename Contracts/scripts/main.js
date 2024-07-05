const { ethers } = require("hardhat");

async function main() {
    await run("compile");
    const accounts = await ethers.getSigners();
    const deployer = accounts[0];

    const usdcContractFactory = await ethers.getContractFactory("USDC");
    const usdc = await usdcContractFactory.connect(deployer).deploy();
    await usdc.deployed(); // Wait for the deployment to be mined
    console.log("USDC Contract address is:", usdc.address);

    const bankRollFactory = await ethers.getContractFactory("Bankroll");
    const bankRoll = await bankRollFactory.connect(deployer).deploy(usdc.address);
    await bankRoll.deployed(); // Wait for the deployment to be mined
    console.log("Bank Roll Contract address is:", bankRoll.address);

    const coinFactory = await ethers.getContractFactory("CoinFlip");
    const coinFlip = await coinFactory.connect(deployer).deploy(usdc.address, bankRoll.address);
    await coinFlip.deployed(); // Wait for the deployment to be mined
    console.log("CoinFlip Contract address is:", coinFlip.address);

    const diceFactory = await ethers.getContractFactory("Dice");
    const dice = await diceFactory.connect(deployer).deploy(usdc.address, bankRoll.address);
    await dice.deployed(); // Wait for the deployment to be mined
    console.log("Dice Contract address is:", dice.address);

    const minesFactory = await ethers.getContractFactory("Mines");
    const mines = await minesFactory.connect(deployer).deploy(usdc.address, bankRoll.address);
    await mines.deployed(); // Wait for the deployment to be mined
    console.log("Mines Contract address is:", mines.address);

    const plinkoFactory = await ethers.getContractFactory("Plinko");
    const plinko = await plinkoFactory.connect(deployer).deploy(usdc.address, bankRoll.address);
    await plinko.deployed(); // Wait for the deployment to be mined
    console.log("Plinko Contract address is:", plinko.address);

    const rockPaperScissorsFactory = await ethers.getContractFactory("RockPaperScissors");
    const rockPaperScissors = await rockPaperScissorsFactory.connect(deployer).deploy(usdc.address, bankRoll.address);
    await rockPaperScissors.deployed(); // Wait for the deployment to be mined
    console.log("RockPaperScissors Contract address is:", rockPaperScissors.address);

    const slotMachineFactory = await ethers.getContractFactory("SlotMachine");
    const slotMachine = await slotMachineFactory.connect(deployer).deploy(usdc.address, bankRoll.address);
    await slotMachine.deployed(); // Wait for the deployment to be mined
    console.log("SlotMachine Contract address is:", slotMachine.address);

    // Parsing large value for approval
    const valueToSend = ethers.BigNumber.from('10000000000000000000000000000');
    console.log(valueToSend);
    const gasLimit = ethers.BigNumber.from('7920027');
    console.log("went through");

    const approveTx = await usdc.approve(bankRoll.address, valueToSend, { gasLimit });
    await approveTx.wait();

    const initializeTx = await bankRoll.initialize([
        coinFlip.address,
        dice.address,
        mines.address,
        plinko.address,
        rockPaperScissors.address,
        slotMachine.address
    ], { gasLimit });
    await initializeTx.wait(); // Wait for the initialize transaction to be mined
    console.log("I am here");

    const wagerValue = ethers.utils.parseUnits('10', "ether");

    const playCoinFlipTx = await coinFlip.COINFLIP_PLAY(
        wagerValue,
        true, { gasLimit: 8070006 }
    );
    await playCoinFlipTx.wait();

    console.log("CoinFlip play transaction completed!");

    // console.log("CoinFlip play transaction completed!");

    // const slotMachineTx = await slotMachine.SLOTMACHINE_PLAY(wagerValue, {
    //     gasLimit: 8070006
    // });
    // await slotMachineTx.wait();

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
