const [owner] = await ethers.getSigners();
const contractAddress = "0x7213Ea3B9cC044434630C50bcea352F1B8396fc7";

const DecentralizedDatabaseV1 = await ethers.getContractFactory("DecentralizedDatabaseV1");
const db = await DecentralizedDatabaseV1.attach(contractAddress);

// Set data
await db.setData("1", "hello");

// Get data
const value = await db.getData("1");
console.log("Value for key1:", value);

// Delete data
await db.deleteData("1");
