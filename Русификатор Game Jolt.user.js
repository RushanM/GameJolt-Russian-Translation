// ==UserScript==
// @name           Game Jolt Russian Translation
// @name:ru        Русификатор Game Jolt
// @namespace      http://tampermonkey.net/
// @version        0.5
// @icon           https://s.gjcdn.net/img/favicon.png
// @description    Adds Russian language to Game Jolt.
// @description:ru Русифицирует Game Jolt.
// @author         Дефлекта, eiser_dip
// @match          https://gamejolt.com/*
// @match          https://*.gamejolt.com/*
// @grant          none
// @license        MIT
// ==/UserScript==

(function() {
    // Строгий режим
    'use strict';

    // Шрифты
    const fonts = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
        'https://fonts.googleapis.com/css2?family=Fira+Sans+Condensed:wght@600&display=swap'
    ];

    fonts.forEach(href => {
        const link = document.createElement('link');
        link.href = href;
        link.rel = 'stylesheet';
        document.head.appendChild(link);
    });

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

    // Массив основных переводов
    const replacements = 
        [
            {
                selector: 'div.-header-lead-text.-main-header-text',
                oldText: 'Become a Game Jolt Creator',
                newText: 'СТАНЬ ТВОРЦОМ НА GAME JOLT'
            },
            {
                selector: 'div.text-center > div',
                oldText: 'Cast your vote on a poll',
                newText: 'ПРОГОЛОСУЙТЕ В ОПРОСЕ'
            },
            {
                selector: 'div.sticker-charge-tooltip > p > span, div.sticker-charge-tooltip > div > span',
                oldText: 'Complete daily quests to fill your charge orbs. Each day you miss a daily quest, your charge goes down.',
                newText: 'Выполняйте ежедневные квесты, чтобы заряжать свои сферы. Каждый день, когда вы пропускаете квест, ваша энергия уменьшается.'
            },
            {
                selector: 'h4.-charge-text > span:first-child',
                oldText: 'Charge',
                newText: 'Заряд'
            },
            {
                selector: 'section.section > div',
                oldText: 'Objectives',
                newText: 'Цели и задачи'
            },
            {
                selector: 'div.-details',
                oldText: 'Like the post linked in the quest description',
                newText: 'Лайкните пост, указанный в описании квеста'
            },
            {
                selector: 'div.text-center > div',
                oldText: 'DAILY QUEST',
                newText: 'ЕЖЕДНЕВНЫЙ КВЕСТ'
            },
            {
                selector: 'div.text-center > div',
                oldText: 'WEEKLY QUEST',
                newText: 'НЕДЕЛЬНЫЙ КВЕСТ'
            },
            {
                selector: 'div.text-center > div',
                oldText: 'WORLD EVENT',
                newText: 'МИРОВОЕ СОБЫТИЕ'
            },
            {
                selector: 'h4',
                oldText: 'Daily Quests',
                newText: 'Ежедневные квесты'
            },
            {
                selector: 'div._subheading',
                oldText: 'Daily Quests',
                newText: 'ЕЖЕДНЕВНЫЕ КВЕСТЫ'
            },
            {
                selector: 'span.user-dogtag.tag.tag-highlight',
                oldText: 'Dev',
                newText: 'Разраб'
            },
            {
                selector: 'span.user-dogtag.tag.tag-highlight',
                oldText: 'GMR',
                newText: 'Игрок'
            },
            {
                selector: 'span.user-dogtag.tag.tag-highlight',
                oldText: 'MOD',
                newText: 'Модер'
            },
            {
                selector: 'span.user-dogtag.tag.user-dogtag-guy',
                oldText: 'GUY',
                newText: 'Чел'
            },
            {
                selector: 'span.user-dogtag.tag.tag-highlight',
                oldText: 'ELF',
                newText: 'Эльф'
            },
            {
                selector: 'span.user-dogtag.tag.tag-highlight',
                oldText: 'BUG',
                newText: 'Баг'
            },
            {
                selector: 'span.user-dogtag.tag.tag-highlight',
                oldText: 'She',
                newText: 'Она'
            },
            {
                selector: 'span.user-dogtag.tag.tag-highlight',
                oldText: 'Her',
                newText: 'Ей'
            },
            {
                selector: 'span.user-dogtag.tag.tag-highlight',
                oldText: 'He',
                newText: 'Он'
            },
            {
                selector: 'span.user-dogtag.tag.tag-highlight',
                oldText: 'Him',
                newText: 'Ему'
            },
            {
                selector: 'span.user-dogtag.tag.tag-highlight',
                oldText: 'They',
                newText: 'Они'
            },
            {
                selector: 'span.user-dogtag.tag.tag-highlight',
                oldText: 'Them',
                newText: 'Им'
            },
            {
                selector: 'span.tag.tag-highlight',
                oldText: 'Follows you',
                newText: 'Ваш подписчик'
            },
            {
                selector: 'span.tag.tag-highlight',
                oldText: 'Friend',
                newText: 'Друг'
            },
            {
                selector: 'span.tag',
                oldText: 'Offline',
                newText: 'Офлайн'
            },
            {
                selector: 'span.tag.tag-highlight',
                oldText: 'Online',
                newText: 'В сети'
            },
            {
                selector: 'nav#shell-top-nav a strong',
                oldText: 'Discover',
                newText: 'ОБЗОР'
            },
            {
                selector: 'div.-member-counts a',
                oldText: 'members',
                newText: 'участников'
            },
            {
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
                selector: 'div.-username',
                oldText: 'Hey',
                newText: 'Ъуъ, '
            },
            {
                selector: 'div.-input',
                oldText: 'So, what\'s on your mind?',
                newText: 'Что у вас на уме?'
            },
            {
                selector: 'div.-input',
                oldText: 'Share your creations!',
                newText: 'Поделитесь тем, что сделали!'
            },
            {
                selector: 'div.-input',
                oldText: 'Keep it related to POPGOES!',
                newText: 'Пост должен быть связан с POPGOES!'
            },
            {
                selector: 'nav#shell-top-nav a strong',
                oldText: 'Store',
                newText: 'КАТАЛОГ'
            },
            {
                selector: 'div.-message',
                oldText: 'Game Jolt\'s Store is an open platform to share your games with the world.',
                newText: 'Каталог Game Jolt — это открытая платформа, в которой вы можете делиться своими играми с миром.'
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
                selector: 'div.-hero-text',
                oldText: 'Join a growing community of creators and gamers from around the world!',
                newText: 'Присоединяйтесь к растущему сообществу творцов и геймеров со всего мира!'
            },
            {
                selector: 'span',
                oldText: 'Sign up with Google',
                newText: 'Зарегистрироваться через Google'
            },
            {
                selector: 'div.auth-line-thru',
                oldText: 'or',
                newText: 'или'
            },
            {
                selector: 'a',
                oldText: 'Get App',
                newText: 'Скачать приложение'
            },
            {
                selector: 'h5.section-header',
                oldText: 'Games',
                newText: 'Игры'
            },
            {
                selector: 'h5.section-header',
                oldText: 'Collaborators',
                newText: 'Модераторы'
            },
            {
                selector: 'span',
                oldText: 'Close',
                newText: 'Закрыть'
            },
            {
                selector: 'a',
                oldText: 'Log in',
                newText: 'Авторизоваться'
            },
            {
                selector: 'a',
                oldText: 'Sign up',
                newText: 'Зарегистрироваться'
            },
            {
                selector: 'div.use-fira',
                oldText: 'Joltbux',
                newText: 'Джолтбаксы'
            },
            {
                selector: 'div.use-fira',
                oldText: 'Coins',
                newText: 'Монеты'
            },
            {
                selector: 'div.fill-offset > h2',
                oldText: 'Pride Month 2024',
                newText: 'МЕСЯЦ ГОРДОСТИ 2024'
            },
            {
                selector: 'div.tooltip-inner',
                oldText: 'Notifications',
                newText: 'Уведомления'
            },
            {
                selector: '.timeline-list-item-title, .timeline-list-item-meta',
                oldText: 'replied to your comment on',
                newText: 'ответил на ваш комментарий на странице'
            },
            {
                selector: 'div.tooltip-inner',
                oldText: 'Friend Requests',
                newText: 'Запросы в друзья'
            },
            {
                selector: 'div.sticker-charge-tooltip > p > span, div.sticker-charge-tooltip > div > span',
                oldText: 'Once all your charge orbs are full, you can support your favorite Game Jolt Creators by giving them a charged sticker! Every charged sticker uses 2 charge orbs and puts 💰💰💰 in their IRL pockets.',
                newText: 'Как только все сферы будут заряжены, вы сможете поддержать своих любимых творцов на Game Jolt, наклеив заряженную наклейку на их пост! Каждая заряженная наклейка расходует 2 заряженной сферы и ложит 💰💰💰 в их реальный кошелёк.'
            },
            {
                selector: 'span',
                oldText: 'Learn more',
                newText: 'Узнать больше'
            },
            {
                selector: 'span.text-muted',
                oldText: /(\d+)h/g,
                newText: '$1 ч.'
            },
            {
                selector: 'span.text-muted',
                oldText: /(\d+)w/g,
                newText: '$1 н.'
            },
            {
                selector: 'span.text-muted',
                oldText: /(\d+)d/g,
                newText: '$1 д.'
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
                selector: 'div._details > div',
                oldText: '',
                newText: '',
                addClass: 'use-fira'
            },
            {
                selector: 'div.fill-offset > h2',
                oldText: '',
                newText: '',
                addClass: 'use-fira'
            },
            {
                selector: 'div.text-center > div',
                oldText: 'Like a post with 100 or more likes on it',
                newText: 'ЛАЙКНИТЕ ПОСТ, У КОТОРОГО УЖЕ 100 ИЛИ БОЛЕЕ ЛАЙКОВ'
            },
            {
                selector: 'div._details > div',
                oldText: 'Like a post with 100 or more likes on it',
                newText: 'Лайкните пост, у которого уже 100 или более лайков'
            },
            {
                selector: 'div.content-viewer.quest-stage-description-content p span',
                oldText: 'Though a multitude, our hearts beat as one! Lend your support! Let\'s vanquish the darkness!',
                newText: 'Пусть наши сердца бьются в унисон, даже в большой толпе! Поддержите нас! Давайте вместе победим тьму!'
            },
            {
                selector: 'div.text-center > div',
                oldText: 'Gift a sticker pack',
                newText: 'ПОДАРИТЕ НАБОР НАКЛЕЕК'
            },
            {
                selector: 'div._details > div',
                oldText: 'Gift a sticker pack',
                newText: 'Подарите набор наклеек'
            },
            {
                selector: 'div.content-viewer.quest-stage-description-content p span',
                oldText: 'Give your friend the gift of stickers!',
                newText: 'Порадуйте своего друга наклейками!'
            },
            {
                selector: 'div.text-center > div',
                oldText: 'React to 5 different comments',
                newText: 'ПОСТАВЬТЕ РЕАКЦИЮ НА 5 РАЗНЫХ КОММЕНТАРИЕВ'
            },
            {
                selector: 'div._details > div',
                oldText: 'React to 5 different comments',
                newText: 'Поставьте реакцию на 5 разных комментариев'
            },
            {
                selector: 'div.content-viewer.quest-stage-description-content p span',
                oldText: 'Anyone can react to a comment. Can you react to 5 different ones?',
                newText: 'Каждый может поставить реакцию на комментарий. А сможете ли вы поставить на 5 разных?'
            },
            {
                selector: 'div._subheading',
                oldText: 'Active Quests',
                newText: 'АКТИВНЫЕ КВЕСТЫ'
            },
            {
                selector: 'div.text-center > div',
                oldText: 'Complete 10 daily quests',
                newText: 'ЗАВЕРШИТЕ 10 ЕЖЕДНЕВНЫХ КВЕСТОВ'
            },
            {
                selector: 'div._details > div',
                oldText: 'Complete 10 daily quests',
                newText: 'Завершите 10 ежедневных квестов'
            },
            {
                selector: 'div.text-center > div',
                oldText: 'A Transmission From Beyond the Stars',
                newText: 'СООБЩЕНИЕ ИЗ ГЛУБИН КОСМОСА'
            },
            {
                selector: 'div._details > div',
                oldText: 'A Transmission From Beyond the Stars',
                newText: 'Сообщение из глубин космоса '
            },
            {
                selector: 'div.content-viewer.quest-stage-description-content p span',
                oldText: 'You\'ve received a transmission from beyond the stars! An alien diplomat wants to introduce themselves to Earthlings.',
                newText: 'Вы получили сигнал из-за пределов нашей галактики! Инопланетный дипломат хочет познакомиться с землянами.'
            },
            {
                selector: 'div.content-viewer.quest-stage-description-content p span',
                oldText: 'Send the alien our message of good will by liking',
                newText: 'Пошлите ему наше мирное послание, поставив лайк '
            },
            {
                selector: 'div.content-viewer.quest-stage-description-content p span',
                oldText: 'this post',
                newText: 'этому посту'
            },
            {
                selector: 'div.content-viewer.quest-stage-description-content p span',
                oldText: '. If you do, they\'ll give you coins and stickers!',
                newText: '. В ответ он подарит вам монеты и наклейки!'
            },
            {
                selector: 'div.text-center > div',
                oldText: 'June Login Streak',
                newText: 'ИЮНЬСКИЙ МАРАФОН ПОСЕЩЕНИЙ'
            },
            {
                selector: 'div._details > div',
                oldText: 'June Login Streak',
                newText: 'Июньский марафон посещений'
            },
            {
                selector: 'div.text-center > div',
                oldText: 'Jule Login Streak',
                newText: 'ИЮЛЬСКИЙ МАРАФОН ПОСЕЩЕНИЙ'
            },
            {
                selector: 'div._details > div',
                oldText: 'Jule Login Streak',
                newText: 'Июльский марафон посещений'
            },
            {
                selector: 'div.text-center > div',
                oldText: 'August Login Streak',
                newText: 'АВГУСТОВСКИЙ МАРАФОН ПОСЕЩЕНИЙ'
            },
            {
                selector: 'div._details > div',
                oldText: 'August Login Streak',
                newText: 'Августовский марафон посещений'
            },
            {
                selector: 'div.text-center > div',
                oldText: 'September Login Streak',
                newText: 'СЕНТЯБРЬСКИЙ МАРАФОН ПОСЕЩЕНИЙ'
            },
            {
                selector: 'div._details > div',
                oldText: 'September Login Streak',
                newText: 'Сентябрьский марафон посещений'
            },
            {
                selector: 'div._subheading',
                oldText: 'Available Quests',
                newText: 'ДОСТУПНЫЕ КВЕСТЫ'
            },
            {
                selector: 'div.text-center > div',
                oldText: 'Summon the Power of Lightning',
                newText: 'ПРИЗОВИТЕ СИЛУ МОЛНИИ'
            },
            {
                selector: 'div.content-viewer.quest-stage-description-content p span',
                oldText: 'Your choices will affect the outcome, good or bad, so choose carefully!',
                newText: 'Ваши выборы повлияют на результат, будь он хорошим или плохим, так что выбирайте внимательно!'
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
            {
                selector: 'div.-page-cut-bottom.page-cut .page-cut-content .button.-trans',
                oldText: 'Read article',
                newText: 'Читать статью'
            },
            {
                selector: '.modal-header .modal-title span',
                oldText: 'Your Game Token',
                newText: 'Ваш игровой токен'
            },
            {
                selector: '.modal-body p.text-muted.small:nth-of-type(1) span',
                oldText: 'Your game token is like a special password you use to log into games that support high scores and achievements.',
                newText: 'Ваш игровой токен — это как специальный пароль, который вы используете для входа в игры, поддерживающие таблицы рекордов и достижения.'
            },
            {
                selector: '.modal-body p.text-muted.small:nth-of-type(1) a span',
                oldText: 'more info',
                newText: 'больше информации'
            },
            {
                selector: '.modal-body p.text-muted.small:nth-of-type(2) span',
                oldText: 'Never share your account password. In fact, if a game asks for your password instead of your game token, please report it!',
                newText: 'Никогда не делитесь паролем от своей учётной записи. Если же игра запрашивает ваш пароль заместо игрового токена, обязательно сообщите об этом!'
            },
            {
                selector: 'h2.-content-row-header',
                oldText: 'Realms',
                newText: 'Темы'
            },
            {
                selector: 'h2.-content-row-header small',
                oldText: 'Realms bring all the content around a particular topic or interest into a single place for you to browse.',
                newText: 'Темы объединяют весь контент, связанный с определённой тематикой или интересом, в одном месте для удобного просмотра.'
            },
            {
                selector: 'h2.-content-row-header',
                oldText: 'Game Jolt Creators',
                newText: 'Творцы на Game Jolt'
            },
            {
                selector: 'h2.-content-row-header small',
                oldText: 'Follow and support your favorite creators on Game Jolt!',
                newText: 'Следите за своими любимыми творцами на Game Jolt и поддерживайте их!'
            },
            {
                selector: 'div.-header-lead-text.-main-header-text',
                oldText: '',
                newText: '',
                addClass: 'use-fira'
            },
            {
                selector: 'div.-header-lead-text.-main-header-text',
                oldText: 'Become a Game Jolt Creator',
                newText: 'СТАНЬТЕ ТВОРЦОМ НА GAME JOLT'
            },
            {
                selector: 'div.content-viewer.community-description-content span',
                oldText: 'Community of GKProduction games players',
                newText: 'Сообщество игроков игр GKProduction'
            }
        ];

    // Функция перевода
    function translateText(replacements)
        {
            // Применяем шрифт Inter ко всем элементам <small> внутри <h2> с классом «-content-row-header»
            const headerElements = document.querySelectorAll('h2.-content-row-header');
            headerElements.forEach(headerElement =>
                {
                    const smallElements = headerElement.querySelectorAll('small');
                    smallElements.forEach(smallElement =>
                        {
                            smallElement.style.fontFamily = 'Inter, sans-serif';
                        });
                });

            replacements.forEach(({selector, oldText, newText, attr = 'textContent', addClass}) =>
                {
                    const elements = document.querySelectorAll(selector);
                    elements.forEach(element =>
                        {
                            if (typeof oldText === 'string')
                                {
                                    if (element[attr].trim() === oldText)
                                        {
                                            element[attr] = newText;
                                        }

                                    if (element.textContent.includes(oldText))
                                        {
                                            element.innerHTML = element.innerHTML.replace(oldText, newText);
                                        }
                                }
                                else
                                    if (oldText instanceof RegExp)
                                        {
                                            element[attr] = element[attr].replace(oldText, newText);
                                        }
                        });

                    if (addClass) {
                        elements.forEach(element =>
                            {
                                element.classList.add(addClass);
                            });
                    }
                });

            // Применяем класс для использования шрифта Fira Sans
            document.querySelectorAll('div[style*="Staatliches"]').forEach((element) =>
                {
                    element.classList.add('use-fira');
                });

            // Массив переводов названий вкладки
            const titleReplacements = 
                [
                    {
                        oldText: ' - ',
                        newText: ' — '
                    },
                    {
                        oldText: 'Share your creations',
                        newText: 'Делитесь своим творчеством'
                    },
                    {
                        oldText: 'Fan art, videos, guides, polls and more',
                        newText: 'Фан-арт, видео, руководства, опросы и многое другое'
                    },
                    {
                        oldText: ' Community',
                        newText: ' (сообщество)'
                    },
                    {
                        oldText: 'Fairy Kingdom of King Froggold II',
                        newText: 'Сказочное королевство короля Фроггольда II'
                    },
                    {
                        oldText: 'Five Nights with Barsik',
                        newText: 'Пять ночей с Барсиком'
                    },
                    {
                        oldText: 'Mystery Chamber',
                        newText: 'Тайная Комната'
                    },
                    {
                        oldText: 'Godzilla',
                        newText: 'Годзилла'
                    },
                    {
                        oldText: 'Pokémon',
                        newText: 'Покемон'
                    }
                ];

            titleReplacements.forEach(({
                oldText,
                newText
            }) => {
                if (document.title.includes(oldText)) {
                    document.title = document.title.replace(oldText, newText);
                }
            });

            // Названия игр

            // Различные замены official на «официальная»
            document.querySelectorAll('div.-title[title*="(Official)"]').forEach((element) => {
                if (element.title.includes('(Official)')) {
                    element.title = element.title.replace('(Official)', '(официальная)');
                }
                if (element.textContent.includes('(Official)')) {
                    element.textContent = element.textContent.replace('(Official)', '(официальная)');
                }
            });

            // Различные замены cancelled на «отменена»
            document.querySelectorAll('div.-title').forEach((element) => {
                const anyCancelledWordForm = /(\[|\()?(\s*CANCELLED\s*|\s*cancelled\s*|\s*Cancelled\s*)(\]|\))?/gi;
                const cancelledIsFullWord = /^\s*CANCELLED\s*$/i;

                const translateText = (text) => {
                    return text.replace(anyCancelledWordForm, (match, p1, p2, p3) => {
                        // > Код определяется со скобками >
                        const prefix = p1 || '';
                        const suffix = p3 || '';
                        // > Объявдение переменной замены >
                        let replacement = `${prefix}отменена${suffix}`;
                        // > Проверка пробелов во всём названии >
                        replacement = replacement.replace(/\s+/g, ' ').trim();
                        // > Проверка на скобированное cancelled в начале названия >
                        if (/^\s*(\(\s*CANCELLED\s*\)|\[\s*CANCELLED\s*\])/.test(text)) {
                            // > Скобированное cancelled в начале названия будет написано с заглавной буквы >
                            replacement = `${prefix}Отменена${suffix}`;
                        }
                        return replacement;
                    }).replace(/([^\s])(\[|\()/g, '$1 $2');
                };

                if (!cancelledIsFullWord.test(element.textContent)) {
                    element.textContent = translateText(element.textContent);
                }
                if (!cancelledIsFullWord.test(element.title)) {
                    element.title = translateText(element.title);
                }
            });

            // Замена ELLIE'S на «ЭЛЛИС»
            document.querySelectorAll('div.-title[title*="ELLIE\'S"]').forEach((element) => {
                if (element.title.includes('ELLIE\'S')) {
                    element.title = element.title.replace('ELLIE\'S', 'ЭЛЛИС');
                }
                if (element.textContent.includes('ELLIE\'S')) {
                    element.textContent = element.textContent.replace('ELLIE\'S', 'ЭЛЛИС');
                }
            });
        }

    // Замена изображения
    function replaceImage() {
        const img = document.querySelector('a[href="https://gamejolt.com/p/game-jolt-s-celebration-of-pride-month-has-begun-go-to-the-shop-to-mxvnfzwg"] img[src="https://m.gjcdn.net/gen/400/32981814-sd4xeihs-v4.webp"]');
        if (img) {
            img.src = 'https://i.imgur.com/sqNFMx6.png';
        }
    }

    // Замена текста и изображения после загрузки DOM
    document.addEventListener('DOMContentLoaded', () => {
        translateText(replacements);
        replaceImage()
    });

    // Оптимизация MutationObserver
    let timeout;
    const observer = new MutationObserver(() => {
        clearTimeout(timeout);
        timeout = setTimeout(() => 
            {
                translateText(replacements);
                replaceImage()
            }, 0); // задержка
    });

    // Наблюдаем за изменениями в основном узле
    const targetNode = document.body;
    if (targetNode) {
        observer.observe(targetNode, {
            childList: true,
            subtree: true
        });
    }
})();