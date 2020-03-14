
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .catch(function (err) {
            console.info('Service workers are not supported.');
        });
}