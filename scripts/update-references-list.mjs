import fs from 'fs';
import path from 'path';

const refDir = path.resolve('public/images/references');
const categories = ['nyilaszaro', 'belteri-ajtok', 'szunyoghalok', 'arnyekolok'];

const categoryLabels = {
  'nyilaszaro': 'Nyílászáró referencia kép',
  'belteri-ajtok': 'Beltéri ajtó referencia kép',
  'szunyoghalok': 'Szúnyogháló referencia kép',
  'arnyekolok': 'Árnyékolástechnika referencia kép',
};

const items = [];

for (const cat of categories) {
  const catPath = path.join(refDir, cat);
  if (!fs.existsSync(catPath)) continue;

  const files = fs.readdirSync(catPath)
    .filter(f => /\.(jpg|jpeg|png)$/i.test(f))
    .sort();

  files.forEach((file, idx) => {
    const id = `ref-${cat}-${String(idx + 1).padStart(2, '0')}`;
    items.push({
      id,
      imageSrc: `/images/references/${cat}/${file}`,
      imageAlt: categoryLabels[cat] || 'Referencia kép',
    });
  });
}

const content = `// Szépít-Lak – Referenciák adatai
// Automatikusan generálva a public/images/references mappában található képekből.
// Összesen ${items.length} referencia kép.

export interface ReferenceItem {
  id: string;
  imageSrc: string;
  imageAlt: string;
  workDescription?: string;
  quote?: string;
  quoteAuthor?: string;
}

export const references: ReferenceItem[] = ${JSON.stringify(items, null, 2)};
`;

fs.writeFileSync(path.resolve('src/data/references.ts'), content, 'utf-8');
console.log(`Successfully updated references.ts with ${items.length} images!`);
