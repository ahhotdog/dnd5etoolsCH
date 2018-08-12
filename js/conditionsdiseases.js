"use strict";const JSON_URL="data/conditionsdiseases.json",entryRenderer=EntryRenderer.getDefaultRenderer();function conditionDiseaseTypeToFull(t){return"c"===t?"Condition":"Disease"}window.onload=function(){DataUtil.loadJSON(JSON_URL).then(onJsonLoad)};const sourceFilter=getSourceFilter();let filterBox,list;function onJsonLoad(t){list=ListUtil.search({valueNames:["name","source","type"],listClass:"conditions"});const e=new Filter({header:"Type",items:["c","d"],displayFn:conditionDiseaseTypeToFull,deselFn:t=>"d"===t});filterBox=initFilterBox(sourceFilter,e),list.on("updated",()=>{filterBox.setCount(list.visibleItems.length,list.items.length)}),$(filterBox).on(FilterBox.EVNT_VALCHANGE,handleFilterChange);ListUtil.initSublist({valueNames:["name","type","id"],listClass:"subconditions",getSublistRow:getSublistItem});ListUtil.initGenericPinnable(),addConditions(t),BrewUtil.pAddBrewData().then(handleBrew).catch(BrewUtil.purgeBrew).then(()=>{BrewUtil.makeBrewButton("manage-brew"),BrewUtil.bind({list:list,filterBox:filterBox,sourceFilter:sourceFilter}),ListUtil.loadState(),History.init(!0),RollerUtil.addListRollButton()})}function handleBrew(t){addConditions(t)}let conditionList=[],cdI=0;function addConditions(t){if(!(t.condition&&t.condition.length||t.disease&&t.disease.length))return;t.condition&&t.condition.forEach(t=>t._type="c"),t.disease&&t.disease.forEach(t=>t._type="d"),t.condition&&t.condition.length&&(conditionList=conditionList.concat(t.condition)),t.disease&&t.disease.length&&(conditionList=conditionList.concat(t.disease));const e=$("ul.conditions");let n="";for(;cdI<conditionList.length;cdI++){const t=conditionList[cdI];n+=`\n\t\t\t<li class="row" ${FLTR_ID}="${cdI}" onclick="ListUtil.toggleSelected(event, this)" oncontextmenu="ListUtil.openContextMenu(event, this)">\n\t\t\t\t<a id='${cdI}' href='#${UrlUtil.autoEncodeHash(t)}' title="${t.name}">\n\t\t\t\t\t<span class="type col-xs-3 text-align-center">${conditionDiseaseTypeToFull(t._type)}</span>\n\t\t\t\t\t<span class='name col-xs-7'>${t.name}</span>\n\t\t\t\t\t<span class='source col-xs-2 source${t.source}' title="${Parser.sourceJsonToFull(t.source)}">${Parser.sourceJsonToAbv(t.source)}</span>\n\t\t\t\t</a>\n\t\t\t</li>`,sourceFilter.addIfAbsent(t.source)}const i=ListUtil.getSearchTermAndReset(list);e.append(n),sourceFilter.items.sort(SortUtil.ascSort),list.reIndex(),i&&list.search(i),list.sort("name"),filterBox.render(),handleFilterChange(),ListUtil.setOptions({itemList:conditionList,getSublistRow:getSublistItem,primaryLists:[list]}),ListUtil.bindPinButton(),EntryRenderer.hover.bindPopoutButton(conditionList),UrlUtil.bindLinkExportButton(filterBox),ListUtil.bindDownloadButton(),ListUtil.bindUploadButton()}function getSublistItem(t,e){return`\n\t\t<li class="row" ${FLTR_ID}="${e}" oncontextmenu="ListUtil.openSubContextMenu(event, this)">\n\t\t\t<a href="#${UrlUtil.autoEncodeHash(t)}">\n\t\t\t\t<span class="name col-xs-12">${t.name}</span>\t\t\n\t\t\t\t<span class="id hidden">${e}</span>\t\t\t\t\n\t\t\t</a>\n\t\t</li>\n\t`}function handleFilterChange(){const t=filterBox.getValues();list.filter(function(e){const n=conditionList[$(e.elm).attr(FLTR_ID)];return filterBox.toDisplay(t,n.source,n._type)}),FilterBox.nextIfHidden(conditionList)}function loadhash(t){entryRenderer.setFirstSection(!0);const e=$("#pagecontent").empty(),n=conditionList[t],i={type:"entries",entries:n.entries},s=[];entryRenderer.recursiveEntryRender(i,s),e.append(`\n\t\t${EntryRenderer.utils.getBorderTr()}\n\t\t${EntryRenderer.utils.getNameTr(n)}\n\t\t<tr><td class="divider" colspan="6"><div></div></td></tr>\n\t\t<tr class='text'><td colspan='6'>${s.join("")}</td></tr>\n\t\t${EntryRenderer.utils.getPageTr(n)}\n\t\t${EntryRenderer.utils.getBorderTr()}\n\t`),ListUtil.updateSelected()}