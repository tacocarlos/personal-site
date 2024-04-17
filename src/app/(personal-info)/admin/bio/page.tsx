import db from "@/database/db";
import BioEditor from "./BioComponent";

export default async function ManageBio() {
    const currentBio: string = `
# This is a title header

<a href="https://www.lttstore.com">This is a link to <em>LTT STORE DOT COM</em></a>

$$ F(x) = \\int_a^b f(x)dx $$

~~~tsx
export default function SomePage() {
    return <div>Some Content</div>
}
~~~`; 


    const bios = await db.biography.findMany({
        orderBy: {
            updatedAt: "desc",
        }
    });

return <div>
        <BioEditor startingBio={currentBio}/>
    </div>
}