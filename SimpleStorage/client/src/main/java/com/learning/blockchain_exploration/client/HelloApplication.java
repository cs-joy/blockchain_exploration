package com.learning.blockchain_exploration.client;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.TextField;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;

import java.io.IOException;
import java.math.BigInteger;

public class HelloApplication extends Application {
    private SimpleStorageContract simpleStorageContract;

    @Override
    public void start(Stage primaryStage) {
        TextField dataField = new TextField();
        Button setButton = new Button("Set Data");
        Button getButton = new Button("Get Data");

        setButton.setOnAction(e -> {
            String data = dataField.getText();
            simpleStorageContract.setData(new BigInteger(data));
        });

        getButton.setOnAction(e -> {
            BigInteger data = simpleStorageContract.getData();
            dataField.setText(data.toString());
        });

        VBox root = new VBox(10, dataField, setButton, getButton);
        Scene scene = new Scene(root, 300, 200);

        primaryStage.setScene(scene);
        primaryStage.setTitle("Simple Storage");
        primaryStage.show();

        // Initialize web3j and contract
        simpleStorageContract = new SimpleStorageContract();
    }

    public static void main(String[] args) {
        launch(args);
    }
}