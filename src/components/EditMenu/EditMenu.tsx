import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Section, IEmployyes, IUpdatedShift, IShift, IFormValues } from "@/types";
import { IoMdClose } from "react-icons/io";

type Props = {
  shiftId: string | null;
  onMenuExit: () => void;
  employees: IEmployyes[];
  onSave: (updatedShift: IUpdatedShift) => void;
  shifts: IShift[];
};

const EditMenu = ({ shiftId, onMenuExit, employees, onSave, shifts }: Props) => {
  const { register, handleSubmit, setValue, watch, formState: { isDirty } } = useForm({
    defaultValues: {
      start: "",
      end: "",
      paidBreak: "",
      unpaidBreak: "",
      hrCode: "",
      isNonCountedShift: false,
      section: undefined as Section | undefined,
      employeeId: "",
    },
  });

  const [showModal, setShowModal] = useState(false);
  const formValues = watch();

  useEffect(() => {
    if (shiftId) {
      const foundShift = shifts.find((shift) => shift.id === shiftId);
      if (foundShift) {
        setValue("start", foundShift.timeInterval.start);
        setValue("end", foundShift.timeInterval.end);
        setValue("paidBreak", foundShift.paidBreak);
        setValue("unpaidBreak", foundShift.unpaidBreak);
        setValue("hrCode", foundShift.hrCode || "");
        setValue("section", foundShift.section);
        setValue("employeeId", foundShift.employeeId || "");
      }
    }
  }, [shiftId, shifts, setValue]);

  const onSubmit = (data: IFormValues) => {
    const updatedShift: IUpdatedShift = {
      id: shiftId!,
      timeInterval: {
        start: data.start,
        end: data.end,
      },
      paidBreak: data.paidBreak,
      unpaidBreak: data.unpaidBreak,
      hrCode: data.hrCode,
      section: data.section,
      employeeId: data.employeeId,
    };
    onSave(updatedShift);
    onMenuExit();
  };

  const handleExit = () => {
    if (isDirty) {
      setShowModal(true);
    } else {
      onMenuExit();
    }
  };

  const handleCancelExit = () => {
    setShowModal(false);
  };

  const handleConfirmExit = () => {
    setShowModal(false);
    onMenuExit();
  };

  if (!shiftId) return null;

  return (
    <div className="w-full flex items-end h-full overflow-hidden fixed top-0 left-0 z-30 bg-black bg-opacity-80">
      <div className="h-full w-[40%] bg-[#fefefe] absolute top-0 right-0 overflow-auto pb-10">
        <header className="border-b-2 font-bold border-[#f9f9f9] px-9 py-4 flex gap-6">
          <button onClick={handleExit} className="text-gray-500">
            <IoMdClose size={20} />
          </button>
          <h4 className="text-[#252832] text-xl font-semibold">
            Création d&apos;un shift
          </h4>
        </header>

        <main className="px-9 mt-8">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full relative">
            <div>
              <label htmlFor="section" className="block text-sm font-semibold mb-2">Section</label>
              <select
                {...register("section")}
                id="section"
                className="bg-[#f6f8fc] rounded-sm border border-[#edeff1] p-2 w-full outline-none text-black mb-4"
              >
                {Object.values(Section).map((section) => (
                  <option key={section} value={section}>
                    {section}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="employeeId" className="block text-sm font-semibold mb-2">Utilisateur</label>
              <select
                {...register("employeeId")}
                id="employeeId"
                className="bg-[#f6f8fc] rounded-sm border border-[#edeff1] p-2 w-full outline-none text-black mb-4"
              >
                {employees.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-2 mb-5">
              <div className="w-1/2">
                <label htmlFor="start" className="block text-sm font-semibold mb-2">Début</label>
                <input
                  type="time"
                  {...register("start", { required: true })}
                  id="start"
                  className="bg-[#f6f8fc] rounded-sm border border-[#edeff1] p-2 outline-none w-full"
                />
              </div>

              <div className="w-1/2">
                <label htmlFor="end" className="block text-sm font-semibold mb-2">Fin</label>
                <input
                  type="time"
                  {...register("end", { required: true })}
                  id="end"
                  className="bg-[#f6f8fc] rounded-sm border border-[#edeff1] p-2 outline-none w-full"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <div className="w-1/2">
                <label htmlFor="paidBreak" className="block text-sm font-semibold mb-2">Pause payée</label>
                <input
                  type="time"
                  {...register("paidBreak")}
                  id="paidBreak"
                  className="bg-[#f6f8fc] rounded-sm border border-[#edeff1] p-2 w-full outline-none"
                />
              </div>

              <div className="w-1/2">
                <label htmlFor="unpaidBreak" className="block text-sm font-semibold mb-2">Pause non payée</label>
                <input
                  type="time"
                  {...register("unpaidBreak")}
                  id="unpaidBreak"
                  className="bg-[#f6f8fc] rounded-sm border border-[#edeff1] p-2 w-full outline-none"
                />
              </div>
            </div>

            <div className="w-full my-4">
              <label htmlFor="hrCode" className="block text-sm font-semibold mb-2">Code spécial RH</label>
              <input
                type="text"
                {...register("hrCode")}
                id="hrCode"
                className="bg-[#f6f8fc] rounded-sm border border-[#edeff1] p-2 w-full outline-none"
              />
            </div>
          
            <div className="w-full flex gap-6">
              <button
                type="button"
                onClick={handleExit}
                className="bg-red-500 text-white py-2 px-4 rounded w-1/2"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded w-1/2"
              >
                Créer shift
              </button>
            </div>
          </form>
        </main>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40">
          <div className="bg-white p-6 rounded-md">
            <h3 className="text-lg font-semibold">You have unsaved changes. Do you want to discard all changes?</h3>
            <div className="mt-4 flex justify-end gap-4">
              <button
                onClick={handleCancelExit}
                className="bg-gray-300 text-black py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmExit}
                className="bg-red-500 text-white py-2 px-4 rounded"
              >
                Discard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditMenu;
