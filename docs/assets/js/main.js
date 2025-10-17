// JSON Utils Documentation JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Add syntax highlighting for code blocks
    highlightCodeBlocks();

    // Add copy functionality to code blocks
    addCopyButtons();

    // Add smooth scrolling for anchor links
    addSmoothScrolling();

    // Add mobile menu toggle if needed
    initMobileMenu();
});

function highlightCodeBlocks() {
    const codeBlocks = document.querySelectorAll('pre code');
    codeBlocks.forEach(block => {
        // Add line numbers for better readability
        const lines = block.textContent.split('\n');
        if (lines.length > 3) {
            block.classList.add('line-numbers');
        }
    });
}

function addCopyButtons() {
    const codeBlocks = document.querySelectorAll('.code-block');

    codeBlocks.forEach(block => {
        const button = document.createElement('button');
        button.className = 'copy-btn';
        button.innerHTML = '📋 Copy';
        button.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: #4a5568;
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
            opacity: 0.8;
            transition: opacity 0.3s;
        `;

        button.addEventListener('click', function() {
            const code = block.querySelector('code');
            if (code) {
                navigator.clipboard.writeText(code.textContent).then(() => {
                    button.innerHTML = '✅ Copied!';
                    setTimeout(() => {
                        button.innerHTML = '📋 Copy';
                    }, 2000);
                });
            }
        });

        button.addEventListener('mouseenter', () => {
            button.style.opacity = '1';
        });

        button.addEventListener('mouseleave', () => {
            button.style.opacity = '0.8';
        });

        block.style.position = 'relative';
        block.appendChild(button);
    });
}

function addSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function initMobileMenu() {
    const nav = document.querySelector('.main-nav');
    const navItems = nav.querySelector('ul');

    // Create mobile menu button
    const menuButton = document.createElement('button');
    menuButton.className = 'mobile-menu-btn';
    menuButton.innerHTML = '☰ Menu';
    menuButton.style.cssText = `
        display: none;
        background: #667eea;
        color: white;
        border: none;
        padding: 10px 15px;
        border-radius: 5px;
        cursor: pointer;
        margin: 10px;
    `;

    // Add mobile styles
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .mobile-menu-btn {
                display: block !important;
            }
            .main-nav ul {
                display: none;
                flex-direction: column;
                width: 100%;
                background: white;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            .main-nav ul.show {
                display: flex !important;
            }
        }
    `;
    document.head.appendChild(style);

    menuButton.addEventListener('click', function() {
        navItems.classList.toggle('show');
    });

    nav.insertBefore(menuButton, navItems);
}

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});