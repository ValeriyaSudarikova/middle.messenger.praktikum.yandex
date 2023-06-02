## Описание

Учебный проект - мессенджер "Messagery" 

Ссылка на макет: https://www.figma.com/file/nw4iVxYeSKJVMeVmEcEmQs/Untitled?node-id=14%3A376&t=l2c4nQtALO3b8BTn-1

Ссылка на деплой в Netlify: https://messagery.netlify.app/

Проект находится в разработке, на данный момент частично реализованы следующие функции:
- валидация полей ввода,
- переход по страницам приложения,
- просмотр списка чатов,
- просмотр отправкa сообщений в чате (для доступа к переписке необходимо выбрать чат, нажав иконку сообщения в правом углу компонента чата),
- добавление пользователей в чат,
- создание нового чата,
- изменение личных данных или аватара пользователя

Для установки сделайте pull-реквест из репозитория проекта. Запустите одну из команд, взависимости от потребностей.

- `npm install` — установка зависимостей,
- `npm run build` — сборка стабильной версии,
- `npm run dev` - запуск версии для разработчика

Все манипуляции с API описаны в соответствующих контроллерах (`src/controllers/`).

Получение данных от API описано в соответствующих классах (`src/api/*`).


