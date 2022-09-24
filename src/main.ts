#!/usr/bin/env node

import { Command } from "commander";
import lint from "./lint";

const program = new Command();

program
  .version("1.0.0")
  .description("Supress all your eslint problems")
  .command('[files]')
  .usage("[files]")
  .action((a, {args})=> lint(args))
  .parse(process.argv);


