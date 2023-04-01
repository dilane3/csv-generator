const fs = require("fs");
const csv = require("csv-parser");

// Chemin d'accès au dossier contenant les fichiers CSV
const folderPath = "./dataset";

// Liste des fichiers CSV dans le dossier
const fileNames = fs
  .readdirSync(folderPath)
  .filter((filename) => filename.endsWith(".csv"));

// Fonction récursive pour lire les fichiers CSV séquentiellement et generer le CEA
function generateCEA(index, ceaData, folder, defaultIri) {
  if (index === fileNames.length) {
    // Écrire les données formatées dans un nouveau fichier CSV
    const output =
      "file; col; row; iri\n" +
      ceaData
        .map(({ file, col, row, iri }) => `${file}; ${col}; ${row}; ${iri}`)
        .join("\n");
    fs.writeFileSync(`./output/${folder}/cea.csv`, output);
    console.log("Terminé");

    ceaData = [];
    return;
  }

  const filePath = `${folderPath}/${fileNames[index]}`;
  console.log(`Lecture du fichier ${filePath}`);

  let rowPos = 1;
  let colNumber = 0;
  const tmpData = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (row) => {
      const rowData = Object.values(row);
      colNumber = rowData.length;

      for (let i = 0; i < colNumber; i += 1) {
        // Ajouter les données du fichier au tableau 'tmpData'
        tmpData.push({
          file: fileNames[index].split(".")[0],
          col: i,
          row: rowPos,
          iri: defaultIri,
        });
      }

      rowPos += 1;
    })
    .on("end", () => {
      // Ajouter les données de l'entete du fichier au tableau 'tmpData'
      for (let i = colNumber - 1; i >= 0; i -= 1) {
        // Ajouter les données du fichier au tableau 'tmpData'
        tmpData.unshift({
          file: fileNames[index].split(".")[0],
          col: i,
          row: 0,
          iri: defaultIri,
        });
      }

      // Ajouter les données du fichier au tableau 'data'
      ceaData.push(...tmpData);

      // Lire le fichier CSV suivant
      generateCEA(index + 1, ceaData, folder, defaultIri);
    });
}

// Fonction recursive qui parcours les fichiers csv sequentiellement et génère le CTA
function generateCTA(index, ctaData, folder, defaultIri) {
  if (index === fileNames.length) {
    // Écrire les données formatées dans un nouveau fichier CSV
    const output =
      "file; col; iri\n" +
      ctaData.map(({ file, col, iri }) => `${file}; ${col}; ${iri}`).join("\n");
    fs.writeFileSync(`./output/${folder}/cta.csv`, output);
    console.log("Terminé");

    ctaData = [];
    return;
  }

  const filePath = `${folderPath}/${fileNames[index]}`;
  console.log(`Lecture du fichier ${filePath}`);

  let read = false;

  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (row) => {
      const rowData = Object.values(row);

      if (!read) {
        for (let i = 0; i < rowData.length; i += 1) {
          // Ajouter les données du fichier au tableau 'tmpData'
          ctaData.push({
            file: fileNames[index].split(".")[0],
            col: i,
            iri: defaultIri,
          });
        }
      }

      read = true;
    })
    .on("end", () => {
      // Lire le fichier CSV suivant
      generateCTA(index + 1, ctaData, folder, defaultIri);
    });
}

// Generate CEA file
generateCEA(0, [], "wikidata", "http://www.wikidata.org/entity/");
generateCEA(0, [], "foodon", "");

// Generate CTA file
generateCTA(0, [], "wikidata", "http://www.wikidata.org/property/");
generateCTA(0, [], "foodon", "");
