import { createClient } from "@/prismicio";
import { cache } from "react";

export const getAboutData = cache(async () => {
    const client = createClient();
    return await client.getSingle("about_us").catch(() => null);
});