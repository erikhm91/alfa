<template>
<div>
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

    unnrA : () => import("./A.vue"),
    unnrB : () => import("./B.vue"),
    unnrC : () => import("./C.vue"),
    unnrD: () => import("./D.vue"),
    unnrE: () => import("./E.vue"),
    unnrF: () => import("./F.vue"),
    unnrG : () => import("./G.vue"),
    unnrH: () => import("./H.vue"),
    unnrI: () => import("./I.vue"),
    unnrJ: () => import("./J.vue"),
    unnrK: () => import("./K.vue"),
    unnrL: () => import("./L.vue"),
    unnrM: () => import("./M.vue"),
    unnrN: () => import("./N.vue"),
    unnrO: () => import("./O.vue"),
    unnrP: () => import("./P.vue"),
    unnrQ: () => import("./Q.vue"),
    unnrR: () => import("./R.vue"),
    unnrS: () => import("./S.vue"),
    unnrT: () => import("./T.vue"),
    unnrU: () => import("./U.vue"),
    unnrV: () => import("./V.vue"),
    unnrW: () => import("./W.vue"),
    unnrX: () => import("./X.vue"),
    unnrY: () => import("./Y.vue"),
    unnrZ: () => import("./Z.vue"),
    unnrAE: () => import("./AE.vue"),
    unnrOE: () => import("./OE.vue"),
    unnrAA: () => import("./AA.vue"),
  }
};
</script>