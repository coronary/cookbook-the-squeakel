import classNames from "classnames";

const defaultClasses = "max-w-4xl rounded bg-black";

export const ImageComponent = {
  img: (props) => <img className={classNames(defaultClasses)} {...props} />,
};
