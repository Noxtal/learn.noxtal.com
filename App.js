var cy = cytoscape({
  container: document.getElementById("cy"), // container to render in

  ready: function () {
    this.layout({
      name: "random",
    }).run();

    this.layout({
      name: "cose-bilkent",
      animationDuration: 3000,
      nodeRepulsion: 5300,
      idealEdgeLength: 40,
    }).run();

    for (let elt of this.elements()) {
      if (elt.group() == "nodes") {
        let id = elt.id();
        let data = elt.data();

        if (data.subject == "True") {
          $("<li></li>")
            .html(
              "<button onclick='zoomOn(cy.$(\"#" +
                id +
                "\").successors())'>" +
                data.name +
                "</button>"
            )
            .appendTo($("#cat"));
        }

        onPage404(id, () => elt.data("color", "#A4ADB7"));
      }
    }
  },

  wheelSensitivity: 0.5,

  elements: graph,

  style: [
    // the stylesheet for the graph
    {
      selector: "node",
      style: {
        shape: "data(shape)",
        "background-color": "#24292e",
        "border-color": "data(color)",
        "border-width": 3,
        label: "data(name)",
        "z-index":10
      },
    },

    {
      selector: "edge",
      style: {
        width: 3,
        "line-color": "white",
        "mid-target-arrow-shape": "triangle",
        "mid-target-arrow-color": "white",
      },
    },

    {
      selector: "label",
      style: {
        color: "data(color)",
        "font-size": "14px",
        "text-wrap": "wrap",
        "text-max-width": "50px",
      },
    },
  ],
});

cy.minZoom(0.3);
cy.maxZoom(18);

function zoomOn(target) {
  cy.animate(
    {
      fit: {
        eles: target,
        padding: 50,
      },
    },
    {
      duration: 300,
    }
  );
}

lastClicked = null;
cy.on("tap", function (event) {
  if (event.target === cy) {
    zoomOn(cy);
    lastClicked = null;
    hidePage();
  } else if (event.target.group() == "nodes") {
    target_url = window.location.href + "?id=" + event.target.id();
    if (lastClicked == event.target) {
      renderPage(event.target.id());
      lastClicked = null;
    } else {
      lastClicked = event.target;
    }
    zoomOn(event.target);
  } else {
    if (lastClicked == event.target.target()) {
      zoomOn(event.target.source());
      lastClicked = event.target.source();
    } else {
      zoomOn(event.target.target());
      lastClicked = event.target.target();
    }
  }
});
