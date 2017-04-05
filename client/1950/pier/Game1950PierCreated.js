/**
 * Created by Ansonmouse on 6/4/2017.
 */
Template.Game1950Pier.onCreated(function () {
    // Issue a warning if trying to preview an exported project on disk.
    (function(){
        // Check for running exported on file protocol
        if (window.location.protocol.substr(0, 4) === "file")
        {
            alert("Exported games won't work until you upload them. (When running on the file:/// protocol, browsers block many features from working for security reasons.)");
        }
    })();
})