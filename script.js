// Global variables for balance tracking
let currentBalance = 200;
document.getElementById("balance").innerText = currentBalance;

// Function to add money to the current balance
function addMoney() {
    const addAmount = parseInt(document.getElementById("addAmount").value);
    if (isNaN(addAmount) || addAmount <= 0) {
        alert("Please enter a valid amount to add!");
        return;
    }

    currentBalance += addAmount;
    document.getElementById("balance").innerText = currentBalance;
    document.getElementById("addAmount").value = "";
    updateHistory(`Added: ₹${addAmount}`);
}

// Function to add an expense and update the remaining balance
function addExpense() {
    const expenseAmount = parseInt(document.getElementById("expenseAmount").value);
    if (isNaN(expenseAmount) || expenseAmount <= 0) {
        alert("Please enter a valid expense amount!");
        return;
    }
    if (expenseAmount > currentBalance) {
        alert("Expense exceeds current balance!");
        return;
    }

    currentBalance -= expenseAmount;
    document.getElementById("balance").innerText = currentBalance;
    document.getElementById("expenseAmount").value = "";
    updateHistory(`Spent: ₹${expenseAmount}`);
}

// Function to update transaction history with date and time
function updateHistory(transaction) {
    const historyList = document.getElementById("historyList");
    const listItem = document.createElement("li");

    // Get current date and time
    const now = new Date();
    const dateTime = now.toLocaleString(); // Formats date and time

    listItem.textContent = `${transaction} on ${dateTime}`;
    historyList.appendChild(listItem);
}
