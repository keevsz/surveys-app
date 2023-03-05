<template>
    <div class="w-full flex items-center justify-center">
        <div class="hypnotic"></div>
    </div>
</template>

<style scoped>
.hypnotic {
   width: 100px;
   height: 100px;
   display: grid;
   background: linear-gradient(90deg,#1F4068 2.2px,#0000 0 calc(100% - 2.2px),#1F4068 0) center/100% 15.7px,
          linear-gradient(0deg, #1F4068 2.2px,#0000 0 calc(100% - 2.2px),#1F4068 0) center/15.7px 100%,
          linear-gradient(#1F4068 0 0) center/100% 2.2px,
          linear-gradient(#1F4068 0 0) center/2.2px 100%;
   background-repeat: no-repeat;
   animation: hypnotic-8xnm9d 4s infinite linear;
}

.hypnotic::before,
.hypnotic::after {
   content: "";
   grid-area: 1/1;
   background: inherit;
   transform-origin: inherit;
   animation: inherit;
}

.hypnotic::after {
   animation-duration: 2s;
}

@keyframes hypnotic-8xnm9d {
   100% {
      transform: rotate(1turn);
   }
}
</style>