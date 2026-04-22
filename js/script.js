// Site 1 — QSSN PaaS verification
console.log('✅ Site 1 loaded successfully on QSSN PaaS');
document.querySelector('.hero h1').style.opacity = '0';
document.querySelector('.hero h1').style.transition = 'opacity 0.6s ease';
setTimeout(() => { document.querySelector('.hero h1').style.opacity = '1'; }, 100);
