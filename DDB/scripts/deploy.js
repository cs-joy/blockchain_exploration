async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    const balance = await deployer.getBalance();
    console.log("Account balance:", balance.toString());
  
    const DecentralizedDatabase = await ethers.getContractFactory("DecentralizedDatabase");
    const decentralizedDatabase = await DecentralizedDatabase.deploy();
  
    console.log("Contract deployed to address:", decentralizedDatabase.address); //0x332D507B3227f15e1189BF4d96C2fEF8e27B49BE
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  