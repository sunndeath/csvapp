var renderTableBody = function(data) {
    var tbodyContainer = document.getElementsByTagName('tbody')[0];

    tbodyContainer.innerHTML = '';

    data.forEach(item => {
        const row = tbodyContainer.insertRow(-1);

        row.innerHTML = `
          <td>${item['Фамилия']}</td>
          <td>${item.Added}</td>
          <td>${item.ID}</td>
          <td>${item.Phone}</td>
          <td>${item.Sex}</td>
        `;
    });
};

function getData() {
    return fetch('/data')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log('!!data', data);

            if (data.example.length) {
                const key = Object.keys(data.example[0])[0];
                const selectedIDS = data.example.map(d => d[key]).concat(key);
                const tableData = data.dictionary.filter(d => selectedIDS.includes(d.ID));

                renderTableBody(tableData);
            }
        })
        .catch(function(error) {
            console.log('!!error', error);
        })
}

setInterval(getData, 5000);