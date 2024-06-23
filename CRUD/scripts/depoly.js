const hre = require("hardhat");

async function main() {
  const CRUD_APP = await hre.ethers.getContractFactory("CRUD_APP");
  const database = await CRUD_APP.deploy();

  await database.deployed();

  console.log("CRUD_APP deployed to:", database.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });