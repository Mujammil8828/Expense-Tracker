// Initialize balance and history
let currentBalance = parseInt(localStorage.getItem("balance")) || 200;
document.getElementById("balance").innerText = currentBalance;

const transactionHistory = JSON.parse(localStorage.getItem("history")) || [];

// Display transaction history from local storage
transactionHistory.forEach(transaction => {
    updateHistory(transaction);
});

// Function to add money to the current balance
function addMoney() {
    const addAmount = parseInt(document.getElementById("addAmount").value);
    if (isNaN(addAmount) || addAmount <= 0) {
        alert("Please enter a valid amount to add!");
        resetPage(); // Call reset if invalid input
        return;
    }

    currentBalance += addAmount;
    document.getElementById("balance").innerText = currentBalance;
    document.getElementById("addAmount").value = "";
    const transaction = `Added: ₹${addAmount}`;
    updateHistory(transaction);
    saveToLocalStorage();
}

// Function to add an expense and update the remaining balance
function addExpense() {
    const expenseAmount = parseInt(document.getElementById("expenseAmount").value);
    if (isNaN(expenseAmount) || expenseAmount <= 0) {
        alert("Please enter a valid expense amount!");
        resetPage(); // Call reset if invalid input
        return;
    }
    if (expenseAmount > currentBalance) {
        alert("Expense exceeds current balance!");
        resetPage(); // Call reset if expense exceeds balance
        return;
    }

    currentBalance -= expenseAmount;
    document.getElementById("balance").innerText = currentBalance;
    document.getElementById("expenseAmount").value = "";
    const transaction = `Spent: ₹${expenseAmount}`;
    updateHistory(transaction);
    saveToLocalStorage();
}

// Function to update transaction history with date and time
function updateHistory(transaction) {
    const historyList = document.getElementById("historyList");
    const listItem = document.createElement("li");

    // Get current date and time
    const now = new Date();
    const dateTime = now.toLocaleString();

    listItem.textContent = `${transaction} on ${dateTime}`;
    historyList.appendChild(listItem);

    // Add to transaction history array
    transactionHistory.push(`${transaction} on ${dateTime}`);
}

// Function to save balance and history to local storage
function saveToLocalStorage() {
    localStorage.setItem("balance", currentBalance);
    localStorage.setItem("history", JSON.stringify(transactionHistory));
}

// Function to clear transaction history
function clearHistory() {
    document.getElementById("historyList").innerHTML = "";
    transactionHistory.length = 0;
    localStorage.removeItem("history");
}

// Function to reset the page
function resetPage() {
    alert("Invalid input detected! The page will now reset.");
    location.reload(); // Reloads the page to reset everything
}
