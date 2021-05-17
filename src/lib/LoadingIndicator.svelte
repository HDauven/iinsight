<div class="container">
  <div class="circle" />
</div>

<style>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2rem;
  }

  .circle {
    height: 60px;
    width: 60px;
    border-color: #0088ff transparent #0088ff #0088ff;
    border-width: calc(60 / 15);
    border-style: solid;
    border-image: initial;
    border-radius: 50%;
    animation: 1s linear 0s infinite normal none running rotate;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
