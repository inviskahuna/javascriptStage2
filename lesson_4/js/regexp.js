const regexp = /(\B')/g;
text = document.querySelector(".sample_text");
out = document.querySelector(".replaced_text");
replaced_text = [];
rows = text.getElementsByTagName("p");

Object.values(rows).forEach(function(element) {
    let a = element.innerHTML.replace(regexp, '"');
    replaced_text.push(`<p> ${a} </p>`)
});

let html = replaced_text.join("");
out.innerHTML = html;