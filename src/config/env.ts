import api from "./api";
import auth from "./auth";

const inProduction: boolean =
  process.env.NEXT_PUBLIC_ENVIRONMENT !== "production" ? false : true;

const env = {
  api: api({ inProduction }),
  auth: auth({ inProduction }),
};

export default env;
