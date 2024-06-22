const [owner, addr1, addr2] = await ethers.getSigners();
const contractAddress = "0x332D507B3227f15e1189BF4d96C2fEF8e27B49BE";

const DecentralizedDatabase = await ethers.getContractFactory("DecentralizedDatabase");
const db = await DecentralizedDatabase.attach(contractAddress);

// Grant addr1 write permissions
await db.addWriter(addr1.address);
console.log(`Added ${addr1.address} as writer`);

// Grant addr2 delete permissions
await db.addDeleter(addr2.address);
console.log(`Added ${addr2.address} as deleter`);

// Check permissions
let hasWritePermission = await db.canWrite(addr1.address);
console.log(`Addr1 write permission: ${hasWritePermission}`);

let hasDeletePermission = await db.canDelete(addr2.address);
console.log(`Addr2 delete permission: ${hasDeletePermission}`);

// Addr1 sets data
await db.connect(addr1).setData("key1", "value1");
console.log("Addr1 set data for key1");

// Addr2 attempts to delete data
await db.connect(addr2).deleteData("key1");
console.log("Addr2 deleted data for key1");
