export class Card {
    
    private display: boolean = false
    private id: number;

    constructor(
        // private id: number,
        private value: number
    ) {}

    public getValue(): number {
        return this.value
    }

    public getDisplay(): boolean {
        return this.display;
    }

    public setValue(newValue: number): void {
        this.value = newValue;
    }
    
    public setDisplay(state: boolean): void {
        this.display = state;
    }
    

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }
}