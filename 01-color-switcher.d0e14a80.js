!function(){var t={startBtn:document.querySelector("button[data-start]"),stopBtn:document.querySelector("button[data-stop]")},n={start:function(){t.startBtn.disabled=!0,this.timerId=setInterval((function(){var t="#".concat(Math.floor(16777215*Math.random()).toString(16));document.body.style.background=t,console.log(t)}),1e3)},stop:function(){t.startBtn.disabled=!1,clearInterval(this.timerId)}};t.startBtn.addEventListener("click",n.start.bind(n)),t.stopBtn.addEventListener("click",n.stop.bind(n))}();
//# sourceMappingURL=01-color-switcher.d0e14a80.js.map
