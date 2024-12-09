import React, { useState } from "react";
import { IEmployyes, IShift } from "@/types";
import dayjs from "dayjs";
import DropTarget from "../DropTarget/DropTarget";  
import { generateDaysOfWeek } from "@/utils/helpers/generateDaysOfWeek";
import Image from "next/image";

type Props = {
  employyes: IEmployyes[];
  shifts: IShift[];
  onShiftUpdate: (
    shiftId: string,
    newDay: dayjs.Dayjs,
    newEmployeeId: string
  ) => void;

  onShiftEdit: (shiftId: string) => void;

  onShiftDelete: (shiftId: string) => void;
};

const CalendarTable = ({
  employyes,
  shifts,
  onShiftUpdate,
  onShiftDelete,
  onShiftEdit,
}: Props) => {
  const [week, setWeek] = useState(() => {
    const startOfWeek = dayjs().startOf("week").add(1, "day");
    const endOfWeek = startOfWeek.add(6, "day");
    return { start: startOfWeek, end: endOfWeek };
  });

  const daysOfWeek = generateDaysOfWeek(week);

  const changeWeek = (direction: "prev" | "next") => {
    setWeek((prevWeek) => {
      const offset = direction === "next" ? 7 : -7;
      const newStart = prevWeek.start.add(offset, "day");
      const newEnd = prevWeek.end.add(offset, "day");
      return { start: newStart, end: newEnd };
    });
  };

  return (
    <div className="">
      <div className="flex gap-2 items-center justify-center h-[50px]">
        <button onClick={() => changeWeek("prev")}>{"<"}</button>
        <span className="bg-[#f6f8fc] rounded-sm border border-[#edeff1] px-2 outline-none">
          {week.start.format("D MMM").toLowerCase()} -{" "}
          {week.end.format("D MMM").toLowerCase()}
        </span>
        <button onClick={() => changeWeek("next")}>{">"}</button>
      </div>

      <table className="w-full border border-gray-400 table-auto">
        <thead>
          <tr>
            <th
              className="border border-gray-300 p-2 text-center bg-[#f8f9ff] w-[12%] min-h-[120px]"
            ></th>
            {daysOfWeek.map((day) => (
              <th
                key={day.toISOString()}
                className="border border-gray-300 p-2 text-center bg-[#f8f9ff] w-[12%] h-[120px]"
              >
                {day.format("ddd MMM DD")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {employyes.map((employee) => (
            <tr key={employee.id}>
              <td className="border border-gray-300 p-2 text-center w-[12%] h-[120px]">
                <div className="flex gap-5 items-center">
                  <Image
                    width={56}
                    height={56}
                    src={
                      employee.imgUrl
                        ? employee.imgUrl
                        : "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
                    }
                    alt={employee.name}
                    className="rounded-full"
                  />
                  <div className="flex gap-1 text-left flex-col">
                    <h5>{employee.name}</h5>
                  </div>
                </div>
              </td>
              {daysOfWeek.map((day) => (
                <DropTarget
                  key={day.toISOString()}
                  day={day}
                  employeeId={employee.id}
                  shifts={shifts}
                  onShiftUpdate={onShiftUpdate}
                  onShiftEdit={onShiftEdit}
                  onShiftDelete={onShiftDelete}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CalendarTable;
