chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "addInput") {
      var textarea = document.querySelector("#prompt-textarea");
      if (textarea) {
        textarea.value += request.content;
        sendResponse({ message: "Textarea content changed successfully." });
      } else {
        sendResponse({ message: "Textarea not found." });
      }
    }
  });