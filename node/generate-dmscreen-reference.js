const fs = require('fs');
const utB = require("./util-book-reference");

const index = utB.UtilBookReference.getIndex(
	{
		name: "Quick Reference",
		id: "bookref-quick",
		tag: "quickref"
	},
	{
		name: "DM Reference",
		id: "bookref-dmscreen",
		tag: "dmref"
	}
);

fs.writeFileSync("data/bookref-dmscreen.json", JSON.stringify(index).replace(/\s+\u2014\s+?/g, "\\u2014"), "utf8");

function flattenReferenceIndex (ref) {
	const outMeta = {
		name: {},
		id: {},
		section: {}
	};

	const meta = {
		name: {},
		id: {},
		section: {}
	};

	const out = [];

	let nameId = 1;
	let idId = 1;
	let sectionId = 1;

	let indexId = 1;

	Object.values(ref).forEach(book => {
		if (!meta.name[book.name]) {
			outMeta.name[nameId] = book.name;
			meta.name[book.name] = nameId++;
		}

		if (!meta.id[book.id]) {
			outMeta.id[idId] = book.id;
			meta.id[book.id] = idId++;
		}

		book.contents.forEach((c, i) => {
			if (!meta.section[c.name]) {
				outMeta.section[sectionId] = c.name;
				meta.section[c.name] = sectionId++;
			}

			c.headers.forEach(h => {
				out.push({
					id: indexId++,
					b: meta.id[book.id], // book
					s: meta.section[c.name], // section name
					p: i, // section index
					h // header name
				})
			});
		});
	});

	return {
		_meta: outMeta,
		data: out
	};
}

fs.writeFileSync("data/bookref-dmscreen-index.json", JSON.stringify(flattenReferenceIndex(index.reference)), "utf8");
console.log("Updated DM Screen references.");