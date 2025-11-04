import fs from 'fs';
import matter from 'gray-matter';

import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

type ExtractedMetadata = {
  title: string;
  tags: string[];
  theme: string;
}

async function processFile(filePath: string): Promise<void> {
    console.log(`Processing: ${filePath}`);
    const metadata = extractMetadata(filePath);
    if (!metadata) {
      console.error(`[error] ${filePath} has no title or tags`);
      return;
    }

    const lambdaClient = new LambdaClient({});
    const invokeParams = {
      FunctionName: 'ogp-generator',
      InvocationType: 'RequestResponse' as const,
      Payload: JSON.stringify({
        title: metadata.title,
        tags: metadata.tags,
        theme: metadata.theme
      }),
    };

    const maxRetries = 3;
    let retries = 0;

    while (retries < maxRetries) {
      try {
        console.log(`Invoking Lambda for ${filePath} (attempt ${retries + 1}/${maxRetries})`);
        const response = await lambdaClient.send(new InvokeCommand(invokeParams));
        console.log(`Lambda response for ${filePath}:`, response);
        return; // Success, exit retry loop
      } catch (error) {
        retries++;
        console.error(`Lambda invocation failed for ${filePath} (attempt ${retries}/${maxRetries}):`, error);
        
        if (retries < maxRetries) {
          const backoffDelay = 2 ** retries * 1000; // Exponential backoff: 2s, 4s, 8s
          console.log(`Retrying in ${backoffDelay}ms...`);
          await sleep(backoffDelay);
        } else {
          console.error(`Failed to invoke Lambda for ${filePath} after ${maxRetries} attempts`);
          throw error;
        }
      }
    }
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