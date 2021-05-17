<script>
  export let title = "";
  export let subtitle = "";
  export let value = 0;
</script>

<div class="card">
  <h4>{title}</h4>
  {#if subtitle}
    <h5>{subtitle}</h5>
  {/if}
  <p>{value}</p>
</div>

<style>
  .card {
    display: flex;
    flex-direction: column;
    background: #fff;
    padding: 15px;
    border-radius: 6px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  }

  p {
    font-size: 2rem;
    text-align: center;
  }
  
  h4 {
    flex: 1;
    font-size: 0.8rem;
    text-align: center;
  }

  @media (min-width: 64rem) {
    .card {
      padding: 20px;
      border-radius: 6px;
    }

    p {
      font-size: 2.5rem;
    }
  }
</style>
