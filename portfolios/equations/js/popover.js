ready(() => {
  $('[data-toggle="popover"]').popover(
    {
      html: true,
      trigger: "focus",
      placement: "bottom",
    }
  )

  $('.popover-dismiss').popover({
    trigger: 'focus',
  })

  $('.modal').on('shown.bs.modal', function (e) {
    $("form").empty()
    var source = e.relatedTarget.text
    if (source == "Feedback") {
      var el_div0 = $("<div />", { class: "row" })
      var el_div1 = $("<div />", { class: "row" })
      var el_button0 = $("<button />", { id: "fb-send", class: "btn btn-primary flex-fill w-100", text: "Send" })
      var el_div0_label0 = $("<label />", { text: "E-mail" })
      var el_div1_label0 = $("<label />", { text: "Comment" })
      var el_div0_div0 = $("<div />")
      var el_div1_div0 = $("<div />")
      var el_div0_div0_input0 = $("<input />", { id: "fb-email" })
      var el_div1_div0_textarea0 = $("<textarea />", { id: "fb-text" })
      el_div1_div0.append(el_div1_div0_textarea0)
      el_div0_div0.append(el_div0_div0_input0)
      el_div0.append(el_div0_label0)
      el_div1.append(el_div1_label0)
      el_div0.append(el_div0_div0)
      el_div1.append(el_div1_div0)
      $("form").append(el_div0)
      $("form").append(el_div1)
      $("form").append(el_button0)
      $("form > div").addClass("form-group row")
      $("form > div > label").addClass("col-form-label col-form-label-sm text-right mr-2")
      $("form > div > label").css("width", "60px")
      $("form > div > div").addClass("flex-fill mr-1")
      $("form > div > div > input").addClass("form-control form-control-sm")
      $("form > div > div > input").attr("type", "email")
      $("form > div > div > textarea").addClass("form-control form-control-sm")
      $("form > div > div > textarea").attr("rows", 5)
        document.getElementById("fb-send").addEventListener("click", e => {
            e.preventDefault()
            let request = new XMLHttpRequest()
            request.open("POST", "/mongodb/api/feedback/recent", true)
            request.setRequestHeader("Content-Type", "application/json; charset=UTF-8")
            let json = { email: dom.getElementById("fb-email").value, text: dom.getElementById("fb-text").value }
            request.send(JSON.stringify(json))
            alert("Your message is sent")
          })
          dom.getElementById("fb-send").setAttribute("data-dismiss", "modal")
    }
    else {
      var title = e.relatedTarget.parentElement.childNodes[0].innerHTML
      var equation = equations.filter(function (item) { return item.title == title })[0]
      if (!("exchanges" in equation)) {
        equation.args.forEach((arg, index) => {
          var el_div0 = $("<div />")
          var el_div0_label0 = $("<label />")
          var el_div0_div0 = $("<div />")
          var el_div0_div0_input0 = $("<input />")
          var el_div0_div0_small0 = $("<small />")
          el_div0_div0_input0.val(equation.calc.vars[arg.id])
          el_div0_div0_input0.attr("id", arg.id)
          el_div0_label0.html("$" + arg.sym + "$ :")
          el_div0_div0_small0.text("$" + arg.def + "$")
          el_div0_div0.append(el_div0_div0_input0)
          el_div0_div0.append(el_div0_div0_small0)
          el_div0.append(el_div0_label0)
          el_div0.append(el_div0_div0)
          $("form").append(el_div0)
        })
        equation.yields.forEach((yield, index) => {
          var el_div0 = $("<div />")
          var el_div0_label0 = $("<label />")
          var el_div0_div0 = $("<div />")
          var el_div0_div0_input0 = $("<input />")
          var el_div0_div0_small0 = $("<small />")
          el_div0_div0_input0.attr("id", yield.id)
          el_div0_div0_input0.attr("readonly", "")
          el_div0_div0_input0.val(yield.format(math.eval(equation.calc.expr[index], equation.calc.vars)))
          el_div0_label0.html("$" + yield.sym + "$ :")
          el_div0_div0_small0.text("$" + yield.def + "$")

          el_div0_div0.append(el_div0_div0_input0)
          el_div0_div0.append(el_div0_div0_small0)
          el_div0.append(el_div0_label0)
          el_div0.append(el_div0_div0)
          $("form").append(el_div0)
        })
      }
      else {
        equation.exchanges.forEach((exchange, index) => {
          var el_div0 = $("<div />")
          var el_div0_label0 = $("<label />")
          var el_div0_div0 = $("<div />")
          var el_div0_div0_input0 = $("<input />")
          var el_div0_div0_small0 = $("<small />")
          el_div0_div0_input0.attr("id", exchange.id)
          el_div0_div0_input0.val(equation.calc.vars[exchange.id])
          el_div0_label0.html("$" + exchange.sym + "$ :")
          el_div0_div0_small0.text("$" + exchange.def + "$")

          el_div0_div0.append(el_div0_div0_input0)
          el_div0_div0.append(el_div0_div0_small0)
          el_div0.append(el_div0_label0)
          el_div0.append(el_div0_div0)
          $("form").append(el_div0)
        })
      }
      $("form > div").addClass("form-group row")
      $("form > div > label").addClass("col-form-label col-form-label-sm text-right mr-2")
      $("form > div > label").css("width", equation.calc.labelWidth)
      $("form > div > div").addClass("flex-fill mr-1")
      $("form > div > div > input").addClass("form-control form-control-sm")
      $("form > div > div > input").attr("type", "number")
      $("form > div > div > input").on("keyup", function () {
        equation.calc.vars[$(this).attr("id")] = $(this).val()
        if (!("exchanges" in equation)) {
          $("form > div > div > input[readonly]").each((index, item) => {
            $(item).val(equation.yields[index].format(math.eval(equation.calc.expr[index], equation.calc.vars)))
          })
        }
        else {
          $("form > div > div > input").each((index, item) => {
            if (equation.exchanges[index].id !== $(this).attr("id")) {
              equation.exchanges.forEach((subItem, subIndex) => {
                if (subItem.id === $(this).attr("id")) {
                  $(item).val(equation.exchanges[index].format(math.eval(equation.calc.expr[subIndex][index], equation.calc.vars)))
                }
              })
            }
          })
        }
      })
      $("form > div > div > small").addClass("form-text text-muted")
      renderMath();
    }
  })
})
