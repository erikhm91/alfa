<template>
    <div>
        <button @click="play">Play Sound!</button>
    </div>
</template>

<script>
import A from '../../assets/A.mp3';
import B from '../../assets/B.mp3';

export default {
    components: {
        unnrA : () => import('../../assets/A.mp3')
    },

    mounted() {
       this.audioA = new Audio(A);
    },

    methods: {
        play() {
            this.audioA.play();
        }
    }
}
</script>

<style scoped></style>