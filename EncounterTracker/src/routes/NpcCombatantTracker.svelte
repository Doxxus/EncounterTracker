<script lang="ts">
    import { type Combatant } from "../types/Combatant";
    export let combatants: Array<Combatant> = [];

  import { Button, Dropdown, DropdownItem, Radio } from 'flowbite-svelte';
  //import { ChevronDownSolid } from 'flowbite-svelte-icons';
  let group2 = 2;


</script>
<main>
    <div class="combatant_area">
        {#each combatants as combatant}
            <div class="combatant_card">
                <p class="combatant_name">{combatant.name}</p>
                <div class="combatant_info">
                    <p>AC: {combatant.ac}</p>
                    <div>
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
                    </div>
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
        grid-template-rows: repeat(auto-fit, minmax(150px, 1fr));
        gap: 0.5em;
    }

    .combatant_card {
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
    }
</style>