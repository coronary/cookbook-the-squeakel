export const ParagraphComponent = {
  p: (props) => (
    <div
      className="text-slate-300 tracking-wide leading-relaxed my-2 max-w-7xl"
      {...props}
    />
  ),
  a: (props) => <a className="text-blue-400 inline" {...props} />,
  pre: (props) => (
    <pre {...props} className="bg-slate-800 p-2 rounded w-max" />
  ),
  code: (props) => <code {...props} className="text-violet-400" />,
  blockquote: (props) => (
    <blockquote
      className="text-slate-300 border-l-2 border-gray-500 ml-8 my-4 p-4"
      {...props}
    />
  ),
};
