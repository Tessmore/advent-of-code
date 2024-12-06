export const Day01 = ({ input }: { input: string }) => {
  if (!input) {
    return;
  }

  const first: number[] = [];
  const second: number[] = [];

  for (const line of input.split("\n")) {
    if (line === "") {
      continue;
    }

    const [a, b] = line.split(/\s+/);
    first.push(Number.parseInt(a));
    second.push(Number.parseInt(b));
  }

  // Sort both lists
  first.sort();
  second.sort();

  let total = 0;
  const diffs: any[] = [];

  for (let i = 0; i < first.length; i++) {
    const diff = Math.abs(first[i] - second[i]);

    // diffs.push(`${first[i]} - ${second[i]} = ${diff}`);
    total += diff;
  }

  return (
    <div>
      {diffs.join(" + ")} = {total}
    </div>
  );
};

export const Day01B = ({ input }: { input: string }) => {
  if (!input) {
    return;
  }

  const first: number[] = [];
  const second: number[] = [];

  for (const line of input.split("\n")) {
    if (line === "") {
      continue;
    }

    const [a, b] = line.split(/\s+/);
    first.push(Number.parseInt(a));
    second.push(Number.parseInt(b));
  }

  const counter = new Map<number, number>();

  for (let i = 0; i < second.length; i++) {
    const current = counter.get(second[i]) || 0;
    counter.set(second[i], current + 1);
  }

  let total = 0;

  for (let i = 0; i < first.length; i++) {
    const amount = counter.get(first[i]) || 0;
    total += first[i] * amount;
  }

  return <div>= {total}</div>;
};
