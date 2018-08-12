"use strict";const JSON_URL="data/objects.json";let list;function onJsonLoad(t){list=ListUtil.search({valueNames:["name","size","source"],listClass:"objects",sortFunction:SortUtil.listSort}),EntryRenderer.hover.bindPopoutButton(objectsList);ListUtil.initSublist({valueNames:["name","size","id"],listClass:"subobjects",itemList:objectsList,getSublistRow:getSublistItem,primaryLists:[list]});ListUtil.initGenericPinnable(),addObjects(t),BrewUtil.pAddBrewData().then(addObjects).catch(BrewUtil.purgeBrew).then(()=>{BrewUtil.makeBrewButton("manage-brew"),BrewUtil.bind({list:list}),ListUtil.loadState(),History.init(!0)})}window.onload=function(){ExcludeUtil.initialise(),DataUtil.loadJSON(JSON_URL).then(onJsonLoad)};let objectsList=[],obI=0;function addObjects(t){if(!t.object||!t.object.length)return;objectsList=objectsList.concat(t.object);let e="";for(;obI<objectsList.length;obI++){const t=objectsList[obI];if(ExcludeUtil.isExcluded(t.name,"object",t.source))continue;const s=Parser.sourceJsonToAbv(t.source);e+=`\n\t\t\t<li class="row" ${FLTR_ID}="${obI}" onclick="ListUtil.toggleSelected(event, this)" oncontextmenu="ListUtil.openContextMenu(event, this)">\n\t\t\t\t<a id="${obI}" href="#${UrlUtil.autoEncodeHash(t)}" title="${t.name}">\n\t\t\t\t\t<span class="name col-xs-8">${t.name}</span>\n\t\t\t\t\t<span class="size col-xs-2">${Parser.sizeAbvToFull(t.size)}</span>\n\t\t\t\t\t<span class="source col-xs-2 source${s}" title="${Parser.sourceJsonToFull(t.source)}">${s}</span>\n\t\t\t\t</a>\n\t\t\t</li>\n\t\t`}const s=ListUtil.getSearchTermAndReset(list);$("#objectsList").append(e),list.reIndex(),s&&list.search(s),list.sort("name"),ListUtil.setOptions({itemList:objectsList,getSublistRow:getSublistItem,primaryLists:[list]}),ListUtil.bindPinButton(),EntryRenderer.hover.bindPopoutButton(objectsList)}function getSublistItem(t,e){return`\n\t\t<li class="row" ${FLTR_ID}="${e}" oncontextmenu="ListUtil.openSubContextMenu(event, this)">\n\t\t\t<a href="#${UrlUtil.autoEncodeHash(t)}" title="${t.name}">\n\t\t\t\t<span class="name col-xs-9">${t.name}</span>\t\t\n\t\t\t\t<span class="ability col-xs-3">${Parser.sizeAbvToFull(t.size)}</span>\t\t\n\t\t\t\t<span class="id hidden">${e}</span>\t\t\t\t\n\t\t\t</a>\n\t\t</li>\n\t`}const renderer=EntryRenderer.getDefaultRenderer();function loadhash(t){renderer.setFirstSection(!0);const e=objectsList[t],s=[];e.entries&&renderer.recursiveEntryRender({entries:e.entries},s,2),e.actionEntries&&renderer.recursiveEntryRender({entries:e.actionEntries},s,2),$("#pagecontent").empty().append(`\n\t\t${EntryRenderer.utils.getBorderTr()}\n\t\t${EntryRenderer.utils.getNameTr(e)}\n\t\t<tr class="text"><td colspan="6"><i>${"generic"!==e.type?`${Parser.sizeAbvToFull(e.size)} object`:"Variable size object"}</i><br></td></tr>\n\t\t<tr class="text"><td colspan="6">\n\t\t\t<b>Armor Class:</b> ${e.ac}<br>\n\t\t\t<b>Hit Points:</b> ${e.hp}<br>\n\t\t\t<b>Damage Immunities:</b> ${e.immune}<br>\n\t\t</td></tr>\n\t\t<tr class="text"><td colspan="6">${s.join("")}</td></tr>\n\t\t${EntryRenderer.utils.getPageTr(e)}\n\t\t${EntryRenderer.utils.getBorderTr()}\n\t`);const n=e.tokenURL||UrlUtil.link(`img/objects/${e.name.replace(/"/g,"")}.png`);$("th.name").append(`\n\t\t<a href="${n}" target="_blank">\n\t\t\t<img src="${n}" class="token" onerror="imgError(this)">\n\t\t</a>`),ListUtil.updateSelected()}function imgError(t){$(t).closest("th").find("span.stats-source").css("margin-right","0"),$(t).remove()}