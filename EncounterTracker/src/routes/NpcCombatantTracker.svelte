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
    <div class="combatant_area">
        {#each combatants as combatant}
            <div class="combatant_card">
                <p class="combatant_name">{combatant.name}</p>
                <div class="combatant_info">
                    <p>AC: {combatant.ac}</p>
                    <!-- <div>
                        <Button color="purple">Status {combatant.status}</Button>
                        <Dropdown class="w-48 p-3 space-y-1">
                            <DropdownItem class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                                <Radio name="group2" bind:group={group2} value={1}>Default radio</Radio>
                            </DropdownItem>
                            <DropdownItem class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                                <Radio name="group2" bind:group={group2} value={2}>Checked state</Radio>
                            </DropdownItem>
                            <DropdownItem class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                                <Radio name="group2" bind:group={group2} value={3}>Default radio</Radio>
                            </DropdownItem>
                        </Dropdown>
                    </div> -->
                </div>
                <div class="hp_area">
                    <button class="hp_button minus_button" on:click={() => {MinusHP(combatant)}}>-</button>
                    <div class="hp_bar_base">
                        <div class="hp_bar_current" style="width: {100 * combatant.current_hp / combatant.max_hp}%">
                            <p class="current_hp">{combatant.current_hp}</p>
                        </div>                        
                    </div>
                    <button class="hp_button plus_button" on:click={() => {PlusHP(combatant)}}>+</button>
                </div>
            </div>
        {/each}
    </div>
</main>
<style>
    .combatant_area {
        margin: 20px;
        width: 100%;
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