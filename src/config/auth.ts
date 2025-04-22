const auth = ({ inProduction }: { inProduction: boolean }) => {
  return {
    PERSIST_AUTH_KEY: "STACKTASK_PERSISTOR",
    INITIAL_APP_STATE: {
      accessToken: "",
      //   refreshToken: "",
      //   expiresIn: undefined,
      user: undefined,
    },
  };
};

export default auth;
