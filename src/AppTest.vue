<template>
  <div class="container top">
    <div class="row">
      <div class="col-md-3">
          <P class="letter" @click="clickLetter">A a</P>
        </DIV>
        <div class="col-md-3">
          <P class="letter">B b</P>
        </DIV>
         <div class="col-md-3">
          <P class="letter">C c</P>
        </DIV>
         <div class="col-md-3">
          <P class="letter">D d</P>
        </DIV>
    </div>
    <div class="row">
      <div class="col-md-3">
          <P class="letter">E e</P>
        </DIV>
        <div class="col-md-3">
          <P class="letter">F f</P>
        </DIV>
         <div class="col-md-3">
          <P class="letter">G g</P>
        </DIV>
         <div class="col-md-3">
          <P class="letter">I i</P>
        </DIV>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
      clickLetter() {
        console.log("bokstav ble trykket på!")
      }

  }


};
</script>

<style>



.top {
  margin-top:30px;
}

hr {
  border: solid 1px black;
  width: 100%;
}

.letter {
  cursor:pointer;
  color: red;
}

div {
  border: solid 1px black;
  font-family: Helvetica;
  font-size: 150%;
}


</style>
