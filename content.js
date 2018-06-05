InboxSDK.load('1', 'sdk_prext_240120584f').then(function(sdk){
	// the SDK has been loaded, now do something with it!
	function formatDate(date) {
	  var monthNames = [
	    "January", "February", "March",
	    "April", "May", "June", "July",
	    "August", "September", "October",
	    "November", "December"
	  ];

	  var day = date.getDate();
	  var monthIndex = date.getMonth();
	  var year = date.getFullYear();

	  return day + ' ' + monthNames[monthIndex] + ' ' + year;
	}

	sdk.Compose.registerComposeViewHandler(function(composeView){
		// Confirmed, Draft

		// a compose view has come into existence, do something with it!
		composeView.addButton({
			title: "Priority",
			iconUrl: 'https://is4-ssl.mzstatic.com/image/thumb/Purple122/v4/fe/39/f2/fe39f262-f2f6-61f7-5734-8bc1796ca028/source/60x60bb.jpg',
			onClick: function(event) {
				const currentText = document.querySelector('.Am').textContent;
				var re = /(.*:)(.*)(:.*)/;
				var status = currentText.replace(re, "$2");

				$.ajax({
				    type: "GET",
				    url: "https://www.eshbelsaas.com/ui/odata/Priority/tabmob.ini/usdemo/ORDERS?$filter=ORDSTATUSDES eq '" + status +"'",
				    cache : false,
				    // jsonp : "onJSONPLoad",
				    // jsonpCallback: "callback",
				    contentType: "application/json",
				    crossDomain: "true",
				    username: "apidemo",
				    password: "123",
			        beforeSend: function (xhr) { 
        				xhr.setRequestHeader('Authorization', 'Basic ' + btoa("apidemo:123"));             
    				},
				    success: function (data) {
        				let ordersList = '';
        				data.value.forEach((order) => {			
        					ordersList = ordersList + "Order Name: " + order.ORDNAME + '\n';
        					ordersList = ordersList + "Customer Name: " + order.CDES + '\n';    					
        					ordersList = ordersList + "Order Date: " + formatDate(new Date(order.CURDATE)) + '\n';
    						ordersList = ordersList + "Order Status: " + order.ORDSTATUSDES + '\n\n';

        				})

        				event.composeView.insertTextIntoBodyAtCursor('\n\n' + ordersList);
				    }
				 });
			},
		});

	});
});