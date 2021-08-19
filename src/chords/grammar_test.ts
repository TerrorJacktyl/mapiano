import { parse } from "./parser.ts";

const examples = ["C#aug", "C", "Cmin#", "Cmin"];
const results = examples.map(parse);
console.log(results);
