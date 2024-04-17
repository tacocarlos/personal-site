"use client";

import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { useIsMounted } from "@/lib/utils";
import { Separator } from "@radix-ui/react-separator";
import { ScrollArea } from "@/components/ui/scroll-area";





export default function BioEditor({startingBio} : {startingBio: string}) {
    const [bio, setBio] = useState(startingBio);
    const isMounted = useIsMounted();

    if(!isMounted) {
        return null;
    }

    return <div>
        <div className="w-4/5 h-72 block m-auto">
            <Textarea className="h-full" onChange={e => setBio(e.currentTarget.value)} value={bio} />
        </div>

        {/* <ScrollArea className="h-1/3 block m-auto w-3/5"> */}
        <div className="block bg-cyan-400 w-4/5 m-auto">
            <MarkdownRenderer markdown={bio} className={`bg-white p-2`}/>
        </div>
        {/* </ScrollArea> */}
    </div>
}