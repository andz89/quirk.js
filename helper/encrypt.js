const crypto = require("crypto");

// // Generate a new key and IV for each session
// function generateSessionKeyAndIV() {
//   const key = crypto.randomBytes(32); // 256-bit key
//   const iv = crypto.randomBytes(16); // 128-bit IV
//   return { key, iv };
// }
// let sessionData

// exports.encryptSessionData = () =>{
//  return sessionData
// }
// // Encrypt session data using a new key and IV
// exports.encryptSessionData =(data) =>{
//   const { key, iv } = generateSessionKeyAndIV();

//   const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
//    encrypted = cipher.update(data, 'utf8', 'hex');
//   encrypted += cipher.final('hex');
//   sessionData = {encrypted, key, iv}
//   console.log(sessionData);
//   return { encryptedData: encrypted, key, iv };
// }

// // Decrypt session data using the key and IV from the session
// exports.decryptSessionData =(data, key, iv)=> {

//   const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
//   let decrypted = decipher.update(data, 'hex', 'utf8');
//   decrypted += decipher.final('utf8');
//   return decrypted;
// }

const ALGORITHM = "aes-256-cbc";
const SECRET_KEY = "mysecretkey".padEnd(32, "\0"); // 32 byte key

exports.encryptSessionData = (data) => {
  const iv = crypto.randomBytes(16); // 16 byte IV
  const cipher = crypto.createCipheriv(ALGORITHM, SECRET_KEY, iv);
  let encrypted = cipher.update(data, "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + encrypted;
};

exports.decryptSessionData = (data) => {
  const iv = Buffer.from(data.slice(0, 32), "hex"); // Extract IV from data
  const decipher = crypto.createDecipheriv(ALGORITHM, SECRET_KEY, iv);
  let decrypted = decipher.update(data.slice(32), "hex", "utf8"); // Extract ciphertext from data
  decrypted += decipher.final("utf8");
  return decrypted;
};

// Usage example
// const encryptedData = this.encryptSessionData('Hello, world!');
// console.log('Encrypted data:', encryptedData);
// const decryptedData =this.decryptSessionData(encryptedData);
// console.log('Decrypted data:', decryptedData);
