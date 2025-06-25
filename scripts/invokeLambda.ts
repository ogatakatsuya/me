import fs from 'fs';
import matter from 'gray-matter';

async function processFile(filePath: string) {
    console.log(`Processing: ${filePath}`);
    const metadata = extractMetadata(filePath);
    if (!metadata) {
      console.error(`[error] ${filePath} has no title or tags`);
      return;
    }

    console.log(metadata);
}

type ExtractedMetadata = {
  title: string;
  tags: string[];
}

function extractMetadata(filePath: string): ExtractedMetadata | undefined {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');

    const { data } = matter(fileContent);
    const frontmatter = data as ExtractedMetadata;

    if(!frontmatter.title || !frontmatter.tags) {
      throw new Error(`[error] ${filePath} has no title or tags`);
    }

    return frontmatter;

  } catch (error) {
    console.error(error);
  }
}

async function main() {
  const changedFiles = process.env.CHANGED_FILES?.split(" ") || [];

  if (changedFiles.length === 0) {
    console.log("No changed MDX files to process.");
    return;
  }

  // 変更があったファイルそれぞれに対して処理を実行
  for (const file of changedFiles) {
    await processFile(file);
  }
}

main();