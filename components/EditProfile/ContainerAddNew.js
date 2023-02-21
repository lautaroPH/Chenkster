import ButtonAddNew from './ButtonAddNew';
import LabelProfile from './LabelProfile';

const ContainerAddNew = ({ handleClick, addNew, title, htmlFor }) => {
  return (
    <div className="flex items-center justify-between mb-2">
      <LabelProfile title={title} htmlFor={htmlFor} />
      <ButtonAddNew handleClick={handleClick} addNew={addNew} />
    </div>
  );
};

export default ContainerAddNew;
