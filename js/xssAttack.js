alert('you have been attacked by XSS(Cross Site Scripting)')
document.body.innerHTML = '<div style="height: 100%; width: 100%; background: red"><h1 style="color: white">Attacked by XSS</h1></div>'
