/**
 * 
 */

function getAllUsers() {

	//新增會員資料表
	let form = document.getElementById('newObjectForm');
	form.style.display = "none"
	form.innerHTML = `
		<label for="username">姓名:</label>
        <input type="text" id="username" name="username" required maxlength="50"><br>
        <label for="password">密碼:</label>
        <input type="password" id="password" name="password" required maxlength="20"><br>        
        <label for="address">地址:</label>
        <input type="text" id="address" name="address" maxlength="100"><br>    
        <label for="phone">電話:</label>
        <input type="text" id="phone" name="phone" maxlength="25"><br>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" maxlength="30"><br>
        
        <button type="button" onclick="newUser()">送出</button>	
	`;


	//觸發表單按鈕
	let newButton = document.getElementById('newObjectButton');
	newButton.style.display = "block";
	newButton.textContent = "新增會員";
	newButton.onclick = function() {
		if (form.style.display === "none") {
			form.style.display = "block";
		} else {
			form.style.display = "none";
		}
	};








	const table = document.getElementById('dataTable');
	table.innerHTML = '';


	const thead = document.createElement('thead');
	const headerRow = thead.insertRow();
	headerRow.innerHTML = '<th>會員編號</th>' +
		'<th>會員姓名</th>' +
		'<th>email</th>' +
		'<th>地址</th>' +
		'<th>電話</th>' +
		'<th>操作按鈕</th>';
	table.appendChild(thead);



	fetch("/selectallusers", {
		method: "GET",
		headers: {
			'Content-Type': 'application/json'
		},
	}).then(function(response) {
		return response.json();
	}).then(function(data) {
		console.log(data);


		const tbody = document.createElement('tbody');
		table.appendChild(tbody);

		data.forEach(function(user) {
			let row = tbody.insertRow();
			let flds = [user.userId, user.username, user.email, user.address, user.phone];
			for (let i = 0; i < flds.length; i++) {
				row.insertCell(i).innerHTML = flds[i];
			}

			let buttonCell = row.insertCell(flds.length);
			let button = document.createElement('button');
			button.textContent = '操作';
			button.onclick = function() {

				console.log('user：', user);
				console.log('html：', row);
			};
			buttonCell.appendChild(button);
		});
	});
}


function newUser() {
	const form = document.getElementById('newObjectForm');
	const formData = new FormData(form);
	const data = {};
	formData.forEach((value, key) => {
		data[key] = value;
	});
	
	fetch('/userInsert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                form.reset();
                form.style.display="none";
                
                
                
            })
            .catch((error) => {
                console.error('Error:', error);
            });
	
	
	
}





