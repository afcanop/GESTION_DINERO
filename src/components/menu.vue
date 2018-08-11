<template>
<nav class="navbar is-transparent is-black">
  <div class="navbar-brand">
    <H1 class="navbar-item" href="https://bulma.io">
    {{Title}}
    </H1>

  </div>
</nav>
</template>

<script>
export default {
    name: "Manu",
    props: {
        Title: String
    }
};
</script>

<style scoped>
    H1.navbar-item{
        font-size: 28PX;
        font-family: cursive;
        text-transform: uppercase;
        color: hsl(217, 71%, 53%) !important;
    }
    
</style>


