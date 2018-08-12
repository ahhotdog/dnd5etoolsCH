"use strict";const JSON_SRC_INDEX="index.json";function multisourceLoad(e,o,t,n,r){return new Promise(l=>{DataUtil.loadJSON(e+JSON_SRC_INDEX).then(l=>_onIndexLoad(l,e,o,t,n,r)).then(l)})}let loadedSources;function _onIndexLoad(e,o,t,n,r,l){return new Promise(d=>{loadedSources={},Object.keys(e).forEach(t=>loadedSources[t]={url:o+e[t],loaded:!1});const a=Object.keys(e),c=a.filter(e=>defaultSourceSelFn(e)),s=[...new Set((FilterBox.getSelectedSources()||[]).concat(ListUtil.getSelectedSources()||[]))],i=[];if(s&&s.filter(o=>e[o]).filter(e=>-1===$.inArray(e,i)).forEach(e=>i.push(e)),0===i.length&&c.filter(o=>e[o]).forEach(e=>i.push(e)),window.location.hash.length){const[e,...o]=History._getHashParts(),t=e.split(HASH_LIST_SEP)[1],n={};a.forEach(e=>n[UrlUtil.encodeForHash(e)]=e);const r=n[t];r&&-1===$.inArray(r,i)&&i.push(r)}const u=i.map(t=>({src:t,url:o+e[t]}));n(loadedSources),u.length>0?DataUtil.multiLoadJSON(u,e=>{loadedSources[e.src].loaded=!0},e=>{let o=[];e.forEach(e=>o=o.concat(e[t])),r(o);const n=()=>new Promise(e=>{RollerUtil.addListRollButton(),addListShowHide(),History.init(!0),e()});(l?l().then(n):n).then(d)}):d()})}function loadSource(e,o){return function(t,n){const r=loadedSources[t]||loadedSources[Object.keys(loadedSources).find(e=>e.toLowerCase()===t)];r.loaded||"yes"!==n||DataUtil.loadJSON(r.url).then(function(t){o(t[e]),r.loaded=!0})}}function onFilterChangeMulti(e){FilterBox.nextIfHidden(e)}