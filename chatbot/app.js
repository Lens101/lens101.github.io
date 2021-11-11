/* window.watsonAssistantChatOptions = {
  integrationID: "89d636e9-c767-4893-8f25-3d8b1977bf42", // The ID of this integration.
  region: "eu-de", // The region your integration is hosted in.
  serviceInstanceID: "1ecf371f-e0cc-44c3-a531-1df09b9d61e1", // The ID of your service instance.
  showLauncher: false,
  onLoad: function (instance) {
    // Select the button element from the page.
    const button = document.querySelector(".chatLauncher");

    // Add the event listener to open your web chat.
    button.addEventListener("click", function clickListener() {
      instance.openWindow();
    });

    // Render the web chat. Nothing appears on the page, because the launcher is
    // hidden and the web chat window is closed by default.
    instance.render().then(function () {
      // Now that web chat has been rendered (but is still closed), we make the
      // custom launcher button visible.
      button.style.display = "block";
      button.classList.add("open");
    });
  },
};
setTimeout(function () {
  const t = document.createElement("script");
  t.src =
    "https://web-chat.global.assistant.watson.appdomain.cloud/versions/" +
    (window.watsonAssistantChatOptions.clientVersion || "latest") +
    "/WatsonAssistantChatEntry.js";
  document.head.appendChild(t);
}); */
