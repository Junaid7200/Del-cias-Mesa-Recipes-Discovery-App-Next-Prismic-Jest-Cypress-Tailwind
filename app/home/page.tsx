import Hero from "../components/Hero";
import { getRandomRecipeCards } from "../lib/GetRecipes"
import { createClient } from "@/prismicio";
import Card from "../components/Card";


export default async function Home() {
    const cards = await getRandomRecipeCards({ number: 3, tags: [] });
    const recentCards = await getRandomRecipeCards({ number: 3, tags: [] });
    const client = createClient();
    const homeData = await client.getSingle("home");

    return (
        <div>
            <Hero page = {homeData} />
            {/* popular recipes section */}
        <div className="flex flex-col justify-center items-center p-6 mt-12">
                <h1 className="text-3xl font-bold leading-tight">
                    {homeData.data.section_one_text}
                </h1>
            <div className="py-10">
                <div className="grid gap-16 grid-cols-1 md:grid-cols-3 md:gap-24 md:px- min-h-full">
                    {cards.map((c, i) => (
                <Card key={i} {...c} buttonText={homeData.data.card_button_text} layout="vertical" />
                ))}
                </div>
            </div>
        </div>
        {/* recent recipes section */}
        <div className="flex flex-col justify-center items-center p-6">
        <h1 className="text-3xl font-bold leading-tight">
            {homeData.data.section_two_text}
        </h1>
        <div className="flex flex-col justify-center items-center gap-16 mt-16 min-h-full min-w-full md:px-32">
            {recentCards.map((c, i) => (
                <Card key={i} {...c} buttonText={homeData.data.card_button_text} layout="horizontal" />
            ))}
        </div>
</div>
</div>  
    )
}