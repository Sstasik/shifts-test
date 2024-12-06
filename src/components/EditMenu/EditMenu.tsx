import { useEffect, useState } from "react";
import { Section, IShift, IEmployyes, IUpdatedShift } from "@/types";
import { IoMdClose } from "react-icons/io";

type Props = {
  shiftId: string | null;
  onMenuExit: () => void;
  employees: IEmployyes[];
  onSave: (updatedShift: IUpdatedShift) => void;
  shifts: IShift[];
};

const EditMenu = ({
  shiftId,
  onMenuExit,
  employees,
  onSave,
  shifts,
}: Props) => {
  const [start, setStart] = useState<string>("");
  const [end, setEnd] = useState<string>("");
  const [paidBreak, setPaidBreak] = useState<string>("");
  const [unpaidBreak, setUnpaidBreak] = useState<string>("");
  const [hrCode, setHrCode] = useState<string | null>(null);
  const [isNonCountedShift, setIsNonCountedShift] = useState<boolean>(false);
  const [section, setSection] = useState<Section | undefined>();
  const [employeeId, setEmployeeId] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (shiftId) {
      const foundShift = shifts.find((shift) => shift.id === shiftId);
      const foundEmployy = employees.find(
        (employee) => employee.id === foundShift?.id
      );

      if (foundShift && foundEmployy) {
        setStart(foundShift.timeInterval.start);
        setEnd(foundShift.timeInterval.end);
        setPaidBreak(foundShift.paidBreak);
        setUnpaidBreak(foundShift.unpaidBreak);
        setHrCode(foundShift.hrCode);
        setSection(foundShift.section);
        setEmployeeId(foundShift.employeeId);
      }
    }
  }, [shiftId]);

  const handleFormConfirm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const updatedShift: IUpdatedShift = {
      id: shiftId!,
      timeInterval: {
        start,
        end,
      },
      paidBreak,
      unpaidBreak,
      hrCode,
      section,
      employeeId,
    };
    onSave(updatedShift);
    onMenuExit();
  };

  const handleSectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSection = event.target.value as Section;
    setSection(selectedSection);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsNonCountedShift(event.target.checked);
  };

  const handleEmployeeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedEmployeeId = event.target.value;
    const employee = employees.find((emp) => emp.id === selectedEmployeeId);

    if (employee) {
      setEmployeeId(employee.id);
    }
  };

  if (!shiftId) return null;

  return (
    <div className="w-full flex items-end h-full overflow-hidden fixed top-0 left-0 z-30 bg-black bg-opacity-80">
      <div className="h-full w-[40%] bg-[#fefefe] absolute top-0 right-0 overflow-auto pb-10">
        <header className="border-b-2 font-bold border-[#f9f9f9] px-9 py-4 flex gap-6">
          <button onClick={onMenuExit} className="text-gray-500">
            <IoMdClose size={20} />
          </button>
          <h4 className="text-[#252832] text-xl font-semibold">
            Création d&apos;un shift
          </h4>
        </header>

        <main className="px-9 mt-8">
          <div className="w-full font-bold mb-5">
            <button className="w-1/2 border-[#e3e6f1] border-2 bg-[#e3e6f1] py-1">
              Shift
            </button>
            <button className="w-1/2 border-[#e3e6f1] border-2 text-[#87898b] py-1">
              Absence
            </button>
          </div>

          <form onSubmit={handleFormConfirm} className="w-full relative">
            <div>
              <label className="block text-sm font-semibold mb-2">
                Section
              </label>
              <select
                onChange={handleSectionChange}
                value={section}
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
              <label className="block text-sm font-semibold mb-2">
                Utilisateur
              </label>
              <select
                onChange={handleEmployeeChange}
                value={employeeId || ""}
                className="bg-[#f6f8fc] rounded-sm border border-[#edeff1] p-2 w-full outline-none text-black mb-4"
              >
                {employees.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Competences
              </label>
              <input
                className="bg-[#f6f8fc] rounded-sm border border-[#edeff1] p-2 w-full outline-none mb-4"
                type="text"
                placeholder="Selectionnez une..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Attributs
              </label>
              <input
                className="bg-[#f6f8fc] rounded-sm border border-[#edeff1] p-2 w-full outline-none mb-4"
                type="text"
                placeholder="Selectionnez une..."
              />
            </div>

            <div className="flex gap-2 mb-5">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Début
                </label>
                <input
                  type="time"
                  required
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                  className="bg-[#f6f8fc] rounded-sm border border-[#edeff1] p-2 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Fin</label>
                <input
                  required
                  type="time"
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                  className="bg-[#f6f8fc] rounded-sm border border-[#edeff1] p-2 outline-none"
                />
              </div>

              <div className="w-[70%]">
                <label className="block text-sm font-semibold mb-2">
                  Raccourcis
                </label>
                <select className="w-full h-[44px] bg-[#f6f8fc] rounded-sm border border-[#edeff1] p-2 outline-none">
                  <option>Raccourcis</option>
                  <option>Raccourcis</option>
                  <option>Raccourcis</option>
                  <option>Raccourcis</option>
                  <option>Raccourcis</option>
                </select>
              </div>
            </div>

            <div className="flex gap-2">
              <div className="w-1/2">
                <label className="block text-sm font-semibold mb-2">
                  Pause payée
                </label>
                <input
                  type="time"
                  value={paidBreak}
                  onChange={(e) => setPaidBreak(e.target.value)}
                  className="bg-[#f6f8fc] rounded-sm border border-[#edeff1] p-2 w-full outline-none"
                />
              </div>

              <div className="w-1/2 mb-4">
                <label className="block text-sm font-semibold mb-2">
                  Pause non payée
                </label>
                <input
                  type="time"
                  value={unpaidBreak}
                  onChange={(e) => setUnpaidBreak(e.target.value)}
                  className="bg-[#f6f8fc] rounded-sm border border-[#edeff1] p-2 w-full outline-none"
                />
              </div>
            </div>

            <div className="w-full mb-4">
              <label className="block text-sm font-semibold mb-2">
                Code spécial RH
              </label>
              <input
                type="text"
                value={hrCode || ""}
                onChange={(e) => setHrCode(e.target.value)}
                className="bg-[#f6f8fc] rounded-sm border border-[#edeff1] p-2 w-full outline-none"
              />
            </div>

            <div className="w-full mb-4">
              <input
                type="checkbox"
                checked={isNonCountedShift}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              <label>Shift non comptabilisé dans les heures prestées</label>
            </div>

            <div>
              <p className="mb-5">
                Dépassement des heures hebdomadaires maximales de 38 h. (+34 h)
              </p>

              <div className="w-full flex gap-6">
                <button
                  type="button"
                  onClick={onMenuExit}
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
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default EditMenu;
