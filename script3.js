(function(){
	var button = PUBNUB.$("button");
	var pubnub = PUBNUB.init({
		publish_key   : 'pub-c-f5eb2b26-7b2b-41ec-bc26-313b3dabc2e9',
        subscribe_key : 'sub-c-de69f916-c1b5-11e3-90c5-02ee2ddab7fe'
	});
	var chatbox = document.getElementById("chatbox");

	pubnub.subscribe({
		channel : "button-click",
		message : received_button_click
	});

	function received_button_click(message) {
		var messagebox = document.createElement("div")
		var chatmessage = document.createTextNode(message.text)
		var username=document.createTextNode(message.username + ": ")
		messagebox.appendChild(username)
		messagebox.appendChild(chatmessage)
		chatbox.appendChild(messagebox)

	}

	pubnub.bind ("click", button, function (){
		var textinput= document.getElementById("input")
		var usernameInput = document.getElementById("input2")
		pubnub.publish({
			channel: "button-click",
			message: {
				text: textinput.value,
				username: usernameInput.value
			}
		});
	});
})();