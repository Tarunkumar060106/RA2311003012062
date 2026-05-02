require("dotenv").config();
const express = require("express");

const { getTopNotificationsHandler } = require("./notification_system/controller");
const requestLogger = require("./logging_middleware/requestLogger");
const { runScheduler } = require("./vehicle_maintenance_scheduler/scheduler");
const Log = require("./logging_middleware/logger");

const app = express();

app.use(express.json());
app.use(requestLogger);

app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});

// MAIN endpoint (use this in Postman)
app.get("/schedule", async (req, res) => {
  try {
    Log("backend", "info", "controller", "Schedule endpoint hit");

    await runScheduler(req, res);

  } catch (err) {
    Log("backend", "error", "controller", `Scheduler error: ${err.message}`);
    res.status(500).json({ error: "Scheduler failed" });
  }
});

app.get("/notifications/top", getTopNotificationsHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});