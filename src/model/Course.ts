export class Course {
    #title: string;
    #description: string;
    #spots: number;
    #students: string[];
    #teacher: string;
    #startsAt: Date;
    #endsAt: Date;
    
    constructor(
        title: string,
        description: string,
        spots: number,
        startsAt: Date,
        endsAt: Date, 
        teacher: string) {

        this.#title = title;
        this.#description = description;
        this.#spots = spots;
        this.#teacher = teacher;
        this.#students = [];
        this.#startsAt = startsAt;
        this.#endsAt = endsAt;        
    };

    get title(): string {
        return this.#title;
    };
};


// type CourseProps = {
//     title: string;
//     description: string;
//     spots: number;
//     students: string[];
//     teacher: string;
//     startsAt: Date;
//     endsAt: Date;
// }

// export class Course {
//     private props: CourseProps;
    
//     constructor( props: CourseProps) {
//         this.props = props;       
//     };

//};