import { ComponentPropsWithoutRef } from 'react';

const TextareaField = ({ ...props }: ComponentPropsWithoutRef<'textarea'>) => {
  return (
    <div className="relative z-1 w-full rounded-sm bg-white px-3 py-1.5">
      <textarea
        maxLength={500}
        className="body-m placeholder:text-gray-30 text-gray-80 w-full resize-none bg-transparent"
        {...props}
      />
    </div>
  );
};

export default TextareaField;
