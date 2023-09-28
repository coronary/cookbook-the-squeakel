import classNames from "classnames";

const defaultClasses = "font-bold antialiased text-slate-100 my-2";

export const HeaderComponents = {
  h1: (props) => (
    <h2 className={classNames("text-4xl", defaultClasses)} {...props} />
  ),
  h2: (props) => (
    <h2 className={classNames("text-3xl", defaultClasses)} {...props} />
  ),
  h3: (props) => (
    <h3 className={classNames("text-2xl", defaultClasses)} {...props} />
  ),
  h4: (props) => (
    <h4 className={classNames("text-xl", defaultClasses)} {...props} />
  ),
};
