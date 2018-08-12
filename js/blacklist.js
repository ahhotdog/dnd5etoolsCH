class Blacklist{static getDisplayCategory(s){return"variantrule"===s?"Variant Rule":s.uppercaseFirst()}static getDisplayValues(s,a){return{displaySource:"*"===a?a:Parser.sourceJsonToFullCompactPrefix(a),displayCategory:"*"===s?s:Blacklist.getDisplayCategory(s)}}static _renderList(){ExcludeUtil.getList().sort((s,a)=>SortUtil.ascSort(s.source,a.source)||SortUtil.ascSort(s.category,a.category)||SortUtil.ascSort(s.name,a.name)).forEach(({name:s,category:a,source:t})=>Blacklist._addListItem(s,a,t))}static initialise(){Blacklist._list=new List("listcontainer",{valueNames:["id","source","category","name"],listClass:"blacklist",item:'<li class="row no-click"><span class="id hidden"></span><span class="source col-xs-3"></span><span class="category col-xs-3"></span><span class="name col-xs-3"></span><span class="actions col-xs-3 text-align-center"></span></li>'}),Blacklist._listId=1;const s=["backgrounds.json","cultsboons.json","deities.json","feats.json","invocations.json","objects.json","psionics.json","races.json","rewards.json","trapshazards.json","variantrules.json"],a=$("#bl-source"),t=$("#bl-category"),e=$("#bl-name"),l={};function o(s){Object.keys(s).forEach(a=>l[a]?l[a]=l[a].concat(s[a]):l[a]=s[a])}DataUtil.loadJSON("data/bestiary/index.json").then(s=>Promise.all(Object.values(s).map(s=>DataUtil.loadJSON(`data/bestiary/${s}`)))).then(s=>{s.forEach(s=>{o(s)}),Promise.resolve()}).then(()=>DataUtil.loadJSON("data/spells/index.json")).then(s=>Promise.all(Object.values(s).map(s=>DataUtil.loadJSON(`data/spells/${s}`)))).then(s=>{s.forEach(s=>{o(s)}),Promise.resolve()}).then(()=>DataUtil.class.loadJSON()).then(s=>{s.class.forEach(s=>s.subclasses.forEach(a=>a.class=s.name)),s.subclass=s.subclass||[],s.class.forEach(a=>s.subclass=s.subclass.concat(a.subclasses)),o(s),Promise.resolve()}).then(()=>{const c=s.map(s=>DataUtil.loadJSON(`data/${s}`));return c.push(EntryRenderer.item.promiseData({},!0)),Promise.all(c).then(s=>{s.forEach(s=>{s.race&&(s.race=EntryRenderer.race.mergeSubraces(s.race)),o(s)});const c=new Set,i=new Set;function r(){function s(s,a){const t="subclass"===a?s.map(s=>({name:s.name,source:s.source,class:s.class})).sort((s,a)=>SortUtil.ascSort(s.class,a.class)||SortUtil.ascSort(s.name,a.name)||SortUtil.ascSort(s.source,a.source)):s.map(({name:s,source:a})=>({name:s,source:a})).sort((s,a)=>SortUtil.ascSort(s.name,a.name)||SortUtil.ascSort(s.source,a.source)),l=new Set;let o="";t.forEach((s,e)=>{o+=`<option value="${s.name}|${s.source}">${"subclass"===a?`${s.class}: `:""}${s.name}${l.has(s.name)||t[e+1]&&t[e+1].name===s.name?` (${Parser.sourceJsonToAbv(s.source)})`:""}</option>`,l.add(s.name)}),e.append(o)}const o=t.val();if(e.empty(),e.append('<option value="*">*</option>'),"*"!==o){const t=a.val();s("*"===t?l[o]:l[o].filter(s=>s.source===t),o)}}Object.keys(l).forEach(s=>{i.has(s)||i.add(s),l[s].forEach(s=>c.has(s.source)||c.add(s.source))}),[...c].sort((s,a)=>SortUtil.ascSort(Parser.sourceJsonToFull(s),Parser.sourceJsonToFull(a))).forEach(s=>a.append(`<option value="${s}">${Parser.sourceJsonToFull(s)}</option>`)),[...i].sort((s,a)=>SortUtil.ascSort(Blacklist.getDisplayCategory(s),Blacklist.getDisplayCategory(a))).forEach(s=>t.append(`<option value="${s}">${Blacklist.getDisplayCategory(s)}</option>`)),a.change(r),t.change(r),Blacklist._renderList();const n=$(".bodyContent");n.find(".loading").prop("disabled",!1),n.find(".loading-temp").remove()})})}static _addListItem(s,a,t){const e=Blacklist.getDisplayValues(a,t),l=Blacklist._list.add([{id:Blacklist._listId++,name:s,category:e.displayCategory,source:e.displaySource}]);$('<button class="btn btn-xs btn-danger">Remove</button>').click(()=>{Blacklist.remove(s,a,t)}).appendTo($(l[0].elm).find(".actions"))}static add(){const s=$("#bl-source"),a=$("#bl-category"),t=$("#bl-name"),e=s.val(),l=a.val(),o=t.val().split("|")[0];("*"!==e||"*"!==l||"*"!==o||window.confirm("This will exclude all content from all list pages. Are you sure?"))&&ExcludeUtil.addExclude(o,l,e)&&Blacklist._addListItem(o,l,e)}static remove(s,a,t){ExcludeUtil.removeExclude(s,a,t);const e=Blacklist.getDisplayValues(a,t);Blacklist._list.items.filter(a=>a.values().name===s&&a.values().category===e.displayCategory&&a.values().source===e.displaySource).map(s=>s.values().id).forEach(s=>Blacklist._list.remove("id",s))}static export(){DataUtil.userDownload("content-blacklist",JSON.stringify({blacklist:ExcludeUtil.getList()},null,"\t"))}static import(s){const a=s.shiftKey,t=$('<input type="file" accept=".json" style="position: fixed; top: -100px; left: -100px; display: none;">').on("change",s=>{!function(s,a){const e=s.target,l=new FileReader;l.onload=(()=>{const s=l.result,e=JSON.parse(s);$(".blacklist").empty(),Blacklist._list.reIndex(),a?ExcludeUtil.setList(ExcludeUtil.getList().concat(e.blacklist||[])):ExcludeUtil.setList(e.blacklist||[]),BrewUtil.doHandleBrewJson(e,"NO_PAGE"),Blacklist._renderList(),t.remove()}),l.readAsText(e.files[0])}(s,a)}).appendTo($("body"));t.click()}static reset(){ExcludeUtil.resetExcludes(),$(".blacklist").empty(),Blacklist._list.reIndex()}}window.addEventListener("load",()=>{ExcludeUtil.initialise(),Blacklist.initialise()});