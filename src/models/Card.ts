export class Card {
    
    private display: boolean = false
    private id: number;

    constructor(
        private value: number
    ) {}

    public getValue(): number {
        return this.value
    }

    public setValue(newValue: number): void {
        this.value = newValue;
    }

    public getDisplay(): boolean {
        return this.display;
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