import { Section } from "@/types";

export const getSectionColor = (section?: Section) => {
  if (!section) return;

  let color;

  switch (section) {
    case "Caisse":
      color = "#8cc350";
      break;
    case "Fermeture":
      color = "#e72160";
      break;
    case "Camion":
      color = "#1e97f5";
      break;
    case "Ouverture":
      color = "#ff9802";
      break;
  }

  return color;
};
