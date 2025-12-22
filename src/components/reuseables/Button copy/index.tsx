import React from 'react';
import { cn } from '@/lib/utils';
import Spinner from '@/components/reuseables/Spinner';

function Button({
  title,
  height = '48px',
  variant = 'dark',

  lefttIconDark,
  rightIconDark,

  leftIcon,
  leftIconSize = '18px',

  rightIcon,
  rightIconSize = '18px',

  fullWidth = false,
  type = 'button',
  disabled = false,
  id,
  onClick,
  loading,
  className,
}: {
  title?: string;
  height?: '38px' | '48px' | '56px';
  variant?: 'dark' | 'darkAuth' | 'outlined' | 'outlinedURL' | 'outlined-light' | 'secondary' | 'text';

  leftIcon?: string;
  lefttIconDark?: string;
  leftIconSize?: string;

  rightIcon?: string;
  rightIconDark?: string;
  rightIconSize?: string;

  fullWidth?: boolean;

  type?: 'reset' | 'submit' | 'button';
  disabled?: boolean;
  id?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;

  loading?: boolean;
  className?: string;
}) {
  // const _bg = background ==="dark"?

  // HEIGHTS
  const height_38_cn = 'h-[38px] px-[24px] py-[8px] text-[14px] leading-[22px]';
  const height_48_cn = 'h-[48px] px-[24px] py-[12px] text-[16px] leading-[24px]';
  const height_56_cn = 'h-[56px] px-[32px] py-[16px] text-[16px] leading-[24px]';

  // VARIANTS
  const variant_dark_cn = 'bg-primary-dark text-white dark:bg-[#FFFFFF] dark:text-[#111111]';
  const variant_darkAuth_cn = 'bg-primary-dark text-white';
  const variant_outlined_cn = 'border-primary-dark text-primary-dark dark:border-[#4E4E4E] dark:text-[#FFFFFF]';
  const variant_outlinedURL_cn = 'border-primary-dark text-primary-dark';
  const variant_outlined_light_cn = 'border-[#E7E7E7] text-primary-dark dark:text-white dark:border-[#4E4E4E]';
  const variant_secondary_cn = 'border-[#F3F3F3] bg-[#F3F3F3] text-primary-dark';
  const variant_text_cn = 'bg-transparent  text-primary-dark dark:text-[#FFFFFF] border-none';

  const disabled_cn = 'cursor-not-allowed';

  return (
    <button
      className={cn(
        'flex items-center justify-center gap-[10px] border-[1px] rounded-full  font-[500] cursor-pointer m-0 shrink-0 hover:opacity-85',

        // WIDTH
        fullWidth ? 'w-full' : 'w-fit',

        // HEIGHTS
        height === '38px' ? height_38_cn : null,
        height === '48px' ? height_48_cn : null,
        height === '56px' ? height_56_cn : null,

        // VARIANTS
        variant === 'dark' ? variant_dark_cn : null,
        variant === 'darkAuth' ? variant_darkAuth_cn : null,
        variant === 'outlined' ? variant_outlined_cn : null,
        variant === 'outlinedURL' ? variant_outlinedURL_cn : null,
        variant === 'outlined-light' ? variant_outlined_light_cn : null,
        variant === 'secondary' ? variant_secondary_cn : null,
        variant === 'text' ? variant_text_cn : null,
        disabled ? disabled_cn : null,
        className
      )}
      type={type}
      disabled={disabled}
      id={id}
      onClick={onClick}
    >
      {!leftIcon ? null : (
        <>
          <img
            className="dark:hidden"
            alt="button_icon"
            src={leftIcon}
            style={{ width: leftIconSize, height: leftIconSize, objectFit: 'contain' }}
          />

          <img
            className="hidden dark:flex"
            alt="button_icon"
            src={lefttIconDark}
            style={{ width: leftIconSize, height: leftIconSize, objectFit: 'contain' }}
          />
        </>
      )}
      <span className="font-eudoxus text-inherit">{title}</span>

      {loading ? (
        <Spinner className="text-inherit" />
      ) : (
        <>
          {!rightIcon ? null : (
            <>
              <img
                alt="button_icon"
                src={rightIcon}
                style={{ width: rightIconSize, height: rightIconSize, objectFit: 'contain' }}
                className="dark:hidden"
              />

              <img
                className="hidden dark:flex"
                alt="button_icon"
                src={rightIconDark}
                style={{ width: rightIconSize, height: rightIconSize, objectFit: 'contain' }}
              />
            </>
          )}
        </>
      )}
    </button>
  );
}

export default Button;
