import React from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

const PracticeUseUser = () => {
  const fakeUserId = 3;
  const { data: user, error } = useSWR(
    `/api/open/fakeLogin/${fakeUserId}`,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!user) return <div>loading...</div>;
  return (
    <div className="App">
      <h2>FakeUser & GetLoginInfo</h2>
      <p>User Name {user?.Identity?.Name}</p>
      <p>User Type: {user?.Identity?.Type}</p>
      <p>StudentName: {user?.Identity?.StudentName}</p>
    </div>
  );
};

export default PracticeUseUser;
