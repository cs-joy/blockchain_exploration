async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address); // 0x635B7A071f9A9CDf516ec7482DC9bFdB7aA39629
  
    const balance = await deployer.getBalance();
    console.log("Account balance:", balance.toString());
  
    const DecentralizedDatabase = await ethers.getContractFactory("DecentralizedDatabase");
    const decentralizedDatabase = await DecentralizedDatabase.deploy();
  
    console.log("Contract deployed to address:", decentralizedDatabase.address); // 0x7213Ea3B9cC044434630C50bcea352F1B8396fc7
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  