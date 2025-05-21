import { TransactionCollection } from '../db/models/Transaction.js';

export const getSummaryByPeriod = async (userId, period) => {
  const [year, month] = period.split('-').map(Number);
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 1);

  const report = await TransactionCollection.aggregate([
    {
      $match: {
        userId,
        date: { $gte: startDate, $lt: endDate },
      },
    },
    {
      $lookup: {
        from: 'categories',
        localField: 'categoryId',
        foreignField: '_id',
        as: 'category',
      },
    },
    {
      $unwind: {
        path: '$category',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $group: {
        _id: {
          transactionType: '$transactionType',
          categoryId: '$categoryId',
        },
        total: { $sum: '$summ' },
        title: { $first: '$category.title' },
      },
    },
  ]);

  const result = {
    income: [],
    expense: [],
    totalIncome: 0,
    totalExpense: 0,
  };
  report.forEach((item) => {
    const { transactionType, categoryId } = item._id;
    const { total, title } = item;

    const categoryObj = {
      categoryId: categoryId.toString(),
      title: title || 'Unknown',
      total,
    };

    if (transactionType === 'income') {
      result.income.push(categoryObj);
      result.totalIncome += total;
    } else {
      result.expense.push(categoryObj);
      result.totalExpense += total;
    }
  });

  const balance = result.totalIncome - result.totalExpense;

  return { ...result, balance };
};
