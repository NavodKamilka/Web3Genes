const fs = require('fs');

async function createFolder(folder) {
  if (!fs.existsSync(folder)) {
    fs.promises.mkdir(folder);
  }
}

// async function createFolder(folderPath) {
//   try {
//     if (!fs.existsSync(folderPath)) {
//       fs.mkdir(folderPath, (err) => {
//         if (err) return new Error(err.message);
//       });
//     }
//   } catch (err) {
//     throw new Error(err.message);
//   }
// }

module.exports = { createFolder };
