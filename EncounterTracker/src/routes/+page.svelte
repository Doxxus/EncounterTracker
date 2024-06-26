<script lang="ts">
	import DragDropList from "./DragDropList.svelte";
    import NpcCombatantTracker from "./NpcCombatantTracker.svelte";
    import Modal from "./Modal.svelte";
    
    import players from "../data/players.json";
    import encounters from "../data/encounters.json";
    import npcs from "../data/npc_combatants.json";
    
    import { Combatant } from "../types/Combatant";
    import { type Encounter } from "../types/Encounter";

    let comb_players: Array<Combatant> = players.players;
    let combatants: Array<Combatant> = comb_players;
    let npc_combatants: Array<Combatant> = [];
    let active_encounter: Encounter | null = null;
    let active_combatant_id: number = 0;
    let started_encounter: boolean = false;
    let show_modal: boolean = false;

    // Used to trigger svelte reactivity to an update to the data array.
    function UpdateCombatants() {
        npc_combatants = npc_combatants;

        combatants.forEach((combatant) => {
            if (!npc_combatants.includes(combatant) && !comb_players.includes(combatant)) {
                let comb_index = combatants.indexOf(combatant);
                if (comb_index <= active_combatant_id) active_combatant_id--;
                combatants.splice(comb_index, 1);
            }
        });

        combatants = combatants;
    }

    function UpdateTrackerOnInitiativeChange(index: number) {
        npc_combatants.forEach((combatant) => {
            if (!combatants.includes(combatant)) {
                npc_combatants.splice(npc_combatants.indexOf(combatant), 1);
                if (index <= active_combatant_id) active_combatant_id--;
            }
        });

        npc_combatants = npc_combatants;
    }

    function StartEncounter() {
        if (active_encounter == null) return;
        if (combatants === null) return;
        
        combatants.forEach((combatant: Combatant) => {
            combatant.is_active = false;
            combatant.current_hp = combatant.max_hp;
        })

        combatants[0].is_active = true;
        active_combatant_id = 0;

        UpdateCombatants();

        started_encounter = true;
    }

    function NextCombatant() {
        if (active_encounter == null || !started_encounter) return;
        active_combatant_id++;

        if (combatants.length - 1 < active_combatant_id) active_combatant_id = 0;

        combatants.forEach((combatant: Combatant) => {
            combatant.is_active = false;
        })

        combatants[active_combatant_id].is_active = true;
    }

    function EndEncounter() {
        comb_players = players.players;
        combatants = comb_players;
        npc_combatants = [];
        active_encounter = null;
        active_combatant_id = 0;
        started_encounter = false;    

        combatants.forEach((combatant: Combatant) => {
            combatant.is_active = false;
        })
    }

    function LoadCombatants(encounter: Encounter) {       
        if (started_encounter && active_encounter != null) {
            active_encounter.initiative_list = combatants;
            active_encounter.current_combatant = active_combatant_id;
        }

        combatants = players.players;
        let npc_combs: Array<Combatant> = [];

        npc_combs = encounter.npc_combatants;
        active_encounter = encounter;

        if (active_encounter.initiative_list.length != 0) {
            npc_combatants = npc_combs;
            combatants = active_encounter.initiative_list;
            active_combatant_id = active_encounter.current_combatant;
        }
        else {
            npc_combatants = npc_combs;
            combatants = comb_players.concat(npc_combs);   
        }        
    }

    function LoadNPCModal() {
        if (started_encounter) return;
        show_modal = true;
    }

    function AddCombatant(combatant: Combatant) {
        let temp_combatant = structuredClone(combatant);
        temp_combatant.is_active = false;   
        temp_combatant.name = NameCombatant(temp_combatant, 0, temp_combatant.name);

        combatants.push(temp_combatant);
        npc_combatants.push(temp_combatant);
        combatants = combatants;
        UpdateCombatants();
    }

    function NameCombatant(combatant: Combatant, number: number, orig_name: String): String {
        let temp_name: String = combatant.name;
        let duplicate_found = false;

        for (let i = 0; i < npc_combatants.length; i++) {
            if (npc_combatants[i].name != combatant.name) continue;
            duplicate_found = true;
            break;
        }

        if (duplicate_found) {
            combatant.name = orig_name + " " + (number + 1).toString();
            temp_name = NameCombatant(combatant, number + 1, orig_name);
        }
        else if (number != 0) {
            temp_name = orig_name + " " + number.toString();
        }

        return temp_name;
    }

</script>
<main>
    <div class="controls">
        <div class="encounter_controls">
            <div class="encounter_buttons">
                <button class="encounter_button" on:click="{() => {StartEncounter()}}">Start Encounter</button>
                <button class="encounter_button" on:click="{() => {NextCombatant()}}">Next Combatant</button>
                <button class="encounter_button" on:click={() => (LoadNPCModal())}>Add Combatants</button>
                <button class="encounter_button" on:click="{() => {EndEncounter()}}">End Encounter</button>               
            </div>             
              
            {#if started_encounter}
                <div class="current_combatant_div border-solid border-2 border-slate-950 rounded-xl">
                    <h2>Current Combatant: </h2>
                    <p>{combatants[active_combatant_id].name}</p>
                </div>
            {/if}
        </div>
        <div class="encounter_selects">
            {#each encounters.encounters as encounter}
                <button class="encounter_button" on:click="{() => {LoadCombatants(encounter)}}">{encounter.name}</button>
            {/each}
        </div>
    </div> 
    <div class="control_area">
        <div class="initiative_list">
            <div class="header">
                <h1 style="color: white">Initiative List</h1>
            </div>
            <div class="inner_list border-solid border-2 border-slate-950 rounded-xl">
                <DragDropList bind:data={combatants} update_npc_combatants={UpdateTrackerOnInitiativeChange}></DragDropList>
            </div>
        </div>       
        <div class="statblock_area">
            <NpcCombatantTracker bind:combatants={npc_combatants} update_combatants={UpdateCombatants}></NpcCombatantTracker>
        </div>
    </div>
    <Modal bind:show_modal={show_modal}>
        <h1 slot="header">Add Combatants to Encounter</h1>
        <div slot="content" class="npc_buttons">
            {#each npcs.npcs as npc}
                <button class="encounter_button" on:click={() => {AddCombatant(npc)}}>{npc.name}</button>
            {/each}
        </div>
    </Modal>
</main>
<style>
    .controls {
        display: flex;
        flex-direction: row;
        margin: 20px;
        gap: 0.3em;
    }

    .encounter_buttons {
        display: flex;
        flex-direction: row;
        gap: 0.3em;
    }

    .current_combatant_div {
        margin: 5px;
        padding-left: 5px;
        padding-right: 5px;
        color: white;
        align-items: center;
        justify-content: center;
        text-align: center;
        display: flex;
        flex-direction: row;
        gap: 0.3em;
    }

    .encounter_controls {
        display: flex;
        flex-direction: column;
    }
    
    .npc_buttons {
        display: flex;
        flex-direction: column;
        gap: 0.2em;
        margin: 5px;
    }
    
    .encounter_button {
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
        padding: 10px 20px 10px 20px;
        text-decoration: none;
    }

    .encounter_selects {
        display: flex;
        flex-direction: row;
        gap: 0.3em;
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
        display: flex;
        flex-direction: rows;
    }

    .inner_list {
        padding: 20px;
    }

    @media (min-width: 1000px) {
        .initiative_list {
            width: 20%;
            text-align: center;
            font-size: large;
        }

        .statblock_area {
            width: 80%;
        }

        .current_combatant_div {
            font-size: 15px;
        }

        .encounter_button {
            font-size: 20px;
        }
    }

    @media (max-width: 1000px) {
        .initiative_list {
            width: 45%;
            text-align: center;
        }

        .statblock_area {
            width: 55%;
        }

        .current_combatant_div {
            font-size: 12px;
        }

        .encounter_button {
            font-size: 12px;
        }
    }
    
</style>
