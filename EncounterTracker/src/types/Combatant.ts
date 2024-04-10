export class Combatant {
    name: String;
    max_hp: number;
    current_hp: number;
    ac: number;
    status: string;
    is_active: boolean

    constructor() {
        this.name = "";
        this.max_hp = 0;
        this.current_hp = 0;
        this.ac = 0;
        this.status = "N/A"
        this.is_active = false;
    }
}