dlurl =
  "https://raw.githubusercontent.com/Noxtal/learn.noxtal.com/master/pages/";

function renderPage(id) {
  $.ajax({
    url: dlurl + id + ".json",
    dataType: "json",
    success: function (data) {
      buildPage(data.title, data.desc, data.links);
    },
    error: function (data) {
      buildPage(
        "An error as occured!:/",
        "This part of the site is either not completed yet (hard work in progress) or non-existent. For more information, contact me on Twitter @noxtal_. ;)",
        []
      );
    },
  });
}

function hidePage() {
  let page = $("#page");
  page.attr("hidden", true);
}

function buildPage(title, desc, links) {
  let page = $("#page");
  page.attr("hidden", false);

  page.find("#title").html(title);
  page.find("#desc").html(desc);

  let linklist = page.find("#links");
  linklist.empty()
  
  $.each(links, function () {
    $("<li></li>")
      .html("<a href=" + this + ">" + this + "</a>")
      .appendTo(linklist);
  });
}
