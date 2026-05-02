const weights = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

function calculateScore(notification) {
  const now = Date.now();

  const minutesOld =
    (now - new Date(notification.Timestamp).getTime()) / 60000;

  const weight = weights[notification.Type] || 1;

  return weight * 1000 - minutesOld;
}

module.exports = calculateScore;