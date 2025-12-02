import { ChangeEventHandler } from 'react';

export const FormFieldUrl = ({
  fieldLabel,
  fieldName,
  placeholderText,
  mobileFieldLabel,
  mobilePlaceholderText,
  classInput,
  classInputFocus,
  id,
}: {
  fieldLabel: string;
  fieldName: string;
  placeholderText: string;
  mobileFieldLabel?: string;
  mobilePlaceholderText?: string;
  classInput?: string;
  classInputFocus?: string;
  id: string;
}) => {
  return (
    <div className="relative">
      <div className="flex relative">
        <label
          htmlFor="linkedin"
          className="flex items-center  field-label text-[#4e4e42] whitespace-nowrap text-ellipsis overflow-hidden pointer-events-none text-base font-normal font-gordita absolute h-px w-px border-0 inset-0 p-0"
        >
          {fieldLabel}
        </label>
        <div className="hidden lg:flex items-center bg-[#f3f3f3] dark:bg-[#1d1d1d] rounded-tl-lg rounded-bl-lg basis-[172px] p-3">
          <div className="field-label text-[#4e4e42] dark:text-[#838383] whitespace-nowrap text-ellipsis overflow-hidden pointer-events-none text-base font-normal font-gordita">
            {fieldLabel}
          </div>
        </div>
        <input
          type="text"
          name={fieldName}
          id={id}
          className={`${classInput} flex-1 p-3 text-base font-gordita bg-white dark:bg-[#262626] rounded-lg lg:rounded-tl-none lg:rounded-bl-none lg:rounded-tr-lg lg:rounded-br-lg border-[1px] border-solid border-[#838383] dark:border-none focus:outline-none`}
          placeholder={placeholderText}
        />

        <div
          className={`${classInputFocus} duration-150 text-[#111111] dark:text-[#717171] bg-white dark:bg-[#262626] whitespace-nowrap text-ellipsis overflow-hidden pointer-events-none absolute top-[calc(50%-24px)] text-base font-normal font-gordita translate-y-1/2 mx-3 lg:hidden`}
        >
          {mobileFieldLabel}
        </div>
      </div>
    </div>
  );
};
