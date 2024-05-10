import {type Combatant} from "./Combatant";

export type Encounter = {
    name: String,
    npc_combatants: Array<Combatant>,
    initiative_list: Array<Combatant>,
    current_combatant: number
}