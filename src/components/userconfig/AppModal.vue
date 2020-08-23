<template>
  <div>
    <h3>Detaljer om oppgavetypen</h3>
    <p>Beskrivelse: {{ app.desc }}</p>
    <p>Læringsmål: {{app.goal}}</p>
    <p>Læringsfase: {{app.phase}}</p>
    <hr />
    <h3>Anmeldelser fra lærere</h3>

    <p>
      Greta, 48: Liker denne godt, bruker den helt i begynnelsen av bokstavinnlæringen i første klasse.
      <b>4/5 stjerner</b>
    </p>
    <p>
      Tor, 32: Har brukt denne mye i voksenopplæringen med analfabeter, fungerer veldig bra.
      <b>5/5 stjerner</b>
    </p>
  </div>
</template>


<script>
export default {
  props: {
    app: Object
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/_variables.scss";
</style>