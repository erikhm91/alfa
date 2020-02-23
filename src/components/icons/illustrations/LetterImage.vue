<template>
<div>
  <!-- <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    viewBox="0 0 18 18"
    :aria-labelledby="capitalLetter"
    role="presentation"
  >
    <title :id="capitalLetter" lang="en">{{ capitalLetter }} icon</title>
       <component :is="capitalLetter"></component>
  </svg> -->
      <component :is="'unnr-'+capitalLetter" :height="height" :width="width"></component>

</div>

</template>

<script>
import A from "./A.vue";
import B from "./B.vue";
import C from "./C.vue";
import D from "./D.vue";
import E from "./E.vue";
import F from "./F.vue";
import G from "./G.vue";
import H from "./H.vue";
import I from "./I.vue";
import J from "./J.vue";
import K from "./K.vue";
import L from "./L.vue";
import M from "./M.vue";
import N from "./N.vue";
import O from "./O.vue";
import P from "./P.vue";
import Q from "./Q.vue";
import R from "./R.vue";
import S from "./S.vue";
import T from "./T.vue";
import U from "./U.vue";
import V from "./V.vue";
import W from "./W.vue";
import X from "./X.vue";
import Y from "./Y.vue";
import Z from "./Z.vue";
import AE from "./AE.vue";
import OE from "./OE.vue";
import AA from "./AA.vue";

export default {
  props: {
    capitalLetter: {
      type: String
    },
    width: {
      type: [Number, String],
      default: 18
    },
    height: {
      type: [Number, String],
      default: 18
    },
  },
  components: {
    unnrA : A,
    unnrB : B,
    unnrC : C,
    unnrD: D,
    unnrE: E,
    unnrF: F,
    unnrG : G,
    unnrH: H,
    unnrI: I,
    unnrJ: J,
    unnrK: K,
    unnrL: L,
    unnrM: M,
    unnrN: N,
    unnrO: O,
    unnrP: P,
    unnrQ: Q,
    unnrR: R,
    unnrS: S,
    unnrT: T,
    unnrU: U,
    unnrV: V,
    unnrW: W,
    unnrX: X,
    unnrY: Y,
    unnrZ: Z,
    unnrAE: AE,
    unnrOE: OE,
    unnrAA: AA
  }
};
</script>