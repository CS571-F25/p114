import { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const AppContext = createContext();

export function AppProvider({ children }) {
    // Shared bills state with localStorage persistence
    // paidBy: roommate id who paid the full bill (null = unpaid)
    const [bills, setBills] = useLocalStorage('rentsplit-bills', [
        {
            id: 1,
            name: "Rent",
            amount: 1500.00,
            category: "Housing",
            dueDate: "2024-12-01",
            splitType: "equal",
            paidBy: null
        },
        {
            id: 2,
            name: "Electric",
            amount: 120.00,
            category: "Utilities",
            dueDate: "2024-12-05",
            splitType: "equal",
            paidBy: null
        },
        {
            id: 3,
            name: "Internet",
            amount: 80.00,
            category: "Internet",
            dueDate: "2024-12-10",
            splitType: "equal",
            paidBy: null
        }
    ]);

    // Shared roommates state with localStorage persistence
    const [roommates, setRoommates] = useLocalStorage('rentsplit-roommates', [
        {
            id: 1,
            name: "Alex Johnson",
            email: "alex@example.com",
            sharePercentage: 40
        },
        {
            id: 2,
            name: "Sam Williams",
            email: "sam@example.com",
            sharePercentage: 35
        },
        {
            id: 3,
            name: "Jordan Lee",
            email: "jordan@example.com",
            sharePercentage: 25
        }
    ]);

    // Transfers between roommates
    const [transfers, setTransfers] = useLocalStorage('rentsplit-transfers', []);

    // Calculate total expenses from bills
    const totalExpenses = bills.reduce((sum, bill) => sum + bill.amount, 0);

    // Calculate how much each person has paid for bills
    const getAmountPaidByRoommate = (roommateId) => {
        return bills
            .filter(bill => bill.paidBy === roommateId)
            .reduce((sum, bill) => sum + bill.amount, 0);
    };

    // Calculate net transfers for a roommate (positive = received, negative = sent)
    const getNetTransfers = (roommateId) => {
        const received = transfers
            .filter(t => t.toId === roommateId)
            .reduce((sum, t) => sum + t.amount, 0);
        const sent = transfers
            .filter(t => t.fromId === roommateId)
            .reduce((sum, t) => sum + t.amount, 0);
        return received - sent;
    };

    // Calculate balances for all roommates
    // Balance = What they paid + transfers received - what they owe - transfers sent
    // Positive balance = they are owed money, Negative = they owe money
    const getRoommateBalances = () => {
        return roommates.map(roommate => {
            const amountOwed = (roommate.sharePercentage / 100) * totalExpenses;
            const amountPaid = getAmountPaidByRoommate(roommate.id);
            const netTransfers = getNetTransfers(roommate.id);
            const balance = amountPaid + netTransfers - amountOwed;
            
            return {
                ...roommate,
                owes: amountOwed,
                paidAmount: amountPaid,
                netTransfers,
                balance // positive = owed money, negative = owes money
            };
        });
    };

    // Calculate simplified debts (who owes whom)
    const calculateDebts = () => {
        const balances = getRoommateBalances();
        const debtors = balances.filter(b => b.balance < -0.01).map(b => ({ 
            id: b.id, 
            name: b.name, 
            amount: Math.abs(b.balance) 
        }));
        const creditors = balances.filter(b => b.balance > 0.01).map(b => ({ 
            id: b.id, 
            name: b.name, 
            amount: b.balance 
        }));
        
        const debts = [];
        let i = 0, j = 0;
        
        while (i < debtors.length && j < creditors.length) {
            const debtor = { ...debtors[i] };
            const creditor = { ...creditors[j] };
            const amount = Math.min(debtor.amount, creditor.amount);
            
            if (amount > 0.01) {
                debts.push({
                    fromId: debtor.id,
                    fromName: debtor.name,
                    toId: creditor.id,
                    toName: creditor.name,
                    amount: Math.round(amount * 100) / 100
                });
            }
            
            debtors[i].amount -= amount;
            creditors[j].amount -= amount;
            
            if (debtors[i].amount < 0.01) i++;
            if (creditors[j].amount < 0.01) j++;
        }
        
        return debts;
    };

    // Bill operations
    const addBill = (newBill) => {
        setBills(prev => [...prev, { ...newBill, id: Date.now(), paidBy: null }]);
    };

    const deleteBill = (id) => {
        setBills(prev => prev.filter(bill => bill.id !== id));
    };

    const assignBillPayer = (billId, roommateId) => {
        setBills(prev => prev.map(bill => 
            bill.id === billId ? { ...bill, paidBy: roommateId } : bill
        ));
    };

    const clearBillPayer = (billId) => {
        setBills(prev => prev.map(bill => 
            bill.id === billId ? { ...bill, paidBy: null } : bill
        ));
    };

    // Roommate operations
    const addRoommate = (newRoommate) => {
        setRoommates(prev => [...prev, { ...newRoommate, id: Date.now() }]);
    };

    const deleteRoommate = (id) => {
        setRoommates(prev => prev.filter(roommate => roommate.id !== id));
        // Also clear this roommate from any bills they paid
        setBills(prev => prev.map(bill => 
            bill.paidBy === id ? { ...bill, paidBy: null } : bill
        ));
        // Remove transfers involving this roommate
        setTransfers(prev => prev.filter(t => t.fromId !== id && t.toId !== id));
    };

    // Transfer operations
    const addTransfer = (fromId, toId, amount) => {
        const fromRoommate = roommates.find(r => r.id === fromId);
        const toRoommate = roommates.find(r => r.id === toId);
        
        setTransfers(prev => [...prev, {
            id: Date.now(),
            fromId,
            fromName: fromRoommate?.name || 'Unknown',
            toId,
            toName: toRoommate?.name || 'Unknown',
            amount,
            date: new Date().toISOString()
        }]);
    };

    const deleteTransfer = (transferId) => {
        setTransfers(prev => prev.filter(t => t.id !== transferId));
    };

    const value = {
        bills,
        setBills,
        addBill,
        deleteBill,
        assignBillPayer,
        clearBillPayer,
        roommates,
        setRoommates,
        addRoommate,
        deleteRoommate,
        transfers,
        addTransfer,
        deleteTransfer,
        totalExpenses,
        getRoommateBalances,
        calculateDebts
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
}