"use client";
import CalendarTable from "@/components/CalendarTable/CalendarTable";
import { employees } from "@/utils/mock/employyes-mock";
import { shifts as initialShifts } from "@/utils/mock/shift-mock";
import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import dayjs from "dayjs";
import EditMenu from "@/components/EditMenu/EditMenu";
import { IUpdatedShift } from "@/types";

export default function Home() {
  const [shifts, setShifts] = useState(initialShifts);
  const [editingShiftId, setEditingShiftId] = useState<string | null>(null);

  const handleShiftDelete = (shiftId: string) => {
    const prevShifts = [...shifts];

    setShifts(prevShifts.filter((shift) => shift.id !== shiftId));
  };

  const handleShiftDragUpdate = (shiftId: string, newDay: dayjs.Dayjs, newEmployeeId: string) => {
    setShifts((prevShifts) =>
      prevShifts.map((shift) =>
        shift.id === shiftId
          ? { ...shift, day: newDay.toISOString(), employeeId: newEmployeeId }
          : shift
      )
    );
  };

  const handleShiftEdit = (shiftId: string) => {
    setEditingShiftId(shiftId);
  };

  const handleExitEditMenu = () => {
    setEditingShiftId(null);
  };

  const handleShiftSave = (updatedShift: IUpdatedShift) => {
    setShifts((prevShifts) =>
      prevShifts.map((shift) =>
        shift.id === updatedShift.id ? { ...shift, ...updatedShift } : shift
      )
    );
  };

  return (
    <div className="pb-20">
      <DndProvider backend={HTML5Backend}>
        <CalendarTable
          onShiftDelete={handleShiftDelete}
          onShiftUpdate={handleShiftDragUpdate}
          employyes={employees}
          shifts={shifts}
          onShiftEdit={handleShiftEdit}
        />

        <EditMenu
          onSave={handleShiftSave}
          employees={employees}
          onMenuExit={handleExitEditMenu}
          shiftId={editingShiftId}
          shifts={shifts}
        />
      </DndProvider>
    </div>
  );
}
