import React, { useState, useEffect, useRef } from "react";
import { useDrag } from "react-dnd";
import { IShift } from "@/types";
import { MdCancel, MdNotes } from "react-icons/md";
import {
  FaRegCopy,
  FaRegClock,
  FaRegPauseCircle,
  FaRegMoneyBillAlt,
} from "react-icons/fa";
import { getSectionColor } from "@/utils/helpers/getSectionColor";

type Props = {
  onShiftDelete: (shiftId: string) => void;
  onShiftEdit: (shiftId: string) => void;
} & IShift;

const ShiftCard = ({
  day,
  employeeId,
  id,
  paidBreak,
  section,
  timeInterval,
  totalHours,
  wage,
  onShiftDelete,
  onShiftEdit,
}: Props) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "SHIFT",
    item: { id, day, employeeId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const ref = useRef<HTMLDivElement>(null); 
  drag(ref); 

  const handleContextMenuOpen = (event: React.MouseEvent) => {
    event.preventDefault();
    setMenuPosition({
      x: event.clientX + window.scrollX,
      y: event.clientY + window.scrollY,
    });
    setIsContextMenuOpen(true);
  };

  const handleMenuClose = () => {
    setIsContextMenuOpen(false);
  };

  const handleCopy = () => {
    handleMenuClose();
  };

  const handleEdit = () => {
    handleMenuClose();
    onShiftEdit(id);
  };

  const handleDelete = () => {
    onShiftDelete(id);
    handleMenuClose();
  };

  const contextMenuButtons = [
    { name: "Copy", icon: <FaRegCopy />, callback: handleCopy },
    { name: "Edit", icon: <MdNotes />, callback: handleEdit },
    { name: "Delete", icon: <MdCancel color="red" />, callback: handleDelete },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menuElement = document.getElementById("context-menu");
      if (menuElement && !menuElement.contains(event.target as Node)) {
        handleMenuClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      style={{
        background:
          timeInterval.start === "07:00" && timeInterval.end === "15:00"
            ? "#eefca1"
            : "#f8f9ff",
      }}
      ref={ref} 
      className={`w-full flex flex-col gap-1 overflow-hidden border border-gray-200 rounded-lg p-4 cursor-grab ${
        isDragging ? "opacity-50" : ""
      }`}
      onContextMenu={handleContextMenuOpen}
    >
      <div className="w-full flex items-center justify-between">
        <h2 className="text-lg font-medium">
          {timeInterval.start} - {timeInterval.end}
        </h2>
        <input className="size-5" type="checkbox" />
      </div>

      <div className="flex gap-2 items-center text-gray-400 text-sm">
        <span className="flex items-center gap-1">
          <FaRegClock />
          {totalHours}
        </span>

        {paidBreak && (
          <span className="flex items-center gap-1">
            <FaRegPauseCircle /> {paidBreak}
          </span>
        )}

        <span className="flex items-center gap-1">
          <FaRegMoneyBillAlt /> {wage}€
        </span>
      </div>

      <div
        style={{
          background: getSectionColor(section),
          color: section === "Fermeture" ? "white" : "black",
        }}
        className="rounded-md pl-2 w-full text-sm font-bold"
      >
        {section}
      </div>

      {isContextMenuOpen && (
        <div
          id="context-menu"
          className="flex flex-col gap-2 absolute py-4 px-6 bg-white border border-gray-300 rounded-md shadow-md z-10 min-w-[240px]"
          style={{ top: menuPosition.y, left: menuPosition.x }}
        >
          {contextMenuButtons.map((b) => (
            <button
              key={b.name}
              className="flex w-full items-center gap-2 text-[1.1rem]"
              onClick={b.callback}
            >
              {b.icon}
              <span
                className={`${
                  b.name === "Delete" ? "text-red-500" : ""
                } font-semibold`}
              >
                {b.name}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShiftCard;
