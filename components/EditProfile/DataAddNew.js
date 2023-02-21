import ContainerAddNew from './ContainerAddNew';
import InputAddNew from './InputAddNew';
import ProfileData from './ProfileData';

const DataAddNew = ({
  handleClick,
  addNew,
  title,
  data,
  removeData,
  handleChange,
  handleClickInput,
  handleKeyDown,
}) => {
  return (
    <div className="flex flex-col">
      <ContainerAddNew
        handleClick={handleClick}
        addNew={addNew}
        title={title}
        htmlFor={title}
      />
      <div className="flex flex-wrap w-full ml-1 gap-y-3 gap-x-5">
        <ProfileData data={data} handleRemove={removeData} />
        {addNew && (
          <InputAddNew
            name={title}
            handleChange={handleChange}
            handleClick={handleClickInput}
            handleKeyDown={handleKeyDown}
          />
        )}
      </div>
    </div>
  );
};

export default DataAddNew;
