async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const DecentralizedDatabase = await ethers.getContractFactory("DecentralizedDatabase");
  const database = await DecentralizedDatabase.deploy();
  await database.deployed();

  console.log("DecentralizedDatabase deployed to:", database.address); // 0x599AFd2901651b2Fd1D588B01B5b3D53BA35cc48
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
