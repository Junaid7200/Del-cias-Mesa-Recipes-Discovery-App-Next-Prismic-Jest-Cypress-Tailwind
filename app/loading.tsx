export default function Loading() {
    return (
        // a centered div with an animated spinner, this will be in app/loading.tsx so it will appear whereever there's a loading state
    <div className="flex items-center justify-center min-h-screen">
        <div className="w-32 h-32 border-8 border-dashed rounded-full animate-spin border-[#bc971e]"></div>
    </div>
);
}