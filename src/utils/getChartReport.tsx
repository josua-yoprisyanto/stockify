export const getChartReport = (reportData: any) => {
  const today = new Date(); // Current date
  const lastSevenDays = [];

  // Iterate over the last 7 days
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(today);
    currentDate.setDate(today.getDate() - i); // Get the date i days ago
    const dateString = currentDate.toISOString().slice(0, 10); // Get date string in 'YYYY-MM-DD' format
    lastSevenDays.unshift({ date: dateString, total: 0 }); // Add to the beginning of the array
  }

  // Populate totals for existing data
  reportData.forEach((item: any) => {
    const itemDate = new Date(item.created_at).toISOString().slice(0, 10); // Get date string in 'YYYY-MM-DD' format
    const index = lastSevenDays.findIndex((day) => day.date === itemDate);
    if (index !== -1) {
      lastSevenDays[index].total += item.total;
    }
  });

  return lastSevenDays;
};
