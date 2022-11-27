$(function() {
	$(':input').on('propertychange input', function (e) {
		if (e.target.value == "" || e.target.value <= 0) {
			e.target.value = 0;
			toggleDisableDecreaseBtn(e.target.attributes.itemId.value, true);
		}
		else {
			e.target.value = parseInt(e.target.value);
			toggleDisableDecreaseBtn(e.target.attributes.itemId.value, false);
		}
		updateTotalValue($(this).attr("itemId"));
	})

	$("input.quantity").each(function() {
	    var itemId = $(this).attr("itemId")
		toggleDisableDecreaseBtn(itemId, $(this).val() == 0);
	})

	$(".increaseBtn").on("click", function() {
		var itemId = $(this).attr("itemId");
		toggleDisableDecreaseBtn(itemId, false);
		qt = Number($("#quantityItem" + itemId).val());
		$("#quantityItem" + itemId).val(qt + 1);
		updateTotalValue(itemId);
	})
	
	$(".decreaseBtn").on("click", function() {
		var itemId = $(this).attr("itemId");
		qt = Number($("#quantityItem" + itemId).val());
		if (qt > 0) {
			$("#quantityItem" + itemId).val(qt - 1);
		}
		$(this).attr("disabled", !Boolean(qt - 1));
		updateTotalValue(itemId);
	})
})

function updateTotalValue(itemId) {
	price = parseFloat($("#priceItem" + itemId).text());
	qt = parseFloat($("#quantityItem" + itemId).val());
	$("#totalValueItem" + itemId).text((price * qt).toFixed(2) + "$");
	updateCartTotal();
}

function updateCartTotal() {
	var sum = 0;
	$("[data=totalValue]").each(function() {
		sum += +parseFloat($(this).text())||0;
	});
	$("#total-sum").text(sum.toFixed(2) + "$");
}

function toggleDisableDecreaseBtn(itemId, status) {
	$(".decreaseBtn").filter(function () {
    	return $(this).attr("itemId") == itemId;
    }).attr("disabled", status);
}
