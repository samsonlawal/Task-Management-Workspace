import Link from 'next/link';

export const FormCTA = ({ text, link, linkText }: { text: string; link: string; linkText: string }) => {
  return (
    <div className="text-center text-[#4e4e4e] text-sm font-gordita font-normal leading-[22px] dark:text-[#e7e7e7]">
      {text}
      {'   '}
      <Link
        href={`${link}`}
        aria-label="Log in"
        className="text-sm font-medium font-gordita leading-[22px] dark:text-white"
      >
        {linkText}
      </Link>
    </div>
  );
};
