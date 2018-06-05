InboxSDK.load('1', 'sdk_prext_240120584f').then(sdk => {
	// the SDK has been loaded, now do something with it!
	function formatDate(date) {
	  const monthNames = [
	    "January", "February", "March",
	    "April", "May", "June", "July",
	    "August", "September", "October",
	    "November", "December"
	  ];

	  const day = date.getDate();
	  const monthIndex = date.getMonth();
	  const year = date.getFullYear();

	  return day + ' ' + monthNames[monthIndex] + ' ' + year;
	}

	sdk.Compose.registerComposeViewHandler(composeView => {
		composeView.addButton({
			title: "Priority",
			iconUrl: 'https://is4-ssl.mzstatic.com/image/thumb/Purple122/v4/fe/39/f2/fe39f262-f2f6-61f7-5734-8bc1796ca028/source/60x60bb.jpg',
			onClick: function(event) {
				const currentText = document.querySelector('.Am').textContent;
				const re = /(.*:)(.*)(:.*)/;
				const status = currentText.replace(re, "$2"); // Confirmed, Draft

				$.ajax({
				    type: "GET",
				    url: "https://www.eshbelsaas.com/ui/odata/Priority/tabmob.ini/usdemo/ORDERS?$filter=ORDSTATUSDES eq '" + status +"'",
				    cache : false,
				    contentType: "application/json",
				    crossDomain: "true",
				    username: "apidemo",
				    password: "123",
			        beforeSend: xhr => { 
        				xhr.setRequestHeader('Authorization', 'Basic ' + btoa("apidemo:123"));             
    				},
				    success: data => {
        				let ordersList = '';
        				data.value.forEach(order => {	
        					ordersList = `${ordersList} Order Name: ${order.ORDNAME} \n`;
        					ordersList = `${ordersList} Customer Name: ${order.CDES} \n`;
        					ordersList = `${ordersList} Order Date: ${formatDate(new Date(order.CURDATE))} \n`;
        					ordersList = `${ordersList} Order Status ${order.ORDSTATUSDES} \n\n`;
        				})

        				event.composeView.insertTextIntoBodyAtCursor('\n\n' + ordersList);
				    }
				 });
			},
		});

	});
});