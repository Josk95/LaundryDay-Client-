import React from "react";
import Link from "next/link";

const HeaderItem = ({ title, Icon, link, onClick }) => {
  return (
    <Link href={`/${link}`} as={`/${link}`}>
      <div
        onClick={onClick}
        className="flex flex-col whitespace-nowrap items-center cursor-pointer group w-12 sm:w-20 group"
      >
        <Icon className="h-8 mb-1 group-hover:animate-bounce text-white" />
        <p className="sm:opacity-0 text-blue-100 group-hover:opacity-100 tracking-widest">
          {title}
        </p>
      </div>
    </Link>
  );
};

export default HeaderItem;

export async function getServerSideProps(ctx) {
  return {
    props: {
      session: await getSession(ctx),
    },
  };
}
