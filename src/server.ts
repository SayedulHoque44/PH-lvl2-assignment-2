import { app } from "./app";
import config from "./app/config";

import mongoose from "mongoose";

async function server() {
  try {
    await mongoose.connect(config.Database_url as string);

    app.listen(config.Port, () => {
      console.log(`Example app listening on port ${config.Port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

server();
