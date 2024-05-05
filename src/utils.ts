export const calculateAge = (birthDate: string) => {
  const targetDate = new Date(birthDate);
  if (isNaN(targetDate.getTime())) {
    return "N/A";
  }
  return new Date().getFullYear() - targetDate.getFullYear();
};
