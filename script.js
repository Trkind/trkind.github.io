window.addEventListener("load", () => {
    function sendData(searchParams) {
      const XHR = new XMLHttpRequest();
  
      // Bind the FormData object and the form element
      const FD = new FormData(form);
  
      // Define what happens on successful data submission
      XHR.addEventListener("load", (event) => {

        const myNode = document.getElementById("results");
        while (myNode.firstChild) {
          myNode.removeChild(myNode.lastChild);
        }

        let answer = JSON.parse(event.target.responseText).suggestions

        count = 0
        for (const a of answer){
          myNode.appendChild(document.createTextNode(a))
          myNode.appendChild(document.createElement("br"))
          count++
        }

        if(count == 0){
          myNode.appendChild(document.createTextNode("Leider nichts gefunden..."))
        }
        
        
        document.getElementById("results").value = list
      });
  
      // Define what happens in case of error
      XHR.addEventListener("error", (event) => {
        alert('Oops! Something went wrong.');
      });
  
      // Set up our request
      let url = "https://www.zefix.ch/ZefixREST/api/v1/autocomplete.json?"
      url += searchParams
      
      XHR.open("GET", url);
  
      // The data sent is what the user provided in the form
      XHR.send(FD);
    }
  
    // Get the form element
    const form = document.getElementById("searchForm");
  
    // Add 'submit' event handler
    form.addEventListener("submit", (event) => {

      event.preventDefault();
      let searchString = document.getElementById("searchString").value
      let searchDeletedEntries = document.getElementById("searchDeletedEntries").checked
      let searchInOldNames = document.getElementById("searchInOldNames").checked

      if(searchString == null || searchString == ""){
        alert("Bitte Suchtext eingeben :)")
        return
      }

      const paramsObj = {prefix: searchString, deletedFirms: searchDeletedEntries, formerNames: searchInOldNames};
      const searchParams = new URLSearchParams(paramsObj);
      console.log(searchParams.toString())
      sendData(searchParams);
    });
  });

