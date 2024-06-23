require('@nomiclabs/hardhat-waffle');

const sec = require('C:\\Blockchain\\config');

module.exports = {
    solidity: "0.8.0",
    networks: {
        bscTestnet: {
            url: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
            chainId: 97,
            gasPrice: 20000000000,
            accounts: [sec.sec]
        }
    }
};