import useSWR from "swr";

async function fetcher(key: string) {
  return fetch(key).then((res) => res.json());
}

type treeData = {
  id: string;
  title: string;
};

type jsonData = {
  trees: treeData[];
};

export function useTreeList(userId: string) {
  const API_URL = `http://localhost:5000/users/${userId}/trees`;
  const { data } = useSWR<jsonData>(API_URL, fetcher);

  return data || { trees: [] };
}
