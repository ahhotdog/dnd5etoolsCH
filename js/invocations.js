"use strict";const JSON_URL="data/invocations.json",ID_INVOCATION_LIST="invocationsList",JSON_ITEM_NAME="name",JSON_ITEM_SOURCE="source",JSON_ITEM_PATRON="patron",JSON_ITEM_PACT="pact",JSON_ITEM_LEVEL="level",JSON_ITEM_SPELL="spell",CLS_INVOCATION="invocations",CLS_COL1="col-xs-3 col-xs-3-9",CLS_COL2="col-xs-1 col-xs-1-6",CLS_COL3="col-xs-1 col-xs-1-2",CLS_COL4="col-xs-2 col-xs-2-1",CLS_COL5="col-xs-2",CLS_COL6="col-xs-1 col-xs-1-2",CLS_LI_NONE="list-entry-none",LIST_NAME="name",LIST_SOURCE="source",LIST_PATRON="patron",LIST_PACT="pact",LIST_LEVEL="level",LIST_SPELL="spell";function sortLevelAsc(e,t){return e===STR_ANY&&(e=0),t===STR_ANY&&(t=0),Number(t)-Number(e)}function listSortInvocations(e,t,s){if("level"===s.valueName){const s=sortLevelAsc(e.values().level,t.values().level);if(0!==s)return s}return SortUtil.listSort(e,t,s)}let list;window.onload=function(){ExcludeUtil.initialise(),DataUtil.loadJSON(JSON_URL).then(onJsonLoad)};const sourceFilter=getSourceFilter(),spellFilter=new Filter({header:"Spell or Feature",items:["Eldritch Blast","Hex/Curse",STR_NONE]});let filterBox;function onJsonLoad(e){const t=new Filter({header:"Patron",items:["The Archfey","The Fiend","The Great Old One","The Hexblade","The Kraken","The Raven Queen","The Seeker",STR_ANY],displayFn:Parser.invoPatronToShort}),s=new Filter({header:"Pact",items:["Blade","Chain","Tome",STR_ANY],displayFn:Parser.invoPactToFull}),i=new Filter({header:"Warlock Level",items:["5","7","9","12","15","18",STR_ANY]});filterBox=initFilterBox(sourceFilter,s,t,spellFilter,i),(list=ListUtil.search({valueNames:[LIST_NAME,LIST_SOURCE,LIST_PACT,LIST_PATRON,LIST_SPELL,LIST_LEVEL],listClass:CLS_INVOCATION,sortFunction:listSortInvocations})).on("updated",()=>{filterBox.setCount(list.visibleItems.length,list.items.length)}),$(filterBox).on(FilterBox.EVNT_VALCHANGE,handleFilterChange),RollerUtil.addListRollButton();ListUtil.initSublist({valueNames:["name","ability","prerequisite","id"],listClass:"subinvocations",getSublistRow:getSublistItem});ListUtil.initGenericPinnable(),addInvocations(e),BrewUtil.pAddBrewData().then(addInvocations).catch(BrewUtil.purgeBrew).then(()=>{BrewUtil.makeBrewButton("manage-brew"),BrewUtil.bind({list:list,filterBox:filterBox,sourceFilter:sourceFilter}),ListUtil.loadState(),RollerUtil.addListRollButton(),History.init(!0)})}let invoList=[],ivI=0;function addInvocations(e){if(!e.invocation||!e.invocation.length)return;invoList=invoList.concat(e.invocation);let t="";for(;ivI<invoList.length;ivI++){const e=invoList[ivI];ExcludeUtil.isExcluded(e.name,"invocation",e.source)||(e.prerequisites||(e.prerequisites={}),e.prerequisites.pact||(e.prerequisites.pact=e.prerequisites.or&&e.prerequisites.or.find(e=>e.pact)?STR_SPECIAL:STR_ANY),e.prerequisites.patron||(e.prerequisites.patron=STR_ANY),e.prerequisites.spell||(e.prerequisites.spell=STR_NONE),e.prerequisites.level||(e.prerequisites.level=STR_ANY),e._fPrerequisites=JSON.parse(JSON.stringify(e.prerequisites)),e._fPrerequisites.or&&e._fPrerequisites.or.forEach(t=>{Object.keys(t).forEach(s=>{e._fPrerequisites[s]?"string"==typeof e._fPrerequisites[s]?e._fPrerequisites[s]===STR_ANY||e._fPrerequisites[s]===STR_NONE?e._fPrerequisites[s]=t[s]:e._fPrerequisites[s]=[e._fPrerequisites[s],t[s]]:e._fPrerequisites[s].push(t[s]):e._fPrerequisites[s]=t[s]})}),t+=`\n\t\t\t<li class="row" ${FLTR_ID}="${ivI}" onclick="ListUtil.toggleSelected(event, this)" oncontextmenu="ListUtil.openContextMenu(event, this)">\n\t\t\t\t<a id="${ivI}" href="#${UrlUtil.autoEncodeHash(e)}" title="${e[JSON_ITEM_NAME]}">\n\t\t\t\t\t<span class="${LIST_NAME} ${CLS_COL1}">${e[JSON_ITEM_NAME]}</span>\n\t\t\t\t\t<span class="${LIST_SOURCE} ${CLS_COL2} source${Parser.sourceJsonToAbv(e[JSON_ITEM_SOURCE])} text-align-center" title="${Parser.sourceJsonToFull(e[JSON_ITEM_SOURCE])}">${Parser.sourceJsonToAbv(e[JSON_ITEM_SOURCE])}</span>\n\t\t\t\t\t<span class="${LIST_PACT} ${CLS_COL3} ${e.prerequisites[JSON_ITEM_PACT]===STR_ANY?CLS_LI_NONE:STR_EMPTY}">${e.prerequisites[JSON_ITEM_PACT]}</span>\n\t\t\t\t\t<span class="${LIST_PATRON} ${CLS_COL4} ${e.prerequisites[JSON_ITEM_PATRON]===STR_ANY?CLS_LI_NONE:STR_EMPTY}">${Parser.invoPatronToShort(e.prerequisites[JSON_ITEM_PATRON])}</span>\n\t\t\t\t\t<span class="${LIST_SPELL} ${CLS_COL5} ${e.prerequisites[JSON_ITEM_SPELL]===STR_NONE?CLS_LI_NONE:STR_EMPTY}">${e.prerequisites[JSON_ITEM_SPELL]instanceof Array?e.prerequisites[JSON_ITEM_SPELL].join("/"):e.prerequisites[JSON_ITEM_SPELL]}</span>\n\t\t\t\t\t<span class="${LIST_LEVEL} ${CLS_COL6} ${e.prerequisites[JSON_ITEM_LEVEL]===STR_ANY?CLS_LI_NONE:STR_EMPTY} text-align-center">${e.prerequisites[JSON_ITEM_LEVEL]}</span>\n\t\t\t\t</a>\n\t\t\t</li>\n\t\t`,sourceFilter.addIfAbsent(e[JSON_ITEM_SOURCE]),e.prerequisites[JSON_ITEM_SPELL]&&(e.prerequisites[JSON_ITEM_SPELL]instanceof Array?e.prerequisites[JSON_ITEM_SPELL].forEach(e=>spellFilter.addIfAbsent(e)):spellFilter.addIfAbsent(e.prerequisites[JSON_ITEM_SPELL])))}const s=ListUtil.getSearchTermAndReset(list);$(`#${ID_INVOCATION_LIST}`).append(t),sourceFilter.items.sort(SortUtil.ascSort),spellFilter.items.sort(SortUtil.ascSort),list.reIndex(),s&&list.search(s),list.sort("name"),filterBox.render(),handleFilterChange(),ListUtil.setOptions({itemList:invoList,getSublistRow:getSublistItem,primaryLists:[list]}),ListUtil.bindPinButton(),EntryRenderer.hover.bindPopoutButton(invoList),UrlUtil.bindLinkExportButton(filterBox),ListUtil.bindDownloadButton(),ListUtil.bindUploadButton()}function handleFilterChange(){const e=filterBox.getValues();list.filter(function(t){const s=invoList[$(t.elm).attr(FLTR_ID)];return filterBox.toDisplay(e,s.source,s._fPrerequisites.pact,s._fPrerequisites.patron,s._fPrerequisites.spell,s._fPrerequisites.level)}),FilterBox.nextIfHidden(invoList)}function getSublistItem(e,t){return`\n\t\t<li class="row" ${FLTR_ID}="${t}" oncontextmenu="ListUtil.openSubContextMenu(event, this)">\n\t\t\t<a href="#${UrlUtil.autoEncodeHash(e)}" title="${e.name}">\n\t\t\t\t<span class="name col-xs-3">${e.name}</span>\n\t\t\t\t<span class="patron col-xs-3 ${e.prerequisites.pact===STR_ANY?CLS_LI_NONE:""}">${e.prerequisites.pact}</span>\n\t\t\t\t<span class="pact col-xs-2 ${e.prerequisites.patron===STR_ANY?CLS_LI_NONE:""}">${Parser.invoPatronToShort(e.prerequisites.patron)}</span>\n\t\t\t\t<span class="spell col-xs-2 ${e.prerequisites.spell===STR_NONE?CLS_LI_NONE:""}">${e.prerequisites.spell}</span>\n\t\t\t\t<span class="level col-xs-2 ${e.prerequisites.level===STR_ANY?CLS_LI_NONE:""} text-align-center">${e.prerequisites.level}</span>\n\t\t\t\t<span class="id hidden">${t}</span>\n\t\t\t</a>\n\t\t</li>\n\t`}function loadhash(e){EntryRenderer.getDefaultRenderer().setFirstSection(!0);const t=$("#pagecontent").empty(),s=invoList[e];t.append(`\n\t\t${EntryRenderer.utils.getBorderTr()}\n\t\t${EntryRenderer.utils.getNameTr(s)}\n\t\t${Object.keys(s.prerequisites).length?`<tr><td colspan="6"><span class="prerequisites">${EntryRenderer.invocation.getPrerequisiteText(s.prerequisites)}</span></td></tr>`:""}\n\t\t<tr><td class="divider" colspan="6"><div></div></td></tr>\n\t\t<tr><td colspan="6">${EntryRenderer.getDefaultRenderer().renderEntry({entries:s.entries},1)}</td></tr>\n\t\t${EntryRenderer.utils.getPageTr(s)}\n\t\t${EntryRenderer.utils.getBorderTr()}\n\t`),ListUtil.updateSelected()}function loadsub(e){filterBox.setFromSubHashes(e),ListUtil.setFromSubHashes(e)}