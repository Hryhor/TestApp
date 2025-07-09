export function formatDate(dateStr: number) {
    const date = new Date(dateStr);
  
    if (
      date.getFullYear() === 1 &&
      date.getMonth() === 0 &&
      date.getDate() === 1
    ) {
      return 'Дата не указана';
    }
  
    return date.toLocaleDateString('ru-RU');
}
