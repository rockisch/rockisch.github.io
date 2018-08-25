var link = document.querySelector('link[rel="import"]');
var template = link.import.querySelector('#navBarInMain');
var clone = document.importNode(template.content, true);
document.querySelector('#mainDiv').appendChild(clone);