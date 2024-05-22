/**
 * 
 */

function getAllUsers() {


	//建立搜尋框
	const searchContainer = document.getElementById('search-container');
	searchContainer.style.display = "block";
	const searchInput = document.getElementById('search-value');
	searchInput.placeholder = '輸入會員編號...';

	//新增表格tbody tbody
	const table = document.getElementById('dataTable');
	//table.innerHTML = '';
	const thead = document.createElement('thead');
	const tbody = document.createElement('tbody');
	const headerRow = thead.insertRow();
	headerRow.innerHTML = '<th>會員編號</th>' +
		'<th>會員姓名</th>' +
		'<th>email</th>' +
		'<th>地址</th>' +
		'<th>電話</th>' +
		'<th>操作按鈕</th>';
	table.appendChild(thead);
	table.appendChild(tbody);
	//select all
	const searchAllButton = document.getElementById('submit-search-all');
	searchAllButton.onclick = function() {
		tbody.innerHTML = "";


		fetch("/selectallusers", {
			method: "GET",
			headers: {
				'Content-Type': 'application/json'
			},
		}).then(function(response) {
			return response.json();
		}).then(function(data) {
			console.log(data);

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
					editRow(row, user);
				};
				buttonCell.appendChild(button);
			});
		});

	}





	//select by userId
	const searchButton = document.getElementById('submit-searching');
	searchButton.onclick = function() {
		console.log(searchInput.value);

		fetch(`/selectByuserId/${searchInput.value}`, {
			method: "GET",
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(function(response) {
			return response.json();
		}).then(function(user) {
			searchInput.value="";
			console.log(user);
			// 查詢後的操作
			let tbody = document.querySelector("tbody");
			tbody.innerHTML = "";
			let row = tbody.insertRow();
			let flds = [user.userId, user.username, user.email, user.address, user.phone];
			for (let i = 0; i < flds.length; i++) {
				row.insertCell(i).innerHTML = flds[i];
			}

			let buttonCell = row.insertCell(flds.length);
			let button = document.createElement('button');
			button.textContent = '操作';
			button.onclick = function() {
				editRow(row, user);
			};
			buttonCell.appendChild(button);

		}).catch(function(error) {
			console.error('Error:', error);
		});

	};



	//觸發新增表單按鈕
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


	//新增會員資料表
	let form = document.getElementById('newObjectForm');
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


}

//新增會員
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
			form.style.display = "none";
			const table = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
			const newRow = table.insertRow(0); // 插入到第一行
			let flds = [data.userId, data.username, data.email, data.address, data.phone];
			for (let i = 0; i < flds.length; i++) {
				newRow.insertCell(i).innerHTML = flds[i];
			}

			let buttonCell = newRow.insertCell(flds.length);
			let button = document.createElement('button');
			button.textContent = '操作';
			button.onclick = function() {
				editRow(row, data);
			};
			buttonCell.appendChild(button);



		})
		.catch((error) => {
			console.error('Error:', error);
		});



}



//按下操作按鈕
function editRow(row, user) {
	// 存放原始資料及原始按鈕
	const originalValues = [];
	for (let i = 0; i < row.cells.length; i++) {
		originalValues.push(row.cells[i].innerHTML);
	}
	const originalButtonHtml = row.cells[row.cells.length - 1].innerHTML;

	// 將欄位更改成 input
	const inputs = [
		`<input type="text" value="${user.username}" />`,
		`<input type="email" value="${user.email}" />`,
		`<input type="text" value="${user.address}" />`,
		`<input type="text" value="${user.phone}" />`
	];
	// 第一格是 Id，所以從 i = 1 開始
	// input 因陣列是從 [0] 開始，故 -1
	for (let i = 1; i <= inputs.length; i++) {
		row.cells[i].innerHTML = inputs[i - 1];
	}

	let buttonCell = row.cells[row.cells.length - 1];
	buttonCell.innerHTML = '';

	let saveButton = document.createElement('button');
	saveButton.textContent = '更改';
	saveButton.onclick = function() {
		saveChanges(row, user, originalValues, originalButtonHtml);
	};
	buttonCell.appendChild(saveButton);

	let cancelButton = document.createElement('button');
	cancelButton.textContent = '取消';
	cancelButton.onclick = function() {
		cancelChanges(row, originalValues, originalButtonHtml, user);
	};
	buttonCell.appendChild(cancelButton);
}

// 取消變更
function cancelChanges(row, originalValues, originalButtonHtml, user) {
	console.log("user=" + user)
	originalValues.forEach((value, index) => {
		row.cells[index].innerHTML = value;
	});
	row.cells[row.cells.length - 1].innerHTML = originalButtonHtml;

	// 恢復操作按鈕的事件處理函數
	const operationButton = row.cells[row.cells.length - 1].querySelector('button');
	operationButton.onclick = function() {
		editRow(row, user);
	};
}

// 更改資料
function saveChanges(row, user, originalValues, originalButtonHtml) {
	const updatedData = {
		userId: user.userId,
		username: row.cells[1].getElementsByTagName('input')[0].value,
		email: row.cells[2].getElementsByTagName('input')[0].value,
		address: row.cells[3].getElementsByTagName('input')[0].value,
		phone: row.cells[4].getElementsByTagName('input')[0].value
	};
	console.log(JSON.stringify(updatedData));

	fetch('/userUpdate', {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(updatedData)
	})
		.then(response => response.json())
		.then(data => {
			console.log('Update Success:', data);
			// 更新表格顯示
			row.cells[1].innerHTML = data.username;
			row.cells[2].innerHTML = data.email;
			row.cells[3].innerHTML = data.address;
			row.cells[4].innerHTML = data.phone;
			// 還原操作按鈕
			row.cells[row.cells.length - 1].innerHTML = originalButtonHtml;

			// 恢復操作按鈕的事件處理函數
			const operationButton = row.cells[row.cells.length - 1].querySelector('button');
			operationButton.onclick = function() {
				editRow(row, data);
			};
		})
		.catch(error => {
			console.error('Update Error:', error);
			// 如果更新失敗，可以選擇恢復原始值
			cancelChanges(row, originalValues, originalButtonHtml, user);
		});
}




