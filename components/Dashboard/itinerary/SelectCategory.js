import { useRef } from 'react';
import CategorySelected from '../CategorySelected';
import FormLabel from '../FormLabel';

const SelectCategory = ({ categories, formCategories, setFormData }) => {
  const categorySelectRef = useRef();

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    if (formCategories.find((c) => c.title === value)) {
      categorySelectRef.current.value = '';
      return;
    }
    const category = categories.find((category) => category.title === value);
    setFormData((prev) => ({
      ...prev,
      categories: [...prev.categories, category],
    }));
    categorySelectRef.current.value = '';
  };

  const removeCategory = (category) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.filter((c) => c.title !== category),
    }));
  };

  return (
    <>
      <FormLabel name="categories" title="Select a category" />
      <select
        name="categories"
        id="categories"
        className="w-full px-4 py-3 mb-3 text-base text-gray-700 placeholder-gray-500 border border-gray-400 rounded-lg focus:shadow-outline font-lato"
        placeholder="Select a category"
        defaultValue={''}
        onChange={handleCategoryChange}
        ref={categorySelectRef}
      >
        <option value="" disabled>
          Select a category
        </option>
        {categories.map((category) => (
          <option key={category.id} value={category.title}>
            {category.title}
          </option>
        ))}
      </select>
      <div className="flex flex-wrap gap-2">
        {formCategories.map((category) => (
          <CategorySelected
            key={category.id}
            removeItem={removeCategory}
            title={category.title}
          />
        ))}
      </div>
    </>
  );
};

export default SelectCategory;
