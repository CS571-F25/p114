import { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const AppContext = createContext();

export function AppProvider({ children }) {
    // Shared bills state with localStorage persistence
    const [bills, setBills] = useLocalStorage('rentsplit-bills', [
        {
            id: 1,
            name: "Rent",
            amount: 1500.00,
            category: "Housing",
            dueDate: "2024-12-01",
            splitType: "equal"
        },
        {
            id: 2,
            name: "Electric",
            amount: 120.00,
            category: "Utilities",
            dueDate: "2024-12-05",
            splitType: "equal"
        },
        {
            id: 3,
            name: "Internet",
            amount: 80.00,
            category: "Internet",
            dueDate: "2024-12-10",
            splitType: "equal"
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

    // Calculate total expenses from bills
    const totalExpenses = bills.reduce((sum, bill) => sum + bill.amount, 0);

    // Calculate what each roommate owes based on their share percentage
    const getRoommateBalances = () => {
        return roommates.map(roommate => {
            const amountOwed = (roommate.sharePercentage / 100) * totalExpenses;
            return {
                ...roommate,
                owes: amountOwed,
                // For now, assume no one has paid yet - you could add payment tracking
                paidAmount: 0
            };
        });
    };

    // Bill operations
    const addBill = (newBill) => {
        setBills(prev => [...prev, { ...newBill, id: Date.now() }]);
    };

    const deleteBill = (id) => {
        setBills(prev => prev.filter(bill => bill.id !== id));
    };

    // Roommate operations
    const addRoommate = (newRoommate) => {
        setRoommates(prev => [...prev, { ...newRoommate, id: Date.now() }]);
    };

    const deleteRoommate = (id) => {
        setRoommates(prev => prev.filter(roommate => roommate.id !== id));
    };

    const value = {
        bills,
        setBills,
        addBill,
        deleteBill,
        roommates,
        setRoommates,
        addRoommate,
        deleteRoommate,
        totalExpenses,
        getRoommateBalances
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