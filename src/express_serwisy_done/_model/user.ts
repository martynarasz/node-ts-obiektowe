export class User {
    name: string;
    score: number;

    constructor(name: string, score: number) {
        this.name = name;
        this.score = score;
    }

    static empty(): User {
        return new User('', 0);
    }
}
