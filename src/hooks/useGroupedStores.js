import { similarity } from '../utils/levenshtein';

const normalize = (text) =>
  text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\b(near|shop|store|circle|road|street|st|rd|ave|avenue|the|beer)\b/g, '')
    .replace(/\s+/g, ' ')
    .trim();

export const useGroupedStores = (stores, nameThreshold = 0.8, addressThreshold = 0.7) => {
  const clusters = [];
  const used = new Set();

  for (let i = 0; i < stores.length; i++) {
    if (used.has(i)) continue;

    const group = [stores[i]];
    used.add(i);

    const name1 = normalize(stores[i].name);
    const addr1 = normalize(stores[i].address);

    for (let j = 0; j < stores.length; j++) {
      if (i === j || used.has(j)) continue;

      const name2 = normalize(stores[j].name);
      const addr2 = normalize(stores[j].address);

      const nameScore = similarity(name1, name2);
      const addrScore = similarity(addr1, addr2);

      if (nameScore >= nameThreshold && addrScore >= addressThreshold) {
        group.push(stores[j]);
        used.add(j);
      }
    }

    clusters.push(group);
  }

  return clusters;
};
