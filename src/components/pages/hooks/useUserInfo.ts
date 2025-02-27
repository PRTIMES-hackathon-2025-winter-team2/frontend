import useSWR from "swr";

async function fetcher(key: string) {
  return fetch(key).then((res) => res.json());
}
type jsonData = {
  id: string;
  name: string;
};

export function useUserInfo(userId: string) {
  const API_URL = `http://localhost:5000/users/${userId}`;
  const { data } = useSWR<jsonData>(API_URL, fetcher);

  return data || { id: "", name: "" };
}
