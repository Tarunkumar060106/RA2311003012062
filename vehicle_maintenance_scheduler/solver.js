function knapsack(tasks, maxHours) {
  const n = tasks.length;

  const dp = Array.from({ length: n + 1 }, () =>
    Array(maxHours + 1).fill(0)
  );

  for (let i = 1; i <= n; i++) {
    const { duration, score } = tasks[i - 1];

    for (let w = 0; w <= maxHours; w++) {
      if (duration <= w) {
        dp[i][w] = Math.max(
          dp[i - 1][w],
          score + dp[i - 1][w - duration]
        );
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }

  // BACKTRACK
  let w = maxHours;
  const selected = [];

  for (let i = n; i > 0; i--) {
    if (dp[i][w] !== dp[i - 1][w]) {
      selected.push(tasks[i - 1]);
      w -= tasks[i - 1].duration;
    }
  }

  return selected;
}

module.exports = knapsack;