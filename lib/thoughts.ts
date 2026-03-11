import path from "path";
import fs from "fs";

export interface Thought {
    text: string;
    date: string;
    mood: string;
}

export function getAllThoughts(): Thought[] {
    const filePath = path.join(process.cwd(), "content", "thoughts", "data.json");
    if (!fs.existsSync(filePath)) {
        return [];
    }

    const fileContent = fs.readFileSync(filePath, "utf8");
    try {
        const data = JSON.parse(fileContent) as Thought[];
        // Sort by date descending
        return data.sort((a, b) => {
            if (a.date < b.date) return 1;
            if (a.date > b.date) return -1;
            return 0;
        });
    } catch (e) {
        console.error("Error parsing thoughts data", e);
        return [];
    }
}
