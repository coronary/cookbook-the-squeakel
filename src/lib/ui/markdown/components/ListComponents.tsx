import classNames from "classnames";

const defaultClasses = "text-slate-300 tracking-wide leading-loose";

export const ListComponents = {
  ol: (props) => (
    <ol className={"pl-8 list-decimal text-slate-300"} {...props} />
  ),
  ul: (props) => <ul className={"pl-8 list-disc text-slate-300"} {...props} />,
  li: (props) => <li className={classNames(defaultClasses)} {...props} />,
};
