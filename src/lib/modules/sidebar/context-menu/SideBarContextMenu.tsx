import * as React from "react";
import {
  DocumentMinusIcon,
  DocumentPlusIcon,
  FolderPlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { SidebarContextMenuItem } from "./SidebarContextMenuItem";
import Divider from "@/lib/ui/divider/Divider";
import { useCookbookStore } from "@/store/store";

export enum SideBarContextMenuType {
  DEFAULT,
  GUIDE,
  SECTION,
}

export enum SideBarModalType {
  ADD_GUIDE,
  RENAME_GUIDE,
  DELETE_GUIDE,
  ADD_SECTION,
  RENAME_SECTION,
  DELETE_SECTION,
}

export type ContextMenuPosition = {
  x: number;
  y: number;
};

interface SideBarContextMenuProps {
  type: SideBarContextMenuType;
  position: ContextMenuPosition;
}

export function SidebarContextMenu({
  type,
  position,
}: SideBarContextMenuProps) {
  const { setModal, setContextMenuData } = useCookbookStore((state) => state);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const { x, y } = position;

  React.useEffect(() => {
    if (
      menuRef != null &&
      menuRef.current !== null &&
      menuRef.current.clientHeight + y > window.innerHeight
    ) {
      setContextMenuData({
        position: {
          x: x,
          y: y - (menuRef?.current?.clientHeight ?? 0),
        },
        type: type,
      });
    }
  }, [y]);

  function handleModalOpen(modalType: SideBarModalType) {
    setModal({ open: true, type: modalType });
  }

  return (
    <div
      className="absolute rounded p-2 bg-slate-950 flex flex-col items-center z-10 shadow-lg text-slate-300 text-sm font-semibold"
      style={{ top: y, left: x }}
      ref={menuRef}
    >
      <ul>
        {type === SideBarContextMenuType.SECTION && (
          <>
            {/* <SidebarContextMenuItem
              label="rename section"
              icon={PencilSquareIcon}
              handleOnClick={() =>
                handleModalOpen(SideBarModalType.RENAME_SECTION)
              }
            /> */}
            <SidebarContextMenuItem
              label="remove section"
              icon={DocumentMinusIcon}
              handleOnClick={() =>
                handleModalOpen(SideBarModalType.DELETE_SECTION)
              }
            />
          </>
        )}

        {(type === SideBarContextMenuType.GUIDE ||
          type === SideBarContextMenuType.SECTION) && (
          <>
            <SidebarContextMenuItem
              label="add section"
              icon={DocumentPlusIcon}
              handleOnClick={() =>
                handleModalOpen(SideBarModalType.ADD_SECTION)
              }
            />
            <Divider />
            {/* <SidebarContextMenuItem
              label="rename guide"
              icon={PencilSquareIcon}
              handleOnClick={() =>
                handleModalOpen(SideBarModalType.RENAME_GUIDE)
              }
            /> */}
            <SidebarContextMenuItem
              label="remove guide"
              icon={TrashIcon}
              handleOnClick={() =>
                handleModalOpen(SideBarModalType.DELETE_GUIDE)
              }
            />
            <Divider />
          </>
        )}

        <SidebarContextMenuItem
          label="add guide"
          icon={FolderPlusIcon}
          handleOnClick={() => handleModalOpen(SideBarModalType.ADD_GUIDE)}
        />
      </ul>
    </div>
  );
}
