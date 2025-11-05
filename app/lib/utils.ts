export default function stripHtml(input = "") {
    return input.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}
