<script lang="ts">
	import DragDropList from "./DragDropList.svelte";
    
    import players from "../data/players.json";
    import encounters from "../data/encounters.json";
    
    import { type Combatant } from "../types/Combatant";
    import { type Encounter } from "../types/Encounter";

    let comb_players: Array<Combatant> = players.players;
    let combatants: Array<Combatant> = comb_players;
    let npc_combatants: Array<Combatant> = [];
    let active_encounter: Encounter;
    let active_combatant_id: number;

    function StartEncounter() {
        if (combatants === null) return;
        
        combatants.forEach((combatant: Combatant) => {
            combatant.is_active = false;
        })

        combatants[0].is_active = true;
        active_combatant_id = 0;
    }

    function NextCombatant() {
        active_combatant_id++;

        if (combatants.length - 1 < active_combatant_id) active_combatant_id = 0;

        combatants.forEach((combatant: Combatant) => {
            combatant.is_active = false;
        })

        combatants[active_combatant_id].is_active = true;
    }

    function LoadCombatants(encounter_name: String) {
        
        combatants = players.players;
        let npc_combs: Array<Combatant> = [];
            
        for (let i = 0; i < encounters.encounters.length; i++) {
            if (encounters.encounters[i].name != encounter_name) continue;

            npc_combs = encounters.encounters[i].npc_combatants;
            active_encounter = encounters.encounters[i];
            npc_combatants = npc_combs;
            break;
        }

        combatants = comb_players.concat(npc_combs);     
    }
</script>
<main>
    <div class="encounter_buttons">
        <button class="encounter_button" on:click="{() => {StartEncounter()}}">Start Encounter</button>
        <button class="encounter_button" on:click="{() => {NextCombatant()}}">Next Combatant</button>
        
        {#each encounters.encounters as encounter}
            <button class="encounter_button" on:click="{() => {LoadCombatants(encounter.name)}}">{encounter.name}</button>
        {/each}
    </div>
    <div class="control_area">
        <div class="initiative_list">
            <DragDropList bind:data={combatants}></DragDropList>
        </div>
        <div class="statblock_area"></div>
    </div>
</main>
<style>
    .encounter_buttons {
        display: flex;
        flex-direction: row;
    }
    
    .encounter_button {
        margin: 5px;
        background: #8f34d9;
        background-image: -webkit-linear-gradient(top, #8f34d9, #2980b9);
        background-image: -moz-linear-gradient(top, #8f34d9, #2980b9);
        background-image: -ms-linear-gradient(top, #8f34d9, #2980b9);
        background-image: -o-linear-gradient(top, #8f34d9, #2980b9);
        background-image: linear-gradient(to bottom, #8f34d9, #2980b9);
        -webkit-border-radius: 7;
        -moz-border-radius: 7;
        border-radius: 7px;
        font-family: Arial;
        color: #ffffff;
        font-size: 20px;
        padding: 10px 20px 10px 20px;
        text-decoration: none;
    }

    .encounter_button:hover {
        background: #d63cfc;
        background-image: -webkit-linear-gradient(top, #d63cfc, #3498db);
        background-image: -moz-linear-gradient(top, #d63cfc, #3498db);
        background-image: -ms-linear-gradient(top, #d63cfc, #3498db);
        background-image: -o-linear-gradient(top, #d63cfc, #3498db);
        background-image: linear-gradient(to bottom, #d63cfc, #3498db);
        text-decoration: none;
    }

    .control_area {
        margin: 20px;
    }

    .initiative_list {
        width: 20%;
    }

    .statblock_area {
        width: 80%;
    }
</style>
