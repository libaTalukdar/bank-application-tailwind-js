//  let totalDeposit = 0;
//     let totalWithdraw = 0;

//     function updateUI() {
//       document.getElementById('totalDeposit').textContent = `$${totalDeposit}`;
//       document.getElementById('totalWithdraw').textContent = `$${totalWithdraw}`;
//       document.getElementById('totalBalance').textContent = `$${totalDeposit - totalWithdraw}`;
//     }

//     function handleDeposit() {
//       const amount = parseFloat(document.getElementById('depositInput').value);
//       if (!isNaN(amount) && amount > 0) {
//         totalDeposit += amount;
//         updateUI();
//         depositChart.data.datasets[0].data[new Date().getMonth()] += amount;
//         depositChart.update();
//         document.getElementById('depositInput').value = '';
//       }
//     }

//     function handleWithdraw() {
//       const amount = parseFloat(document.getElementById('withdrawInput').value);
//       if (!isNaN(amount) && amount > 0 && amount <= (totalDeposit - totalWithdraw)) {
//         totalWithdraw += amount;
//         updateUI();
//         document.getElementById('withdrawInput').value = '';
//       }
//     }





const state = {
  totalDeposit: localStorage.getItem('totalDeposit') ? parseFloat(localStorage.getItem('totalDeposit')) : 0,
  totalWithdraw: localStorage.getItem('totalWithdraw') ? parseFloat(localStorage.getItem('totalWithdraw')) : 0,
  transactions: JSON.parse(localStorage.getItem('transactions')) || []
};

// Update UI and save to localStorage
function updateUI() {
  // Format numbers with 2 decimal places
  document.getElementById('totalDeposit').textContent = `$${state.totalDeposit.toFixed(2)}`;
  document.getElementById('totalWithdraw').textContent = `$${state.totalWithdraw.toFixed(2)}`;
  document.getElementById('totalBalance').textContent = `$${(state.totalDeposit - state.totalWithdraw).toFixed(2)}`;
  
  // Save to localStorage
  localStorage.setItem('totalDeposit', state.totalDeposit);
  localStorage.setItem('totalWithdraw', state.totalWithdraw);
  localStorage.setItem('transactions', JSON.stringify(state.transactions));
  
  // Update chart if exists
  if (typeof depositChart !== 'undefined') {
    depositChart.data.datasets[0].data[new Date().getMonth()] = state.totalDeposit;
    depositChart.update();
  }
}

function handleDeposit() {
  const amount = parseFloat(document.getElementById('depositInput').value);
  if (!isNaN(amount) && amount > 0) {
    state.totalDeposit += amount;
    
    // Add transaction record
    state.transactions.push({
      type: 'deposit',
      amount: amount,
      date: new Date().toISOString(),
      success: true
    });
    
    updateUI();
    document.getElementById('depositInput').value = '';
    
    // Show success feedback
    alert(`Successfully deposited $${amount.toFixed(2)}`);
  } else {
    alert('Please enter a valid positive amount');
  }
}

function handleWithdraw() {
  const amount = parseFloat(document.getElementById('withdrawInput').value);
  const availableBalance = state.totalDeposit - state.totalWithdraw;
  
  if (!isNaN(amount) && amount > 0) {
    if (amount <= availableBalance) {
      state.totalWithdraw += amount;
      
      // Add transaction record
      state.transactions.push({
        type: 'withdraw',
        amount: amount,
        date: new Date().toISOString(),
        success: true
      });
      
      updateUI();
      document.getElementById('withdrawInput').value = '';
      
      // Show success feedback
      alert(`Successfully withdrew $${amount.toFixed(2)}`);
    } else {
      // Add failed transaction record
      state.transactions.push({
        type: 'withdraw',
        amount: amount,
        date: new Date().toISOString(),
        success: false
      });
      localStorage.setItem('transactions', JSON.stringify(state.transactions));
      
      alert('Insufficient funds for this withdrawal');
    }
  } else {
    alert('Please enter a valid positive amount');
  }
}

// Initialize UI when page loads
document.addEventListener('DOMContentLoaded', () => {
  updateUI();
  
  // Initialize chart if exists
  if (typeof depositChart !== 'undefined') {
    depositChart.data.datasets[0].data[new Date().getMonth()] = state.totalDeposit;
    depositChart.update();
  }
});

function displayTransactions() {
  const container = document.getElementById('transactionHistory');
  container.innerHTML = state.transactions.map(t => `
    <div class="transaction ${t.success ? 'success' : 'failed'}">
      ${t.type.toUpperCase()}: $${t.amount.toFixed(2)} (${new Date(t.date).toLocaleString()})
      - ${t.success ? '✓' : '✗'}
    </div>
  `).join('');
}

function checkBalanceWarning() {
  const balance = state.totalDeposit - state.totalWithdraw;
  if (balance < 100) { // Example threshold
    alert('Warning: Low balance!');
  }
}

function getMonthlyStats() {
  const now = new Date();
  return state.transactions.filter(t => {
    const date = new Date(t.date);
    return date.getMonth() === now.getMonth() && 
           date.getFullYear() === now.getFullYear();
  });
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