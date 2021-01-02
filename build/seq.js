export class Sequence{constructor(t){this.t=t(),this.i=!1}static range(t,n,e=1){return new Sequence((()=>function*(t,n,e){for(let r=t;r<n;r+=e)yield r}(t,n,e)))}static rangeClosed(t,n,e=1){return Sequence.range(t,n+1,e)}static iterate(t,n,e=(t=>!0)){return new Sequence((()=>function*(t,n,e){for(let r=t;!0===e(r);r=n(r))yield r}(t,n,e)))}static generate(t){return new Sequence((()=>function*(t){for(;;)yield t()}(t)))}static empty(){return new Sequence((()=>function*(){}()))}static of(...t){return 1===t.length&&Array.isArray(t[0])?new Sequence((()=>e(t[0]))):new Sequence((()=>e(t)))}filter(t){return this.i=!0,new Sequence((()=>function*(t,n){for(;;){const e=n.next();if(e.done)break;!0===t(e.value)&&(yield e.value)}}(t,this.t)))}map(t){return this.i=!0,new Sequence((()=>function*(t,n){for(;;){const e=n.next();if(e.done)break;yield t(e.value)}}(t,this.t)))}flatMap(t){return this.i=!0,new Sequence((()=>function*(t,n){for(const e of n){const n=t(e);for(const t of n)yield t}}(t,this.t)))}take(t){return this.i=!0,new Sequence((()=>function*(t,n){let e=0;for(;;){const r=n.next();if(r.done||e===t)break;++e,yield r.value}}(t,this.t)))}skip(t){return this.i=!0,new Sequence((()=>function*(t,n){let e=0;for(;;){const r=n.next();if(r.done)break;e++>=t&&(yield r.value)}}(t,this.t)))}takeWhile(t){return this.i=!0,new Sequence((()=>function*(t,n){for(;;){const e=n.next();if(e.done||!1===t(e.value))break;yield e.value}}(t,this.t)))}skipWhile(t){return this.i=!0,new Sequence((()=>function*(t,n){for(;;){const e=n.next();if(e.done)return;if(!1===t(e.value)){yield e.value;break}}for(const t of n)yield t}(t,this.t)))}distinct(t=(t=>t)){return this.i=!0,new Sequence((()=>function*(t,n){const e=[];t:for(const r of n){const n=t(r);for(const r of e)if(n===t(r))continue t;e.push(r),yield r}}(t,this.t)))}sort(t){const n=this.toArray();return this.i=!0,n.sort(t),new Sequence((()=>e(n)))}sortAscending(t=(t=>t)){return this.sort(((n,e)=>{const r=t(n),i=t(e);return r<i?-1:r>i?1:0}))}sortDescending(t=(t=>t)){return this.sort(((n,e)=>{const r=t(n),i=t(e);return r<i?1:r>i?-1:0}))}forEach(t){n(this);for(const n of this.t)t(n)}reduce(t,e){n(this);let r=t;for(const t of this.t)r=e(r,t);return r}sum(){return this.reduce(0,((t,n)=>t+n))}count(){return this.reduce(0,((t,n)=>t+1))}average(){const{sum:n,count:e}=t({count:0,sum:0},this,((t,n)=>{++t.count,t.sum+=n}));return 0===e?null:n/e}join(t=""){return this.toArray().join(t)}min(t=(t=>t)){const n=this.t.next();return this.reduce(n.done?null:n.value,((n,e)=>t(n)<t(e)?n:e))}max(t=(t=>t)){const n=this.t.next();return this.reduce(n.done?null:n.value,((n,e)=>t(n)>t(e)?n:e))}toArray(){return t([],this,((t,n)=>t.push(n)))}toMap(n,e,r=((t,n,e)=>{throw`Duplicate value found for key: '${t}', previous value: '${n}', current value: '${e}'`})){return t({},this,((t,i)=>{const u=n(i),o=e(i);void 0===t[u]?t[u]=o:t[u]=r(u,t[u],o)}))}partitionBy(n){return t([[],[]],this,((t,e)=>t[!0===n(e)?0:1].push(e)))}chunking(n){const e=this.t.next();return t(e.done?[]:[[e.value]],this,((t,e)=>{const r=t[t.length-1];r.length===n?t.push([e]):r.push(e)}))}groupingBy(n,e=Grouper.toArray()){const r=t({},this,((t,r)=>{const i=n(r);void 0===t[i]&&(t[i]=e.u()),e.o(t,i,r)})),i=e.h;if(i)for(const[t,n]of Object.entries(r))i(r,t,n);return r}first(){n(this);const t=this.t.next();return t.done?null:t.value}last(){const t=this.t.next();return this.reduce(t.done?null:t.value,((t,n)=>n))}allMatches(t){n(this);for(const n of this.t)if(!1===t(n))return!1;return!0}anyMatches(t){n(this);for(const n of this.t)if(!0===t(n))return!0;return!1}}export class Grouper{static toArray(){return{u:()=>[],o:(t,n,e)=>t[n].push(e)}}static counting(){return{u:()=>0,o:(t,n,e)=>++t[n]}}static summing(t){return{u:()=>0,o:(n,e,r)=>n[e]+=t(r)}}static averaging(t){return{u:()=>({sum:0,count:0}),o:(n,e,r)=>{n[e].sum+=t(r),++n[e].count},h:(t,n,e)=>t[n]=e.sum/e.count}}}function t(t,e,r){n(e);for(const n of e.t)r(t,n);return t}function n(t){if(t.i)throw new Error("Sequence was already terminated!");t.i=!0}function*e(t){for(const n of t)yield n}