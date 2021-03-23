<script>
    import {height, width, maze} from "../stores/stores";

    export let x;
    export let y;
    export let id;
    export let props;
</script>

<div class="tile {$maze[id - 1].top ? 'top' : ''} {$maze[id - 1].right ? 'right' : ''} {$maze[id - 1].bottom ? 'bottom' : ''} {$maze[id - 1].left ? 'left' : ''}">
    {$maze[id - 1].data}
</div>

<style type="text/scss">

  .tile{
    height: 25px;
    width: 25px;
    display: block;

    &.top{
      border-top: 2px solid white;
    }

    &.right{
      border-right: 2px solid white;
    }

    &.bottom{
      border-bottom: 2px solid white;
    }

    &.left{
      border-left: 2px solid white;
    }
  }




</style>