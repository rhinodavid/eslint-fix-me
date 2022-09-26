import { ESLint } from "eslint";
import * as fs from "graceful-fs";
import * as os from "os";

interface FixItem {
  ruleId: string;
  line: number;
  severity: number;
}

export default async function lint(files: string[]) {
  const eslint = new ESLint();

  const results = await eslint.lintFiles(files);
  const fixItems: Map</* filePath */ string, FixItem[]> = new Map();

  results.forEach((result) => {
    result.messages.forEach((message) => {
      const item = {
        line: message.line,
        ruleId: message.ruleId ?? "",
        severity: message.severity,
      };
      fixItems.set(result.filePath, [
        ...(fixItems.get(result.filePath) ?? []),
        item,
      ]);
    });
  });

  fixItems.forEach((items, filePath) => {
    ((filePath: string, items: FixItem[]) => {
      const messagesForLine: Map<number, string[]> = new Map();
      items.forEach((item) => {
        const newMessages = [
          ...(messagesForLine.get(item.line) ?? []),
          item.ruleId,
        ].filter(function onlyUnique(value, index, self) {
          return self.indexOf(value) === index;
        });
        messagesForLine.set(item.line, newMessages);
      });

      const file = fs.readFileSync(filePath, { encoding: "utf8", flag: "r" });
      const lines = file.split(os.EOL);
      messagesForLine.forEach((ruleIds, lineNumber) => {
        // LineNumber is ONE (1) based
        const comment = `// $eslint-fix-me github.com/rhinodavid/eslint-fix-me`;
        const disableStart = `/* eslint-disable ${ruleIds.join(",")} */`;
        const disableEnd = `/* eslint-enable ${ruleIds.join(",")} */`;

        const lineIndex = lineNumber - 1;
        const line = lines[lineIndex];
        lines[
          lineIndex
        ] = `${comment}${os.EOL}${disableStart}${os.EOL}${line}${os.EOL}${disableEnd}`;
      });
      const updatedFile = lines.join(os.EOL);
      fs.writeFileSync(filePath, updatedFile);
    })(filePath, items);
  });
}
