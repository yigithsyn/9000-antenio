ready(() => {
  var el = document.querySelector(".card-columns");
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }

  setTimeout(()=>{webix.ajax().get("/mongodb/api/favorites/links?portfolio=industry", function (t, d, x) {
    var companies = d.json()
    companies.shuffle()
    for (var i = 0; i < companies.length; i++) {

      var el_div0 = document.createElement("div")
      var el_div0_a0 = document.createElement("a")
      var el_div0_a0_img0 = document.createElement("img")
      var el_div0_a0_div0 = document.createElement("div")
      var el_div0_a0_div0_h50 = document.createElement("h5")

      el_div0_a0_div0_h50.className = "card-title"
      el_div0_a0_div0.className = "card-body"
      el_div0_a0_img0.className = "card-img-top"
      el_div0.className = "card filter " + companies[i].category.replaceAll(",", "")

      el_div0_a0_img0.setAttribute("src", "/filesystem/api/files/" + companies[i].logo)
      el_div0_a0_img0.setAttribute("alt", companies[i].title)
      el_div0_a0.setAttribute("href", companies[i].url)
      el_div0_a0.setAttribute("target", "_blank")
      el_div0_a0.setAttribute("rel", "noopener noreferrer")

      el_div0_a0_div0_h50.innerHTML = companies[i].title

      el_div0_a0_div0.appendChild(el_div0_a0_div0_h50)
      el_div0_a0.appendChild(el_div0_a0_img0)
      el_div0_a0.appendChild(el_div0_a0_div0)
      el_div0.appendChild(el_div0_a0)
      el.appendChild(el_div0)
    }
  })
                 }, 2000)
})
