
export const renderDropDown = function(dropDown,parsedQueries) {
    console.dir(dropDown)
    dropDown.label = "Preloaded SPARQL queries";
    // Set the queries as aptions
    let options = {};
    let i = 0;
    parsedQueries.forEach((q) => {
      options[`option${i}`] = { label: q.queryName };
      i++;
    });
    dropDown.options = options;
    // set the first query as default query
    dropDown.option = Object.keys(options)[0];

    // gets called when the user selects a query from the dropdown
    dropDown.addEventListener("onChange", (value) => {
      if (!("detail" in value) || !("label" in value.detail))
        throw Error(
          "onChange dropdown event expects object of type{detail: {label:string}}"
        );
      let payload = parsedQueries.find((q) => {
        if (q.queryName == value.detail.label) return q;
        return false;
      });
      // send a deep copy of that object
      dropDown.dispatchEvent(
        new CustomEvent("loadQuery", {
          bubbles: true,
          detail: JSON.parse(JSON.stringify(payload)),
        })
      );
    });
  }