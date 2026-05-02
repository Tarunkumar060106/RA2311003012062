const axios = require("axios");
const Log = require("../logging_middleware/logger");
const knapsack = require("./solver");

const BASE = "http://20.207.122.201/evaluation-service";

const headers = {
    "Authorization": `Bearer ${process.env.AUTH_TOKEN}`,
}

exports.runScheduler = async (req, res) => {
    try {
        Log("backend", "info", "controller", "Fetching depots");

        const depotsResult = await axios.get(`${BASE}/depots`, {headers});
        const depots = depotsResult.data.depots;
        // console.log("DEPOTS FROM API:", depots);
        const finalres = [];

        for (const depot of depots) {
            Log("backend", "info", "controller", `Processing depot ${depot.id}`);

            const vehiclesResult = await axios.get(`${BASE}/vehicles`, {headers});
            const vehicles = vehiclesResult.data.vehicles.map(v=> ({
                id: v.TaskID,
                duration: v.Duration,
                score: v.Impact,
            }));
            // console.log("VEHICLES FROM API:", vehicles);

            Log("backend","debug","domain",`Vehicles fetched: ${vehicles.length}`);

            const selected = knapsack(vehicles, depot.MechanicHours);
            const totalHours = selected.reduce((sum, v) => sum + v.duration, 0);
            const totalScore = selected.reduce((sum, v) => sum + v.score, 0);

            Log("backend", "info", "domain", `Optimized: score=${totalScore}, time=${totalHours}` );

            finalres.push({
                depotId: depot.ID,
                totalScore,
                totalHours,
                selected: selected,
            });
        }
        res.json(finalres);
        // console.log("FINAL RESPONSE:", finalres);
    } catch (err) {
        Log("backend", "error", "controller", `Error in scheduler: ${err.message}`);
        res.status(500).json({error: "Scheduler failed"});
    }
}