export const calculateAge = (birthDate: string, today: Date = new Date()) => {
  const targetDate = new Date(birthDate);

  if (isNaN(targetDate.getTime())) {
    return "N/A";
  }
  const targetDay = targetDate.getDate();
  const targetMonth = targetDate.getMonth();

  const todayDay = today.getDate();
  const todayMonth = today.getMonth();

  let years = today.getFullYear() - targetDate.getFullYear();

  if (
    todayMonth + 1 < targetMonth ||
    (todayMonth === targetMonth && todayDay - 1 <= targetDay)
  ) {
    years -= 1;
  }
  return years;
};
