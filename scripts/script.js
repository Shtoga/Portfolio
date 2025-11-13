// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация всех функций
    initSmoothScroll();
    initContactForm();
    initScrollAnimations();
    initHeroAnimations();
    initInteractiveElements();
    initTypingAnimation();
    initSkillBars();
    initThemeSwitcher();
    
    // Инициализация плавающих форм
    initFloatingShapes();
    
    // Инициализация плавных переходов тем
    smoothThemeTransition();
    
    console.log('🚀 Портфолио Надежды Шкодиной загружено!');
});

// Анимация плавающих форм
function initFloatingShapes() {
    const shapes = document.querySelectorAll('.floating-shape');
    shapes.forEach((shape, index) => {
        // Добавляем случайные задержки для более естественного движения
        shape.style.animationDelay = `${index * 2}s`;
    });
}

// Анимация печатающегося текста в терминале
function initTypingAnimation() {
    const commands = [
        "git status",
        "npm start", 
        "code .",
        "deploy --production",
        "contact --hire"
    ];
    
    const typedElement = document.querySelector('.typed-command');
    if (!typedElement) return;
    
    let commandIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100;
    
    function type() {
        const currentCommand = commands[commandIndex];
        
        if (isDeleting) {
            // Удаление текста
            typedElement.textContent = currentCommand.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = 50;
        } else {
            // Печать текста
            typedElement.textContent = currentCommand.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = 100;
        }
        
        // Проверка условий смены состояния
        if (!isDeleting && charIndex === currentCommand.length) {
            // Пауза в конце команды
            typingDelay = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Переход к следующей команде
            isDeleting = false;
            commandIndex = (commandIndex + 1) % commands.length;
            typingDelay = 500;
        }
        
        setTimeout(type, typingDelay);
    }
    
    // Запуск анимации с задержкой
    setTimeout(type, 3000);
}

// Анимация hero-секции
function initHeroAnimations() {
    const heroContent = document.querySelector('.hero-content');
    const codeTerminal = document.querySelector('.code-terminal');
    
    // Анимация появления основного контента
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // Анимация появления терминала
    if (codeTerminal) {
        codeTerminal.style.opacity = '0';
        codeTerminal.style.transform = 'translateX(30px) scale(0.95)';
        codeTerminal.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            codeTerminal.style.opacity = '1';
            codeTerminal.style.transform = 'translateX(0) scale(1)';
        }, 600);
    }
    
    // Анимация появления статистики
    const stats = document.querySelectorAll('.stat');
    stats.forEach((stat, index) => {
        stat.style.opacity = '0';
        stat.style.transform = 'translateY(20px)';
        stat.style.transition = `opacity 0.6s ease ${0.8 + index * 0.2}s, transform 0.6s ease ${0.8 + index * 0.2}s`;
        
        setTimeout(() => {
            stat.style.opacity = '1';
            stat.style.transform = 'translateY(0)';
        }, 1000 + index * 200);
    });
}

// Анимация прогресс-баров навыков
function initSkillBars() {
    const progressBars = document.querySelectorAll('.level-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const level = progressBar.getAttribute('data-level');
                
                // Запускаем анимацию заполнения с небольшой задержкой
                setTimeout(() => {
                    progressBar.style.width = level + '%';
                    
                    // Добавляем анимацию пульсации при завершении
                    setTimeout(() => {
                        progressBar.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.5)';
                        setTimeout(() => {
                            progressBar.style.boxShadow = 'none';
                        }, 300);
                    }, 300);
                }, 200);
                
                observer.unobserve(progressBar);
            }
        });
    }, { 
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    });

    progressBars.forEach(bar => {
        bar.style.width = '0%'; // Сбрасываем ширину перед анимацией
        observer.observe(bar);
    });
}

// Плавная прокрутка
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 100; // Учет фиксированного хедера
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Функция для прокрутки к секции
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 100;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Имитация скачивания резюме
function downloadResume() {
    showNotification('📄 Резюме будет скачано в ближайшее время!', 'info');
    
    // Создаем имитацию загрузки
    const downloadBtn = document.querySelector('.btn-secondary');
    const originalText = downloadBtn.innerHTML;
    
    downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Подготовка...';
    downloadBtn.disabled = true;
    
    setTimeout(() => {
        downloadBtn.innerHTML = originalText;
        downloadBtn.disabled = false;
        
        // Создаем и "скачиваем" файл (имитация)
        const resumeContent = "Резюме Надежды Шкодиной - Frontend Developer\n\nОпыт: 2+ года\nНавыки: HTML5, CSS3, JavaScript, Git, Responsive Design\nОбразование: НИЯУ МИФИ\nПроекты: Pizza Rebel, Car Showcase\nGitHub: github.com/Shtoga";
        const blob = new Blob([resumeContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Shkodina_Nadezhda_Resume.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showNotification('✅ Резюме успешно скачано!', 'success');
    }, 2000);
}

// Обработка формы обратной связи
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Валидация формы
            if (validateContactForm()) {
                // Имитация отправки формы
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
                submitBtn.disabled = true;
                
                // Создаем эффект загрузки
                submitBtn.style.opacity = '0.8';
                submitBtn.style.transform = 'scale(0.98)';
                
                setTimeout(() => {
                    // Успешная отправка
                    showNotification('✅ Сообщение успешно отправлено! Скоро свяжусь с вами.', 'success');
                    contactForm.reset();
                    
                    // Восстанавливаем кнопку
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                    submitBtn.style.transform = 'scale(1)';
                    
                    // Добавляем анимацию успеха
                    submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                    setTimeout(() => {
                        submitBtn.style.background = '';
                    }, 2000);
                    
                }, 3000);
            }
        });
        
        // Реальная валидация при вводе
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
                
                // Добавляем интерактивность при вводе
                if (this.value.trim() !== '') {
                    this.style.borderColor = '#10b981';
                    this.style.background = '#f0fdf4';
                } else {
                    this.style.borderColor = '#e2e8f0';
                    this.style.background = '#ffffff';
                }
            });
            
            // Анимация фокуса
            input.addEventListener('focus', function() {
                this.style.transform = 'scale(1.02)';
                this.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
            });
            
            input.addEventListener('blur', function() {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = 'none';
            });
        });
    }
}

// Валидация формы обратной связи
function validateContactForm() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    let isValid = true;
    
    // Сброс предыдущих ошибок
    clearErrors();
    
    // Проверка каждого поля
    if (!validateField(name)) isValid = false;
    if (!validateField(email)) isValid = false;
    if (!validateField(message)) isValid = false;
    
    return isValid;
}

// Валидация отдельного поля
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    switch(field.type) {
        case 'text':
            if (!value) {
                isValid = false;
                errorMessage = 'Это поле обязательно для заполнения';
            } else if (value.length < 2) {
                isValid = false;
                errorMessage = 'Имя должно содержать минимум 2 символа';
            }
            break;
            
        case 'email':
            if (!value) {
                isValid = false;
                errorMessage = 'Пожалуйста, введите ваш email';
            } else if (!isValidEmail(value)) {
                isValid = false;
                errorMessage = 'Пожалуйста, введите корректный email';
            }
            break;
            
        case 'textarea':
            if (!value) {
                isValid = false;
                errorMessage = 'Пожалуйста, введите сообщение';
            } else if (value.length < 10) {
                isValid = false;
                errorMessage = 'Сообщение должно содержать минимум 10 символов';
            }
            break;
    }
    
    if (field.id === 'name' && !value) {
        isValid = false;
        errorMessage = 'Пожалуйста, введите ваше имя';
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    } else {
        clearFieldError(field);
        showFieldSuccess(field);
    }
    
    return isValid;
}

// Проверка email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Показать ошибку поля
function showFieldError(input, message) {
    input.style.borderColor = '#ef4444';
    input.style.background = '#fef2f2';
    
    // Удаляем старую ошибку если есть
    const existingError = input.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.animation = 'shake 0.5s ease-in-out';
    
    input.parentNode.appendChild(errorDiv);
    
    // Анимация "тряски" для поля с ошибкой
    input.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
        input.style.animation = '';
    }, 500);
}

// Показать успешную валидацию поля
function showFieldSuccess(input) {
    input.style.borderColor = '#10b981';
    input.style.background = '#f0fdf4';
    
    // Удаляем сообщение об ошибке если есть
    const existingError = input.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
}

// Очистить ошибку поля
function clearFieldError(input) {
    input.style.borderColor = '#e2e8f0';
    input.style.background = '#ffffff';
    
    const errorDiv = input.parentNode.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// Очистить все ошибки
function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => error.remove());
    
    const inputs = document.querySelectorAll('.form-input, .form-select, .form-textarea');
    inputs.forEach(input => {
        input.style.borderColor = '#e2e8f0';
        input.style.background = '#ffffff';
    });
}

// Показать уведомление
function showNotification(message, type = 'info') {
    // Создание элемента уведомления
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Цвета в зависимости от типа
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#3b82f6',
        warning: '#f59e0b'
    };
    
    const icons = {
        success: '✅',
        error: '❌',
        info: 'ℹ️',
        warning: '⚠️'
    };
    
    notification.style.background = colors[type] || colors.info;
    notification.innerHTML = `${icons[type] || ''} ${message}`;
    
    document.body.appendChild(notification);
    
    // Анимация появления
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Автоматическое скрытие
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
    
    // Возможность закрыть уведомление кликом
    notification.addEventListener('click', function() {
        this.classList.remove('show');
        setTimeout(() => {
            if (this.parentNode) {
                this.parentNode.removeChild(this);
            }
        }, 300);
    });
}

// Анимация появления элементов при скролле
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.education-card, .project-card, .skills-category, .skills-level, .contact-method, .contact-form');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Инициализация переключателя тем
function initThemeSwitcher() {
    const themeRadios = document.querySelectorAll('input[name="theme"]');
    const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
    
    // Устанавливаем сохраненную тему
    document.body.setAttribute('data-theme', savedTheme);
    
    // Отмечаем соответствующий radio
    themeRadios.forEach(radio => {
        if (radio.value === savedTheme) {
            radio.checked = true;
        }
        
        radio.addEventListener('change', function() {
            const selectedTheme = this.value;
            document.body.setAttribute('data-theme', selectedTheme);
            localStorage.setItem('portfolio-theme', selectedTheme);
            
            // Анимация переключения
            document.body.style.opacity = '0.8';
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 300);
            
            // Показываем уведомление
            const themeNames = {
                light: 'Светлая',
                dark: 'Тёмная', 
                gradient: 'Градиентная'
            };
            showNotification(`🎨 Тема изменена: ${themeNames[selectedTheme]}`, 'success');
            
            // Обновляем прогресс-бары для новой темы
            setTimeout(initSkillBars, 500);
        });
    });
    
    // Добавляем обработчик для системной темы
    if (window.matchMedia) {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Если тема "auto" и системная тема изменилась
        systemTheme.addEventListener('change', (e) => {
            const currentTheme = document.body.getAttribute('data-theme');
            if (currentTheme === 'auto') {
                document.body.setAttribute('data-theme', e.matches ? 'dark' : 'light');
            }
        });
    }
}

// Функция сброса темы
function resetTheme() {
    localStorage.removeItem('portfolio-theme');
    document.body.setAttribute('data-theme', 'light');
    
    // Сбрасываем radio-кнопки
    const themeRadios = document.querySelectorAll('input[name="theme"]');
    themeRadios.forEach(radio => {
        radio.checked = radio.value === 'light';
    });
    
    showNotification('🔄 Тема сброшена к стандартной', 'info');
}

// Плавные переходы между темами
function smoothThemeTransition() {
    const style = document.createElement('style');
    style.textContent = `
        * {
            transition: background-color 0.5s ease, 
                        color 0.5s ease, 
                        border-color 0.5s ease,
                        box-shadow 0.5s ease !important;
        }
        
        .hero-stats,
        .project-card,
        .education-card,
        .skills-category,
        .contact-form {
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
    `;
    document.head.appendChild(style);
}

// Инициализация интерактивных элементов
function initInteractiveElements() {
    // Обработка кнопок в hero-секции
    const contactBtn = document.querySelector('.hero-actions .btn-primary');
    const downloadBtn = document.querySelector('.hero-actions .btn-secondary');
    
    if (contactBtn) {
        contactBtn.addEventListener('click', function() {
            scrollToSection('contact');
            
            // Анимация нажатия
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    }
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            // Анимация нажатия
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    }
    
    // Обработка skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Показываем информацию о навыке
            const skillName = this.textContent.trim();
            showNotification(`Навык: ${skillName} - подробности в резюме`, 'info');
        });
    });
    
    // Обработка карточек проектов
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const overlay = this.querySelector('.project-overlay');
            if (overlay) {
                overlay.style.opacity = '1';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const overlay = this.querySelector('.project-overlay');
            if (overlay) {
                overlay.style.opacity = '0';
            }
        });
    });
    
    // Добавляем интерактивность для ссылок GitHub
    const githubLinks = document.querySelectorAll('a[href*="github"]');
    githubLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            showNotification('🔗 Открываю GitHub репозиторий...', 'info');
        });
    });
    
    // Инициализация переключателя тем
    initThemeSwitcher();
}

// Обработка изменения размера окна
window.addEventListener('resize', function() {
    // Переинициализация при необходимости
    initSkillBars();
});

// Добавляем обработчики для улучшения UX
document.addEventListener('keydown', function(e) {
    // ESC закрывает уведомления
    if (e.key === 'Escape') {
        const notifications = document.querySelectorAll('.notification');
        notifications.forEach(notification => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        });
    }
});

// Анимация для навигации при скролле
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    const scrollY = window.scrollY;
    
    if (scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.backdropFilter = 'blur(20px)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        
        // Для темной темы
        if (document.body.getAttribute('data-theme') === 'dark') {
            header.style.background = 'rgba(15, 23, 42, 0.98)';
        }
        
        // Для градиентной темы
        if (document.body.getAttribute('data-theme') === 'gradient') {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(20px)';
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        
        // Для темной темы
        if (document.body.getAttribute('data-theme') === 'dark') {
            header.style.background = 'rgba(15, 23, 42, 0.95)';
        }
        
        // Для градиентной темы
        if (document.body.getAttribute('data-theme') === 'gradient') {
            header.style.background = 'rgba(255, 255, 255, 0.9)';
        }
    }
    
    // Подсветка активного раздела в навигации
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// Добавляем CSS для анимаций
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
            transform: translateX(-50%) translateY(0);
        }
        40% {
            transform: translateX(-50%) translateY(-10px);
        }
        60% {
            transform: translateX(-50%) translateY(-5px);
        }
    }
    
    .nav-link.active {
        color: #6366f1 !important;
    }
    
    .nav-link.active::after {
        width: 80% !important;
    }
    
    .fa-spinner {
        animation: spin 1s linear infinite;
    }
    
    .scroll-indicator {
        animation: bounce 2s infinite;
    }
    
    /* Стили для активной темы в переключателе */
    .theme-switcher input[type="radio"]:checked + .radiomark + * {
        transform: scale(1.1);
        text-shadow: 0 0 10px rgba(99, 102, 241, 0.5);
    }
`;
document.head.appendChild(style);

// Инициализация tooltips для элементов (опционально)
function initTooltips() {
    const elementsWithTooltip = document.querySelectorAll('[data-tooltip]');
    elementsWithTooltip.forEach(element => {
        element.addEventListener('mouseenter', function(e) {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('data-tooltip');
            tooltip.style.cssText = `
                position: absolute;
                background: var(--text-primary);
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 8px;
                font-size: 0.875rem;
                z-index: 10000;
                white-space: nowrap;
                pointer-events: none;
                transform: translateY(-10px);
                opacity: 0;
                transition: all 0.3s ease;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            `;
            
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            const tooltipRect = tooltip.getBoundingClientRect();
            
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltipRect.width / 2) + 'px';
            tooltip.style.top = rect.top - tooltipRect.height - 10 + 'px';
            
            // Анимация появления
            setTimeout(() => {
                tooltip.style.opacity = '1';
                tooltip.style.transform = 'translateY(0)';
            }, 10);
            
            this.tooltip = tooltip;
        });
        
        element.addEventListener('mouseleave', function() {
            if (this.tooltip) {
                this.tooltip.style.opacity = '0';
                this.tooltip.style.transform = 'translateY(-10px)';
                setTimeout(() => {
                    if (this.tooltip.parentNode) {
                        this.tooltip.parentNode.removeChild(this.tooltip);
                    }
                }, 300);
            }
        });
    });
}

// Запускаем tooltips если есть элементы с data-tooltip
if (document.querySelector('[data-tooltip]')) {
    initTooltips();
}

// Функция для копирования email в буфер обмена
function copyEmail() {
    const email = 'nadezhda.shkodina@example.com';
    navigator.clipboard.writeText(email).then(() => {
        showNotification('📧 Email скопирован в буфер обмена!', 'success');
    }).catch(() => {
        showNotification('❌ Не удалось скопировать email', 'error');
    });
}

// Экспорт функций для глобального использования
window.showNotification = showNotification;
window.scrollToSection = scrollToSection;
window.downloadResume = downloadResume;
window.copyEmail = copyEmail;
window.validateContactForm = validateContactForm;
window.resetTheme = resetTheme;

console.log('✨ Все скрипты инициализированы успешно!');