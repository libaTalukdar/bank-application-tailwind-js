 let totalDeposit = 0;
    let totalWithdraw = 0;

    function updateUI() {
      document.getElementById('totalDeposit').textContent = `$${totalDeposit}`;
      document.getElementById('totalWithdraw').textContent = `$${totalWithdraw}`;
      document.getElementById('totalBalance').textContent = `$${totalDeposit - totalWithdraw}`;
    }

    function handleDeposit() {
      const amount = parseFloat(document.getElementById('depositInput').value);
      if (!isNaN(amount) && amount > 0) {
        totalDeposit += amount;
        updateUI();
        depositChart.data.datasets[0].data[new Date().getMonth()] += amount;
        depositChart.update();
        document.getElementById('depositInput').value = '';
      }
    }

    function handleWithdraw() {
      const amount = parseFloat(document.getElementById('withdrawInput').value);
      if (!isNaN(amount) && amount > 0 && amount <= (totalDeposit - totalWithdraw)) {
        totalWithdraw += amount;
        updateUI();
        document.getElementById('withdrawInput').value = '';
      }
    }

    //redirect page
        function loadPage(page) {
      fetch(page)
        .then(response => response.text())
        .then(data => {
          document.getElementById("content").innerHTML = data;
        })
        .catch(error => {
          document.getElementById("content").innerHTML = "<p class='text-red-500'>Error loading page.</p>";
        });
    }

    // 📊 Chart.js setup
    const ctx = document.getElementById('depositChart').getContext('2d');
    const depositChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Monthly Deposit',
          data: [50, 100, 80, 60, 90, 120, 70, 110, 130, 100, 95, 85],
          backgroundColor: 'rgba(59, 130, 246, 0.6)',
          borderColor: 'rgba(59, 130, 246, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    updateUI();