import Hero from "@/app/components/Hero";
import { getRandomRecipeCards } from "@/app/lib/GetRecipes"
import Card from "@/app/components/Card";
import { getHomeData } from "../lib/GetHomeData";


export default async function Home() {
    const allCards = await getRandomRecipeCards({ number: 6, tags: [] });
    const cards = allCards.slice(0, 3);
    const recentCards = allCards.slice(3, 6);

    const homeData = await getHomeData();

    return (
        <div className="mb-[8vh]">
            <Hero page = {homeData} />
            {/* popular recipes section */}
        <div className="mt-20 mb-[120px]">
        <div className="flex flex-col justify-center items-center md:w-[90%] lg:max-w-[1440px] 2xl:max-w-[1600px] mx-auto">
                <h1 className="text-[40px] font-bold">
                    {homeData.data.section_one_text}
                </h1>
            <div className="mt-10">
                <div className="grid gap-10 grid-cols-1 px-5 md:px-0 md:grid-cols-3 min-h-full">
                    {cards.map((c, i) => (
                <Card key={i} {...c} buttonText={homeData.data.card_button_text} layout="vertical" />
                ))}
                </div>
            </div>
        </div>
        </div>
        {/* recent recipes section */}
        <div>
        <div className="flex flex-col justify-center items-center">
        <h1 className="text-[40px] font-bold mb-10">
            {homeData.data.section_two_text}
        </h1>
        <div className="flex flex-col  gap-10 md:gap-[65px] px-5 md:w-[90%] xl:max-w-[1300px] 2xl:max-w-[1600px]">
            {recentCards.map((c, i) => (
                <Card key={i} {...c} buttonText={homeData.data.card_button_text} layout="horizontal" />
            ))}
        </div>
        </div>
        </div>
</div>  
    )
}