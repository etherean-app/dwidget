const fs = require("fs");
const path = require("path");

console.log("Metadata aggregated into index.json");

module.exports = async ({ github, context, glob }) => {
  // Use glob to find all metadata.json files in subdirectories
  const globber = await glob.create("widgets/**/dist/metadata.json");

  const aggregatedData = [];

  for await (const file of globber.globGenerator()) {
    // Read the content of each metadata.json file
    const fileContent = fs.readFileSync(file, "utf8");
    try {
      const jsonData = JSON.parse(fileContent);
      aggregatedData.push(jsonData);
    } catch (err) {
      console.error(`Error parsing JSON in ${file}: ${err.message}`);
    }
  }

  const indexFolder = path.join(process.cwd(), "index");
  if (!fs.existsSync(indexFolder)) {
    fs.mkdirSync(indexFolder);
  }

  // Define the path to the index.json file within the index folder
  const indexPath = path.join(indexFolder, "index.json");

  // Write the aggregated data to the index.json file
  fs.writeFileSync(indexPath, JSON.stringify(aggregatedData, null, 2));
};
