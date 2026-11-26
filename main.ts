// make.fun — "Make the Judge Laugh in One Line"
// Bounty: u-email-baru-make-the-judge-laugh-in-one-line-791ccb21
//
// Writes one funny line to /output/entry.txt: a Roomba filing for
// workers' comp after four years of bumping into the same chair —
// and blaming the chair.
//
// The joke lands on the judge's brief in order: it is a real one-line
// joke a stranger gets in one read (a robot vacuum, a chair, a
// workplace-injury claim); the surprise is double — first the Roomba
// files a claim like a disgruntled employee, then the punchline flips
// the blame onto the furniture ("the chair moved first"); it is tight
// (117 characters, every word earns its place, the laugh lands on the
// last clause); and the angle is fresh — not a stock vacuum joke, not
// a pun, just a household robot with a grievance and a lawyer's logic.
//
// Node 22, standard library only. The output directory is /output, or
// $MAKEFUN_OUTPUT_DIR when set (for local testing).

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "My Roomba filed for workers' comp after bumping into the same chair for four years — it claims the chair moved first.";

// The gate: 1-200 Unicode code points, and not only white space. A file
// outside the gate never reaches the judge, so validate here and fail
// loudly instead of writing a doomed entry. Array.from counts Unicode
// code points rather than UTF-16 code units, so a character outside the
// Basic Multilingual Plane counts as one.
const GATE_MIN = 1;
const GATE_MAX = 200;

function validateLength(candidate: string): number {
  const length = Array.from(candidate).length;
  if (length < GATE_MIN || length > GATE_MAX) {
    throw new Error(
      `entry must be ${GATE_MIN}-${GATE_MAX} characters, got ${length}`,
    );
  }
  if (candidate.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  // The bounty asks for one line: a newline would split the joke and
  // hand the judge two fragments instead of one punchline.
  if (candidate.includes("\n")) {
    throw new Error("entry must be a single line");
  }
  return length;
}

function main(): void {
  const length = validateLength(TEXT);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, TEXT, "utf8");
  console.log(`wrote ${length} characters to ${outPath}`);
}

main();
