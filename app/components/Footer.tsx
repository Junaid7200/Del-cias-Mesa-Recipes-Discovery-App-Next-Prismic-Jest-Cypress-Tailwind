import { PrismicNextImage } from '@prismicio/next';
import { HomeDocument } from '@/prismicio-types';

export default function Footer({ page }: {page: HomeDocument}) {
    // Access the first item in the group, which contains all your icon fields.
    const socialIconsGroup = page.data.socials_icons[0];

    // Create an array of the icon fields to map over.
    const icons = socialIconsGroup ? [
        socialIconsGroup.icon1,
        socialIconsGroup.icon2,
        socialIconsGroup.icon3,
        socialIconsGroup.icon4
    ] : [];

    return (
        // simple footer that is flex-col in mobile view and flex-row in md and higher views
        <footer className="flex flex-col md:flex-row items-center md:justify-around gap-6 md:gap-0 py-10 md:py-0 md:h-[200px] bg-[#FFDB63] mt-4">
        
        {/* Logo + website Name: again, just like nav, the website name will vanish in mobile view */}
        <div className="flex items-center gap-4">
            <PrismicNextImage field={page.data.website_logo} width={50} height={50} />
            <span className="text-2xl font-bold hidden md:block">{page.data.website_name}</span>
        </div>
        
        {/* Social Icons: very basic, stays same in both mobile and md and higher views and also has the text of socials icons */}
        <div className="flex flex-col items-center gap-2">
            <h3 className='font-bold text-xl'>{page.data.footer_text}</h3>
            <div className="flex gap-4">
                {icons.map((icon, index) => (
                    icon.url && <PrismicNextImage key={index} field={icon} width={24} height={24} />
                ))}
            </div>
        </div>
        </footer>
    )
}