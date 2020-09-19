javascript: var currentsite = document.querySelector("meta[property='al:android:app_name']") ? document.querySelector("meta[property='al:android:app_name']").content : window.location.href;

function isPage(b) {
    console.log(b + " " + currentsite.includes(b));
    return currentsite.includes(b)
}

function process(b) {
    var a = b;
    isPage("NYTimes") && (document.querySelector("html").innerHTML = a);
    isPage("Medium") && (a = b.replace(/<\/?noscript>/g, ""), document.querySelector("html").innerHTML = a);
    if (isPage("Bloomberg") || isPage("businessinsider")) a = document.createElement("html"), a.innerHTML = b, a.querySelectorAll("script").forEach(function(a) {
        return a.outerHTML = ""
    }), a = a.outerHTML, document.open(), document.write(a), document.close();
    isPage("businessinsider") && (a = document.createElement("html"), a.innerHTML = b, a.querySelectorAll("script").forEach(function(a) {
        return a.outerHTML = ""
    }), a.querySelectorAll("figure").forEach(function(a) {
        a.innerHTML = a.querySelector("noscript").innerHTML
    }), a = a.outerHTML, document.open(), document.write(a), document.close())
}

fetch(window.location.href, {
    credentials: "omit",
    redirect: "follow",
    mode: "no-cors"
}).then(function(b) {
    return b.text()
}).then(function(b) {
    process(b)
});
void 0
