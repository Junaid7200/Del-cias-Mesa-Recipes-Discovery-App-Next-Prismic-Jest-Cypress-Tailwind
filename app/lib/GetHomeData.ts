import { createClient } from "@/prismicio";
import { cache } from "react";

export const getHomeData = cache(async () => {
    console.log("Fetching home data from Prismic...");
    const client = createClient();
    console.log("Prismic client created.");
    return await client.getSingle("home");
});