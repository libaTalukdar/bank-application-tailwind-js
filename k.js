<main class="ml-16 mt-16 p-6">
        <div class="container mx-auto">
            <!-- Balance Cards -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div class="bg-white p-6 rounded-lg shadow">
                    <h3 class="text-gray-500">Total Balance</h3>
                    <p class="text-3xl font-bold text-blue-600" id="totalBalance">$0.00</p>
                </div>
                <div class="bg-white p-6 rounded-lg shadow">
                    <h3 class="text-gray-500">Total Deposits</h3>
                    <p class="text-3xl font-bold text-green-600" id="totalDeposit">$0.00</p>
                </div>
                <div class="bg-white p-6 rounded-lg shadow">
                    <h3 class="text-gray-500">Total Withdrawals</h3>
                    <p class="text-3xl font-bold text-red-600" id="totalWithdraw">$0.00</p>
                </div>
            </div>

            <!-- Quick Actions -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div class="bg-white p-6 rounded-lg shadow">
                    <h3 class="text-lg font-semibold mb-4">Deposit Money</h3>
                    <input type="number" id="depositAmount" class="w-full p-2 border rounded mb-2" placeholder="Amount">
                    <button onclick="handleDeposit()" class="w-full bg-green-500 text-white py-2 rounded">Deposit</button>
                </div>
                <div class="bg-white p-6 rounded-lg shadow">
                    <h3 class="text-lg font-semibold mb-4">Withdraw Money</h3>
                    <input type="number" id="withdrawAmount" class="w-full p-2 border rounded mb-2" placeholder="Amount">
                    <button onclick="handleWithdraw()" class="w-full bg-red-500 text-white py-2 rounded">Withdraw</button>
                </div>
            </div>
        </div>
    </main>