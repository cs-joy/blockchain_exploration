module com.learning.blockchain_exploration.client {
    requires javafx.controls;
    requires javafx.fxml;
    requires crypto;
    requires abi;
    requires core;


    opens com.learning.blockchain_exploration.client to javafx.fxml;
    exports com.learning.blockchain_exploration.client;
}