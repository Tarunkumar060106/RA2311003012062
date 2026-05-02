const axios = require("axios");

const LOG_API = "http://20.207.122.201/evaluation-service/logs";

const VALID = {
  stack: ["backend", "frontend"],
  level: ["debug", "info", "warn", "error", "fatal"],
  package: [
    "cache",
    "controller",
    "cron_job",
    "db",
    "domain",
    "auth",
    "config",
    "middleware",
    "utils"
  ],
};

async function Log(stack, level, pkg, message) {
  try {
    if (!VALID.stack.includes(stack)) return;
    if (!VALID.level.includes(level)) return;
    if (!VALID.package.includes(pkg)) return;

    const res = await axios.post(
      LOG_API,
      {
        stack,
        level,
        package: pkg,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
        },
      }
    );  
    console.log("\n📥 Log API Response:");
    console.log(JSON.stringify(res.data, null, 2));
  } catch (err) {
    console.log("Failed to send log:", err.response?.data || err.message);
  }
}

module.exports = Log;