import { ComponentPropsWithoutRef } from 'react';

const TextareaField = ({ ...props }: ComponentPropsWithoutRef<'textarea'>) => {
  return (
    <textarea
      className="body-m placeholder:text-gray-30 text-gray-80 w-full resize-none rounded-sm bg-white px-3 py-1.5"
      {...props}
    />
  );
};

export default TextareaField;
