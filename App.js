var cy = cytoscape({
  container: document.getElementById("cy"), // container to render in

  ready: function () {
    this.layout({
      name: "cose-bilkent",
      animationDuration: 3000,
      nodeRepulsion: 4500,
    }).run();
  },

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
      },
    },

    {
      selector: "edge",
      style: {
        width: 3,
        "line-color": "white",
      },
    },

    {
      selector: "label",
      style: {
        color: "data(color)",
        "font-size": "14px",
        "text-wrap": "wrap",
        "text-max-width": "100px",
      },
    },
  ],
});

cy.minZoom(0.57);
cy.maxZoom(18);

function zoomOn(target) {
  cy.animate(
    {
      fit: {
        eles: target,
        padding: 30,
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
    hidePage()
  } else if (event.target.group() == "nodes") {
    target_url = window.location.href + "?id=" + event.target.id()
    if (lastClicked == event.target) {
      renderPage(event.target.id())
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
