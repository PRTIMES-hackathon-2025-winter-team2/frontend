// import { mutate } from "swr";
import { Dream } from "../models/Dream";

export function useMakeDreams() {
  async function createDreams(
    userId: string,
    title: string,
    newDreams: Dream[]
  ) {
    const API_URL = `http://localhost:5000/users/${userId}/trees`;
    const body = {
      title: title,
      dreams: newDreams,
    };
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Failed to create new dreams");
    }

    const result = await response.json();

    // mutate(API_URL);

    return result;
  }

  return { createDreams };
}
