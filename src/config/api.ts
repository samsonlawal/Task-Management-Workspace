const api = ({ inProduction }: { inProduction: boolean }) => {
  const BASE_URL_LINK = process.env.NEXT_PUBLIC_API_BASE_URL + "/api";

  return {
    auth: BASE_URL_LINK + "/auth",
    tasks: BASE_URL_LINK + "/tasks",
    profiles: BASE_URL_LINK + "/users",
    workspaces: BASE_URL_LINK + "/workspaces",
  };
};

export default api;
