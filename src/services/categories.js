import { CategoryCollection } from '../db/models/Categories.js';

export const getCategories = async () => {
  const categories = await CategoryCollection.find();

  const income = categories.filter((category) => category.title === 'Incomes');
  const expense = categories.filter((category) => category.title !== 'Incomes');
  return { income, expense };
};
