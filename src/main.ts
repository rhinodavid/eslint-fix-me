#!/usr/bin/env node

import chalk from "chalk";
import clear from "clear";
import figlet from "figlet";
import * as path from "path"
import commander from 'commander'

const program = commander;

clear();
console.log(
  chalk.red(
    figlet.textSync('pizza-cli', { horizontalLayout: 'full' })
  )
);