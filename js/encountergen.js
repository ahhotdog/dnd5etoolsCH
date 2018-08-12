"use strict";const JSON_URL="data/encounters.json";let encounterList;const renderer=EntryRenderer.getDefaultRenderer();function makeContentsBlock(t,n){let e="<ul>";return n.tables.forEach((l,r)=>{const a=getTableName(n,l);e+=`<li>\n\t\t\t\t<a id="${t},${r}" href="#${UrlUtil.encodeForHash([n.location,n.source,l.minlvl+"-"+l.maxlvl])}" title="${a}">${a}</a>\n\t\t\t</li>`}),e+="</ul>"}function getTableName(t,n){return`${t.location} Encounters (Levels ${n.minlvl}—${n.maxlvl})`}function onJsonLoad(t){encounterList=t.encounter;const n=$("ul.encounters");let e="";for(let t=0;t<encounterList.length;t++){const n=encounterList[t];e+=`<li>\n\t\t\t\t<span class="name" onclick="showHideList(this)" title="Source: ${Parser.sourceJsonToFull(n.source)}">${n.location}</span>\n\t\t\t\t${makeContentsBlock(t,n)}\n\t\t\t</li>`}n.append(e);ListUtil.search({valueNames:["name"],listClass:"encounters"});History.init(!0),RollerUtil.addListRollButton()}function showHideList(t){$(t).next("ul").toggle()}function loadhash(t){renderer.setFirstSection(!0);const[n,e]=t.split(",").map(t=>Number(t)),l=encounterList[n],r=l.tables[e].table;let a=`\n\t\t<tr>\n\t\t\t<td colspan="6">\n\t\t\t\t<table class="striped-odd">\n\t\t\t\t\t<caption>${getTableName(l,l.tables[e])}</caption>\n\t\t\t\t\t<thead>\n\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t<th class="col-xs-2 text-align-center">\n\t\t\t\t\t\t\t\t<span class="roller" onclick="rollAgainstTable('${n}', '${e}')">d100</span>\n\t\t\t\t\t\t\t</th>\n\t\t\t\t\t\t\t<th class="col-xs-10">Encounter</th>\n\t\t\t\t\t\t</tr>\n\t\t\t\t\t</thead>`;for(let t=0;t<r.length;t++){a+=`<tr><td class="text-align-center">${r[t].min===r[t].max?pad(r[t].min):`${pad(r[t].min)}-${pad(r[t].max)}`}</td><td>${getRenderedText(r[t].enc)}</td></tr>`}a+="\n\t\t\t\t</table>\n\t\t\t</td>\n\t\t</tr>",$("#pagecontent").html(a)}function pad(t){return String(t).padStart(2,"0")}function getRenderedText(t){if(-1!==t.indexOf("{@")){const n=[];return renderer.recursiveEntryRender(t,n),n.join("")}return t}function rollAgainstTable(t,n){t=Number(t),n=Number(n);const e=encounterList[t],l=e.tables[n],r=l.table,a=RollerUtil.randomise(100)-1;let o;for(let t=0;t<r.length;t++){const n=r[t],e=null!=n.max&&n.max<n.min?n.max:n.min,l=null!=n.max&&n.max>n.min?n.max:n.min;if(a>=e&&a<=l){o=getRenderedText(n.enc);break}}o=o.replace(DICE_REGEX,function(t){return`<span class="roller" onclick="reroll(this)">${t}</span> <span class="result">(${EntryRenderer.dice.parseRandomise(t).total})</span>`}),EntryRenderer.dice.addRoll({name:`${e.location} (${l.minlvl}-${l.maxlvl})`},`<span><strong>${pad(a)}</strong> ${o}</span>`)}function reroll(t){const n=$(t),e=EntryRenderer.dice.parseRandomise(n.html());n.next(".result").html(`(${e.total})`)}window.onload=function(){DataUtil.loadJSON(JSON_URL).then(onJsonLoad)};