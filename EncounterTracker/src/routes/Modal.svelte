<script lang="ts">
	export let show_modal: boolean; // boolean

	let dialog: HTMLDialogElement; // HTMLDialogElement

	$: if (dialog && show_modal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (show_modal = false)}
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<slot name="header" />
		<hr />
		<slot name="content"/>
		<hr />
		<!-- svelte-ignore a11y-autofocus -->
		<button autofocus class="close_button rounded bg-gray-900 text-white" on:click={() => dialog.close()}>close modal</button>
	</div>
</dialog>

<style>
	dialog {
        @apply bg-gray-800;
		max-width: 32em;
		border-radius: 0.5em;
		border: none;
		padding: 0;
        text-align: center;
        color: white;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
	}

	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}

	dialog > div {
		padding: 1em;
	}

	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}

	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}

	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	button {
		display: block;
	}

    .close_button {
        padding: 5px;
        margin-top: 5px;
        width: 100%;
    }
</style>
