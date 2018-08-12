"use strict";const JSON_URL="data/books.json";let books;function onJsonLoad(o){books=o.book;const t=$("ul.contents");let e="";for(let o=0;o<books.length;o++){const t=books[o];e+=`<li class="contents-item" data-bookid="${UrlUtil.encodeForHash(t.id)}">\n\t\t\t\t<a id="${o}" href='#${t.id},0' title="${t.name}">\n\t\t\t\t\t<span class='name'>${t.name}</span>\n\t\t\t\t</a>\n\t\t\t\t${BookUtil.makeContentsBlock({book:t,addOnclick:!0,defaultHeadersHidden:!0})}\n\t\t\t</li>`}t.append(e),BookUtil.addHeaderHandles(!0);new List("listcontainer",{valueNames:["name"],listClass:"contents"});BookUtil.baseDataUrl="data/book/book-",BookUtil.bookIndex=books,window.onhashchange=BookUtil.booksHashChange,window.location.hash.length?BookUtil.booksHashChange():$(".contents-item").show()}window.onload=function(){BookUtil.renderArea=$("#pagecontent"),BookUtil.renderArea.append(EntryRenderer.utils.getBorderTr()),window.location.hash.length?BookUtil.renderArea.append('<tr><td colspan="6" class="initial-message">Loading...</td></tr>'):BookUtil.renderArea.append('<tr><td colspan="6" class="initial-message">Select a book to begin</td></tr>'),BookUtil.renderArea.append(EntryRenderer.utils.getBorderTr()),DataUtil.loadJSON(JSON_URL).then(onJsonLoad)};