# Синхронизация объектов с myhome.ge

Объявления Оксаны с myhome.ge попадают на сайт автоматически: новые добавляются
(фото обрабатываются через kie.ai в фирменном стиле), снятые с myhome удаляются.

## Файлы

- `config.json` - `agentUrl` (страница Оксаны на myhome), сколько фото брать на объект
- `fetch.mjs` - читает объявления (обычный Chrome с профилем `~/.oksana-sync/chrome-profile`,
  потому что headless myhome не пускает). Сырые ответы API складывает в `~/.oksana-sync/raw/`
- `enhance.mjs` - одно фото: Nano Banana Edit (свет/цвет, без дорисовки) + Recraft Crisp Upscale (x2),
  затем ужатие до 1600 px. Около 4,5 кредита kie.ai за фото
- `sync.mjs` - сравнивает myhome с `src/data/listings.json`, добавляет/удаляет, коммитит и пушит
- `kie.mjs` - обёртка над kie.ai (ключ в `~/.kie/key` или `KIE_API_KEY`)

Данные: `src/data/listings.json`, фото: `public/images/listings/<id>/N.jpg`.
Пока JSON пустой, сайт показывает демо-объекты из `src/lib/properties.ts`.

## Запуск вручную

```bash
node scripts/myhome/fetch.mjs            # только прочитать myhome, ничего не менять
node scripts/myhome/sync.mjs --dry       # показать, что добавится/удалится
node scripts/myhome/sync.mjs --no-git    # обновить файлы без коммита
node scripts/myhome/sync.mjs             # полный цикл + push (Vercel деплоит сам)
node scripts/myhome/enhance.mjs <url> out.jpg   # обработать одно фото
```

## Расписание (раз в день в 11:30)

```bash
mkdir -p ~/.oksana-sync
cp scripts/myhome/launchd/com.user.oksana-myhome-sync.plist ~/Library/LaunchAgents/
launchctl load ~/Library/LaunchAgents/com.user.oksana-myhome-sync.plist
```

Лог: `~/.oksana-sync/sync.log`. Первый запуск сделать вручную: Cloudflare на myhome
может один раз показать проверку - её нужно пройти в открывшемся окне Chrome.
