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




// Shared state management
class BankApp {
    static init() {
        // Load or initialize state
        if (!localStorage.getItem('bankData')) {
            localStorage.setItem('bankData', JSON.stringify({
                balance: 0,
                deposits: 0,
                withdrawals: 0,
                transactions: []
            }));
        }
        
        // Update all pages
        this.updateUI();
        
        // Set up periodic sync (every 2 seconds)
        setInterval(() => this.updateUI(), 2000);
    }

    static getState() {
        return JSON.parse(localStorage.getItem('bankData'));
    }

    static saveState(state) {
        localStorage.setItem('bankData', JSON.stringify(state));
        this.updateUI();
    }

    static updateUI() {
        const state = this.getState();
        
        // Update elements that exist on the current page
        if (document.getElementById('totalBalance')) {
            document.getElementById('totalBalance').textContent = `$${state.balance.toFixed(2)}`;
            document.getElementById('totalDeposit').textContent = `$${state.deposits.toFixed(2)}`;
            document.getElementById('totalWithdraw').textContent = `$${state.withdrawals.toFixed(2)}`;
            // document.getElementById('profileTransactions').textContent = `$${state.transactions.length}`;

        }
        if (document.getElementById('profileTransactions')) {
            document.getElementById('profileTransactions').textContent = `$${state.transactions.length}`;
        }
        
        if (document.getElementById('headerBalance')) {
            document.getElementById('headerBalance').textContent = `$${state.balance.toFixed(2)}`;
        }
        
        if (document.getElementById('transactionTable')) {
            const tableBody = document.getElementById('transactionTable');
            tableBody.innerHTML = state.transactions.map(txn => `
                <tr class="border-b">
                    <td class="p-4">${new Date(txn.date).toLocaleDateString()}</td>
                    <td class="p-4">${txn.type}</td>
                    <td class="p-4 ${txn.type === 'deposit' ? 'text-green-600' : 'text-red-600'}">
                        ${txn.type === 'deposit' ? '+' : '-'}$${txn.amount.toFixed(2)}
                    </td>
                    <td class="p-4">
                        <span class="px-2 py-1 rounded-full text-xs ${txn.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                            ${txn.success ? 'Success' : 'Failed'}
                        </span>
                    </td>
                </tr>
            `).join('');
        }
    }

    static handleDeposit() {
        const amount = parseFloat(document.getElementById('depositAmount').value);
        if (isNaN(amount) || amount <= 0) return;

        const state = this.getState();
        state.balance += amount;
        state.deposits += amount;
        state.transactions.push({
            type: 'deposit',
            amount: amount,
            date: new Date().toISOString(),
            success: true
        });
        
        this.saveState(state);
        document.getElementById('depositAmount').value = '';
    }

    static handleWithdraw() {
        const amount = parseFloat(document.getElementById('withdrawAmount').value);
        if (isNaN(amount) || amount <= 0) return;

        const state = this.getState();
        const success = amount <= state.balance;
        
        if (success) {
            state.balance -= amount;
            state.withdrawals += amount;
        }
        
        state.transactions.push({
            type: 'withdraw',
            amount: amount,
            date: new Date().toISOString(),
            success: success
        });
        
        this.saveState(state);
        document.getElementById('withdrawAmount').value = '';
        
        if (!success) {
            alert('Insufficient funds!');
        }
    }
    

 static updateProfile() {
    const state = this.getState();
            // const state = JSON.parse(localStorage.getItem('bankData')) || {
            //     balance: 0,
            //     deposits: 0,
            //     withdrawals: 0,
            //     transactions: []
            // };
            // this.updateUI();
            // document.getElementById('profileBalance').textContent = `$${state.balance.toFixed(2)}`;
            // document.getElementById('profileDeposits').textContent = `$${state.deposits.toFixed(2)}`;
            // document.getElementById('profileWithdrawals').textContent = `$${state.withdrawals.toFixed(2)}`;
            document.getElementById('profileTransactions').textContent = state.transactions.length;
            // document.getElementById('headerBalance').textContent = `$${state.balance.toFixed(2)}`;
        }

     
       
// end

}

 


// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => BankApp.init());

// Global functions for HTML buttons
function handleDeposit() { BankApp.handleDeposit(); }
function handleWithdraw() { BankApp.handleWithdraw(); }

  

