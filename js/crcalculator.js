"use strict";const MSBCR_JSON_URL="data/msbcr.json",MONSTERFEATURES_JSON_URL="data/monsterfeatures.json";let msbcr,monsterfeatures;function addMSBCR(t){msbcr=t,DataUtil.loadJSON(MONSTERFEATURES_JSON_URL).then(addMonsterFeatures)}function addMonsterFeatures(t){monsterfeatures=t.monsterfeatures;for(let t=0;t<msbcr.cr.length;t++){const e=msbcr.cr[t];$("#msbcr").append(`<tr><td>${e._cr}</td><td>${Parser.crToXp(e._cr)}</td><td>${e.pb}</td><td>${e.ac}</td><td>${e.hpmin}-${e.hpmax}</td><td>${e.attackbonus}</td><td>${e.dprmin}-${e.dprmax}</td><td>${e.savedc}</td></tr>`)}$("input#calculate").click(function(){calculatecr()}),$("#crcalc input").change(function(){calculatecr()}),$("#saveprofs, #resistances").change(function(){calculatecr()}),$("#saveinstead").change(function(){const t=parseInt($("#attackbonus").val());$(this).is(":checked")||$("#attackbonus").val(t-10),$(this).is(":checked")&&$("#attackbonus").val(t+10),calculatecr()}),$("select#size").change(function(){const t=$(this).val();"Tiny"===t&&$("#hdval").html("d4"),"Small"===t&&$("#hdval").html("d6"),"Medium"===t&&$("#hdval").html("d8"),"Large"===t&&$("#hdval").html("d10"),"Huge"===t&&$("#hdval").html("d12"),"Gargantuan"===t&&$("#hdval").html("d20"),$("#hp").val(calculatehp()),calculatecr()}),$("#hd, #con").change(function(){$("#hp").val(calculatehp()),calculatecr()}),$("#msbcr tr").not(":has(th)").click(function(){$("#expectedcr").val($(this).children("td:eq(0)").html());const t=parseInt($(this).children("td:eq(4)").html().split("-")[0]),e=parseInt($(this).children("td:eq(4)").html().split("-")[1]);$("#hp").val(t+(e-t)/2),$("#hd").val(calculatehd()),$("#ac").val($(this).children("td:eq(3)").html()),$("#dpr").val($(this).children("td:eq(6)").html().split("-")[0]),$("#attackbonus").val($(this).children("td:eq(5)").html()),$("#saveinstead").is(":checked")&&$("#attackbonus").val($(this).children("td:eq(7)").html()),calculatecr()}),$("#hp").change(function(){$("#hd").val(calculatehd()),calculatecr()});for(let t=0;t<monsterfeatures.length;t++){let e=[];monsterfeatures[t].hp&&e.push("HP: "+monsterfeatures[t].hp),monsterfeatures[t].ac&&e.push("AC: "+monsterfeatures[t].ac),monsterfeatures[t].dpr&&e.push("DPR: "+monsterfeatures[t].dpr),monsterfeatures[t].attackbonus&&e.push("AB: "+monsterfeatures[t].attackbonus),e=e.join(", ");let a="";"YES"===monsterfeatures[t].numbox&&(a="<input type='number' value='0'>"),$("#monsterfeatures table").append(`<tr><td style="white-space: nowrap"><input type='checkbox' id='MF${encodeURI(monsterfeatures[t].name).toLowerCase()}' title="${monsterfeatures[t].name}" data-hp='${monsterfeatures[t].hp}' data-ac='${monsterfeatures[t].ac}' data-dpr='${monsterfeatures[t].dpr}' data-attackbonus='${monsterfeatures[t].attackbonus}'>${a}</td><td>${monsterfeatures[t].name}</td><td>${monsterfeatures[t].example.replace(/, /g,",<br />")}</td><td><span title="${e}" class="explanation">${monsterfeatures[t].effect}</span></td></tr>`)}function e(){if(window.location.hash){let t=window.location.hash.split("#")[1].split(",");if($("#expectedcr").val(t[0]),$("#hp").val(t[1]),$("#hp").val(calculatehp()),$("#ac").val(t[2]),$("#dpr").val(t[3]),$("#attackbonus").val(t[4]),"true"===t[5]&&$("#saveinstead").attr("checked",!0),$("#size").val(t[6]),$("select#size").change(),$("#hd").val(t[7]),$("#con").val(t[8]),$("#hp").val(calculatehp()),"true"===t[9]&&$("#vulnerabilities").attr("checked",!0),$("#resistances").val(t[10]),"true"===t[11]&&$("#flying").attr("checked",!0),$("#saveprofs").val(t[12]),-1!==window.location.hash.indexOf("traits:")){t=window.location.hash.split("traits:")[1].split(",");for(let e=1;e<t.length;e++)$("input[id='"+t[e].split(":")[0]+"']").click(),t[e].split(":")[1]&&$("input[id='"+t[e].split(":")[0]+"']").siblings("input[type=number]").val(t[e].split(":")[1])}calculatecr()}}$("#monsterfeatures tr td").not(":has(input)").click(function(){$(this).siblings().children("input").click();const t=$(this).siblings("td").children("input").attr("id");let e="";$(this).siblings("td").children("input[type=number]").length&&(e=":"+$(this).siblings("td").children("input[type=number]").val()),window.location=window.location.hash+","+t+e,$(this).siblings("td").children("input").prop("checked")||(window.location=window.location.hash.split(","+t+e).join(""),window.location=window.location.hash.split(","+t+":0").join(""),window.location=window.location.hash.split(","+t).join(""))}),$("#monsterfeatures tr td input").change(function(){calculatecr()}),$("#reset").click(function(){window.location="",e()}),e(),calculatecr()}function calculatecr(){const expectedcr=parseInt($("#expectedcr").val());let hp=parseInt($("#crcalc #hp").val());$("#vulnerabilities").prop("checked")&&(hp*=.5),"res"===$("#resistances").val()&&(expectedcr>=0&&expectedcr<=4&&(hp*=2),expectedcr>=5&&expectedcr<=10&&(hp*=1.5),expectedcr>=11&&expectedcr<=16&&(hp*=1.25)),"imm"===$("#resistances").val()&&(expectedcr>=0&&expectedcr<=4&&(hp*=2),expectedcr>=5&&expectedcr<=10&&(hp*=2),expectedcr>=11&&expectedcr<=16&&(hp*=1.5),expectedcr>=17&&(hp*=1.25));let ac=parseInt($("#crcalc #ac").val())+parseInt($("#saveprofs").val())+parseInt(2*$("#flying").prop("checked")),dpr=parseInt($("#crcalc #dpr").val()),attackbonus=parseInt($("#crcalc #attackbonus").val());const usesavedc=$("#saveinstead").prop("checked");let offensiveCR=-1,defensiveCR=-1;$("#monsterfeatures input:checked").each(function(){let trait=0;$(this).siblings("input[type=number]").length&&(trait=$(this).siblings("input[type=number]").val()),""!==$(this).attr("data-hp")&&(hp+=Number(eval($(this).attr("data-hp")))),""!==$(this).attr("data-ac")&&(ac+=Number(eval($(this).attr("data-ac")))),""!==$(this).attr("data-dpr")&&(dpr+=Number(eval($(this).attr("data-dpr")))),usesavedc||""===$(this).attr("data-attackbonus")||(attackbonus+=Number($(this).attr("data-attackbonus")))}),hp=Math.floor(hp),dpr=Math.floor(dpr);const effectivehp=hp,effectivedpr=dpr;hp>850&&(hp=850),dpr>320&&(dpr=320);for(let t=0;t<msbcr.cr.length;t++){const e=msbcr.cr[t];if(hp>=parseInt(e.hpmin)&&hp<=parseInt(e.hpmax)){let a=parseInt(e.ac)-ac;a>0&&(a=Math.floor(a/2)),a<0&&(a=Math.ceil(a/2)),a=t-a,a<0&&(a=0),a>=msbcr.cr.length&&(a=msbcr.cr.length-1),defensiveCR=msbcr.cr[a]._cr}if(dpr>=e.dprmin&&dpr<=e.dprmax){let a=parseInt(e.attackbonus);usesavedc&&(a=parseInt(e.savedc));let c=a-attackbonus;c>0&&(c=Math.floor(c/2)),c<0&&(c=Math.ceil(c/2)),c=t-c,c<0&&(c=0),c>=msbcr.cr.length&&(c=msbcr.cr.length-1),offensiveCR=msbcr.cr[c]._cr}}-1===offensiveCR&&(offensiveCR="0"),-1===defensiveCR&&(defensiveCR="0");let cr=((fractionStrToDecimal(offensiveCR)+fractionStrToDecimal(defensiveCR))/2).toString();"0.5625"===cr&&(cr="1/2"),"0.5"===cr&&(cr="1/2"),"0.375"===cr&&(cr="1/4"),"0.3125"===cr&&(cr="1/4"),"0.25"===cr&&(cr="1/4"),"0.1875"===cr&&(cr="1/8"),"0.125"===cr&&(cr="1/8"),"0.0625"===cr&&(cr="1/8"),-1!==cr.indexOf(".")&&(cr=Math.round(cr).toString());let finalcr=0;for(let t=0;t<msbcr.cr.length;t++)if(msbcr.cr[t]._cr===cr){finalcr=t;break}const hitdice=calculatehd(),hitdicesize=$("#hdval").html(),conmod=Math.floor(($("#con").val()-10)/2);let hash="#";hash+=$("#expectedcr").val()+",",hash+=$("#hp").val()+",",hash+=$("#ac").val()+",",hash+=$("#dpr").val()+",",hash+=$("#attackbonus").val()+",",hash+=usesavedc+",",hash+=$("#size").val()+",",hash+=$("#hd").val()+",",hash+=$("#con").val()+",",hash+=$("#vulnerabilities").prop("checked")+",",hash+=$("#resistances").val()+",",hash+=$("#flying").prop("checked")+",",hash+=$("#saveprofs").val()+",",hash+="traits:";const hastraits=window.location.hash.split("traits:")[1];"undefined"!==hastraits&&(hash+=hastraits),window.location=hash,$("#croutput").html("<h4>Challenge Rating: "+cr+"</h4>"),$("#croutput").append("<p>Offensive CR: "+offensiveCR+"</p>"),$("#croutput").append("<p>Defensive CR: "+defensiveCR+"</p>"),$("#croutput").append("<p>Proficiency Bonus: +"+msbcr.cr[finalcr].pb+"</p>"),$("#croutput").append("<p>Effective HP: "+effectivehp+" ("+hitdice+hitdicesize+(conmod<0?"":"+")+conmod*hitdice+")</p>"),$("#croutput").append("<p>Effective AC: "+ac+"</p>"),$("#croutput").append("<p>Average Damage Per Round: "+effectivedpr+"</p>"),$("#croutput").append("<p>"+(usesavedc?"Save DC: ":"Effective Attack Bonus: +")+attackbonus+"</p>"),$("#croutput").append("<p>Experience Points: "+Parser.crToXp(msbcr.cr[finalcr]._cr)+"</p>")}function calculatehd(){const t=$("#hdval").html().split("d")[1]/2+.5,e=Math.floor(($("#con").val()-10)/2);let a=Math.floor(parseInt($("#hp").val())/(t+e));return a||(a=1),a}function calculatehp(){const t=$("#hdval").html().split("d")[1]/2+.5,e=Math.floor(($("#con").val()-10)/2);return Math.round((t+e)*$("#hd").val())}function fractionStrToDecimal(t){return"0"===t?0:parseFloat(t.split("/").reduce((t,e)=>t/e))}window.onload=function(){DataUtil.loadJSON(MSBCR_JSON_URL).then(addMSBCR)};