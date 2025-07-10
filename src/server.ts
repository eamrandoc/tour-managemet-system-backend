import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/confiq/env";

let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(envVars.DB_URL);
    console.log("🟢 Connected to MongoDB");

    server = app.listen(envVars.PORT, () => {
      console.log(`🚀 Server listening on port ${envVars.PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
  }
};

startServer();

process.on("unhandledRejection", (reason) => {
  console.error("❌ Unhandled Rejection:", reason);
  if (server) {
    server.close(() => {
      console.log("💥 Server closed due to unhandled rejection");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

process.on("SIGTERM", () => {
  console.info("🛑 SIGTERM received. Shutting down gracefully...");
  if (server) {
    server.close(() => {
      console.log("✅ Closed out remaining connections");
      process.exit(0);
    });
  }
});
