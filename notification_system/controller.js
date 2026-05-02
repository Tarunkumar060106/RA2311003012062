const axios = require("axios");
const { getTopNotifications } = require("./services/notificationService");

const BASE = "http://20.207.122.201/evaluation-service";

const headers = {
  Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
};

exports.getTopNotificationsHandler = async (req, res) => {
  try {
    const response = await axios.get(`${BASE}/notifications`, {
      headers,
    });

    const notifications = response.data.notifications;

    const top = getTopNotifications(notifications, 10);

    res.json({
      total: notifications.length,
      top,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      error: "Failed to fetch notifications",
    });
  }
};