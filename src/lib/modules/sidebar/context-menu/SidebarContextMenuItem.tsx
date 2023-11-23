export function SidebarContextMenuItem({ icon: Icon, label, handleOnClick }) {
  return (
    <li className="hover:border-b-2 hover:border-teal-500 p-2 max-h-10">
      <button
        className="flex flex-1 gap-x-2 items-center"
        onClick={() => handleOnClick()}
      >
        <Icon className="w-6 h-6" />
        <span>{label}</span>
      </button>
    </li>
  );
}
