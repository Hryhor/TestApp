export function formatDate(dateStr: number) {
    const date = new Date(dateStr);
  
    // Проверяем на минимальное значение .NET
    if (
      date.getFullYear() === 1 &&
      date.getMonth() === 0 &&
      date.getDate() === 1
    ) {
      return 'Дата не указана';
    }
  
    // Форматируем в привычный вид, например: 02.07.2025
    return date.toLocaleDateString('ru-RU');
}
