<script>
	import DragDropList from "./DragDropList.svelte";
    let data = ["Adams", "Boston", "Chicago", "Denver"];
</script>
<main>
    <div class="control_areaa">
        <div class="initiative_list">
            <DragDropList bind:data={data}></DragDropList>
        </div>
    </div>
</main>
<style>
    .initiative_list {
        display: block;
    }
</style>
