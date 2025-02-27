import useSWR from "swr";
import { Dream } from "../models/Dream";

async function fetcher(key: string) {
  return fetch(key).then((res) => res.json());
}

export function useDreamList(userId: string,) {
  const API_URL = `http://localhost:5000/users/${userId}/trees/`;
  const { data } = useSWR<Dream[]>(API_URL, fetcher);

  return data || [];
}
