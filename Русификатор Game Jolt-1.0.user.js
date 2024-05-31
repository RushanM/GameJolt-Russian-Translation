// ==UserScript==
// @name         Русификатор Game Jolt
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Русифицирует Game Jolt
// @author       Дефлекта, eiser_dip
// @match        https://gamejolt.com/*
// @match        https://*.gamejolt.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Добавляем шрифт Inter и Fira в документ
    const linkInter = document.createElement('link');
    linkInter.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
    linkInter.rel = 'stylesheet';
    document.head.appendChild(linkInter);

    const linkFira = document.createElement('link');
    linkFira.href = 'https://fonts.googleapis.com/css2?family=Fira+Sans+Condensed:wght@600&display=swap';
    linkFira.rel = 'stylesheet';
    document.head.appendChild(linkFira);

    // Добавляем CSS-правила для изменения шрифта на Inter и Fira
    const style = document.createElement('style');
    style.textContent = `
        body {
            font-family: 'Inter', sans-serif !important;
        }
            .use-fira {
            font-family: 'Fira Sans Condensed', sans-serif !important;
            }
`;

    document.head.appendChild(style);

    // Функция для замены текста
    function replaceText() {
        const replacements = [{
                selector: 'nav.-menu a span',
                oldText: 'Following',
                newText: 'Подписки'
            },
            {
                selector: 'nav.-menu a span',
                oldText: 'For You',
                newText: 'Для вас'
            },
            {
                selector: 'nav#shell-top-nav a strong',
                oldText: 'Discover',
                newText: 'ОБЗОР'
            },
            {
                selector: 'nav#shell-top-nav a strong',
                oldText: 'Store',
                newText: 'КАТАЛОГ'
            },
            {
                selector: 'label[for="search-input-1"] span',
                oldText: 'Search',
                newText: 'Поиск'
            },
            {
                selector: 'input#search-input-1',
                oldText: 'Search',
                newText: 'Поиск',
                attr: 'placeholder'
            },
            {
                selector: 'a',
                oldText: 'Get App',
                newText: 'Скачать приложение'
            },
            {
                selector: 'div.tooltip-inner',
                oldText: 'Notifications',
                newText: 'Уведомления'
            },
            {
                selector: 'div.tooltip-inner',
                oldText: 'Friend Requests',
                newText: 'Запросы в друзья'
            },
            {
                selector: 'div.sticker-charge-tooltip > p > span, div.sticker-charge-tooltip > div > span',
                oldText: 'Complete daily quests to fill your charge orbs. Each day you miss a daily quest, your charge goes down.',
                newText: 'Выполняйте ежедневные квесты, чтобы заряжать свои сферы. Каждый день, когда вы пропускаете квест, ваша энергия уменьшается.'
            },
            {
                selector: 'div.sticker-charge-tooltip > p > span, div.sticker-charge-tooltip > div > span',
                oldText: 'Once all your charge orbs are full, you can support your favorite Game Jolt Creators by giving them a charged sticker! Every charged sticker uses 2 charge orbs and puts 💰💰💰 in their IRL pockets.',
                newText: 'Как только все сферы будут заряжены, вы сможете поддержать своих любимых творцов на Game Jolt, наклеив заряженную наклейку на их пост! Каждая заряженная наклейка расходует 2 заряженной сферы и ложит 💰💰💰 в их реальный кошелёк.'
            },
            {
                selector: 'h4',
                oldText: 'Daily Quests',
                newText: 'Ежедневные квесты'
            },
            {
                selector: 'span',
                oldText: 'Learn more',
                newText: 'Узнать больше'
            },
            {
                selector: 'h4.-charge-text > span:first-child',
                oldText: 'Charge',
                newText: 'Заряд'
            },
            {
                selector: 'span.text-muted',
                oldText: /(\d+)h/g,
                newText: '$1 ч.'
            },
            {
                selector: 'div.text-center > div',
                oldText: 'DAILY QUEST',
                newText: 'ЕЖЕДНЕВНЫЙ КВЕСТ'
            },
            {
                selector: 'div._subheading',
                oldText: 'Daily Quests',
                newText: 'ЕЖЕДНЕВНЫЕ КВЕСТЫ'
            },
            {
                selector: 'div._subheading',
                oldText: '',
                newText: '',
                addClass: 'use-fira'
            },
            {
                selector: 'div[style="Staatliches"]',
                oldText: '',
                newText: '',
                addClass: 'use-fira'
            },
            {
                selector: 'div.text-center > div',
                oldText: 'Cast your vote on a poll',
                newText: 'ПРОГОЛОСУЙТЕ В ОПРОСЕ'
            },
            {
                selector: 'div.text-center > div',
                oldText: 'Like a post with 100 or more likes on it',
                newText: 'ЛАЙКНИТЕ ПОСТ, У КОТОРОГО УЖЕ 100 ИЛИ БОЛЕЕ ЛАЙКОВ'
            },
            {
                selector: 'div.text-center > div',
                oldText: 'Gift a sticker pack',
                newText: 'ПОДАРИТЕ НАБОР НАКЛЕЕК'
            },
            {
                selector: 'div.text-center > div',
                oldText: 'React to 5 different comments',
                newText: 'ПОСТАВЬТЕ РЕАКЦИЮ НА 5 РАЗНЫХ КОММЕНТАРИЕВ'
            },
            {
                selector: 'div.text-center > div',
                oldText: 'React to 5 different comments',
                newText: 'ПРИЗОВИТЕ СИЛУ МОЛНИИ'
            },
            {
                selector: 'div.content-viewer.quest-stage-description-content p span',
                oldText: 'Your choices will affect the outcome, good or bad, so choose carefully!',
                newText: 'Ваши выборы повлияют на результат, будь он хорошим или плохим, так что выбирайте внимательно!'
            },
            {
                selector: 'div.content-viewer.quest-stage-description-content p span',
                oldText: 'Though a multitude, our hearts beat as one! Lend your support! Let\'s vanquish the darkness!',
                newText: 'Пусть наши сердца бьются в унисон, даже в большой толпе! Поддержите нас! Давайте вместе победим тьму!'
            },
            {
                selector: 'div.content-viewer.quest-stage-description-content p span',
                oldText: 'Give your friend the gift of stickers!',
                newText: 'Порадуйте своего друга наклейками!'
            },
            {
                selector: 'div.content-viewer.quest-stage-description-content p span',
                oldText: 'Anyone can react to a comment. Can you react to 5 different ones?',
                newText: 'Каждый может поставить реакцию на комментарий. А сможете ли вы поставить на 5 разных?'
            },
            {
                selector: 'div.content-viewer.quest-stage-description-content p span',
                oldText: 'Support your favorite Creators on Game Jolt with the power of lightning! Place 22 charged stickers before the quest expires and you’ll get a trophy! GJ Pro-Tip: You’ll also get a Welcome to Game Jolt pack after you’ve placed 11 charged stickers.',
                newText: 'Поддержите своих любимых творцов на Game Jolt силой молнии! Приклейте 22 заряженных наклеек до истечения срока квеста и получите трофей! Заметка от GJ: Также вы получите набор «Добро пожаловать на Game Jolt» после размещения 11 заряженных наклеек.'
            },
            {
                selector: 'div.content-viewer.quest-stage-description-content p span',
                oldText: 'Support your favorite Creators on Game Jolt with the power of lightning!',
                newText: 'Поддержите своих любимых творцов на Game Jolt силой молнии! '
            },
            {
                selector: 'div.content-viewer.quest-stage-description-content p span',
                oldText: 'Place 22 charged stickers before the quest expires and you’ll get a trophy!',
                newText: 'Приклейте 22 заряженных наклеек до истечения срока квеста и получите трофей!'
            },
            {
                selector: 'div.content-viewer.quest-stage-description-content p span',
                oldText: 'GJ Pro-Tip:',
                newText: 'Комментарий от GJ: '
            },
            {
                selector: 'div.content-viewer.quest-stage-description-content p span',
                oldText: 'You\'ll also get a Welcome to Game Jolt pack after you\'ve placed 11 charged stickers.',
                newText: 'Также вы получите набор «Добро пожаловать на Game Jolt» после размещения 11 заряженных наклеек.'
            },
        ];

        replacements.forEach(({
            selector,
            oldText,
            newText,
            attr = 'textContent',
            addClass
        }) => {
            document.querySelectorAll(selector).forEach((element) => {
                if (addClass) {
                    element.classList.add(addClass);
                } else if (typeof oldText === 'string') {
                    if (element[attr].trim() === oldText) {
                        element[attr] = newText;
                    }
                } else if (oldText instanceof RegExp) {
                    element[attr] = element[attr].replace(oldText, newText);
                }
            });
        });

        // Применение класса для использования шрифта Fira Sans
        document.querySelectorAll('div[style*="Staatliches"]').forEach((element) => {
            element.classList.add('use-fira');
        });

        // Название вкладки
        if (document.title.includes(' - ')) {
            document.title = document.title.replace(' - ', ' — ');
        }

        if (document.title.includes('Share your creations')) {
            document.title = document.title.replace('Share your creations', 'Делитесь своим творчеством');
        }

        if (document.title.includes('Fan art, videos, guides, polls and more')) {
            document.title = document.title.replace('Fan art, videos, guides, polls and more', 'Фан-арт, видео, руководства, опросы и многое другое');
        }

        if (document.title.includes(' Community')) {
            document.title = document.title.replace(' Community', ' (сообщество)');
        }

        if (document.title.includes('Fairy Kingdom of King Froggold II')) {
            document.title = document.title.replace('Fairy Kingdom of King Froggold II', 'Сказочное королевство короля Фроггольда II');
        }

        if (document.title.includes('Pokémon')) {
            document.title = document.title.replace('Pokémon', 'Покемон');
        }

        // Игры
        // (Official)
        document.querySelectorAll('div.-title[title*="(Official)"]').forEach((element) => {
            if (element.title.includes('(Official)')) {
                element.title = element.title.replace('(Official)', '(официальная)');
            }
            if (element.textContent.includes('(Official)')) {
                element.textContent = element.textContent.replace('(Official)', '(официальная)');
            }
        });

        // Заменяем CANCELLED независимо от регистра и наличия скобок и добавляем пробел перед скобками, если его нет
        document.querySelectorAll('div.-title').forEach((element) => {
            const regex = /(\[|\()?(\s*CANCELLED\s*|\s*cancelled\s*|\s*Cancelled\s*)(\]|\))?/gi;
            const fullTextRegex = /^\s*CANCELLED\s*$/i;

            const replaceText = (text) => {
                return text.replace(regex, (match, p1, p2, p3) => {
                    const prefix = p1 || '';
                    const suffix = p3 || '';
                    let replacement = `${prefix}отменена${suffix}`;
                    replacement = replacement.replace(/\s+/g, ' ').trim();

                    // Если CANCELLED в начале текста, заменяем на «Отменена»
                    if (/^\s*(\(\s*CANCELLED\s*\)|\[\s*CANCELLED\s*\])/.test(text)) {
                        replacement = `${prefix}Отменена${suffix}`;
                    }
                    return replacement;
                }).replace(/([^\s])(\[|\()/g, '$1 $2'); // Вставляем пробел перед скобками, если его нет
            };

            if (!fullTextRegex.test(element.textContent)) {
                element.textContent = replaceText(element.textContent);
            }
            if (!fullTextRegex.test(element.title)) {
                element.title = replaceText(element.title);
            }
        });

        // ELLIE'S
        document.querySelectorAll('div.-title[title*="ELLIE\'S"]').forEach((element) => {
            if (element.title.includes('ELLIE\'S')) {
                element.title = element.title.replace('ELLIE\'S', 'ЭЛЛИС');
            }
            if (element.textContent.includes('ELLIE\'S')) {
                element.textContent = element.textContent.replace('ELLIE\'S', 'ЭЛЛИС');
            }
        });
    }

    // Замена текста после загрузки DOM
    document.addEventListener('DOMContentLoaded', replaceText);

    // Оптимизация MutationObserver
    let timeout;
    const observer = new MutationObserver(() => {
        clearTimeout(timeout);
        timeout = setTimeout(replaceText, 0); // задержка
    });

    // Наблюдаем только за основными узлами, где могут происходить изменения
    const targetNodes = [
        document.querySelector('body'),
    ];

    targetNodes.forEach(node => {
        if (node) {
            observer.observe(node, {
                childList: true,
                subtree: true
            });
        }
    });
})();