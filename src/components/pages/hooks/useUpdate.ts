// import { mutate } from "swr";
// import { Dream } from "../models/Dream";

export function useUpdateDreams() {
  async function updateDreams(userId: string, treeId: string, dreamId: string) {
    const API_URL = `http://localhost:5000/users/${userId}/trees/${treeId}/dreams/${dreamId}`;
    console.log(dreamId);
    const response = await fetch(API_URL, {
      credentials: "include",
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(`response:${response.body}`);

    if (!response.ok) {
      throw new Error("Failed to update a dream");
    }

    const result = await response.json();

    // mutate(API_URL);

    return result;
  }

  return { updateDreams };
}
