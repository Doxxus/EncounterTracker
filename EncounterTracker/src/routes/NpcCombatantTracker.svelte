<script lang="ts">
    import { type Combatant } from "../types/Combatant";
    export let combatants: Array<Combatant> = [];
    export let update_combatants = () => {}

    import { Button, Dropdown, DropdownItem, Radio } from 'flowbite-svelte';
    
    let group2 = 2;
    let statuses = ["N/A", "Blinded"]

    function MinusHP(combatant: Combatant) {
        combatant.current_hp = combatant.current_hp - 1;
        if (combatant.current_hp <= 0) combatants.splice(combatants.indexOf(combatant), 1);
        update_combatants();
    }

    function PlusHP(combatant: Combatant) {
        combatant.current_hp++;
        if (combatant.current_hp >= combatant.max_hp) combatant.current_hp = combatant.max_hp;
        update_combatants();
    }

</script>
<main>
    <div class="header">
        <h1 style="color: white">NPC Combatants</h1>
    </div>
    <div class="combatant_area border-solid border-2 border-slate-950 rounded-xl">       
        {#each combatants as combatant}
            <div class="combatant_card rounded-xl">
                <p class="combatant_name">{combatant.name}</p>
                <div class="combatant_info">
                    <p>AC: {combatant.ac}</p>
                </div>
                <div class="hp_area">
                    <button class="hp_button minus_button rounded-l-lg" on:click={() => {MinusHP(combatant)}}>-</button>
                    <div class="hp_bar_base">
                        <div class="hp_bar_current" style="width: {100 * combatant.current_hp / combatant.max_hp}%">
                            <p class="current_hp">{combatant.current_hp}</p>
                        </div>                        
                    </div>
                    <button class="hp_button plus_button rounded-r-lg" on:click={() => {PlusHP(combatant)}}>+</button>
                </div>
            </div>
        {/each}
    </div>
</main>
<style>
    .header {
        text-align: center;
        font-size: large;
    }

    .combatant_area {
        padding: 20px;
        margin-left: 20px;
        width: auto;
        height: 100%;
        grid-column: 1/3;
        grid-row: 2/2;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        grid-template-rows: repeat(auto-fit, minmax(100px, 1fr));
        gap: 1.5em;
    }

    .combatant_card {
        @apply bg-gray-500;

        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        transition: 0.3s;
        display: flex;
        flex-direction: column;
        text-align: center;
        font-family: Arial;
    }
    
    .combatant_card:hover {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
        @apply bg-gray-400;
    }

    .combatant_name {
        width: 100%;
    }

    .combatant_info {
        display: flex;
        flex-direction: row;
        gap: 0.2em;
        margin: 5px;
        height: 25px;
    }

    .hp_area {
        display: flex;
        flex-direction: row;
        margin: 10px;
    }

    .hp_button {
        background: linear-gradient(90deg, rgba(9, 0, 43, 1) 0%, rgba(9, 0, 43, 1) 100%);
        width: 35px;
        height: 35px;
        color: white;
        transition: 0.3s;
    }

    .minus_button:hover {
        background: linear-gradient(90deg, rgba(9, 0, 43, 1) 0%, rgba(0,212,255,1) 100%);  
    }

    .plus_button:hover {
        background: linear-gradient(90deg, rgba(73,255,14,1)  0%, rgba(9, 0, 43, 1) 100%);  
    }

    .hp_bar_base {
        height: 35px;
        width: 100%;
        background: linear-gradient(90deg, rgba(51,0,0,1) 0%, rgba(159,0,0,1) 100%);
    }

    .hp_bar_current {
        height: 35px;
        background: linear-gradient(90deg, rgba(0,212,255,1) 0%, rgba(73,255,14,1) 100%);
        width: 50%;
        z-index: 5;
        text-align: right;
        padding: 7px;
        vertical-align: center;
        overflow: hidden;
    }

    .current_hp {
        color: white;
    }
</style>