// Зависимости модуля counter
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default ({ invoke }: { invoke: (address: string) => unknown }) => {
  // В будущем здесь могут быть зависимости для counter модуля
  // Например, сервисы для работы с API счетчика

  return {
    // "@counter/services/CounterService": () => new CounterService()
  }
}
