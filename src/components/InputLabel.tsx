type InputLabelProps = {
    htmlFor?: string;
    value: string;
  };
  
  const InputLabel = ({ htmlFor, value }: InputLabelProps) => {
    return (
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {value}
      </label>
    );
  };
  
  export default InputLabel;
  