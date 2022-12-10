export class Student {
    #name: string;
    #cpf: string;
    #email: string;
    #activeCourse: string[] = [];
    
    constructor(name: string, cpf: string, email: string) {
        this.#name = name;
        this.#email = email;
        this.#cpf = cpf;
    }

    get name(): string {
        return this.#name;
    };

    get activeCourse(): string[] {
        return this.#activeCourse;
    };

    set activeCourse(courseName: string[]) {
        this.#activeCourse = courseName;
    }
}