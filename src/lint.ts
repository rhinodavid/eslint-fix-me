import { ESLint } from "eslint";

interface FixItem {
  filePath: string;
  ruleId: string;
  line: number;
  severity: number;
}

export default async function lint(files: string[]) {
  const eslint = new ESLint();

  const results = await eslint.lintFiles(files);
  const fixItems: FixItem[] = [];

  results.forEach((result) => {
    result.messages.forEach((message) => {
      fixItems.push({
        filePath: result.filePath,
        line: message.line,
        ruleId: message.ruleId ?? "",
        severity: message.severity,
      });
    });
  });
  
  console.log(fixItems);
  console.log(`Found ${fixItems.length} results`);

  //   console.log(results);
}
