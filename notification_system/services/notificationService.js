const MinHeap = require("../utils/minHeap");
const calculateScore = require("../utils/scoring");

function getTopNotifications(notifications, N = 10) {
  const heap = new MinHeap();

  for (const n of notifications) {
    const score = calculateScore(n);

    const item = { ...n, score };

    if (heap.size() < N) {
      heap.push(item);
    } else if (heap.peek() && score > heap.peek().score) {
      heap.pop();
      heap.push(item);
    }
  }

  return heap.heap.sort((a, b) => b.score - a.score);
}

module.exports = {
  getTopNotifications,
};