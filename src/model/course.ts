export class Course {
    #title: string;
    #description: string;
    #spots: number;
    #studants: string[];
    #teacher: string;
    #startsAt: Date;
    #endsAt: Date;
    
    constructor(
        title: string,
        description: string, 
        startsAt: Date,
        endsAt: Date, 
        teacher: string) {

        this.#title = title;
        this.#description = description;
        this.#teacher = teacher;
        this.#startsAt = startsAt;
        this.#endsAt = endsAt;        
    };

    get startsAt {
        return 
    }

};