const logger = (max = 90, current = 2, message) => {
  const maxCount = 100;
  const currentCount = (maxCount * current) / max;

  let progress = "";

  // Adding progress
  for (let i = 0; i < currentCount; i++) {
    progress += "#";
  }

  // Adding spaces
  for (let i = 0; i < maxCount - currentCount; i++) {
    progress += "_";
  }

  progress += `  ${Math.floor((current / max) * 100)}%`;

  console.log(message);
  console.log(progress);
};

const rootLogger = (progress, max) => {
  console.clear();

  // Cea progress
  logger(max, progress.wikidata.cea, "CEA - Wikidata");
  logger(max, progress.foodon.cea, "CEA - FoodOn");

  // Cta progress
  logger(max, progress.wikidata.cta, "CTA - Wikidata");
  logger(max, progress.foodon.cta, "CTA - FoodOn");
};

module.exports = rootLogger;
