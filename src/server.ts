import { app } from "./app";
import config from "./app/config";

app.listen(config.Port, () => {
  console.log(`Example app listening on port ${config.Port}`);
});
