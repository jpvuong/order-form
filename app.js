(function() {
  var init = function() {
    var orderForm = document.forms.order,
        saveBtn = document.getElementById('saveOrder'),
        saveBtnClicked = false;

    var saveForm = function() {
      if(!('formAction' in document.createElement('input'))) {
        var formAction = saveBtn.getAttribute('formaction');
        orderForm.setAttribute('action', formAction);
      }
      saveBtnClicked = true;
    };

    saveBtn.addEventListener('click', saveForm, false);

    var qtyFields = orderForm.quantity,
        totalFields = document.getElementsByClassName('item_total'),
        orderTotalField = document.getElementById('order_total');

    var formatMoney = function(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    var calculateTotals = function() {
      var i = 0,
          ln = qtyFields.length,
          itemQty = 0,
          itemPrice = 0.00,
          itemTotal = 0.00,
          itemTotalMoney = '$0.00',
          orderTotal = 0.00,
          orderTotalMoney = 0.00;

        for(; i<ln; i++) {
          if(!!qtyFields[i].valueAsNumber) {
            itemQty = qtyFields[i].valueAsNumber || 0;
          } else {
            itemQty = parseFloat(qtyFields[i].value) || 0;
          }

          if(!!qtyFields[i].dataset) {
            itemPrice = parseFloat(qtyFields[i].dataset.price);
          } else {
            itemPrice = parseFloat(qtyFields[i].getAttribute('data-price'));
          }

          itemTotal = itemQty * itemPrice;
          itemTotalMoney = '$'+formatMoney(itemTotal.toFixed(2));
          orderTotal += itemTotal;
          orderTotalMoney = '$'+formatMoney(orderTotal.toFixed(2));

          if(!!totalFields[i].value) {
            totalFields[i].value = itemTotalMoney;
            orderTotalField.value = orderTotalMoney;
          } else {
            totalFields[i].innerHTML = itemTotalMoney;
            orderTotalField.innerHTML = orderTotalMoney;
          }
        }
    };

    calculateTotals();

    var qtyListeners = function() {
      var i = 0,
          ln = qtyFields.length;

      for(; i<ln; i++) {
        qtyFields[i].addEventListener('input', calculateTotals, false);
        qtyFields[i].addEventListener('keyup', calculateTotals, false);
      }
    };

    qtyListeners();
  };

  window.addEventListener('load', init, false);
})();
