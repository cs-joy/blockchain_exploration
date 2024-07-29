package com.learning.blockchain_exploration.client;

import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.ClientTransactionManager;
import org.web3j.tx.TransactionManager;
import org.web3j.tx.gas.ContractGasProvider;
import org.web3j.tx.gas.DefaultGasProvider;

import java.math.BigInteger;

public class SimpleStorageContract {
    private final SimpleStorage simpleStorage;
    private String contractAddress = "0x0BF7577D6274cd88bcefb1e9E086df0cdD606Bba";

    public SimpleStorageContract() {
        Web3j web3j = Web3j.build(new HttpService("https://data-seed-prebsc-1-s1.binance.org:8545/"));
        TransactionManager txManager = new ClientTransactionManager(web3j, contractAddress);
        ContractGasProvider gasProvider = new DefaultGasProvider();
        simpleStorage = SimpleStorage.load(contractAddress, web3j, txManager, gasProvider);
    }

    public void setData(BigInteger data) {
        try {
            TransactionReceipt receipt = simpleStorage.set(data).send();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public BigInteger getData() {
        try {
            return simpleStorage.get().send();
        } catch (Exception e) {
            e.printStackTrace();
            return BigInteger.ZERO;
        }
    }
}

