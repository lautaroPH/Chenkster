import { useRef } from 'react';
import CategorySelected from '../CategorySelected';
import FormLabel from './FormLabel';

const SelectSubCategory = ({
  subCategoriesForm,
  setFormData,
  categoriesForm,
}) => {
  const subCategorySelectRef = useRef();

  const handleSubCategoryChange = (e) => {
    const { value } = e.target;
    if (subCategoriesForm.includes(value)) {
      subCategorySelectRef.current.value = '';
      return;
    }

    setFormData((prev) => ({
      ...prev,
      sub_categories: [...prev.sub_categories, value],
    }));
    subCategorySelectRef.current.value = '';
  };

  const removeSubCategory = (subCategory) => {
    setFormData((prev) => ({
      ...prev,
      sub_categories: prev.sub_categories.filter((c) => c !== subCategory),
    }));
  };

  return (
    <>
      <FormLabel name="sub_categories" title="Select a sub category" />
      <select
        name="sub_categories"
        id="sub_categories"
        className="w-full px-4 py-3 mb-3 text-base text-gray-700 placeholder-gray-500 border border-gray-400 rounded-lg focus:shadow-outline font-lato"
        placeholder="Select a sub categories"
        defaultValue={''}
        onChange={handleSubCategoryChange}
        ref={subCategorySelectRef}
      >
        <option value="" disabled>
          Select a sub categories
        </option>
        {categoriesForm.map((category) =>
          category.sub_categories.map((subcategory) => (
            <option key={`${subcategory}-${category.id}`} value={subcategory}>
              {subcategory}
            </option>
          )),
        )}
      </select>
      <div className="flex flex-wrap gap-2">
        {subCategoriesForm.map((category) => (
          <CategorySelected
            key={category}
            removeItem={removeSubCategory}
            title={category}
          />
        ))}
      </div>
    </>
  );
};

export default SelectSubCategory;
