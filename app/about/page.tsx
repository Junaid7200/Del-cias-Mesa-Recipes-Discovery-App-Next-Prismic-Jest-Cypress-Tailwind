import { components } from "@/slices";
import { SliceZone } from "@prismicio/react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAboutData } from "@/app/lib/GetAboutData";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getAboutData();

  return {
    title: page?.data.meta_title || "About Us",
    description: page?.data.meta_description || "Learn more about our project.",
  };
}

export default async function AboutPage() {
  const page = await getAboutData();

  if (!page) {
    notFound();
  }

  return <SliceZone slices={page.data.slices} components={components} />;
}
