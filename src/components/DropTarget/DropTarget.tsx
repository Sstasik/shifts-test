import React, { useRef } from "react";
import { useDrop } from "react-dnd";
import { IShift } from "@/types";
import dayjs from "dayjs";
import ShiftCard from "../ShiftCard/ShiftCard";

type DropTargetProps = {
  day: dayjs.Dayjs;
  employeeId: string;
  shifts: IShift[];
  onShiftUpdate: (shiftId: string, newDay: dayjs.Dayjs, newEmployeeId: string) => void;
  onShiftEdit: (shiftId: string) => void;
  onShiftDelete: (shiftId: string) => void;
};

const DropTarget = ({
  day,
  employeeId,
  shifts,
  onShiftUpdate,
  onShiftEdit,
  onShiftDelete,
}: DropTargetProps) => {
  const dropRef = useRef<HTMLTableDataCellElement>(null);

  const [, drop] = useDrop(() => ({
    accept: "SHIFT",
    drop: (item: { id: string }) => {
      onShiftUpdate(item.id, day, employeeId);
    },
  }));

  drop(dropRef);

  const getShiftsForDay = (employeeId: string, day: dayjs.Dayjs) =>
    shifts.filter(
      (shift) =>
        shift.employeeId === employeeId && dayjs(shift.day).isSame(day, "day")
    );

  return (
    <td
      ref={dropRef}
      className="border border-gray-300 p-2 align-top w-[190px] h-[120px]"
    >
      <div className="flex flex-col gap-2 items-start">
        {getShiftsForDay(employeeId, day).map((shift) => (
          <ShiftCard
            onShiftEdit={onShiftEdit}
            key={shift.id}
            {...shift}
            onShiftDelete={onShiftDelete}
          />
        ))}
      </div>
    </td>
  );
};

export default DropTarget;
