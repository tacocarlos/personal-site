import { Key } from "react";

export class ProjectTag {

    static CPP = new ProjectTag("C++", 301);
    static CSharp = new ProjectTag("C#", 302);

    static Python = new ProjectTag("Python", 401);
    static Python2 = new ProjectTag("Python 2", 402);

    static Rust = new ProjectTag("Rust", 501);

    static JavaScript = new ProjectTag("JavaScript", 901);
    static TypeScript = new ProjectTag("TypeScript", 902);

    static ProjectTagList : ProjectTag[] = [
        ProjectTag.CPP,
        ProjectTag.CSharp,
        ProjectTag.JavaScript,
        ProjectTag.Python,
        ProjectTag.Python2,
    ];

    tag: String;
    tagID : Key;
    private constructor(tag: String, tagID : Key) {
        this.tag = tag;
        this.tagID = tagID;
    }
}