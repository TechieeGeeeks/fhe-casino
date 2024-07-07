const { ethers } = require("hardhat");

async function main() {
    await run("compile");
    const accounts = await ethers.getSigners();
    const deployer = accounts[0];

    console.log("------------------------------------------------------------------");
    console.log("Deploying USDC Contract...");
    const usdcContractFactory = await ethers.getContractFactory("USDC");
    const usdc = await usdcContractFactory.connect(deployer).deploy();
    await usdc.deployed();
    console.log("USDC Contract address is:", usdc.address);
    console.log("USDC Contract has been Deployed");

    console.log("------------------------------------------------------------------");
    console.log("Deploying Game Contracts...");

    const coinFactory = await ethers.getContractFactory("CoinFlip");
    const coinFlip = await coinFactory.connect(deployer).deploy(usdc.address);
    await coinFlip.deployed();
    console.log("CoinFlip Contract address is:", coinFlip.address);

    const diceFactory = await ethers.getContractFactory("Dice");
    const dice = await diceFactory.connect(deployer).deploy(usdc.address);
    await dice.deployed();
    console.log("Dice Contract address is:", dice.address);

    const minesFactory = await ethers.getContractFactory("Mines");
    const mines = await minesFactory.connect(deployer).deploy(usdc.address);
    await mines.deployed();
    console.log("Mines Contract address is:", mines.address);

    const plinkoFactory = await ethers.getContractFactory("Plinko");
    const plinko = await plinkoFactory.connect(deployer).deploy(usdc.address);
    await plinko.deployed();
    console.log("Plinko Contract address is:", plinko.address);

    const rockPaperScissorsFactory = await ethers.getContractFactory("RockPaperScissors");
    const rockPaperScissors = await rockPaperScissorsFactory.connect(deployer).deploy(usdc.address);
    await rockPaperScissors.deployed();
    console.log("RockPaperScissors Contract address is:", rockPaperScissors.address);

    const slotMachineFactory = await ethers.getContractFactory("SlotMachine");
    const slotMachine = await slotMachineFactory.connect(deployer).deploy(usdc.address);
    await slotMachine.deployed();
    console.log("SlotMachine Contract address is:", slotMachine.address);

    console.log("All Game Contracts have been deployed");
    console.log("------------------------------------------------------------------");

    console.log("Initializing USDC Contract...");
    const usdcInitializationTx = await usdc.initialize(
        [
            coinFlip.address,
            dice.address,
            mines.address,
            plinko.address,
            rockPaperScissors.address,
            slotMachine.address,
        ],
        { gasLimit: 2000000 }
    );
    await usdcInitializationTx.wait();
    console.log("All Game Contracts have been approved");
    console.log("------------------------------------------------------------------");

    console.log("Initializing Game Contracts...");

    const initializeCoinFlipTx = await coinFlip.initialize({ gasLimit: 2000000 });
    await initializeCoinFlipTx.wait();
    console.log("CoinFlip Contract is Initialized");

    const initializeDiceTx = await dice.initialize({ gasLimit: 2000000 });
    await initializeDiceTx.wait();
    console.log("Dice Contract is Initialized");

    const initializeMinesTx = await mines.initialize({ gasLimit: 2000000 });
    await initializeMinesTx.wait();
    console.log("Mines Contract is Initialized");

    const initializePlinkoTx = await plinko.initialize({ gasLimit: 2000000 });
    await initializePlinkoTx.wait();
    console.log("Plinko Contract is Initialized");

    const initializeRockPaperScissorsTx = await rockPaperScissors.initialize({ gasLimit: 2000000 });
    await initializeRockPaperScissorsTx.wait();
    console.log("Rock Paper Scissors Contract is Initialized");

    const initializeSlotMachineTx = await slotMachine.initialize({ gasLimit: 2000000 });
    await initializeSlotMachineTx.wait();
    console.log("Slot Machine Contract is Initialized");

    console.log("All contracts approved and initialized successfully!");
    console.log("------------------------------------------------------------------");

    console.log("Trying to play all Games...");
    const wagerValue = ethers.utils.parseUnits("10", "ether");
    const stopGainValue = ethers.utils.parseUnits("1000", "ether");
    const stopLossValue = ethers.utils.parseUnits("0", "ether");
    const numBets = 10;

    const playCoinFlipTx = await coinFlip.COINFLIP_PLAY(
        wagerValue,
        true,
        numBets,
        stopGainValue,
        stopLossValue,
        { gasLimit: 2000000 }
    );
    await playCoinFlipTx.wait();

    console.log("Coin Flip is Playable");

    const diceTx = await dice.DICE_PLAY(75,true,wagerValue,{gasLimit:2000000})
    await diceTx.wait();
    console.log("Dice is Playable");

    const minesBettingPositions = [[1,2],[0,4],[3,1]];
    const minesTx = await mines.MINES_PLAY(minesBettingPositions,4,wagerValue,{gasLimit:2000000});
    await minesTx.wait();
    console.log("Mines is Playable");

    const plinkoTx = await plinko.PLINKO_PLAY(wagerValue,{gasLimit:2000000})
    await plinkoTx.wait();
    console.log("Plinko is Playable");

    const rockPaperScissorsTx = await rockPaperScissors.ROCKPAPERSCISSORS_PLAY(wagerValue,1,30,stopGainValue,stopLossValue,{gasLimit:2000000});
    await rockPaperScissorsTx.wait();
    console.log("Rock Paper Scissors is Playable");

    const slotMachineTx = await slotMachine.SLOTMACHINE_PLAY(wagerValue,{gasLimit:2000000});
    await slotMachineTx.wait();
    console.log("Slot Machine is Playable");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
