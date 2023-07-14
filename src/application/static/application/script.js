$(() => {
  "use strict";

  const $form = $("#form");
  const $alert = $("#alert");
  const $input = $("#input");
  const $output = $("#output");

  $alert.click(() => $alert.hide());
  $output.click(() => $output.select());
  $form.submit(e => {
    $.get(
      $form.data("get-url"),
      {input: $input.val()}
    ).done(data => {
      if (data["error"]) {
        $alert.show();
        $("#alert-text").text(data["error"]);
      } else {
        $output.val(data["ipa_code"]);
        $output.click();
        $alert.hide();
      }
    }).fail(() => {
      $alert.show();
      $("#alert-text").text("An unexpected error occured, please try again.");
    });
    e.preventDefault();
  });

  const languages = {
    "fr": "French",
    "en": "English",
  };

  const regex = /^https:\/\/(\w+).wikipedia.org\//;
  $("a").each((_, element) => {
    const $link = $(element);
    const href = $link.attr("href");
    const match = regex.exec(href);
    if (match && match[1] !== "en") {
      const lang = match[1];
      $link.after(`&nbsp;<sup class="link-lang" title="Linked page is in ${languages[lang] ?? lang}">${lang}</sup>`)
    }
  })
});
