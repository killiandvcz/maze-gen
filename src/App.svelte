<script>
	import Board from './components/Board.svelte'
    import Maze from './components/Maze.svelte'
	import {height, width, maze} from "./stores/stores"
</script>

<Board />
<div class="container">
    <Maze />
</div>


<style type="text/scss">

    .container{
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 25px;
    }

</style>