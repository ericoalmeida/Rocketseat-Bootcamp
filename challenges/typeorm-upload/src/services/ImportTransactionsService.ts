import { getRepository, getCustomRepository, In } from 'typeorm';

import csvParse from 'csv-parse';
import fs from 'fs';

import Transaction from '../models/Transaction';
import Category from '../models/Category';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface TransactionDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: string;
}

interface Request {
  path: string;
}

class ImportTransactionsService {
  async execute({ path }: Request): Promise<Transaction[]> {
    const categoryRepository = getRepository(Category);
    const transactionRepository = getCustomRepository(TransactionsRepository);

    const transactionReadStream = fs.createReadStream(path);

    const parsers = csvParse({
      from_line: 2,
    });

    const parseCSV = transactionReadStream.pipe(parsers);

    const transactions: TransactionDTO[] = [];
    const categories: string[] = [];

    parseCSV.on('data', async line => {
      const [title, type, value, category] = line.map((cell: string) => {
        return cell.trim();
      });

      if (!title || !type || !value) return;

      categories.push(category);
      transactions.push({ title, value, type, category });
    });

    await new Promise(resolve => {
      return parseCSV.on('end', resolve);
    });

    const existentCategories = await categoryRepository.find({
      where: {
        title: In(categories),
      },
    });

    const existentCategoriesTitles = existentCategories.map(
      (category: Category) => {
        return category.title;
      },
    );

    const addCategoriesTitles = categories
      .filter(categoryItem => {
        return !existentCategoriesTitles.includes(categoryItem);
      })
      .filter((value, index, self) => {
        return self.indexOf(value) === index;
      });

    const newCategories = categoryRepository.create(
      addCategoriesTitles.map(title => {
        return { title };
      }),
    );

    await categoryRepository.save(newCategories);

    const finalCategories = [...newCategories, ...existentCategories];

    const createdTransactions = transactionRepository.create(
      transactions.map(transaction => {
        return {
          title: transaction.title,
          type: transaction.type,
          value: transaction.value,
          category: finalCategories.find(
            category => category.title === transaction.category,
          ),
        };
      }),
    );

    await transactionRepository.save(createdTransactions);

    await fs.promises.unlink(path);

    return createdTransactions;
  }
}

export default ImportTransactionsService;
