import useSWR from "swr";

// const fetcher = (...args) => fetch(...args).then((res) => res.json());
const fetcher = async (...args) => {
  const [key, logger] = args;

  const res = await fetch(...args);
  logger.debug("useUser", res);
  if (!res.ok) {
    d;
    throw { status: res.status, statusText: res.statusText };
  }
  return res.json();
};
/*
  isPteacher = true -> pteacher/login 
  isPteacher = false -> getLoginInfo
*/
export default function useUser(logger) {
  // for dev
  // const { data, mutate, error } = useSWR(`/api/open/fakeLogin/0`, fetcher);

  // for staging
  const { data, mutate, error } = useSWR(
    ["/api/login/getLoginInfo", logger],
    fetcher
  );
  // logger.debug("useUser data", data);
  // logger.debug("useUser mutate", mutate);
  // logger.debug("useUser error", error);

  const loading = !data && !error;
  const loggedOut = !!error;

  return {
    loading,
    loggedOut,
    user: data,
    mutate,
  };
}
