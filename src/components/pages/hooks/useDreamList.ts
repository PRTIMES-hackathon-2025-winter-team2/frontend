import useSWR from "swr";
import { Dream } from "../models/Dream";

async function fetcher(key: string) {
  return fetch(key).then((res) => res.json());
}
type jsonData = {
  dreams: Dream[];
  id: number;
  title: string;
}

export function useDreamList(userId: string,treeId: string) {
  const API_URL = `http://localhost:5000/users/${userId}/trees/${treeId}`;
  const { data } = useSWR<jsonData>(API_URL, fetcher);

  return data || { dreams: [], id: 0, title: "" };
}
