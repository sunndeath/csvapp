const renderTableBody = data => {
    const tbodyContainer = document.getElementsByTagName('tbody')[0];

    const nodesArray = Array.prototype.slice.call(document.getElementsByClassName('js-id'));
    const currentIDs = nodesArray.map(i => i.innerText);

    const filteredData = data.filter(f => !currentIDs.includes(f.ID));

    filteredData.forEach(item => {
        const row = document.createElement('tr');

        row.innerHTML = `
          <td>${item['Фамилия']}</td>
          <td>${item.Added}</td>
          <td class="js-id" data-id=${item.ID}>${item.ID}</td>
          <td>${item.Phone}</td>
          <td>${item.Gender}</td>
          <td>${item.Age}</td>
          <td>${item['Home address']}</td>
          <td>${item['Work address']}</td> 
          <td>${item.Income}</td>
          <td>${item['Current device model']}</td>
          <td>${item.Price }</td>
          <td>${item['Last device model']}</td>
          <td>${item['Change date']}</td>
          <td>${item['Last travel']}</td>
          <td>${item['Name target']}</td>
          <td>${item['Photo target']}</td>
        `;

        tbodyContainer.prepend(row);
    });
};

const clearTableBody = () => {
    const tbodyContainer = document.getElementsByTagName('tbody')[0];

    tbodyContainer.innerHTML = '';
};

document.getElementsByClassName('js-clear')[0].addEventListener('click', () => clearTableBody());

const getData = () => {
    return fetch('/data')
        .then(response => response.json())
        .then(data => {
            if (data.example.length) {
                const key = Object.keys(data.example[0])[0];
                const selectedIDS = data.example.map(d => d[key]).concat(key);
                const tableData = data.dictionary.filter(d => selectedIDS.includes(d.ID));

                renderTableBody(tableData);
            }
        })
        .catch(error => console.log('!!error', error))
};

setInterval(getData, 1000);