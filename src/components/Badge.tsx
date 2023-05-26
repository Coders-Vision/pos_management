import React from "react";

type BadgeDiv = React.AllHTMLAttributes<HTMLDivElement>;
type BadgeExtra = {
  color: string;
  extra?: string;
};
type BadgeProps = BadgeDiv & BadgeExtra;

function Badge(props: BadgeProps) {
  return (
    <div
      className={`w-auto inline-block text-white ${props.color} rounded-md py-1 text-center text-xs px-2 ${props.extra}`}
    >
      {props.children}
    </div>
  );
}

export default Badge;
