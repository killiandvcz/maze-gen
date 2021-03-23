<script>
    import { onMount } from 'svelte';
    import {height, width, maze} from "../stores/stores";
    import Tile from './Tile.svelte';
    $: tiles = maze
</script>

<div class="maze" style="grid-template-columns: repeat({$width}, 1fr); grid-template-rows: repeat({$height}, 1fr);">

    {#each $tiles as tile}
        <Tile x={tile.x} y={tile.y} id={tile.i} props={tile}/>
    {/each}

</div>

<style type="text/scss">


    .maze{
      display: grid;
    }


</style>