// import { mutate } from "swr";
import { Dream } from "../models/Dream";

export function useMakeDreams() {
  async function createDreams(
    userId: string,
    title: string,
    newDreams: Dream[]
  ): Promise<string> {
    const API_URL = `http://localhost:5000/users/${userId}/trees/`;

    const filteredDreams = newDreams.map(({ title, position }) => ({
      title,
      position,
    }));

    const body = {
      title: title,
      dreams: filteredDreams,
    };
    // const body = {
    //   title: title,
    //   dreams: newDreams,
    // };
    // console.log(`body:${body}`);
    const response = await fetch(API_URL, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    console.log(`response:${response.body}`);

    if (!response.ok) {
      throw new Error("Failed to create new dreams");
    }

    const result = await response.json();

    // mutate(API_URL);

    return result.id;
  }

  return { createDreams };
}
