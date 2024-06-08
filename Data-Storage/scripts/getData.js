const hre = require('hardhat');

async function main() {
    const DataStorage = await hre.ethers.getContractFactory('DataStorage');
    const dataStorage = await DataStorage.attach('0x7157Dd02EAeADc9B5694CC2520F8bb8FD8151BA7');

    console.log('Data: ', await dataStorage.getData());
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });