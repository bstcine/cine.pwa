if (process.env.DEBUG) {
    (() => {
        document.write(
            '<script src="http://apptest.bstcine.com/lib/vconsole/vconsole.min.js"></script>'
        );
        document.write('<script> var vConsole = new VConsole()</script>');
    })();
}
