class MinHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  peek() {
    return this.heap[0];
  }

  push(val) {
    this.heap.push(val);
    this.bubbleUp();
  }

  pop() {
    const top = this.heap[0];
    const end = this.heap.pop();

    if (this.heap.length > 0) {
      this.heap[0] = end;
      this.bubbleDown();
    }

    return top;
  }

  bubbleUp() {
    let idx = this.heap.length - 1;

    while (idx > 0) {
      let parent = Math.floor((idx - 1) / 2);

      if (this.heap[parent].score <= this.heap[idx].score) break;

      [this.heap[parent], this.heap[idx]] =
        [this.heap[idx], this.heap[parent]];

      idx = parent;
    }
  }

  bubbleDown() {
    let idx = 0;
    const length = this.heap.length;

    while (true) {
      let left = 2 * idx + 1;
      let right = 2 * idx + 2;
      let smallest = idx;

      if (
        left < length &&
        this.heap[left].score < this.heap[smallest].score
      ) {
        smallest = left;
      }

      if (
        right < length &&
        this.heap[right].score < this.heap[smallest].score
      ) {
        smallest = right;
      }

      if (smallest === idx) break;

      [this.heap[idx], this.heap[smallest]] =
        [this.heap[smallest], this.heap[idx]];

      idx = smallest;
    }
  }
}

module.exports = MinHeap;