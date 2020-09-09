import { getCustomRepository } from 'typeorm';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Transaction {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  formattedDate: string;
  type: 'income' | 'outcome';
  category: { title: string };
  created_at: Date;
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface List {
  transactions: Transaction[];
  balance: Balance;
}

class ListTransactionsService {
  public async execute(): Promise<List> {
    const transactionRepository = getCustomRepository(TransactionsRepository);

    const transactions = await transactionRepository.find();
    const balance = await transactionRepository.getBalance();

    const formattedTransactions = transactions.map(transaction => {
      const { id, title, value, type, category, created_at } = transaction;

      const formattedValue = Intl.NumberFormat('pt-Br', {
        style: 'currency',
        currency: 'BRL',
      }).format(type === 'outcome' ? value * -1 : value);

      const formattedDate = Intl.DateTimeFormat('pt-BR').format(created_at);

      return {
        id,
        title,
        value,
        formattedValue,
        formattedDate,
        type,
        category,
        created_at,
      };
    });

    return { transactions: formattedTransactions, balance };
  }
}

export default ListTransactionsService;
